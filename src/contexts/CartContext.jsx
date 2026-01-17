// contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../api/api';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCart(response.data.items || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const totalAmount = cart.reduce((sum, item) => {
      return sum + (item.food.price * item.quantity);
    }, 0);
    setTotal(totalAmount);
  };

  const addToCart = async (foodId, quantity = 1) => {
    try {
      setLoading(true);
      const response = await cartAPI.addToCart(foodId, quantity);
      setCart(response.data.items || []);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add to cart');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true);
      const response = await cartAPI.updateCartItem(itemId, quantity);
      setCart(response.data.items || []);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update cart');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (itemId) => {
    try {
      setLoading(true);
      const response = await cartAPI.removeCartItem(itemId);
      setCart(response.data.items || []);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartAPI.clearCart();
      setCart([]);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to clear cart');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    loading,
    error,
    total,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    fetchCart,
    getCartItemCount,
    setError,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}