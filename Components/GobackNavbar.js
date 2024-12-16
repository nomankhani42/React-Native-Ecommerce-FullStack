import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import AntD from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const GobackNavbar = () => {
    const Navigation=useNavigation();
  return (
    <View>
           <View style={Styles.headerView}>
               <TouchableOpacity onPress={()=>Navigation.goBack()}>
               <View style={Styles.arrowView}>
               <AntD name='arrowleft' color='#fff' size={hp(3)} />
               </View>
               </TouchableOpacity>
           </View>
    </View>
  )
}
const Styles=StyleSheet.create({
    headerView:{
              paddingTop:hp(2),
              paddingLeft:wp(2)
    },
    arrowView:{
              backgroundColor:'black',
              width:wp(10),
              height:hp(5),
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              
    }
})

export default GobackNavbar;