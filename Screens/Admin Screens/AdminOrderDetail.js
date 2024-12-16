import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { API } from '../../android/API/BaseApi';
import { Dropdown } from 'react-native-element-dropdown';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';

const AdminOrderDetail = ({ route }) => {
    const auth=useSelector(state=>state.Auth)
    const { orderId } = route.params;
    const [loader, setLoader] = useState(true);
    const [orderData, setOrderData] = useState({});
    const [value, setValue] = useState(orderData.orderStatus);

    const statusOptions = [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' }
    ];

    const updateOrderStatus=async(value)=>{
        setValue(value)
        const response=await API.put(`api/orders/update-order-status/${orderData._id}`,{orderStatus:value},
            {
                headers:{
                    Authorization:auth.token
                }
            }
        )

        if(response.data.success){
            getOrderData();
            
        }
    }

    const getOrderData = async () => {
        try {
            const response = await API.get(`api/orders/get-single-order/${orderId}`);
            if (response.data.success) {
                setOrderData(response.data.singleOrder);
                setValue(response.data.singleOrder.orderStatus);
            }
        } catch (error) {
            console.error("Failed to fetch order data", error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        getOrderData();
    }, []);

    const renderProductItem = ({ item }) => (
        <View style={styles.productItem}>
            <Image source={{ uri: item.photo }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productDetailsText}>Quantity: {item.quantity}</Text>
                <Text style={styles.productDetailsText}>Price: RS {item.price}</Text>
            </View>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            {loader ? (
                <View style={styles.loader}>
                    <ActivityIndicator size="large" color="blue" />
                </View>
            ) : (
                <View style={styles.content}>
                    <View style={styles.userInfo}>
                        <Text style={styles.title}>User Information</Text>
                        <Text>Name: {orderData.name}</Text>
                        <Text>Address: {orderData.address}</Text>
                        <Text>Phone: {orderData.phone}</Text>
                    </View>

                    <View style={styles.statusSection}>
                        <Text style={styles.title}>Order Status</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={statusOptions}
                            labelField="label"
                            valueField="value"
                            placeholder="Pending"
                            value={value}
                            onChange={item => updateOrderStatus(item.value)}
                        />
                    </View>

                  

                    <View style={styles.orderDetails}>
                        <Text style={styles.productsTitle}>Ordered Products</Text>
                        <FlatList
                            data={orderData.products}
                            renderItem={renderProductItem}
                            keyExtractor={item => item.id}
                        />
                        <View style={styles.summary}>
                            <Text style={styles.summaryText}>Total Amount: RS {Number(orderData.amount)}</Text>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e9ecef', // Light gray background
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    userInfo: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    statusSection: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    paymentStatus: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    orderDetails: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 16,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 16,
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productDetailsText: {
        color: '#666',
    },
    summary: {
        marginTop: 16,
        padding: 8,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    summaryText: {
        fontWeight: 'bold',
    },
    dropdown: {
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#007bff', // Blue color for titles
    },
    productsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#28a745', // Green color for products title
    },
    paymentStatusText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AdminOrderDetail;
