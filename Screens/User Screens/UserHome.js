import { View, Text, Button } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { asyncThunkCreator } from '@reduxjs/toolkit';
import { useNavigation } from '@react-navigation/native';
import UserMain from './UserMain';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './Cart';
// import NewComing from './NewComing';
import UserProfile from './UserProfile';
import Icon from 'react-native-vector-icons/FontAwesome'
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Search from './Search';


const UserHome = () => {
   const Tab=createBottomTabNavigator();

  return (
   <Tab.Navigator screenOptions={{
    headerShown:false
   }}>
    <Tab.Screen name='Home' component={UserMain} options={
        {
          tabBarIcon:({color,size})=> <Icon name='home' color={color} size={heightPercentageToDP(5)} 
           
          
          />
        }
    } />
    <Tab.Screen name='Search' component={Search}
    options={
      {
        tabBarIcon:({color,size})=> <Icon name='search' color={color} size={heightPercentageToDP(5)} 
         
        
        />
      }
    }
     />
    <Tab.Screen name='user' component={UserProfile}
    options={
      {
        tabBarIcon:({color,size})=> <Icon name='user' color={color} size={heightPercentageToDP(5)} 
         
        
        />
      }
    } />
     
   </Tab.Navigator>
  )
}

export default UserHome;