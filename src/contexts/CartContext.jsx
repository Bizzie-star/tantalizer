// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI } from '../api/api';
import { useAuth } from './AuthContext';

const CartContext = createContext({});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [cart, setCart] = useState(null);
  const [items, setItems] = useState([]);
  const [cartTotal, setCartTotal] = useState({ subtotal: 0, total: 0, count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      getCart();
    } else {
      setCart(null);
      setItems([]);
      setCartTotal({ subtotal: 0, total: 0, count: 0 });
    }
  }, [user]);

  // --- SMART MERGE HELPER (THE FIX) ---
  const mergeCartItems = (oldItems, newItems) => {
    if (!newItems) return [];
    
    return newItems.map(newItem => {
        const oldItem = oldItems.find(i => i.id === newItem.id);
        
        // CHECK: Is the new 'food' field a full object (with image/name) or just an ID?
        const isRichData = newItem.food && typeof newItem.food === 'object';

        return {
            ...newItem,
            // If server sent full data, use it. If server sent just an ID, keep our old rich data.
            food: isRichData ? newItem.food : (oldItem?.food || newItem.food),
            
            // Fallbacks for flat structures if your API uses them
            food_image: newItem.food_image || oldItem?.food_image,
            food_name: newItem.food_name || oldItem?.food_name,
            food_price: newItem.food_price || oldItem?.food_price
        };
    });
  };

  // --- ACTIONS ---

  const getCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      const cartData = response.data;
      
      setCart(cartData);
      setItems(cartData.items || []); 
      setCartTotal({
        subtotal: parseFloat(cartData.subtotal),
        total: parseFloat(cartData.total),
        count: cartData.total_items
      });
      
      return { success: true, data: cartData };
    } catch (err) {
      if (err.response && err.response.status === 404) {
          setItems([]);
          return { success: true, data: [] };
      }
      console.error("Cart fetch error:", err);
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (foodId, quantity = 1, notes = "", variant = "", addons = []) => {
    try {
      // No global loading here to prevent flashing
      const payload = {
        food_id: foodId,
        quantity,
        notes,
        selected_variant: variant,
        selected_addons: addons
      };
      
      const response = await cartAPI.addToCart(payload);
      const updatedCart = response.data.cart;
      
      setCart(updatedCart);
      // Use Smart Merge
      setItems(prev => mergeCartItems(prev, updatedCart.items));
      
      setCartTotal({
        subtotal: parseFloat(updatedCart.subtotal),
        total: parseFloat(updatedCart.total),
        count: updatedCart.total_items
      });

      return { success: true, message: response.data.message };
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add item to cart';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    // 1. Snapshot previous state
    const previousItems = [...items];

    // 2. Optimistic Update (Instant UI feedback)
    setItems(currentItems => 
        currentItems.map(item => 
            item.id === itemId ? { ...item, quantity: parseInt(quantity) } : item
        )
    );

    try {
      // 3. API Call
      const response = await cartAPI.updateCartItem(itemId, quantity);
      const updatedCart = response.data.cart;
      
      // 4. Smart Merge (This prevents the image form disappearing)
      setCart(updatedCart);
      setItems(prev => mergeCartItems(prev, updatedCart.items));
      
      setCartTotal({
        subtotal: parseFloat(updatedCart.subtotal),
        total: parseFloat(updatedCart.total),
        count: updatedCart.total_items
      });

      return { success: true, message: 'Cart updated' };
    } catch (err) {
      // 5. Rollback on error
      setItems(previousItems);
      setError('Failed to update item');
      return { success: false };
    }
  };

  const removeCartItem = async (itemId) => {
    const previousItems = [...items];

    // Optimistic Remove
    setItems(currentItems => currentItems.filter(item => item.id !== itemId));

    try {
      const response = await cartAPI.removeCartItem(itemId);
      const updatedCart = response.data.cart;
      
      setCart(updatedCart);
      setItems(prev => mergeCartItems(prev, updatedCart.items));
      
      setCartTotal({
        subtotal: parseFloat(updatedCart.subtotal),
        total: parseFloat(updatedCart.total),
        count: updatedCart.total_items
      });

      return { success: true, message: 'Item removed' };
    } catch (err) {
      setItems(previousItems);
      setError('Failed to remove item');
      return { success: false };
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      await cartAPI.clearCart();
      
      setCart(null);
      setItems([]);
      setCartTotal({ subtotal: 0, total: 0, count: 0 });
      
      return { success: true };
    } catch (err) {
      setError('Failed to clear cart');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const saveCartForLater = async (name) => {
    try {
        setLoading(true);
        // await cartAPI.saveCart({ name }); 
        return { success: true };
    } catch (err) {
        return { success: false, error: err.message };
    } finally {
        setLoading(false);
    }
  }

  const value = {
    cart,
    cartItems: items, // Expose as cartItems for Header.js
    items,            // Expose as items for Cart.js
    cartTotal,
    loading,
    error,
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    saveCartForLater
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};