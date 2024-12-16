import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const UserNavbar = () => {
  const navigation = useNavigation();
  const cart = useSelector(state => state.MyCart);
  const Auth = useSelector(state => state.Auth);

  return (
    <View style={styles.navbarView}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={{
            uri: Auth.user.photo
              ? Auth.user.photo
              : 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png',
          }}
        />
      </View>

      <View style={styles.cartView}>
        <TouchableOpacity onPress={() => navigation.navigate('cart')}>
          <View style={styles.iconContainer}>
            <Icon name='shoppingcart' size={hp(5.5)} color='#fff' />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.qty || 0}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
    backgroundColor: '#003366', // Darker blue for a modern look
    elevation: 4, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  profileImage: {
    height: hp(6),
    width: hp(6),
    borderRadius: hp(3),
    borderWidth: 2,
    borderColor: '#fff', // White border to make the image stand out
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cartView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -hp(1.5),
    right: -wp(2),
    backgroundColor: '#f00', // Red badge
    width: wp(5),
    height: hp(2.5),
    borderRadius: wp(2.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp(1.6),
  },
});

export default UserNavbar;
