import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import GobackNavbar from '../../Components/GobackNavbar';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/Cart/CartSlice';
import Icon from 'react-native-vector-icons/AntDesign';

const ProductDetail = ({ route }) => {
  const dispatch = useDispatch();
  const { title, photo, description, price } = route.params;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...route.params, quantity: 1 }));
  };

  return (
    <View style={styles.mainView}>
      <GobackNavbar />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.photoView}>
            <Image source={{ uri: photo }} style={styles.productPhoto} />
          </View>
          <View style={styles.productDescriptionView}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.priceAndRatingView}>
              <Text style={styles.price}>RS : {price}</Text>
              <View style={styles.reviewCentral}>
                <View style={styles.stars}>
                  <Icon name='star' color='#FFD700' size={hp(2.5)} />
                  <Icon name='star' color='#FFD700' size={hp(2.5)} />
                  <Icon name='star' color='#FFD700' size={hp(2.5)} />
                  <Icon name='star' color='#FFD700' size={hp(2.5)} />
                  <Icon name='star' color='#FFD700' size={hp(2.5)} />
                </View>
                <Text style={styles.reviewsText}>125 Reviews</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleAddToCart} style={styles.btnView}>
              <Text style={styles.btnText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Products /> */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#F4F4F4', // Light background color for a modern look
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: hp(3),
  },
  container: {
    paddingHorizontal: wp(5),
    paddingTop: hp(3),
    alignItems: 'center',
  },
  photoView: {
    marginBottom: hp(3),
  },
  productPhoto: {
    width: wp(90),
    height: hp(40),
    borderRadius: wp(5),
    borderWidth: 1,
    borderColor: '#DDDDDD',
    resizeMode: 'cover',
  },
  productDescriptionView: {
    width: wp(90),
    alignItems: 'center',
  },
  title: {
    fontSize: hp(3.5),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  description: {
    fontSize: hp(2.2),
    color: '#555',
    textAlign: 'center',
    marginBottom: hp(3),
    lineHeight: hp(2.8),
  },
  priceAndRatingView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp(4),
    paddingHorizontal: wp(5),
  },
  price: {
    fontSize: hp(2.8),
    color: '#E91E63',
    fontWeight: '600',
  },
  reviewCentral: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: wp(2),
  },
  reviewsText: {
    fontSize: hp(2),
    color: '#666',
  },
  btnView: {
    backgroundColor: '#E91E63', // Vibrant button color
    borderRadius: wp(3),
    paddingVertical: hp(2),
    paddingHorizontal: wp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  btnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: hp(2.4),
    textTransform: 'uppercase',
  },
});

export default ProductDetail;
