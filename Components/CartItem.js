import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import { decraseQuantity, increaseQuantity, removeProductFromCart } from '../Redux/Cart/CartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.itemView}>
      <View style={styles.photoView}>
        <Image style={styles.itemPhoto} source={{ uri: item.photo }} />
      </View>
      <View style={styles.descriptionView}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>RS : {item.price}</Text>
      </View>
      <View style={styles.actionView}>
        <TouchableOpacity onPress={() => dispatch(increaseQuantity(item._id))}>
          <AntDesign name='plus' color='#ff6347' size={hp(3)} />
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => dispatch(decraseQuantity(item._id))}>
          <AntDesign name='minus' color='#ff6347' size={hp(3)} />
        </TouchableOpacity>
      </View>
      <View style={styles.deleteView}>
        <TouchableOpacity onPress={() => dispatch(removeProductFromCart(item._id))}>
          <AntDesign name='delete' color='#ff6347' size={hp(3)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemView: {
    marginVertical: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa', // Light background for better contrast
    borderRadius: wp(2),
    padding: wp(2),
    elevation: 2, // Add shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  photoView: {
    width: wp(25),
    alignItems: 'center',
  },
  itemPhoto: {
    height: hp(15),
    width: wp(25),
    borderRadius: wp(2),
    backgroundColor: '#e9ecef', // Light grey background for images
  },
  descriptionView: {
    flex: 1,
    paddingLeft: wp(2),
  },
  itemTitle: {
    fontWeight: '600',
    color: '#343a40', // Darker color for text
    fontSize: hp(2.2),
  },
  itemPrice: {
    marginVertical: hp(0.5),
    color: '#495057', // Slightly lighter grey for price
  },
  actionView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  quantity: {
    color: '#495057',
    fontSize: hp(2),
    marginHorizontal: wp(2),
  },
  deleteView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(2),
  },
});

export default CartItem;
