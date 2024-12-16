import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react'

import MainScreen from './MainScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CategoryManage from './CategoryManage';
import AddProduct from './AddProduct';
import ManageProducts from './Manage Products';
import CustomDrawer from '../../Components/CustomDrawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Orders from './Orders';
import CompeleteOrder from './CompeleteOrder';
import { API } from '../../android/API/BaseApi';
import { useSelector } from 'react-redux';



const Drawer = createDrawerNavigator();
const AdminHome = () => {
   const [photo,setPhoto]=useState();
   const [name,setName]=useState();
   const Auth = useSelector(state => state.Auth);
   const [userName,setUserName]=useState();


   const getAdminData=async()=>{
    const res=await API.get('api/auth-check',{
      headers:{
        "authorization":await Auth.token
     }
    })
    // console.log(res.data.user)
    if(res.data.success){
       setName(res.data.user.name)
       setUserName(res.data.user.userName)
      setPhoto(res.data.user.photo)
  
    }
  }
  useEffect(()=>{
          getAdminData()
  },[])
 
  return (
    //  <MainScreen />
    <Drawer.Navigator  drawerContent={(props)=> <CustomDrawer {...props}  />} screenOptions={{
      headerShown:false
    }}>
      <Drawer.Screen name='Home'  component={MainScreen}
      options={{
        
      }}  />
      <Drawer.Screen name='Manage Category'  component={CategoryManage}  />
      <Drawer.Screen name='Add Product'  component={AddProduct}  />
      <Drawer.Screen name='Manage Product'  component={ManageProducts}  />
      <Drawer.Screen name='Orders'  component={Orders}  />
      <Drawer.Screen name='Completed Orders'  component={CompeleteOrder}  />

    </Drawer.Navigator>
    // <CategoryManage />
  )
}

export default AdminHome;