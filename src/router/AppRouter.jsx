import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import About from '../pages/About';
import Cart from '../pages/Cart';
import SignUp from '../pages/SignUp';
import Checkout from '../pages/Checkout';
import Forgotpassword from '../pages/Forgotpassword';
import Register from '../pages/Register';
import Admindashboard from '../pages/Admindashboard';
import UserDashboard from '../pages/Userdashboard';
import PaymentVerify from '../pages/PaymentVerify';

/**
 * PublicRoute Component
 * Prevents authenticated users from accessing public pages (Home, Login, Register).
 * Redirects them to their respective dashboard based on role.
 */
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (user) {
    const isAdmin = user.is_staff || user.is_superuser || user.is_admin;
    return <Navigate to={isAdmin ? "/admindashboard" : "/userdashboard"} replace />;
  }

  return children;
};

/**
 * ProtectedRoute Component
 * Handles authentication checks and role-based access.
 */
const ProtectedRoute = ({ children, adminOnly = false, preventAdmin = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  const isAdmin = user.is_staff || user.is_superuser || user.is_admin;

  // If strict admin route and user is not admin
  if (adminOnly && !isAdmin) {
    return <Navigate to="/userdashboard" replace />;
  }

  // If strict user route (like UserDashboard) and user IS admin
  if (preventAdmin && isAdmin) {
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
            {/* --- PUBLIC ROUTES (Accessible to everyone, but redirects logged-in users) --- */}
            <Route 
              path="/" 
              element={
                <PublicRoute>
                  <Hero />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" // Assuming this is your main Login route
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Navigate to="/signup" replace />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            <Route 
              path="/forgotpassword" 
              element={
                <PublicRoute>
                  <Forgotpassword />
                </PublicRoute>
              } 
            />

            {/* --- GENERAL ROUTES (Accessible to everyone usually, or protect if needed) --- */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/ordernow" element={<Ordernow />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/outlet" element={<Outlet />} />
            
            {/* --- PROTECTED ROUTES (Requires Login) --- */}
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              } 
            />
            
            <Route 
              path="/userdashboard" 
              element={
                <ProtectedRoute adminOnly={false} preventAdmin={true}>
                  <UserDashboard />
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

            <Route path="/payment/verify/:reference" element={<PaymentVerify />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default AppRouter;