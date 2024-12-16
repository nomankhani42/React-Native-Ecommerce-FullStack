import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import FA from 'react-native-vector-icons/FontAwesome';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/Cart/CartSlice.js";

const ProductCard = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  return (
    <TouchableOpacity 
      onPress={() => navigation.navigate('product-detail', { ...item })}
      style={styles.cardContainer}
    >
      <View style={styles.cardView}>
        <Image style={styles.productCardPhoto} source={{ uri: item.photo }} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.bottomSection}>
          <Text style={styles.productPrice}>RS : {item.price}</Text>
          <TouchableOpacity onPress={handleAddToCart}>
            <FA color='#FF6F61' size={hp(3)} name='cart-plus' />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: wp(42),
    margin: wp(2),
    borderRadius: wp(3),
    overflow: 'hidden',
    elevation: 5, // Add shadow for elevation on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 4 }, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 10, // Shadow blur radius for iOS
  },
  cardView: {
    backgroundColor: '#fff',
    borderRadius: wp(3),
    padding: wp(2),
    height: hp(35),
    justifyContent: 'space-between',
  },
  productCardPhoto: {
    height: hp(20),
    width: wp(40),
    borderRadius: wp(3),
    resizeMode: 'cover', // Ensures image covers the container without stretching
    marginBottom: hp(1),
  },
  productTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: hp(1),
  },
  bottomSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: hp(2.2),
    color: '#FF6F61',
    fontWeight: '600',
  },
});

export default ProductCard;
