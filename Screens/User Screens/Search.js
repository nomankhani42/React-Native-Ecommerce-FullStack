import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import UserNavbar from '../../Components/UserNavbar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FA from 'react-native-vector-icons/FontAwesome';
import ProductCard from '../../Components/ProductCard';
import { API } from '../../android/API/BaseApi';

const Search = () => {
    const [searchInput, setSearchInput] = useState('');
    const [Products, setProducts] = useState([]);

    const searchFilter = async (e) => {
        setSearchInput(e);
        if (e.length < 3) {
            setProducts([]);
        }
        if (e.length > 2) {
            const res = await API.get(`api/products/get-products-by-search/${e}`);
            if (res.data.success) {
                setProducts(res.data.products);
            }
        }
    };

    return (
        <View style={styles.mainView}>
            <UserNavbar />
            <View style={styles.searchView}>
                <TextInput
                    color='black'
                    placeholderTextColor='gray'
                    onChangeText={(e) => searchFilter(e)}
                    value={searchInput}
                    placeholder='Search Products'
                    style={styles.textInput}
                />
                <FA name='search' size={hp(3)} color='gray' />
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {Products.length ? (
                    <View style={styles.productContainer}>
                        {Products.map((item) => (
                            <ProductCard key={item._id} item={item} />
                        ))}
                    </View>
                ) : (
                    <View style={styles.noProductContainer}>
                        <Text style={styles.noProductText}>No Product Found</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#f8f9fa', // Light grey background
    },
    searchView: {
        marginHorizontal: wp(5),
        marginVertical: hp(2),
        borderRadius: wp(2),
        paddingHorizontal: wp(3),
        borderColor: '#ced4da',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    textInput: {
        flex: 1,
        fontSize: hp(2),
        color: 'black',
        paddingVertical: hp(1),
    },
    scrollView: {
        paddingBottom: hp(2),
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: wp(2),
        marginTop: hp(2),
    },
    noProductContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp(70),
    },
    noProductText: {
        fontSize: hp(2.5),
        color: 'gray',
        fontWeight: '500',
    },
});

export default Search;
