import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../api/api'; 

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.getProfile();
      // FIX: Handle case where backend might wrap user data or return it directly
      const userData = response.data.results || response.data.user || response.data;
      setUser(userData);
    } catch (err) {
      console.error("Auth check failed:", err);
      logout(); // Clean up invalid tokens
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await authAPI.login(email, password);
      
      // FIX: Standard SimpleJWT returns { access, refresh } directly at root
      // We check both standard and custom nested structures to be safe
      const data = response.data;
      const accessToken = data.access || data.tokens?.access;
      const refreshToken = data.refresh || data.tokens?.refresh;
      
      if (accessToken && refreshToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        
        await checkAuth(); 
        
        return { success: true };

      } else {
          throw new Error("Tokens missing from server response");
      }

    } catch (err) {
      console.error("Login Error:", err);
      const errorMessage = err.response?.data?.detail || err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (userData) => {
    try {
      setError(null);
      await authAPI.register(userData);
      
      // FIX: Most Django setups (Djoser) don't return tokens on register. 
      // We automatically log the user in after successful registration.
      return await login(userData.email, userData.password);

    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      
      // Format Django errors (which are objects like { email: [...] }) into a string
      let msg = "Registration failed";
      if (err.response?.data) {
        const data = err.response.data;
        if (typeof data === 'object') {
           // Create a readable string from the error object
           msg = Object.entries(data)
             .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(' ') : val}`)
             .join('\n');
        } else if (data.message) {
           msg = data.message;
        }
      }
      
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const logout = async () => {
    try {
      // Optional: Attempt backend blacklist
      await authAPI.logout(); 
    } catch (err) {
      // Ignore logout errors (token might be expired anyway)
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
      // Optional: Redirect to login
      // window.location.href = '/login'; 
    }
  };

  const updateProfile = async (data) => {
    try {
      const response = await authAPI.updateProfile(data);
      setUser(response.data); // Update local state with new profile data
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Update failed';
      setError(msg);
      return { success: false, error: err.response?.data };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    setError,
    isAuthenticated: !!user,
    // Add helpers for role checking
    isAdmin: user?.is_staff || user?.is_superuser,
  };

  if (loading) {
     return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-red-600"></div></div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};