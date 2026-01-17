// contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../api/api';
import { useAuth } from './AuthContext'; // Import useAuth

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  // Get auth status
  const { user, loading: authLoading } = useAuth();

  // Watch for Auth changes to fetch/clear cart
  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchCart();
      } else {
        setCart([]); // Clear cart state on logout
        setTotal(0);
      }
    }
  }, [user, authLoading]);

  // Calculate total whenever cart items change
  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const fetchCart = async () => {
    // Prevent fetching if we don't have a token to avoid 401 loops
    if (!localStorage.getItem('access_token')) return;

    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      // Ensure we target response.data.items based on your Django Serializer
      setCart(response.data.items || []);
    } catch (err) {
      // Only set error if it's not an auth error (interceptor handles auth)
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Failed to fetch cart');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    const totalAmount = cart.reduce((sum, item) => {
      // Use unit_price from your CartItemSerializer
      return sum + (Number(item.unit_price) * item.quantity);
    }, 0);
    setTotal(totalAmount);
  };

  const addToCart = async (foodId, quantity = 1) => {
    try {
      setLoading(true);
      const response = await cartAPI.addToCart(foodId, quantity);
      // Refresh the whole cart after adding to stay in sync with backend
      await fetchCart(); 
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your methods (updateCartItem, removeCartItem) should call fetchCart() 
  // after completion to ensure frontend matches backend totals exactly.

  const value = {
    cart,
    loading,
    error,
    total,
    addToCart,
    fetchCart,
    getCartItemCount: () => cart.reduce((count, item) => count + item.quantity, 0),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}