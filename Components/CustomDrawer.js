import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Antd from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../Redux/AuthSlice/AuthSlice';

const CustomDrawer = (props) => {
  const auth = useSelector(state => state.Auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logoutHandle = async () => {
    dispatch(logoutSuccess());
    await AsyncStorage.removeItem('token'); // Optionally clear token from AsyncStorage
    navigation.navigate('login');
  };

  return (
    <DrawerContentScrollView style={styles.container} {...props}>
      <View style={styles.userInfoContainer}>
        <Image
          style={styles.userPhoto}
          source={{ uri: auth.user.photo || 'https://img.icons8.com/material/344/user-male-circle--v1.png' }}
        />
        <Text style={styles.userName}>{auth.user.name}</Text>
        <Text style={styles.userUserName}>{auth.user.userName}</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={logoutHandle}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
            <Antd name='logout' color='#fff' size={hp(2.5)} />
          </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  userInfoContainer: {
    backgroundColor: '#ffffff',
    marginTop: 0,
    marginBottom: hp(3),
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    elevation: 1, // Adds shadow for Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.1, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
  },
  userPhoto: {
    height: hp(15),
    width: hp(15),
    borderRadius: hp(7.5),
    marginBottom: hp(1),
    borderWidth: 2,
    borderColor: '#ddd',
  },
  userName: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#333',
  },
  userUserName: {
    fontSize: hp(2),
    color: '#666',
  },
  logoutContainer: {
    marginTop: hp(5),
    marginHorizontal: wp(5),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f44336',
    paddingVertical: hp(2),
    borderRadius: wp(2),
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 3 }, // iOS shadow offset
    shadowOpacity: 0.2, // iOS shadow opacity
    shadowRadius: 5, // iOS shadow radius
  },
  logoutText: {
    fontSize: hp(2.2),
    color: '#fff',
    marginRight: wp(2),
    fontWeight: 'bold',
  },
});

export default CustomDrawer;
