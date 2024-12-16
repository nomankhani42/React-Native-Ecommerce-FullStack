import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import UserNavbar from '../../Components/UserNavbar';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Antd from 'react-native-vector-icons/AntDesign';
import { logoutSuccess } from '../../Redux/AuthSlice/AuthSlice';
import { useNavigation } from '@react-navigation/native';

const UserProfile = () => {
  const auth = useSelector(state => state.Auth);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const logoutHandle = () => {
    dispatch(logoutSuccess());
    
  };

  return (
    <View style={styles.container}>
      <UserNavbar />
      <View style={styles.profileSection}>
        <Image
          style={styles.profilePhoto}
          source={{ uri: auth.user.photo ? auth.user.photo : 'https://img.icons8.com/material/344/user-male-circle--v1.png' }}
        />
        <Text style={styles.profileName}>{auth.user.name}</Text>
      </View>
      <View style={styles.navSection}>
        <TouchableOpacity style={styles.navTab} onPress={() => navigation.navigate('Manage-Profile')}>
          <Text style={styles.navText}>Manage Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab} onPress={() => navigation.navigate('my-orders')}>
          <Text style={styles.navText}>My Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navTab} onPress={() => navigation.navigate('my-completed-orders')}>
          <Text style={styles.navText}>Completed Orders</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logoutHandle}>
        <Text style={styles.logoutText}>Logout</Text>
        <Antd name='logout' color='#fff' size={hp(2.5)} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: hp(5),
  },
  profilePhoto: {
    height: hp(20),
    width: hp(20),
    borderRadius: hp(10),
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: hp(2),
  },
  profileName: {
    fontSize: hp(3),
    fontWeight: '700',
    color: '#333',
    textTransform: 'uppercase',
  },
  navSection: {
    marginHorizontal: wp(5),
    marginVertical: hp(2),
  },
  navTab: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: hp(1),
    backgroundColor: '#fff',
    borderRadius: wp(1),
    elevation: 1, // Adds shadow for Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 1 }, // iOS shadow offset
    shadowOpacity: 0.1, // iOS shadow opacity
    shadowRadius: 3, // iOS shadow radius
  },
  navText: {
    fontSize: hp(2.2),
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f44336',
    paddingVertical: hp(2),
    marginHorizontal: wp(5),
    marginVertical: hp(4),
    borderRadius: wp(2),
    elevation: 3, // Adds shadow for Android
    shadowColor: '#000', // iOS shadow color
    shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
    shadowOpacity: 0.2, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
  },
  logoutText: {
    fontSize: hp(2.2),
    color: '#fff',
    marginRight: wp(2),
    fontWeight: 'bold',
  },
});

export default UserProfile;
