// src/contexts/MenuContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { menuAPI } from '../api/api'; // Ensure this path points to your api.js

const MenuContext = createContext({});

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  // Global State
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filtering State
  const [filters, setFilters] = useState({
    category: '',
    search: '',
  });

  // --- 1. PUBLIC ACTIONS (For Customers) ---

  const getFoods = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      // Merge context filters with any direct params
      const queryParams = { ...filters, ...params };
      const response = await menuAPI.getFoods(queryParams);
      
      // Handle Django's pagination structure vs flat list
      setFoods(response.data.results || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Get Foods Error:", err);
      const msg = err.response?.data?.message || 'Failed to fetch foods';
      setError(msg);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      // We don't trigger global 'loading' here to avoid full-page spinners for just categories
      const response = await menuAPI.getCategories();
      setCategories(response.data.results || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Get Categories Error:", err);
      return { success: false, error: err.message };
    }
  };

  const getFoodById = async (id) => {
    try {
      setLoading(true);
      const response = await menuAPI.getFoodById(id);
      setSelectedFood(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError('Failed to fetch food details');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // --- 2. ADMIN ACTIONS (For Dashboard) ---

  const getAdminFoods = async () => {
    try {
      setLoading(true);
      // Fetches ALL items (including hidden/unavailable ones)
      const response = await menuAPI.getAdminFoods();
      setFoods(response.data.results || response.data);
      return { success: true };
    } catch (err) {
      console.error("Admin Fetch Error:", err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const addFood = async (formData) => {
    try {
      setLoading(true);
      const response = await menuAPI.createFood(formData);
      
      // Optimistic Update: Add the new item to the top of the list immediately
      setFoods(prev => [response.data, ...prev]);
      
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Add Food Error:", err.response?.data);
      
      // Parse Django errors (which are usually objects like { name: ["Error..."] })
      let errorMsg = "Failed to create item";
      if (err.response?.data) {
        // Flatten the error object into a string
        errorMsg = Object.entries(err.response.data)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
          .join(' | ');
      }
      
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id) => {
    try {
      await menuAPI.deleteFood(id);
      
      // Optimistic Update: Remove from local list
      setFoods(prev => prev.filter(item => item.id !== id));
      
      return { success: true };
    } catch (err) {
      console.error("Delete Food Error:", err);
      return { success: false, error: "Failed to delete item" };
    }
  };

  // --- 3. HELPER FUNCTIONS ---

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({ category: '', search: '' });
  };

  const value = {
    // State
    foods,
    categories,
    selectedFood,
    loading,
    error,
    filters,
    
    // Public Functions
    getFoods,
    getCategories,
    getFoodById,
    updateFilters,
    clearFilters,
    
    // Admin Functions
    getAdminFoods,
    addFood,
    deleteFood
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};