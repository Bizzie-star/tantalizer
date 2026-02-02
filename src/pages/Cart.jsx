// src/pages/Cart.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ArrowLeft, ShieldCheck, ChefHat, ImageOff } from 'lucide-react';

// --- CONFIG ---
// Replace with your actual Django backend URL
const API_BASE_URL = "http://127.0.0.1:8000"; 

export default function Cart() {
  const { 
    cartItems,        
    items,            
    cartTotal, 
    loading, 
    updateCartItem, 
    removeCartItem, 
    getCart 
  } = useCart();
  
  // Robust fallback: ensure we always have an array
  const displayItems = cartItems || items || [];

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      getCart();
    }
  }, [isAuthenticated]);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount || 0);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  // --- HANDLERS ---
  const handleIncrement = (item) => {
    updateCartItem(item.id, parseInt(item.quantity) + 1);
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      updateCartItem(item.id, parseInt(item.quantity) - 1);
    }
  };

  // --- IMAGE HELPER ---
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath; // Already absolute
    return `${API_BASE_URL}${imagePath}`; // Prepend backend URL
  };

  // --- LOADING STATE ---
  if (loading && displayItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
           <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-rose-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-rose-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-500 font-medium">Loading your cart...</p>
        </div>
      </div>
    );
  }

  // --- EMPTY STATE ---
  if (displayItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 px-4 flex items-center justify-center font-sans">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 transform transition-all hover:scale-105 duration-300">
            <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-rose-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Looks like you haven't made your choice yet. Explore our menu to find something delicious!
            </p>
            <Link
              to="/ordernow"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-rose-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full"
            >
              Browse Menu <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
                My Cart <span className="bg-rose-100 text-rose-600 text-sm py-1 px-3 rounded-full font-bold">{displayItems.length} items</span>
            </h1>
            <Link to="/ordernow" className="hidden sm:flex items-center gap-2 text-rose-600 font-semibold hover:text-rose-700 transition">
                <ArrowLeft size={18} /> Continue Shopping
            </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left: Cart Items */}
          <div className="flex-1 space-y-4">
             {displayItems.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6 hover:shadow-md transition-shadow duration-300">
                    
                    {/* --- IMAGE SECTION (FIXED) --- */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden relative border border-gray-200">
                      {item.food?.image ? (
                        <img 
                          src={getImageUrl(item.food.image)} 
                          alt={item.food.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null; // Prevent infinite loop
                            e.target.style.display = 'none'; // Hide broken image
                            e.target.nextSibling.style.display = 'flex'; // Show fallback
                          }}
                        />
                      ) : null}
                      
                      {/* Fallback Icon (Shown if image missing or broken) */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center text-gray-300 bg-gray-50"
                        style={{ display: item.food?.image ? 'none' : 'flex' }}
                      >
                        <ChefHat size={32} />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 text-center sm:text-left w-full">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{item.food?.name}</h3>
                      <p className="text-rose-600 font-semibold mb-3">
                        {formatPrice(item.food?.price || (item.total_price / item.quantity))}
                      </p>
                      
                      {/* Variants/Addons */}
                      {(item.selected_variant || (item.selected_addons && item.selected_addons.length > 0)) && (
                        <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-3">
                          {item.selected_variant && (
                            <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-lg border border-gray-200">
                              {item.selected_variant}
                            </span>
                          )}
                          {item.selected_addons?.map((addon, idx) => (
                            <span key={idx} className="text-xs font-medium bg-rose-50 text-rose-600 px-2 py-1 rounded-lg border border-rose-100">
                              + {addon}
                            </span>
                          ))}
                        </div>
                      )}

                        {/* Mobile Remove */}
                        <button
                          onClick={() => removeCartItem(item.id)}
                          className="sm:hidden text-gray-400 hover:text-red-500 text-sm flex items-center justify-center gap-1 transition mt-2 mx-auto"
                        >
                          <Trash2 size={16} /> Remove Item
                        </button>
                    </div>

                    {/* Quantity & Actions */}
                    <div className="flex flex-col items-center gap-4">
                          <div className="flex items-center gap-3 bg-gray-50 rounded-full p-1 border border-gray-200">
                            <button
                                onClick={() => handleDecrement(item)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 rounded-full bg-white text-gray-600 shadow-sm flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 transition-all active:scale-90"
                            >
                                <Minus size={14} strokeWidth={3} />
                            </button>
                            <span className="w-6 text-center font-bold text-gray-900">{item.quantity}</span>
                            <button
                                onClick={() => handleIncrement(item)}
                                className="w-8 h-8 rounded-full bg-white text-gray-600 shadow-sm flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 transition-all active:scale-90"
                            >
                                <Plus size={14} strokeWidth={3} />
                            </button>
                          </div>

                          <div className="text-center">
                            <span className="block text-lg font-extrabold text-gray-900">
                                {formatPrice(item.total_price || (item.food?.price * item.quantity))}
                            </span>
                          </div>
                          
                          {/* Desktop Remove */}
                          <button
                            onClick={() => removeCartItem(item.id)}
                            className="hidden sm:flex text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"
                            title="Remove Item"
                          >
                            <Trash2 size={18} />
                          </button>
                    </div>

                </div>
             ))}
          </div>

          {/* Right: Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span className="text-gray-900">{formatPrice(cartTotal?.subtotal || 0)}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md text-sm">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Service Charge</span>
                  <span className="text-gray-900">₦0.00</span>
                </div>
                
                <div className="border-t-2 border-dashed border-gray-100 pt-4 flex justify-between items-center mt-4">
                  <span className="text-lg font-extrabold text-gray-900">Total</span>
                  <span className="text-3xl font-extrabold text-rose-600">{formatPrice(cartTotal?.total || 0)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold text-lg py-4 rounded-xl hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>

              <div className="mt-6 text-center sm:hidden">
                <Link to="/ordernow" className="text-sm text-gray-500 hover:text-rose-600 font-medium">
                  or Continue Shopping
                </Link>
              </div>
              
              {/* Trust Signals */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                 <div className="flex items-center gap-3 text-sm text-gray-500">
                    <ShieldCheck className="text-green-500" size={20} />
                    <span>Secure Checkout</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm text-gray-500">
                    <ChefHat className="text-orange-500" size={20} />
                    <span>Freshly Prepared</span>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}