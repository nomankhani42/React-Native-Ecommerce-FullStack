import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AdminNavbar = ({ title }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.iconContainer}>
                <Icon name='dots-grid' color='white' size={hp(5)} />
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#003366', // Dark blue color
        paddingHorizontal: wp(4),
        paddingVertical: hp(1.5),
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#004080', // Slightly lighter blue for the border
        elevation: 4, // Add shadow for Android
        shadowColor: '#000', // iOS shadow color
        shadowOffset: { width: 0, height: 2 }, // iOS shadow offset
        shadowOpacity: 0.3, // iOS shadow opacity
        shadowRadius: 3, // iOS shadow radius
    },
    iconContainer: {
        padding: wp(1),
        borderRadius: wp(2),
        backgroundColor: '#004080', // Slightly lighter blue for the button background
    },
    title: {
        fontSize: hp(3),
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginLeft: wp(2),
        flex: 1,
        textAlign: 'center',
    },
});

export default AdminNavbar;
