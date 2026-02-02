// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

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

// 3. Response Interceptor (Handle Refresh & Logout)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      // If no refresh token, force logout
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        // Attempt to get a new access token
        const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, {
          refresh: refreshToken
        });

        const { access } = response.data;
        
        // Save new token
        localStorage.setItem('access_token', access);
        
        // Update header
        originalRequest.headers.Authorization = `Bearer ${access}`;
        
        // Retry the original request using the 'api' instance
        // FIX: Use 'api' instead of 'axios' to keep the baseURL configuration
        return api(originalRequest);

      } catch (refreshError) {
        // If refresh fails, session is dead. Force Logout.
        console.error("Session expired. Logging out...");
        localStorage.clear();
        window.location.href = '/login';
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
  logout: () => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (refresh_token) {
        return api.post('/auth/logout/', { refresh_token });
    }
    return Promise.resolve();
  },
  getProfile: () => api.get('/auth/profile/'),
  getAllUsers: () => api.get('/auth/all-customers/'),
  updateProfile: (data) => api.put('/auth/profile/', data),
};

// Menu endpoints
export const menuAPI = {
  getFoods: (params) => api.get('/menu/foods/', { params }),
  getCategories: () => api.get('/menu/categories/'),
  getFoodById: (id) => api.get(`/menu/foods/${id}/`),
  getAdminFoods: () => api.get('/menu/admin/foods/'),
  createFood: (formData) => api.post('/menu/admin/foods/create/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updateFood: (id, formData) => api.put(`/menu/admin/foods/${id}/update/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  deleteFood: (id) => api.delete(`/menu/admin/foods/${id}/delete/`),
};

// Cart endpoints
export const cartAPI = {
  getCart: () => api.get('/cart/'),
  addToCart: (data) => api.post('/cart/add/', data),
  updateCartItem: (itemId, quantity) => api.patch(`/cart/items/${itemId}/update/`, { quantity }),
  removeCartItem: (itemId) => api.delete(`/cart/items/${itemId}/remove/`),
  clearCart: () => api.delete('/cart/clear/'),
};

// Order endpoints
export const orderAPI = {
  createOrder: (data) => api.post('/orders/create/', data),
  getMyOrders: () => api.get('/orders/'), 
  getOrder: (id) => api.get(`/orders/${id}/`), 
  cancelOrder: (id) => api.post(`/orders/${id}/cancel/`), 

  // --- Payment Endpoints ---
  initiatePayment: (orderId) => api.post('/orders/payment/initiate/', { order_id: orderId }),

  // --- Admin Endpoints ---
  getAllOrders: () => api.get('/orders/admin/all/'), 
  updateStatus: (orderId, status, adminNotes) => 
    api.patch(`/orders/admin/${orderId}/update-status/`, { 
      status, 
      admin_notes: adminNotes 
    }),
  getStats: () => api.get('/orders/stats/'),
};

export const paymentAPI = {
  initialize: (orderId) => api.post('/payments/initialize/', { order_id: orderId }),
  verify: (reference) => api.post('/payments/verify/', { reference }),
  checkStatus: (reference) => api.get(`/payments/check/${reference}/`),
  getHistory: () => api.get('/payments/history/'),
  getDetail: (id) => api.get(`/payments/${id}/`),
};

// src/api/api.js

export const reviewAPI = {
  // Admin Endpoints
  getAllReviews: () => api.get('/reviews/admin/all/'), 
  toggleApproval: (id) => api.patch(`/reviews/admin/toggle-approval/${id}/`),
  
  // User Endpoints
  createReview: (data) => api.post('/reviews/create/', data),
  getMyReviews: () => api.get('/reviews/my-reviews/'),
  getFoodReviews: (foodId) => api.get(`/reviews/food/${foodId}/`),
  updateReview: (reviewId, data) => api.put(`/reviews/update/${reviewId}/`, data),
  deleteReview: (reviewId) => api.delete(`/reviews/delete/${reviewId}/`),
};

export default api;