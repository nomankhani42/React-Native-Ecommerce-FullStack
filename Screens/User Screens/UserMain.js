import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

import { Button } from 'react-native-paper';
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import UserNavbar from '../../Components/UserNavbar';

import CategoriesList from '../../Components/CategoriesList';
import Products from '../../Components/Products';
import Carousel from '../../Components/Carousel';

const UserMain = () => {
    
  
  return (
    <View style={Styles.mainView}>
     <UserNavbar />
    
     <ScrollView>
     <View style={Styles.contentView}>
       <CategoriesList />
          <Carousel />
       <Products />
  
   
       </View>
     </ScrollView>
  </View>
  )
} 

const Styles=StyleSheet.create({
  mainView:{
    // paddingHorizontal:wp(5),
    backgroundColor:'#fff',
    flex:1
  },
  contentView:{
   
  }
})

export default UserMain