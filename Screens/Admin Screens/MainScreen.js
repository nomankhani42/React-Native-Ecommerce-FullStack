import { View, Text, Button, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminNavbar from '../../Components/AdminNavbar';
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImageCropPicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API } from '../../android/API/BaseApi';

const MainScreen = () => {
    const Navigation = useNavigation();
    const auth = useSelector(state => state.Auth);

    const [id, setId] = useState('');
    const [name, setName] = useState('Name');
    const [userName, setUserName] = useState('User Name');
    const [country, setCountry] = useState('Country');
    const [photo, setPhoto] = useState('');

    const openGallery = async () => {
        ImageCropPicker.openPicker({
            width: 400,
            height: 400,
            includeBase64: true,
            cropping: true
        }).then(image => {
            const data = `data:${image.mime};base64,${image.data}`;
            setPhoto(data);
        });
    }

    const getAdminData = async () => {
        try {
            const res = await API.get('api/auth-check', {
                headers: {
                    "authorization": auth.token
                }
            });
            if (res.data.success) {
                setName(res.data.user.name);
                setUserName(res.data.user.userName);
                setCountry(res.data.user.country);
                setPhoto(res.data.user.photo);
                setId(res.data.user._id);
            }
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    }

    const update_user = async () => {
        try {
            const res = await API.put(`api/update-user/${id}`, { name, userName, country, photo }, {
                headers: {
                    "authorization": auth.token
                }
            });
            if (res.data.success) {
                // Update profile in Redux store
                dispatch(updateProfile(res.data.user));
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    }

    useEffect(() => {
        getAdminData();
    }, []);

    return (
        <View style={styles.container}>
            <AdminNavbar title={'Profile'} />
            <View style={styles.userMainView}>
                <TouchableOpacity onPress={openGallery} style={styles.imageContainer}>
                    <Image 
                        style={styles.userImage} 
                        source={{ uri: photo || 'https://img.icons8.com/material/344/user-male-circle--v1.png' }} 
                    />
                </TouchableOpacity>
                <View style={styles.inputView}>
                    <TextInput 
                        value={name} 
                        onChangeText={setName} 
                        placeholder='Name'  
                        style={styles.textInput}
                        placeholderTextColor='gray' 
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        value={userName} 
                        placeholder='User Name' 
                        style={styles.textInput}
                        placeholderTextColor='gray' 
                        editable={false} 
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        value='Admin' 
                        placeholder='Role' 
                        style={styles.textInput}
                        placeholderTextColor='gray' 
                        editable={false} 
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput 
                        value={country} 
                        onChangeText={setCountry} 
                        placeholder='Country' 
                        style={styles.textInput}
                        placeholderTextColor='gray' 
                    />
                </View>
                <TouchableOpacity onPress={update_user} style={styles.updateButton}>
                    <Text style={styles.updateButtonText}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    userMainView: {
        paddingHorizontal: wp(5),
        paddingVertical: hp(5),
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: hp(2),
    },
    userImage: {
        height: hp(15),
        width: wp(30),
        borderRadius: wp(15),
        borderWidth: 2,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    inputView: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: wp(2),
        marginVertical: hp(1),
        paddingHorizontal: wp(3),
        paddingVertical: hp(1),
        elevation: 1,
    },
    textInput: {
        fontSize: hp(2),
        color: '#333',
    },
    updateButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: hp(1.5),
        borderRadius: wp(2),
        alignItems: 'center',
        marginTop: hp(2),
    },
    updateButtonText: {
        fontSize: hp(2.2),
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
    }
});

export default MainScreen;
