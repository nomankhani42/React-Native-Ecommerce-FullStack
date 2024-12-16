
import { View, Text } from 'react-native'
import React from 'react'
import Welcome from './Welcome'
import Login from './Login'
import Signup from './Signup'
import Homescreen from './Homescreen'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useSelector } from 'react-redux'
import FilterCategory from './User Screens/FilterCategory'
import ProductDetail from './User Screens/ProductDetail'
import Cart from './User Screens/Cart'
import ManageUserProfile from './User Screens/ManageUserProfile'
import AdminOrderDetail from './Admin Screens/AdminOrderDetail'
import MyOrders from './User Screens/MyOrders'
import UserOrderDetail from './User Screens/UserOrderDetail'
import CompletedUserOrders from './User Screens/CompletedUserOrders'



const Stack=createNativeStackNavigator();
const Navigation = () => {
  const Auth=useSelector(state=>state.Auth);
  return (
    <NavigationContainer>
       {
        Auth.isAuthenticated ? <IsAuthenticatedStack></IsAuthenticatedStack> :
        <IsNotAuthenticatedStack></IsNotAuthenticatedStack>
       }

   </NavigationContainer>
  )
}


const IsNotAuthenticatedStack=()=>{
  return  (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
       <Stack.Screen name='welcome' component={Welcome} />
        <Stack.Screen name='login' component={Login} />
       <Stack.Screen name='signup' component={Signup} />

   </Stack.Navigator>
   )
}

const IsAuthenticatedStack=()=>{
  return  (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
        <Stack.Screen name='home' component={Homescreen} />
        {/* user screens  */}
       <Stack.Screen name='filter-category' component={FilterCategory} />
       <Stack.Screen name='product-detail' component={ProductDetail} />
       <Stack.Screen name='cart' component={Cart} />
       <Stack.Screen name='Manage-Profile' component={ManageUserProfile} />
       <Stack.Screen name='my-orders' component={MyOrders} />
       <Stack.Screen name='my-completed-orders' component={CompletedUserOrders} />

       <Stack.Screen name='user-order-detail' component={UserOrderDetail} />

       {/* admin screens  */}
       <Stack.Screen name='order-manage-Screen' component={AdminOrderDetail} />
   </Stack.Navigator>
   )
}

export default Navigation