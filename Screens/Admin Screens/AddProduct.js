import React, { useEffect, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useNavigation } from '@react-navigation/native';
import AdminNavbar from '../../Components/AdminNavbar';
import { callApi } from '../../Redux/RealTimeUpdate/RefreshSlice';
import { useDispatch, useSelector } from 'react-redux';
import { API } from '../../android/API/BaseApi';

const AddProduct = () => {
  const Refresh = useSelector(state => state.refresh);
  const Auth = useSelector(state => state.Auth);
  const dispatch = useDispatch();
  const [categorySelector, setCategorySelector] = useState(false);
  const [categoryText, setCategoryText] = useState('Select Category');
  const [categoriesList, setCategoriesList] = useState([]);
  const Navigation = useNavigation();

  // Fields Data
  const [photo, setPhoto] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();

  // Validation States
  const [photoError, setPhotoError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [priceError, setPriceError] = useState(false);

  const getCategories = async () => {
    const res = await API.get('api/category/get-categories');
    if (res.data.success) {
      setCategoriesList(res.data.categories);
    }
  };

  const addProductToServer = async () => {
    try {
      if (!photo) {
        setPhotoError(true);
        return;
      }
      setPhotoError(false);

      if (!title) {
        setTitleError(true);
        return;
      }
      setTitleError(false);

      if (!description) {
        setDescriptionError(true);
        return;
      }
      setDescriptionError(false);

      if (!category) {
        setCategoryError(true);
        return;
      }
      setCategoryError(false);

      if (!price) {
        setPriceError(true);
        return;
      }
      setPriceError(false);

      const res = await API.post('api/products/create-product', { title, description, photo, category, price }, {
        headers: {
          Authorization: Auth.token,
        },
      });

      if (res.data.success) {
        dispatch(callApi());
        Alert.alert('Product Added Successfully');
        resetForm();
        Navigation.navigate('Manage Product');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategoryText('Select Category');
    setDescription('');
    setPhoto(null);
    setPrice('');
  };

  const openGallery = () => {
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

  useEffect(() => {
    getCategories();
  }, [Refresh, callApi]);

  return (
    <View style={styles.mainView}>
      <AdminNavbar title={'Add Product'} />
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={openGallery}>
          {photo ? (
            <Image style={styles.image} source={{ uri: photo }} />
          ) : (
            <View style={styles.uploadInput}>
              <Text style={styles.uploadText}>Upload Photo</Text>
            </View>
          )}
        </TouchableOpacity>
        {photoError && <Text style={styles.errorText}>Photo is Required</Text>}

        <View style={styles.inputView}>
          <TextInput
            placeholderTextColor={'gray'}
            value={title}
            onChangeText={setTitle}
            placeholder='Product Title'
            style={styles.textInput}
          />
        </View>
        {titleError && <Text style={styles.errorText}>Title is Required</Text>}

        <View style={styles.inputView}>
          <TextInput
            multiline
            placeholderTextColor={'gray'}
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            placeholder='Product Description'
            style={styles.textInput}
          />
        </View>
        {descriptionError && <Text style={styles.errorText}>Description is Required</Text>}

        <TouchableOpacity onPress={() => setCategorySelector(!categorySelector)}>
          <View style={styles.categorySelector}>
            <Text style={styles.categoryText}>{categoryText}</Text>
            <AntDesign name={categorySelector ? 'up' : 'down'} color='black' size={hp(2.5)} />
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
              keyExtractor={item => item._id}
            />
          </View>
        )}
        {categoryError && <Text style={styles.errorText}>Category is Required</Text>}

        <View style={styles.inputView}>
          <TextInput
            value={price}
            onChangeText={setPrice}
            keyboardType='numeric'
            placeholder='Price in RS'
            placeholderTextColor={'gray'}
            style={styles.textInput}
          />
        </View>
        {priceError && <Text style={styles.errorText}>Price is Required</Text>}

        <TouchableOpacity onPress={addProductToServer}>
          <View style={styles.btnView}>
            <Text style={styles.btnText}>Add Product</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    paddingHorizontal: wp(5),
    paddingTop: hp(5),
  },
  image: {
    height: hp(25),
    width: wp(90),
    borderRadius: wp(2),
    marginBottom: hp(2),
    alignSelf: 'center',
  },
  uploadInput: {
    height: hp(25),
    width: wp(90),
    borderRadius: wp(2),
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
    alignSelf: 'center',
  },
  uploadText: {
    color: '#757575',
    fontSize: hp(2),
  },
  inputView: {
    marginBottom: hp(2),
  },
  textInput: {
    height: hp(6),
    borderColor: '#BDBDBD',
    borderWidth: 0.5,
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    backgroundColor: '#FFF',
    fontSize: hp(2),
  },
  categorySelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp(3),
    borderColor: '#BDBDBD',
    borderWidth: 0.5,
    borderRadius: wp(2),
    backgroundColor: '#FFF',
    marginBottom: hp(2),
  },
  categoryText: {
    fontSize: hp(2),
    color: '#000',
  },
  dropMenu: {
    borderRadius: wp(2),
    borderWidth: 0.5,
    borderColor: '#BDBDBD',
    backgroundColor: '#FFF',
    overflow: 'hidden',
    marginBottom: hp(2),
  },
  categoriesListItem: {
    padding: wp(3),
    borderBottomWidth: 0.5,
    borderBottomColor: '#BDBDBD',
  },
  categoryItemText: {
    fontSize: hp(2),
    color: '#000',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: hp(1.7),
    marginLeft: wp(2),
    marginBottom: hp(1),
  },
  btnView: {
    backgroundColor: '#2196F3',
    paddingVertical: hp(2),
    borderRadius: wp(2),
    alignItems: 'center',
    marginVertical: hp(2),
    alignSelf: 'center',
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: hp(2.2),
  },
});

export default AddProduct;
