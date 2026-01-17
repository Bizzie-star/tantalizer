// contexts/OrderContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { orderAPI } from '../api/api';

const OrderContext = createContext({});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (data) => {
    try {
      setLoading(true);
      const response = await orderAPI.createOrder(data);
      setSelectedOrder(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrders();
      setOrders(response.data.results || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (id) => {
    try {
      setLoading(true);
      const response = await orderAPI.getOrder(id);
      setSelectedOrder(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status, adminNotes = '') => {
    try {
      setLoading(true);
      const response = await orderAPI.updateOrderStatus(orderId, status, adminNotes);
      
      // Update in orders list
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status, admin_notes: adminNotes } : order
      ));
      
      // Update selected order if it's the same
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(prev => ({ ...prev, status, admin_notes: adminNotes }));
      }
      
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    orders,
    selectedOrder,
    loading,
    error,
    createOrder,
    getOrders,
    getOrder,
    updateOrderStatus,
    setSelectedOrder,
    setError,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}