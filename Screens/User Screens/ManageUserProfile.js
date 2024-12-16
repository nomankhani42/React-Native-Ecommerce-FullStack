import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, StyleSheet, ScrollView } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { API } from '../../android/API/BaseApi';
import { updateProfile } from '../../Redux/AuthSlice/AuthSlice';
import BackScreenNavbar from '../../Components/BackScreenNavbar';
import ImageCropPicker from 'react-native-image-crop-picker';

const ManageUserProfile = () => {
    const auth = useSelector(state => state.Auth);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [name, setName] = useState(auth.user.name);
    const [userName, setUserName] = useState(auth.user.userName);
    const [country, setCountry] = useState(auth.user.country);
    const [photo, setPhoto] = useState(auth.user.photo);

    const openGallery = async () => {
        try {
            const image = await ImageCropPicker.openPicker({
                width: 400,
                height: 400,
                includeBase64: true,
                cropping: true,
            });
            const data = `data:${image.mime};base64,${image.data}`;
            setPhoto(data);
        } catch (error) {
            console.error('Image selection error:', error);
        }
    };

    const updateUser = async () => {
        try {
            const res = await API.put(`api/update-user/${auth.user._id}`, { name, userName, country, photo }, {
                headers: {
                    "authorization": auth.token,
                },
            });

            if (res.data.success) {
                console.log('Update successful');
                dispatch(updateProfile(res.data.user));
                navigation.goBack(); // Optional: navigate back after update
            } else {
                console.log('Update failed');
            }
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <BackScreenNavbar title="Profile" />
            <View style={styles.userMainView}>
                <TouchableOpacity onPress={openGallery}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.userImage}
                            source={{ uri: photo || 'https://img.icons8.com/material/344/user-male-circle--v1.png' }}
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        value={userName}
                        placeholder="Username"
                        editable={false}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        placeholder="User"
                        editable={false}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        value={country}
                        onChangeText={setCountry}
                        placeholder="Country"
                    />
                </View>
                <TouchableOpacity onPress={updateUser}>
                    <View style={styles.updateButton}>
                        <Text style={styles.updateButtonText}>Update Profile</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    userMainView: {
        paddingHorizontal: wp(5),
        paddingVertical: hp(5),
        backgroundColor: '#ffffff',
        borderRadius: wp(2),
        margin: wp(4),
        elevation: 2, // Adds a shadow effect for Android
        shadowColor: '#000', // iOS shadow color
        shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
        shadowOpacity: 0.1, // iOS shadow opacity
        shadowRadius: 5, // iOS shadow radius
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: hp(3),
    },
    userImage: {
        height: hp(15),
        width: hp(15),
        borderRadius: hp(7.5),
        borderWidth: 1,
        borderColor: '#ddd',
    },
    inputGroup: {
        marginVertical: hp(1),
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: wp(1),
        paddingHorizontal: wp(3),
        paddingVertical: hp(1),
        backgroundColor: '#ffffff',
    },
    updateButton: {
        backgroundColor: '#4caf50',
        paddingVertical: hp(1.5),
        borderRadius: wp(2),
        alignItems: 'center',
        marginTop: hp(2),
    },
    updateButtonText: {
        color: '#ffffff',
        fontSize: hp(2),
        fontWeight: 'bold',
    },
});

export default ManageUserProfile;
