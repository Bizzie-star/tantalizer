import React, { createContext, useState, useContext } from 'react';
import { orderAPI, paymentAPI } from '../api/api'; 

const OrderContext = createContext({});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- USER ACTIONS ---

  const createOrder = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderAPI.createOrder(data);
      // Don't add to list immediately as the user might be redirected to payment
      setSelectedOrder(response.data.order); 
      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.error || 'Failed to create order';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // Get User's Own Orders
  const getMyOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getMyOrders();
      setOrders(response.data.results || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError('Failed to fetch orders');
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
      setError('Failed to fetch order details');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const cancelOrder = async (id) => {
    setError(null);
    setLoading(true);

    try {
      const response = await orderAPI.cancelOrder(id);
      const updatedOrder = response.data.order;
      
      setOrders(prev => prev.map(order => 
        order.id === id ? updatedOrder : order
      ));
      
      if (selectedOrder?.id === id) {
        setSelectedOrder(updatedOrder);
      }

      return { success: true, message: response.data.message };

      } catch (err) {
        console.error("Cancel Error:", err);
        const msg = err.response?.data?.error || 'Failed to cancel order';
        setError(msg);
        return { success: false, error: msg };
      } finally {
        setLoading(false);
      }
  };

  // FIX 2: Use paymentAPI.initialize instead of orderAPI
  const initiatePayment = async (orderId) => {
    try {
      setLoading(true);
      // Call the new Payment endpoint
      const response = await paymentAPI.initialize(orderId);
      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.error || 'Payment initialization failed';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  // --- ADMIN ACTIONS ---

  // Get ALL Orders (Admin Dashboard)
  const getAllOrders = async () => {
    try {
      setLoading(true);
      const response = await orderAPI.getAllOrders();
      setOrders(response.data.results || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError('Failed to fetch admin orders');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status, adminNotes = '') => {
    try {
      setLoading(true);
      const response = await orderAPI.updateStatus(orderId, status, adminNotes);
      const updatedOrder = response.data.order || response.data;

      // Update in orders list
      setOrders(prev => prev.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      // Update selected order if it's the same
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updatedOrder);
      }
      
      return { success: true, data: updatedOrder };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getStats = async () => {
    try {
      const response = await orderAPI.getStats();
      setStats(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Failed to fetch stats", err);
      return { success: false };
    }
  };

  const value = {
    orders,
    selectedOrder,
    stats,
    loading,
    error,
    createOrder,
    getMyOrders,   // User
    getAllOrders,  // Admin
    getOrder,
    cancelOrder,
    initiatePayment,
    updateOrderStatus,
    getStats,
    setSelectedOrder,
    setError,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
}