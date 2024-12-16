import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import { API } from '../android/API/BaseApi';

const CategoriesList = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const res = await API.get('api/category/get-categories');
        if (res.data.success) {
            setCategories(res.data.categories);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('filter-category', { ...item })}>
            <View style={{ marginHorizontal: wp(5), marginTop: hp(2), alignItems: 'center' }}>
                <Image
                    style={{ height: hp(8), width: wp(16), borderRadius: wp(8) }}
                    source={{ uri: item.photo }}
                />
                <Text>{item.category}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={categories}
            renderItem={renderItem}
            keyExtractor={(item) => item._id} // Assuming each item has a unique `id` field
            horizontal
            showsHorizontalScrollIndicator={false}
        />
    );
};

export default CategoriesList;
