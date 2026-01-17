// contexts/ReviewContext.jsx
import React, { createContext, useState, useContext } from 'react';
import { reviewAPI } from '../services/api';

const ReviewContext = createContext({});

export const useReview = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReview = async (data) => {
    try {
      setLoading(true);
      const response = await reviewAPI.createReview(data);
      
      // Add to my reviews
      setMyReviews(prev => [response.data, ...prev]);
      
      // Add to food reviews if viewing that food
      if (data.food_id) {
        setReviews(prev => [response.data, ...prev]);
      }
      
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create review');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getMyReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewAPI.getMyReviews();
      setMyReviews(response.data.results || response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch your reviews');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getFoodReviews = async (foodId) => {
    try {
      setLoading(true);
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

  const updateReview = async (reviewId, data) => {
    try {
      setLoading(true);
      const response = await reviewAPI.updateReview(reviewId, data);
      
      // Update in my reviews
      setMyReviews(prev => prev.map(review => 
        review.id === reviewId ? response.data : review
      ));
      
      // Update in food reviews
      setReviews(prev => prev.map(review => 
        review.id === reviewId ? response.data : review
      ));
      
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update review');
      return { success: false, error: err.response?.data };
    } finally {
      setLoading(false);
    }
  };

  const getAverageRating = (reviewsList = reviews) => {
    if (!reviewsList.length) return 0;
    const total = reviewsList.reduce((sum, review) => sum + review.rating, 0);
    return total / reviewsList.length;
  };

  const value = {
    reviews,
    myReviews,
    loading,
    error,
    createReview,
    getMyReviews,
    getFoodReviews,
    updateReview,
    getAverageRating,
    setError,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};