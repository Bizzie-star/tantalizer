import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

// Pages
import Hero from '../pages/Home';
import Ordernow from '../pages/Ordernow';
import Contact from '../pages/contact';
import Franchise from '../pages/Franchise';
import Outlet from '../pages/Outlet';
import About from '../pages/about';
import Cart from '../pages/cart';
import SignUp from '../pages/SignUp';
import Forgotpassword from '../pages/Forgotpassword';
import Register from '../pages/Register';
import Admindashboard from '../pages/Admindashboard';
import Userdashboard from '../pages/Userdashboard';

/**
 * ProtectedRoute Component
 * Handles redirection based on authentication and user roles (is_admin).
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  // Wait for AuthContext to check the token before redirecting
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not logged in, send to login page
  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  // If route is adminOnly but user is NOT an admin (is_staff=True in Django)
  if (adminOnly && !user.is_admin) {
    return <Navigate to="/userdashboard" replace />;
  }

  // If user is admin but tries to go to regular user dashboard
  if (!adminOnly && user.is_admin && window.location.pathname === '/userdashboard') {
     return <Navigate to="/admindashboard" replace />;
  }

  return children;
};



function AppRouter() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        
        <main className="flex-grow w-full px-4 sm:px-6 md:px-10 lg:px-20 pt-[80px]">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ordernow" element={<Ordernow />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/outlet" element={<Outlet />} />
            <Route path="/cart" element={<Cart />} />
            
            {/* Auth Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            
            {/* Role-Based Dashboard Routes */}
            <Route 
              path="/userdashboard" 
              element={
                <ProtectedRoute adminOnly={false}>
                  <Userdashboard />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/admindashboard" 
              element={
                <ProtectedRoute adminOnly={true}>
                  <Admindashboard />
                </ProtectedRoute>
              } 
            />

            {/* Fallback for 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default AppRouter;