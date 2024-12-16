import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import axios from 'axios';
import { API } from '../android/API/BaseApi';
import ProductCard from './ProductCard';

const Products = () => {
  const [productsList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getProducts = async () => {
    try {
      const res = await API.get('api/products/get-products');
      if (res.data.success) {
        setProductList(res.data.Products);
      } else {
        setError('Failed to load products.');
      }
    } catch (err) {
      setError('An error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const renderItem = ({ item }) => (
    <ProductCard item={item} />
  );

  if (loading) {
    return <View style={styles.loadingContainer}><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View style={styles.errorContainer}><Text>{error}</Text></View>;
  }

  return (
    <View style={styles.mainView}>
      <Text style={styles.heading}>Products</Text>
      <FlatList
        data={productsList}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingHorizontal: wp(3),
    backgroundColor: '#F4F4F4', // Light background color
    paddingTop: hp(2),
  },
  heading: {
    fontSize: hp(4),
    textTransform: 'uppercase',
    color: '#333',
    fontWeight: '600',
    marginBottom: hp(2),
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  contentContainer: {
    paddingBottom: hp(3),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
  },
});

export default Products;
