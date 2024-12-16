import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

const CartBottom = ({ ModalFlag }) => {
  const cart = useSelector(state => state.MyCart);

  return (
    <View style={styles.bottomView}>
      <Text style={styles.amountHeading}>Total Amount Rs : {cart.netAmount}</Text>
      <TouchableOpacity onPress={() => ModalFlag(true)} style={styles.proceedBtn}>
        <Text style={styles.proceedBtnText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    backgroundColor: '#f0f2f5',
    height: hp(15),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  amountHeading: {
    color: '#333',
    fontWeight: '700',
    fontSize: hp(2.7),
    marginBottom: hp(1),
  },
  proceedBtn: {
    backgroundColor: '#f7a840',
    width: wp(70),
    paddingVertical: hp(2),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  proceedBtnText: {
    color: '#fff',
    fontSize: hp(2.2),
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CartBottom;
