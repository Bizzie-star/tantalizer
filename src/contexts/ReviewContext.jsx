import React, { createContext, useState, useContext, useEffect } from 'react';
import { reviewAPI } from '../api/api';
import { useAuth } from './AuthContext';

const ReviewContext = createContext({});

export const useReview = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get auth status to manage state cleanup
  const { user, loading: authLoading } = useAuth();

  // Cleanup reviews when user logs out to prevent data leakage/loops
  useEffect(() => {
    if (!authLoading && !user) {
      setMyReviews([]);
    }
  }, [user, authLoading]);

  const createReview = async (data) => {
    try {
      setLoading(true);
      const response = await reviewAPI.createReview(data);
      
      // Update local state immediately for better UX
      setMyReviews(prev => [response.data, ...prev]);
      
      // Update global food reviews list if the IDs match
      setReviews(prev => [response.data, ...prev]);
      
      return { success: true, data: response.data };
    } catch (err) {
      // Don't set state error for 401s, interceptor handles that
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Failed to create review');
      }
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getMyReviews = async () => {
    // Safety check: don't fetch if unauthenticated
    if (!user) return;

    try {
      setLoading(true);
      const response = await reviewAPI.getMyReviews();
      setMyReviews(response.data.results || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      if (err.response?.status !== 401) {
        setError(err.response?.data?.message || 'Failed to fetch your reviews');
      }
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getFoodReviews = async (foodId) => {
    try {
      setLoading(true);
      // Public endpoint - no auth check needed here
      const response = await reviewAPI.getFoodReviews(foodId);
      setReviews(response.data.results || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch reviews');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = (reviewsList = reviews) => {
    if (!reviewsList || !reviewsList.length) return 0;
    const total = reviewsList.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviewsList.length).toFixed(1); // Round to 1 decimal place
  };

  const value = {
    reviews,
    myReviews,
    loading,
    error,
    createReview,
    getMyReviews,
    getFoodReviews,
    getAverageRating,
    setError,
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
};