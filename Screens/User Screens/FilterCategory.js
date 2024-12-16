import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import UserNavbar from '../../Components/UserNavbar'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import ProductCard from '../../Components/ProductCard';
import { API } from '../../android/API/BaseApi';



const FilterCategory = ({ route }) => {
  const { category, _id } = route.params;
    const [loader,setLoader]=useState(true);
    const [productsList, setProductList] = useState([]);

    const getProductsbyCategory=async()=>{
      try {
        const response=await API.get(`api/products/get-products-by-category/${_id}`);
        console.log(response.data)
        if(response.data.success){
          setLoader(false);
          setProductList(response.data.products)
        }
      } 
      catch (error) {
        console.log(error)
      }
    }
    const renderItem = ({ item }) => (
      <ProductCard item={item} />
    );


    useEffect(()=>{
getProductsbyCategory()
    },[])

  return (
    <View style={styles.mainView}>
      <UserNavbar />
      <Text style={{ padding: wp(5), fontSize: hp(2) }}>All Results Showing  -  {category} </Text>
      {/* this is over product View  */}
      <View style={styles.productView}>
              {
                loader ? (
                  <View style={styles.loaderView}>
                      <ActivityIndicator size={50} color={'blue'}></ActivityIndicator>
                  </View>
                )
                :
                (
                  productsList.length ?
                  <FlatList
                  data={productsList}
                  renderItem={renderItem}
                  keyExtractor={(item) => item._id}
                  numColumns={2}
                  columnWrapperStyle={styles.columnWrapper}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.contentContainer}
                />
                :
                 <View style={{flex:1,justifyContent:'center'}}>
                     <Text style={{textAlign:'center',fontSize:15,color:'black'}}>No items Related to {category}</Text>
                 </View>
                )
              }    
      </View>
    </View>
  )
}



const styles=StyleSheet.create({
  mainView:{ 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  productView:{
    flex:1,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  contentContainer: {
    paddingBottom: hp(3),
  },
  loaderView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default FilterCategory;