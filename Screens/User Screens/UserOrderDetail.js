import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native';
import { API } from '../../android/API/BaseApi';
import { useSelector } from 'react-redux';

const UserOrderDetail = ({ route }) => {
    const { orderId } = route.params;
    const [loader, setLoader] = useState(true);
    const [orderData, setOrderData] = useState({});
    
    const Auth = useSelector(state => state.Auth);

    const getOrderData = async () => {
        try {
            const response = await API.get(`api/orders/get-single-order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${Auth.token}`
                }
            });
            if (response.data.success) {
                setOrderData(response.data.singleOrder);
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
                    <View style={styles.orderInfo}>
                        <Text style={styles.title}>Order ID: {orderData._id}</Text>
                        <Text style={styles.orderDetailText}>User: {orderData.name}</Text>
                        <Text style={styles.orderDetailText}>Address: {orderData.address}</Text>
                        <Text style={styles.orderDetailText}>Phone: {orderData.phone}</Text>
                        <Text style={styles.orderDetailText}>Status: {orderData.orderStatus}</Text>
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
        backgroundColor: '#F8F9FA', // Light gray background for users
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
    },
    orderInfo: {
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
        fontSize: 16,
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
    orderDetailText: {
        fontSize: 16,
        marginBottom: 4,
    },
});

export default UserOrderDetail;
