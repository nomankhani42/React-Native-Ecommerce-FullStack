import { View, Text, StyleSheet, ScrollView, FlatList, Modal } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { widthPercentageToDP  as wp , heightPercentageToDP as hp, heightPercentageToDP} from 'react-native-responsive-screen';
import CartItem from '../../Components/CartItem';
import BackScreenNavbar from '../../Components/BackScreenNavbar';
import CartBottom from '../../Components/CartBottom';
import CheckoutModal from '../../Components/CheckoutModal';
// import { ScrollView } from 'react-native-gesture-handler';

const Cart = () => {
  const cart=useSelector(state=>state.MyCart)
  const [ModalFlag,setModalFlag]=useState(false)
  return (
    <View style={Styles.centralView}>
      <BackScreenNavbar title={'My Cart'} />
          {
            cart.items.length ?  <CartPage />  : // component which created at bottom of this page
             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                     <Text style={{color:'#000'}}>Your Cart is Empty</Text>
            </View>
          }
           {cart.items.length ? <CartBottom ModalFlag={setModalFlag} /> : null}

           {/* this is our check out Modal  */}
           <Modal  visible={ModalFlag}>
                 <CheckoutModal ModalFlag={setModalFlag} />
           </Modal>
         
    </View>
  )
}

const Styles=StyleSheet.create({
  centralView:{
      flex:1,
      backgroundColor:'#fff'
  },
  cartPageCentralView:{
    paddingHorizontal:wp(4),
     height:hp(80),
     paddingVertical:hp(2),
     paddingBottom:hp(5)


  }
})


const CartPage =()=>{
  const cartItem=useSelector(state=>state.MyCart)
  // console.log(cartItem)
    return(
      
          <View style={Styles.cartPageCentralView}>
            <ScrollView showsVerticalScrollIndicator={false} >
          
          {/* {// this is cartItem}   */}
          {cartItem.items.map((item)=>{
              return(
                    <CartItem key={item._id} item={item} />
              )
          })}

          {/* <FlatList data={CartItem} renderItem={CartItem} /> */}
          </ScrollView>
    </View>
     
    )
}
export default Cart;