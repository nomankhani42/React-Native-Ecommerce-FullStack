import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminNavbar from '../../Components/AdminNavbar';
import ImageCropPicker from 'react-native-image-crop-picker';
import { callApi } from '../../Redux/RealTimeUpdate/RefreshSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../android/API/BaseApi';

const CategoryManage = () => {
  const Auth = useSelector(state => state.Auth);
  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryPhoto, setCategoryPhoto] = useState('');
  const dispatch = useDispatch();

  const [categoriesList, setCategoriesList] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [delValue, setDelValue] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [updateInput, setUpdateInput] = useState('');
  const [updatePhoto, setUpdatePhoto] = useState('');
  const [updateVal, setUpdateVal] = useState('');

  const getCategories = async () => {
    try {
      const res = await API.get('api/category/get-categories');
      if (res.data.success) {
        setCategoriesList(res.data.categories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openGallery = async () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      includeBase64: true,
      cropping: true
    }).then(image => {
      const data = `data:${image.mime};base64,${image.data}`;
      setCategoryPhoto(data);
    }).catch(error => {
      console.error(error);
    });
  };

  const addCategory = async () => {
    try {
      const res = await API.post('api/category/create-category', { catName: categoryTitle, photo: categoryPhoto }, {
        headers: {
          Authorization: Auth.token,
        },
      });
      if (res.data.success) {
        dispatch(callApi());
        getCategories();
        setCategoryTitle('');
        setCategoryPhoto('');
        setCreateModal(false);
        Alert.alert(res.data.message);
      } else {
        Alert.alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const DeleteCategory = async () => {
    try {
      const res = await API.delete(`api/category/delete-category/${delValue}`, {
        headers: {
          Authorization: Auth.token,
        },
      });
      if (res.data.success) {
        dispatch(callApi());
        getCategories();
        setDelModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const UpdatePhotoGalley = async () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      includeBase64: true,
      cropping: true
    }).then(image => {
      const data = `data:${image.mime};base64,${image.data}`;
      setUpdatePhoto(data);
    }).catch(error => {
      console.error(error);
    });
  };

  const UpdateCategory = async () => {
    try {
      const res = await API.put(`api/category/update-category/${updateVal}`, { updateCat: updateInput, photo: updatePhoto }, {
        headers: {
          Authorization: Auth.token,
        },
      });
      if (res.data.success) {
        dispatch(callApi());
        getCategories();
        setUpdateModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View style={styles.container}>
      <AdminNavbar title={'Categories'} />
      <TouchableOpacity onPress={() => setCreateModal(true)}>
        <View style={styles.addBtnView}>
          <Text style={styles.addBtnText}>Add Category</Text>
          <Icon size={hp(2)} color={'#fff'} name="plus" />
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollView}>
        {categoriesList.map(item => (
          <View key={item._id} style={styles.categoryItem}>
            <View style={styles.categoryInfo}>
              <Image style={styles.categoryImage} source={{ uri: item.photo }} />
              <Text style={styles.categoryTitle}>{item.category}</Text>
            </View>
            <View style={styles.categoryActions}>
              <TouchableOpacity onPress={() => {
                setUpdateVal(item._id);
                setUpdateInput(item.category);
                setUpdatePhoto(item.photo);
                setUpdateModal(true);
              }}>
                <FeatherIcon name="edit" size={hp(3)} color="#fc8803" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setDelValue(item._id);
                setDelModal(true);
              }}>
                <FeatherIcon name="trash" size={hp(3)} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={createModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={openGallery}>
              <Image style={styles.modalImage} source={{ uri: categoryPhoto || 'https://static.thenounproject.com/png/357991-200.png' }} />
              <Text style={styles.modalText}>Select Category Photo</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor={'gray'}
                value={categoryTitle}
                onChangeText={setCategoryTitle}
                placeholder='Enter Category Title'
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={addCategory} style={styles.modalButtonPrimary}>
                <Text style={styles.modalButtonText}>Add Category</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setCreateModal(false);
                setCategoryPhoto('');
                setCategoryTitle('');
              }} style={styles.modalButtonSecondary}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={delModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModalContent}>
            <Text style={styles.deleteModalText}>Are you sure you want to delete this category?</Text>
            <View style={styles.deleteModalButtons}>
              <TouchableOpacity onPress={DeleteCategory} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDelModal(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={updateModal} transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={UpdatePhotoGalley}>
              <Image style={styles.modalImage} source={{ uri: updatePhoto || 'https://static.thenounproject.com/png/357991-200.png' }} />
              <Text style={styles.modalText}>Select Category Photo</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholderTextColor={'gray'}
                value={updateInput}
                onChangeText={setUpdateInput}
                placeholder='Enter Category Title'
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={UpdateCategory} style={styles.modalButtonPrimary}>
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setUpdateModal(false)} style={styles.modalButtonSecondary}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  addBtnView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    marginTop: hp(2),
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderRadius: 5,
    marginHorizontal: 'auto',
  },
  addBtnText: {
    color: '#fff',
    fontSize: hp(2),
    marginRight: wp(2),
  },
  scrollView: {
    paddingVertical: hp(2),
    alignItems: 'center',
  },
  categoryItem: {
    width: wp(90),
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginVertical: hp(1),
    padding: hp(2),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  categoryImage: {
    height: hp(8),
    width: wp(16),
    borderRadius: wp(8),
    marginRight: wp(3),
  },
  categoryTitle: {
    fontSize: hp(2),
    color: '#333',
  },
  categoryActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: wp(80),
    padding: wp(4),
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  modalImage: {
    height: hp(15),
    width: wp(30),
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: hp(2),
  },
  modalText: {
    textAlign: 'center',
    color: '#333',
    marginBottom: hp(2),
  },
  inputContainer: {
    marginVertical: hp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    fontSize: hp(2),
    padding: wp(2),
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonPrimary: {
    backgroundColor: '#28a745',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: 5,
    marginVertical: hp(1),
  },
  modalButtonSecondary: {
    backgroundColor: '#dc3545',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderRadius: 5,
    marginVertical: hp(1),
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: hp(2),
    fontWeight: '600',
  },
  deleteModalContent: {
    width: wp(80),
    padding: wp(4),
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
  },
  deleteModalText: {
    fontSize: hp(2),
    textAlign: 'center',
    color: '#333',
    marginBottom: hp(2),
  },
  deleteModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: hp(2),
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: hp(2),
    fontWeight: '600',
  },
});

export default CategoryManage;
