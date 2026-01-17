// contexts/MenuContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { menuAPI } from '../api/api';

const MenuContext = createContext({});

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({ children }) => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    minPrice: null,
    maxPrice: null,
  });

  const getFoods = async (params = {}) => {
    try {
      setLoading(true);
      const response = await menuAPI.getFoods({ ...filters, ...params });
      setFoods(response.data.results || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch foods');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getCategories();
      setCategories(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch categories');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getFoodById = async (id) => {
    try {
      setLoading(true);
      const response = await menuAPI.getFoodById(id);
      setSelectedFood(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch food');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      minPrice: null,
      maxPrice: null,
    });
  };

  const value = {
    foods,
    categories,
    selectedFood,
    loading,
    error,
    filters,
    getFoods,
    getCategories,
    getFoodById,
    updateFilters,
    clearFilters,
    setSelectedFood,
    setError,
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};