import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../Redux/Cart/CartSlice';
import axios from 'axios';
import { API } from '../android/API/BaseApi';
import { useStripe } from '@stripe/stripe-react-native';
import Products from './Products';
import { useNavigation } from '@react-navigation/native';

const CheckoutModal = ({ ModalFlag }) => {
  const auth = useSelector(state => state.Auth);
  const Navigation=useNavigation();
  const [fullName, setFullName] = useState(auth.user.name);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const cart = useSelector(state => state.MyCart);
  const dispatch = useDispatch();

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const checkout = async () => {
    if (!fullName) {
      setNameError(true);
      return;
    }
    setNameError(false);

    if (!phone) {
      setPhoneError(true);
      return;
    }
    setPhoneError(false);

    if (!address) {
      setAddressError(true);
      return;
    }
    setAddressError(false);

    try {
      const { data: { clientSecret } } = await API.post('api/orders/create-payment-intent',
        { amount: cart.netAmount },
        {
          headers: {
            Authorization: auth.token
          }
        }
      );

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        paymentIntentClientSecret: clientSecret
      });

      if (error) {
        console.error('Init Payment Error:', error);
        Alert.alert('Init Payment Error', error.message);
        return;
      }

      const PaymentResponse = await presentPaymentSheet();

      if (PaymentResponse.error) {
        Alert.alert('Payment Error', PaymentResponse.error.message);
      } else {
        const response = await API.post('api/orders/create-order', { name: fullName,userId:auth.user._id,quantity:cart.qty,amount: cart.netAmount, phone, address, userName: auth.user.userName,products:cart.items }, {
          headers: {
            Authorization: auth.token
          }
        })
        Alert.alert('Payment Successful', response.data.message);
        Navigation.navigate('my-orders')
        dispatch(clearCart());
        
        ModalFlag(false);
        
      }
    } catch (error) {
      console.error('Checkout Error:', error);
      Alert.alert('Checkout Error', 'Something went wrong. Please try again.');
    }
  }

  return (
    <View style={styles.mainView}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.centralView}>
          {/* Close icon */}
          <View style={styles.closeIconContainer}>
            <TouchableOpacity onPress={() => ModalFlag(false)}>
              <AntDesign name='close' color={'#333'} size={wp(8)} />
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={[styles.inputView, nameError && styles.errorInput]}>
              <TextInput
                placeholder='Full Name'
                placeholderTextColor='#999'
                value={fullName}
                onChangeText={setFullName}
                style={styles.textInput}
              />
            </View>
            {nameError && <Text style={styles.errorText}>Name is Required</Text>}

            <View style={[styles.inputView, phoneError && styles.errorInput]}>
              <TextInput
                placeholder='Phone Number'
                placeholderTextColor='#999'
                value={phone}
                onChangeText={setPhone}
                keyboardType='phone-pad'
                style={styles.textInput}
              />
            </View>
            {phoneError && <Text style={styles.errorText}>Phone Number is Required</Text>}

            <View style={[styles.inputView, addressError && styles.errorInput]}>
              <TextInput
                placeholder='Current Address'
                placeholderTextColor='#999'
                value={address}
                onChangeText={setAddress}
                multiline
                style={[styles.textInput, styles.textArea]}
              />
            </View>
            {addressError && <Text style={styles.errorText}>Address is Required</Text>}

            <Text style={styles.paymentMethodText}>Payment Method</Text>
            <View style={styles.inputView}>
              <TextInput
                placeholder='Online Card Payment'
                placeholderTextColor='#999'
                editable={false}
                style={styles.textInput}
              />
            </View>

            <View style={styles.amountView}>
              <Text style={styles.totalAmountHeading}>Total Amount</Text>
              <Text style={styles.amount}>RS : {cart.netAmount}</Text>
            </View>

            <TouchableOpacity onPress={checkout}>
              <View style={styles.btnView}>
                <Text style={styles.btnText}>Checkout</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f4eb'
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: wp(5)
  },
  centralView: {
    backgroundColor: '#fff',
    width: wp(90),
    borderRadius: wp(3),
    padding: wp(4),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation: 5
  },
  closeIconContainer: {
    alignItems: 'flex-end',
    marginBottom: hp(2)
  },
  formContainer: {
    marginTop: hp(1)
  },
  inputView: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(2),
    backgroundColor: '#fff',
    marginBottom: hp(2)
  },
  errorInput: {
    borderColor: 'red'
  },
  textInput: {
    padding: wp(2),
    color: '#333'
  },
  textArea: {
    minHeight: hp(10),
    textAlignVertical: 'top'
  },
  errorText: {
    color: 'red',
    marginBottom: hp(2),
    marginLeft: wp(2)
  },
  paymentMethodText: {
    marginVertical: hp(2),
    fontSize: hp(2),
    color: '#333'
  },
  amountView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    marginBottom: hp(4)
  },
  totalAmountHeading: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#333'
  },
  amount: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#000'
  },
  btnView: {
    backgroundColor: '#007bff',
    paddingVertical: hp(2),
    borderRadius: wp(2),
    alignItems: 'center'
  },
  btnText: {
    fontSize: hp(2.5),
    color: '#fff',
    textTransform: 'uppercase'
  }
});

export default CheckoutModal;
