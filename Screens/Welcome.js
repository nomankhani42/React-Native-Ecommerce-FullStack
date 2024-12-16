import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Animated, { FadeInUp, FadeInDown, SlideInUp } from 'react-native-reanimated';

const Welcome = () => {
  const navigation = useNavigation();
  const auth = useSelector((state) => state.Auth);

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
        <Animated.Image
          entering={SlideInUp.delay(300).duration(1000).springify()}
          style={styles.headImg}
          source={{
            uri: 'https://png.pngtree.com/png-clipart/20200410/ourmid/pngtree-online-shopping-e-commerce-with-cellphone-png-image_2179100.jpg',
          }}
        />
        <Animated.Text
          entering={FadeInUp.delay(500).duration(800)}
          style={styles.heading}
        >
          Welcome to Sasta Bazar
        </Animated.Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(auth.isAuthenticated ? 'home' : 'login')}
          style={styles.button}
        >
          <Animated.Text
            entering={FadeInDown.delay(600).duration(800)}
            style={styles.buttonText}
          >
            Start Shopping
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
  },
  mainView: {
    alignItems: 'center',
    paddingHorizontal: wp(6),
  },
  headImg: {
    height: hp(40),
    width: wp(80),
    borderRadius: wp(4),
    marginBottom: hp(2),
    resizeMode: 'cover',
  },
  heading: {
    fontSize: hp(3),
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp(4),
  },
  button: {
    backgroundColor: '#dc3545',
    width: wp(80),
    paddingVertical: hp(2),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: hp(2.5),
    fontWeight: '600',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
});

export default Welcome;
