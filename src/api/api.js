// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// Handle token refresh & Infinite Loop prevention
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refresh_token');
      
      // If there's no refresh token at all, don't even try. Just logout.
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = '/signup';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken
        });
        
        const { access } = response.data;
        localStorage.setItem('access_token', access);
        
        // Update the original request with new token and retry
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // REFRESH FAILED: Token is blacklisted or expired. 
        // Clear storage to stop the infinite loop and redirect to login
        localStorage.clear();
        window.location.href = '/signup';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (email, password) => api.post('/auth/login/', { email, password }),
  register: (userData) => api.post('/auth/register/', userData),
  logout: () => api.post('/auth/logout/', {
      refresh_token: localStorage.getItem('refresh_token')
    }),
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data) => api.put('/auth/profile/', data),
  refreshToken: (refresh) => axios.post(`${API_BASE_URL}/auth/token/refresh/`, { refresh }),
};

// Menu endpoints
export const menuAPI = {
  getFoods: (params) => api.get('/menu/foods/', { params }),
  getCategories: () => api.get('/menu/categories/'),
  getFoodById: (id) => api.get(`/menu/foods/${id}/`),
};

// Cart endpoints - UPDATED to match your Django URLs
export const cartAPI = {
  getCart: () => api.get('/cart/'),
  addToCart: (foodId, quantity) => api.post('/cart/add/', { food_id: foodId, quantity }),
  updateCartItem: (itemId, quantity) => api.patch(`/cart/items/${itemId}/update/`, { quantity }),
  removeCartItem: (itemId) => api.delete(`/cart/items/${itemId}/remove/`),
  clearCart: () => api.delete('/cart/clear/'),
};

// Order endpoints
export const orderAPI = {
  createOrder: (data) => api.post('/orders/create/', data),
  getOrders: () => api.get('/orders/'),
  getOrder: (id) => api.get(`/orders/${id}/`),
  updateOrderStatus: (orderId, status, adminNotes) => 
    api.patch(`/orders/admin/${orderId}/update-status/`, { status, admin_notes: adminNotes }),
};

// Payment endpoints
export const paymentAPI = {
  initializePayment: (orderId) => api.post('/payments/initialize/', { order_id: orderId }),
  verifyPayment: (reference) => api.post('/payments/verify/', { reference }),
  getPaymentHistory: () => api.get('/payments/history/'),
};

export const reviewAPI = {
  createReview: (data) => 
    api.post('/reviews/create/', data),
  
  getMyReviews: () => 
    api.get('/reviews/my-reviews/'),
  
  getFoodReviews: (foodId) => 
    api.get(`/reviews/food/${foodId}/`),
  
  updateReview: (reviewId, data) => 
    api.put(`/reviews/update/${reviewId}/`, data),
};

export default api;