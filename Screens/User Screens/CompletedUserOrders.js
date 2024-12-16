import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper'; // Adding React Native Paper for better UI components
import { API } from '../../android/API/BaseApi'; // Ensure this is correctly pointing to your API base
import { useSelector } from 'react-redux';

const CompletedUserOrders = () => {
  const navigation = useNavigation();
  
  // State for orders, loading status, and refreshing status
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const Auth = useSelector(state => state.Auth);

  // Fetch user's completed orders
  const getCompletedOrders = useCallback(async () => {
    setLoading(true);
    try {
      // Adjust API endpoint to fetch only completed orders
      const res = await API.get(`api/orders/get-user-completed-orders/${Auth.user._id}`); 
      if (res.data.success) {
        // The API should already return only completed orders, so no additional filtering needed
        setOrders(res.data.userOrders);
      } else {
        console.error('Failed to fetch orders:', res.data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [Auth.user._id]);

  // Handle refreshing
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getCompletedOrders();
    setRefreshing(false);
  }, [getCompletedOrders]);

  useEffect(() => {
    getCompletedOrders();
  }, [getCompletedOrders]);

  const handleOrderPress = (orderId) => {
    navigation.navigate('user-order-detail', { orderId });
  };

  // Function to truncate the order ID to 6 characters
  const truncateOrderId = (id) => {
    const maxLength = 6; // Maximum length for the display
    return id.length > maxLength ? id.substring(0, maxLength) + '...' : id;
  };

  const renderItem = ({ item }) => {
    const amount = typeof item.amount === 'number' ? item.amount : 0;

    return (
      <TouchableOpacity 
        style={styles.orderItem}
        onPress={() => handleOrderPress(item._id)}
      >
        <Card style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.text, styles.cell]}>{truncateOrderId(item._id)}</Text>
            <Text style={[styles.text, styles.cell]}>{item.orderStatus}</Text>
            <Text style={[styles.text, styles.cell]}>{item.quantity}</Text>
            <Text style={[styles.text, styles.cell]}>RS {amount}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <Card style={styles.headerCard}>
      <View style={styles.row}>
        <Text style={[styles.headerText, styles.cell]}>Order ID</Text>
        <Text style={[styles.headerText, styles.cell]}>Status</Text>
        <Text style={[styles.headerText, styles.cell]}>Qty</Text>
        <Text style={[styles.headerText, styles.cell]}>Amount</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Completed Orders</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : orders.length === 0 ? (
        <View style={styles.noOrdersContainer}>
          <Text style={styles.noOrdersText}>You have no completed orders.</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListHeaderComponent={renderHeader}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  list: {
    paddingHorizontal: 16,
  },
  orderItem: {
    marginBottom: 12,
  },
  card: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  headerCard: {
    borderRadius: 10,
    elevation: 2,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 4,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
  },
  loader: {
    marginVertical: 20,
  },
  noOrdersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  noOrdersText: {
    fontSize: 18,
    color: '#666',
  },
});

export default CompletedUserOrders;
