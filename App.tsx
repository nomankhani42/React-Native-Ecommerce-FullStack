import { View, Text, StyleSheet } from 'react-native'

import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import Store from './Redux';
import 'react-native-gesture-handler';
import Navigation from './Screens/Navigation';


import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { StripeProvider } from '@stripe/stripe-react-native';


let persistor=persistStore(Store);
const pubKey='pk_test_51PlqUxBdG0truyJNDSrmU1fFwdqTE51M213SfxoTCMNGUNQssSplJuOGfPl1KggaJ0MKMJBXSsJuMCkSdOrfRRaX00sgAzxUX5';



const App = () => {
  
  return (
    
      <Provider store={Store}>
        <StripeProvider publishableKey={pubKey}>
        <PersistGate persistor={persistor}  >
         <Navigation />
         </PersistGate>
     
      
     
       
       
        
        </StripeProvider>
       
      </Provider>
   
   
  )
}


const styles=StyleSheet.create({
  
    mainView:{
       flex:1,
       justifyContent:"center",
       alignItems:"center"

    },
    mainHead:{
      fontSize:15,
      paddingHorizontal:10,
      color:'red'
    }
})

export default App