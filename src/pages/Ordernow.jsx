// src/pages/Ordernow.jsx
import React, { useEffect, useState } from 'react';
import { useMenu } from '../contexts/MenuContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { ShoppingBag, Search, Plus, Loader, Check, Star, Filter, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Ordernow() {
  const { foods, categories, getFoods, getCategories, loading } = useMenu();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [addingIds, setAddingIds] = useState([]);

  // --- MODAL STATES ---
  const [alertModal, setAlertModal] = useState({ show: false, type: 'success', title: '', message: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null });

  // Fetch Data on Load
  useEffect(() => {
    getFoods();
    getCategories();
  }, []);

  // Filter Logic
  const filteredFoods = foods.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || food.category?.name === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // --- MODAL HELPERS ---
  const showAlert = (type, title, msg) => {
    setAlertModal({ show: true, type, title, message: msg });
  };

  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, show: false }));
  };

  const closeConfirm = () => {
    setConfirmModal(prev => ({ ...prev, show: false }));
  };

  const handleAddToCart = async (food) => {
    // 1. Check Login
    if (!user) {
      setConfirmModal({
        show: true,
        title: "Login Required",
        message: "You need to be signed in to add items to your cart. Would you like to login now?",
        onConfirm: () => {
            closeConfirm();
            navigate('/login', { state: { from: location } });
        }
      });
      return;
    }

    // 2. Add to Cart Logic
    setAddingIds(prev => [...prev, food.id]);
    const result = await addToCart(food.id, 1);
    
    if (result.success) {
      // Success feedback is handled visually by the button change (Check icon)
    } else {
      showAlert('error', 'Failed to Add', result.error);
    }
    
    setTimeout(() => {
        setAddingIds(prev => prev.filter(id => id !== food.id));
    }, 1000);
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  if (loading && foods.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-rose-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-rose-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-500 font-medium">Preparing the menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24 font-sans">
      
      {/* =====================
          HERO HEADER 
      ===================== */}
      <div className="relative bg-rose-900 text-white py-16 px-6 overflow-hidden">
        {/* Background Pattern/Image */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600 rounded-full blur-3xl opacity-30 translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-rose-800 text-rose-200 text-xs font-bold tracking-widest uppercase mb-4 border border-rose-700">
            Online Ordering
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight">
            Our Delicious Menu
          </h1>
          <p className="text-rose-100 text-lg max-w-2xl mx-auto">
            Explore our diverse collection of mouth-watering dishes, prepared fresh daily and delivered straight to you.
          </p>
          
          {user && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Welcome back, {user.first_name}!</span>
            </div>
          )}
        </div>
      </div>

      {/* =====================
          SEARCH & FILTERS
      ===================== */}
      <div className="sticky top-[70px] z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-rose-600 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search menu..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-transparent rounded-full focus:bg-white focus:border-rose-300 focus:ring-4 focus:ring-rose-500/10 transition-all outline-none" 
                    />
                </div>

                {/* Categories */}
                <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setActiveCategory('All')}
                            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                activeCategory === 'All' 
                                ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' 
                                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button 
                                key={cat.id} 
                                onClick={() => setActiveCategory(cat.name)}
                                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                                    activeCategory === cat.name 
                                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' 
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* =====================
          FOOD GRID
      ===================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFoods.length > 0 ? (
            filteredFoods.map((food) => (
              <div key={food.id} className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full">
                
                {/* Image Area */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  {food.image ? (
                    <img 
                      src={food.image} 
                      alt={food.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                      <ShoppingBag size={48} />
                    </div>
                  )}
                  
                  {/* Rating / Tag Badge (Optional) */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold shadow-sm flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500"/> 4.8
                  </div>

                  {!food.is_available && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px] flex items-center justify-center z-10">
                      <span className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">Sold Out</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-rose-600 transition-colors">
                        {food.name}
                    </h3>
                  </div>
                  
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">
                    {food.description || "Freshly prepared with quality ingredients."}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-xl font-extrabold text-gray-900">
                      {formatPrice(food.current_price)}
                    </span>
                    
                    <button 
                      onClick={() => handleAddToCart(food)}
                      disabled={!food.is_available || addingIds.includes(food.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                        !food.is_available 
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : addingIds.includes(food.id)
                            ? 'bg-green-500 text-white scale-110'
                            : 'bg-rose-600 text-white hover:bg-rose-700 hover:scale-110'
                      }`}
                      title={addingIds.includes(food.id) ? "Added" : "Add to Cart"}
                    >
                      {addingIds.includes(food.id) ? (
                        <Check size={20} />
                      ) : (
                        <Plus size={20} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="text-rose-300" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No items match your search</h3>
              <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                We couldn't find any food items matching "{searchTerm}". Try checking the spelling or browse all categories.
              </p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveCategory('All');}}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-full transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-8 right-6 z-40 animate-bounce-slow">
        <button 
            onClick={() => navigate('/cart')}
            className="group flex items-center gap-3 bg-gray-900 text-white pl-5 pr-6 py-4 rounded-full shadow-2xl hover:bg-rose-600 transition-all duration-300 hover:scale-105"
        >
            <div className="relative">
                <ShoppingBag size={24} />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 group-hover:bg-white rounded-full border-2 border-gray-900 group-hover:border-rose-600 transition-colors"></span>
            </div>
            <span className="font-bold text-lg">View Cart</span>
        </button>
      </div>

      {/* =====================
          ALERT MODAL (NEW)
      ===================== */}
      {alertModal.show && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in">
                 <div className={`p-4 flex justify-center ${
                     alertModal.type === 'success' ? 'bg-green-100' : 'bg-red-100'
                 }`}>
                     <div className={`p-3 rounded-full ${
                         alertModal.type === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'
                     }`}>
                         {alertModal.type === 'success' ? <CheckCircle size={32} /> : <AlertTriangle size={32} />}
                     </div>
                 </div>
                 <div className="p-6 text-center">
                     <h3 className="text-xl font-bold text-gray-900 mb-2">{alertModal.title}</h3>
                     <p className="text-gray-600 mb-6">{alertModal.message}</p>
                     <button 
                         onClick={closeAlert}
                         className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition"
                     >
                         Okay, got it
                     </button>
                 </div>
             </div>
         </div>
      )}

      {/* =====================
          CONFIRM MODAL (NEW)
      ===================== */}
      {confirmModal.show && (
         <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
             <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-scale-in">
                 <div className="p-4 bg-rose-50 flex justify-center">
                     <div className="p-3 bg-rose-100 text-rose-600 rounded-full">
                         <AlertCircle size={32} />
                     </div>
                 </div>
                 <div className="p-6 text-center">
                     <h3 className="text-xl font-bold text-gray-900 mb-2">{confirmModal.title}</h3>
                     <p className="text-gray-600 mb-6">{confirmModal.message}</p>
                     <div className="flex gap-3">
                         <button 
                             onClick={closeConfirm}
                             className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition"
                         >
                             No, later
                         </button>
                         <button 
                             onClick={confirmModal.onConfirm}
                             className="flex-1 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-200"
                         >
                             Yes, Login
                         </button>
                     </div>
                 </div>
             </div>
         </div>
      )}
      
      {/* Custom Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
            animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>

    </div>
  );
}