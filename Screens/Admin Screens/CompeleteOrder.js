import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper'; // Using React Native Paper for better UI components
import AdminNavbar from '../../Components/AdminNavbar';
import { API } from '../../android/API/BaseApi';

const CompletedOrders = () => {
  const navigation = useNavigation();

  // State for completed orders, loading status, and refreshing status
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch all completed orders
  const getCompletedOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.get('api/orders/get-completed-orders');
      if (res.data.success) {
        setCompletedOrders(res.data.response);
      } else {
        console.error('Failed to fetch completed orders:', res.data.message);
      }
    } catch (error) {
      console.error('Error fetching completed orders:', error);
    } finally {
      setLoading(false);
    }
  }, []);

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
    navigation.navigate('order-manage-Screen', { orderId });
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
            <Text style={[styles.text, styles.cell]}>
              {item.name.length > 6 ? item.name.substring(0, 6) + '...' : item.name}
            </Text>
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
        <Text style={[styles.headerText, styles.cell]}>Name</Text>
        <Text style={[styles.headerText, styles.cell]}>Status</Text>
        <Text style={[styles.headerText, styles.cell]}>Qty</Text>
        <Text style={[styles.headerText, styles.cell]}>Amount</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <AdminNavbar />
      <Text style={styles.heading}>Completed Orders</Text>
      <View style={styles.refreshContainer}>
        <TouchableOpacity onPress={getCompletedOrders} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Refresh</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
      ) : (
        <FlatList
          data={completedOrders}
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
  refreshContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  refreshButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  loader: {
    marginVertical: 20,
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
});

export default CompletedOrders;
