import {View, Text, Button, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import axios from 'axios';
import AdminHome from './Admin Screens/AdminHome';
import UserHome from './User Screens/UserHome';
import { API } from '../android/API/BaseApi';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../Redux/AuthSlice/AuthSlice';

const Homescreen = () => {
  const Navigation = useNavigation();
  const dispatch=useDispatch();
  const [photo,setPhoto]=useState()
const auth=useSelector(state=>state.Auth)
  const getUser = async () => {
    
    
    await API.get('api/auth-check',{
      headers:{
         Authorization:auth.token
     }
    })
    .then((res)=>{
          
                 dispatch(updateProfile(res.data.user))

          
    })
  };

  useEffect(() => {
    getUser();
  }, [auth]);


  return auth.user.role ==0 ? (
     <UserHome ></UserHome>
  ) :auth.user.role===1 ?
   <AdminHome photo={photo} ></AdminHome> :  (
    <View style={{display:'flex', height:heightPercentageToDP(100), justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator size="large" color="#00ff00">
      
    </ActivityIndicator>
    </View>
  );
};

export default Homescreen;
