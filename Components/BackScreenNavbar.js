import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Antd from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

const BackScreenNavbar = ({ title }) => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      colors={['#004d99', '#0066cc']} // Gradient colors
      style={styles.mainView}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconContainer}>
        <Antd color='#fff' size={hp(3)} name='arrowleft' />
      </TouchableOpacity>
      <Text style={styles.headingNav}>{title}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderBottomWidth: 1,
    borderBottomColor: '#003d66',
  },
  iconContainer: {
    padding: hp(0.5),
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent white background
    marginRight: wp(2),
  },
  headingNav: {
    color: '#fff',
    fontSize: hp(2.5),
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Allows the text to take up remaining space
    textTransform: 'uppercase',
  },
});

export default BackScreenNavbar;
