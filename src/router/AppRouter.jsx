import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';


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

function AppRouter() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        
        <main className="flex-grow w-full px-4 sm:px-6 md:px-10 lg:px-20 pt-[80px]">
          <Routes>
            <Route path="/" element={<Hero />} />
            
            <Route path="/ordernow" element={<Ordernow />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/franchise" element={<Franchise />} />
            
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/outlet" element={<Outlet />} />
            
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<Forgotpassword />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/admindashboard" element={<Admindashboard />} />
            <Route path="/userdashboard" element={<Userdashboard />} />
            
            {/* Optional: 404 page */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default AppRouter