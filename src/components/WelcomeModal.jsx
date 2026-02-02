// src/components/WelcomeModal.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChefHat, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext'; // To personalize the greeting

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we've already shown the welcome message in this session
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');

    if (!hasSeenWelcome) {
      // Small delay for better UX (don't pop immediately on load)
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenWelcome', 'true');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCta = () => {
    setIsOpen(false);
    navigate('/ordernow'); // Direct them to the menu
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 scale-100 animate-fade-in-up">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-rose-100 hover:text-rose-600 transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Hero Image / Banner */}
        <div className="h-32 bg-gradient-to-r from-rose-500 to-orange-500 relative flex items-center justify-center">
           <div className="absolute -bottom-10 bg-white p-4 rounded-full shadow-lg">
              <div className="bg-rose-50 p-3 rounded-full text-rose-600">
                <ChefHat size={40} />
              </div>
           </div>
           {/* Decorative circles */}
           <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-x-10 -translate-y-10" />
           <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-10 translate-y-10" />
        </div>

        {/* Text Content */}
        <div className="pt-14 pb-8 px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome, {user?.first_name || 'Foodie'}! 😋
          </h2>
          <p className="text-gray-500 mb-6 leading-relaxed">
            Ready to taste something amazing today? <br/>
            Order now and get your meal delivered hot and fresh!
          </p>

          <div className="space-y-3">
            <button 
              onClick={handleCta}
              className="w-full py-3.5 bg-gray-900 text-white font-bold rounded-xl shadow-lg shadow-gray-200 hover:bg-rose-600 hover:shadow-rose-200 transition-all flex items-center justify-center gap-2 group"
            >
              Order Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </button>
            
            <button 
              onClick={handleClose}
              className="text-sm text-gray-400 hover:text-gray-600 font-medium transition-colors"
            >
              No thanks, just browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}