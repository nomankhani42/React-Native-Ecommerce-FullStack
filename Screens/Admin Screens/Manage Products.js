import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AdminNavbar from '../../Components/AdminNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { callApi } from '../../Redux/RealTimeUpdate/RefreshSlice';
import { API } from '../../android/API/BaseApi';

const ManageProducts = () => {
  const Auth = useSelector(state => state.Auth);
  const [ProductsList, setProducts] = useState([]);
  const Refresh = useSelector(state => state.refresh);
  const dispatch = useDispatch();
  const [delModal, setDelModal] = useState(false);
  const [del_id, setDel_id] = useState();
  const [editModal, setEditModal] = useState(false);
  const [categorySelector, setCategorySelector] = useState(false);
  const [update_id, setUpdate_id] = useState();
  const [categoryText, setCategoryText] = useState('Select Category');
  const [categoriesList, setCategoriesList] = useState([]);
  const [photo, setPhoto] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState(0);

  const openGallery = async () => {
    ImageCropPicker.openPicker({
      width: 400,
      height: 400,
      includeBase64: true,
      cropping: true,
    }).then(image => {
      const data = `data:${image.mime};base64,${image.data}`;
      setPhoto(data);
    });
  };

  const getCategories = async () => {
    const res = await API.get('api/category/get-categories');
    if (res.data.success) {
      setCategoriesList(res.data.categories);
    }
  };

  const getProducts = async () => {
    const res = await API.get('api/products/get-products');
    if (res.data.success) {
      setProducts(res.data.Products);
    }
  };

  const updateProduct = async () => {
    const res = await API.put(`api/products/update-product/${update_id}`, { title, description, category, price, photo }, {
      headers: { Authorization: Auth.token },
    });
    if (res.data.success) {
      getProducts();
      setEditModal(false);
    }
  };

  const deleteProduct = async () => {
    const res = await API.delete(`api/products/delete-product/${del_id}`, {
      headers: { Authorization: Auth.token },
    });
    if (res.data.success) {
      getProducts();
      setDelModal(false);
    }
  };

  useEffect(() => {
    getCategories();
    getProducts();
  }, [Refresh, callApi]);

  return (
    <View style={styles.main}>
      <AdminNavbar title={'Products'} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.productsView}>
          {ProductsList.map((item) => (
            <View style={styles.itemCard} key={item._id}>
              <Image style={styles.productImage} source={{ uri: item.photo }} />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>RS : {item.price}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                  const catTxt = categoriesList.find(x => x._id === item.category);
                  setUpdate_id(item._id);
                  setPrice(item.price.toString());
                  setTitle(item.title);
                  setDescription(item.description);
                  setPhoto(item.photo);
                  setCategory(item.category);
                  setCategoryText(catTxt?.category || 'Select Category');
                  setEditModal(true);
                }}>
                  <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  setDel_id(item._id);
                  setDelModal(true);
                }}>
                  <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Delete Modal */}
      <Modal visible={delModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.deleteDialog}>
            <Text style={styles.modalText}>Are you sure you want to delete this product?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={deleteProduct}>
                <Text style={styles.modalButtonYes}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDelModal(false)}>
                <Text style={styles.modalButtonNo}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Modal */}
      <Modal visible={editModal} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.editModalContainer}>
            <Text style={styles.editDialogHeading}>Edit Product</Text>
            <ScrollView>
              {photo ? (
                <TouchableOpacity onPress={openGallery}>
                  <Image style={styles.uploadedImage} source={{ uri: photo }} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={openGallery}>
                  <View style={styles.uploadInput}>
                    <Text style={styles.uploadText}>Upload Photo</Text>
                  </View>
                </TouchableOpacity>
              )}

              <View style={styles.inputView}>
                <TextInput
                  placeholder="Product Title"
                  value={title}
                  onChangeText={setTitle}
                  style={styles.textInput}
                />
              </View>
              <View style={styles.inputView}>
                <TextInput
                  placeholder="Product Description"
                  value={description}
                  onChangeText={setDescription}
                  multiline={true}
                  numberOfLines={4}
                  style={styles.textInput}
                />
              </View>

              <TouchableOpacity onPress={() => setCategorySelector(!categorySelector)}>
                <View style={styles.categorySelector}>
                  <Text style={styles.categoryText}>{categoryText}</Text>
                  <AntDesign name={categorySelector ? 'up' : 'down'} color="black" size={hp(2.5)} />
                </View>
              </TouchableOpacity>

              {categorySelector && (
                <View style={styles.dropMenu}>
                  <FlatList
                    data={categoriesList}
                    renderItem={({ item }) => (
                      <TouchableOpacity key={item._id} onPress={() => {
                        setCategoryText(item.category);
                        setCategory(item._id);
                        setCategorySelector(false);
                      }}>
                        <View style={styles.categoriesListItem}>
                          <Text style={styles.categoryItemText}>{item.category}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item._id}
                  />
                </View>
              )}

              <View style={styles.inputView}>
                <TextInput
                  placeholder="Price in RS"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  style={styles.textInput}
                />
              </View>

              <View style={styles.buttonGroup}>
                <TouchableOpacity onPress={updateProduct}>
                  <View style={styles.btnView}>
                    <Text style={styles.btnText}>Save</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEditModal(false)}>
                  <View style={styles.btnViewCancel}>
                    <Text style={styles.btnText}>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    paddingBottom: hp(2),
  },
  productsView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: wp(5),
  },
  itemCard: {
    width: wp(45),
    marginBottom: hp(3),
    backgroundColor: '#fff',
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#ddd',
    padding: wp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    height: hp(20),
    width: wp(40),
    borderRadius: wp(2),
    marginBottom: hp(1),
  },
  productTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  productPrice: {
    fontSize: hp(2),
    color: '#FF5722',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  editButton: {
    backgroundColor: '#FF9800',
    color: '#fff',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    color: '#fff',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  deleteDialog: {
    width: wp(80),
    backgroundColor: '#fff',
    borderRadius: wp(2),
    padding: wp(5),
    borderWidth: 0.5,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  editModalContainer: {
    width: wp(85),
    backgroundColor: '#fff',
    borderRadius: wp(2),
    padding: wp(5),
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  editDialogHeading: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(2),
  },
  uploadedImage: {
    height: hp(25),
    width: wp(80),
    borderRadius: wp(2),
    marginBottom: hp(2),
  },
  uploadInput: {
    height: hp(25),
    width: wp(80),
    borderRadius: wp(2),
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ddd',
    marginBottom: hp(2),
  },
  uploadText: {
    fontSize: hp(2),
    color: '#666',
  },
  inputView: {
    marginBottom: hp(2),
  },
  textInput: {
    height: hp(6),
    borderColor: '#ddd',
    borderWidth: 0.5,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: '#fff',
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: wp(2),
    backgroundColor: '#fff',
    marginBottom: hp(2),
  },
  categoryText: {
    fontSize: hp(2),
    color: '#333',
  },
  dropMenu: {
    maxHeight: hp(30),
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    overflow: 'hidden',
    marginBottom: hp(2),
  },
  categoriesListItem: {
    padding: wp(3),
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  categoryItemText: {
    fontSize: hp(2),
    color: '#333',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  btnView: {
    backgroundColor: '#2196F3',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
  },
  btnViewCancel: {
    backgroundColor: '#F44336',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: hp(2.2),
    textAlign: 'center',
    color: '#333',
    marginBottom: hp(2),
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButtonYes: {
    backgroundColor: '#F44336',
    color: '#fff',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalButtonNo: {
    backgroundColor: '#2196F3',
    color: '#fff',
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    borderRadius: wp(2),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ManageProducts;
