// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";
import { useOrder } from '../contexts/OrderContext';
import { authAPI, reviewAPI, orderAPI, paymentAPI } from "../api/api"; 
import { 
  User, Package, Clock, CheckCircle, XCircle, ChevronRight, 
  Loader, Lock, LogOut, Phone, Mail, ChevronDown, 
  Truck, ChefHat, ShoppingBag, MapPin, Wallet, Star, MessageSquare, X, AlertTriangle, AlertCircle
} from "lucide-react";

export default function UserDashboard() {
  const { user, logout, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("orders");
  const { 
    orders, 
    setOrders, 
    getMyOrders, 
    cancelOrder, 
    loading: orderLoading 
  } = useOrder();
  
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // Inline messages (Profile/Security)

  // --- MODAL STATES ---
  const [alertModal, setAlertModal] = useState({ show: false, type: 'success', title: '', message: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null });

  // --- REVIEW STATE ---
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  // Form States
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    phone_number: user?.phone_number || "",
  });

  const [passData, setPassData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  useEffect(() => {
    if (activeTab === "orders") {
      getMyOrders();
    }
  }, [activeTab]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

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

  // --- HANDLERS ---

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await authAPI.updateProfile(formData);
      await updateProfile(res.data);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (passData.new_password !== passData.confirm_password) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }
    setLoading(true);
    try {
      await authAPI.changePassword(passData);
      setMessage({ type: "success", text: "Password changed successfully!" });
      setPassData({ old_password: "", new_password: "", confirm_password: "" });
    } catch (err) {
      setMessage({ type: "error", text: err.response?.data?.error || "Failed to change password." });
    } finally {
      setLoading(false);
    }
  };

  const handlePayNow = async (orderId) => {
    try {
      const response = await paymentAPI.initialize(orderId);

      const authUrl = response.data.data?.payment_url || 
                      response.data.authorization_url || 
                      response.data.data?.authorization_url || 
                      response.data.url;

      if (authUrl) {
          window.location.href = authUrl;
      } else {
          console.error("Structure mismatch:", response.data);
          showAlert('error', 'Payment Error', 'Payment link not found. Please contact support.');
      }
    } catch (error) {
      console.error("Payment Error:", error);
      const msg = error.response?.data?.message || error.response?.data?.error || "Connection error";
      showAlert('error', 'Payment Failed', msg);
    }
  };

  // --- CANCEL LOGIC ---
  
  // 1. Triggered by button click
  const initiateCancel = (orderId) => {
    setConfirmModal({
        show: true,
        title: "Cancel Order?",
        message: "Are you sure you want to cancel this order? This action cannot be undone.",
        onConfirm: () => proceedWithCancel(orderId)
    });
  };

  // 2. Triggered by Modal "Yes" button
  const proceedWithCancel = async (orderId) => {
    closeConfirm(); // Close the confirm modal
    
    // Call the context hook
    const result = await cancelOrder(orderId);

    if (result.success) {
      setOrders(currentOrders => 
        currentOrders.map(order => 
          order.id === orderId ? result.order : order
        )
      );
      showAlert('success', 'Order Cancelled', 'Your order has been successfully cancelled.');
    } else {
      showAlert('error', 'Cancellation Failed', result.error);
    }
  };

  // --- REVIEW HANDLERS ---
  const openReviewModal = (item, orderId) => {
    setSelectedItem(item);
    setSelectedOrderId(orderId);
    setReviewForm({ rating: 5, comment: "" });
    setShowReviewModal(true);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if(!selectedItem || !selectedOrderId) return; 
    
    setReviewSubmitting(true);
    try {
        const payload = {
            order: selectedOrderId,
            food: selectedItem.food?.id || selectedItem.food, 
            rating: reviewForm.rating,
            comment: reviewForm.comment
        };
        
        await reviewAPI.createReview(payload);
        
        // Use Modal instead of inline message for reviews since it closes the modal
        showAlert('success', 'Review Submitted', 'Thank you for your feedback!');
        setShowReviewModal(false);
    } catch (error) {
        console.error(error);
        const errData = error.response?.data;
        const errText = errData?.detail || errData?.non_field_errors?.[0] || JSON.stringify(errData) || "Failed to submit review.";
        
        showAlert('error', 'Review Failed', errText);
    } finally {
        setReviewSubmitting(false);
    }
  };

  const initiateLogout = () => {
    setConfirmModal({
        show: true,
        title: "Sign Out?",
        message: "Are you sure you want to log out of your account?",
        onConfirm: () => {
            closeConfirm();
            logout(); 
        }
    });
  };

  // Stats for the header
  const totalOrders = orders ? orders.length : 0;
  const activeOrdersCount = orders ? orders.filter(o => o.status === 'pending' || o.status === 'processing' || o.status === 'shipped').length : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-12 font-sans relative">
      
      {/* =======================
          HEADER SECTION 
      ======================= */}
      <div className="bg-rose-900 pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-6">
           <div className="relative">
             <div className="w-24 h-24 rounded-full bg-white p-1 shadow-xl">
               <div className="w-full h-full rounded-full bg-rose-100 flex items-center justify-center text-rose-600 text-3xl font-bold overflow-hidden">
                  {user?.profile_picture ? (
                    <img src={user.profile_picture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    user?.first_name?.[0] || <User size={32} />
                  )}
               </div>
             </div>
             <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
           </div>
           
           <div className="text-center md:text-left text-white flex-1">
             <h1 className="text-3xl font-bold">Welcome, {user?.first_name}!</h1>
             <p className="text-rose-200 mt-1 flex items-center justify-center md:justify-start gap-2">
               <Mail size={14} /> {user?.email}
             </p>
           </div>

           {/* Quick Stats Pills */}
           <div className="flex gap-4">
             <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center">
                <span className="block text-2xl font-bold text-white">{totalOrders}</span>
                <span className="text-xs text-rose-200 uppercase tracking-wider font-bold">Total Orders</span>
             </div>
             <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 text-center">
                <span className="block text-2xl font-bold text-white">{activeOrdersCount}</span>
                <span className="text-xs text-rose-200 uppercase tracking-wider font-bold">Active</span>
             </div>
           </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* =======================
              SIDEBAR NAVIGATION 
          ======================= */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 overflow-hidden sticky top-24">
              <div className="p-4 space-y-2">
                <SidebarBtn 
                  icon={<Package size={20} />} 
                  label="My Orders" 
                  active={activeTab === "orders"} 
                  onClick={() => setActiveTab("orders")} 
                />
                <SidebarBtn 
                  icon={<User size={20} />} 
                  label="Profile Settings" 
                  active={activeTab === "profile"} 
                  onClick={() => setActiveTab("profile")} 
                />
                <SidebarBtn 
                  icon={<Lock size={20} />} 
                  label="Security" 
                  active={activeTab === "security"} 
                  onClick={() => setActiveTab("security")} 
                />
              </div>
              
              <div className="p-4 border-t border-gray-100 bg-gray-50">
                <button 
                  onClick={initiateLogout} 
                  className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-600 hover:bg-white hover:text-red-600 hover:shadow-sm rounded-xl transition-all duration-200 group"
                >
                  <div className="bg-white p-2 rounded-lg group-hover:bg-red-50 transition-colors">
                    <LogOut size={18} />
                  </div>
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </nav>
          </div>

          {/* =======================
              MAIN CONTENT 
          ======================= */}
          <div className="lg:col-span-3">
            
            {message && (
              <div className={`p-4 rounded-xl mb-6 flex items-center gap-3 shadow-sm animate-fade-in ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                  {message.type === 'success' ? <CheckCircle size={20}/> : <XCircle size={20}/>}
                  <span className="font-medium">{message.text}</span>
              </div>
            )}

            {/* --- PROFILE TAB --- */}
            {activeTab === "profile" && (
               <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="bg-rose-100 p-3 rounded-xl text-rose-600"><User size={24} /></div>
                    <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
                 </div>
                 
                 <form onSubmit={handleProfileUpdate} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <InputGroup label="First Name" value={formData.first_name} onChange={(e) => setFormData({...formData, first_name: e.target.value})} />
                     <InputGroup label="Last Name" value={formData.last_name} onChange={(e) => setFormData({...formData, last_name: e.target.value})} />
                     <InputGroup label="Phone Number" type="tel" icon={<Phone size={18} />} value={formData.phone_number} onChange={(e) => setFormData({...formData, phone_number: e.target.value})} />
                     <InputGroup label="Email Address" type="email" icon={<Mail size={18} />} value={user?.email} disabled />
                   </div>
                   
                   <div className="pt-4 flex justify-end">
                     <button type="submit" disabled={loading} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors shadow-lg shadow-gray-200 disabled:opacity-50">
                       {loading ? "Saving..." : "Save Changes"}
                     </button>
                   </div>
                 </form>
               </div>
            )}

            {/* --- SECURITY TAB --- */}
            {activeTab === "security" && (
               <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                 <div className="flex items-center gap-3 mb-8">
                    <div className="bg-rose-100 p-3 rounded-xl text-rose-600"><Lock size={24} /></div>
                    <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
                 </div>

                 <form onSubmit={handlePasswordChange} className="space-y-5 max-w-lg">
                   <InputGroup label="Current Password" type="password" value={passData.old_password} onChange={(e) => setPassData({...passData, old_password: e.target.value})} />
                   <div className="h-px bg-gray-100 my-4"></div>
                   <InputGroup label="New Password" type="password" value={passData.new_password} onChange={(e) => setPassData({...passData, new_password: e.target.value})} />
                   <InputGroup label="Confirm New Password" type="password" value={passData.confirm_password} onChange={(e) => setPassData({...passData, confirm_password: e.target.value})} />
                   
                   <div className="pt-4">
                     <button type="submit" disabled={loading} className="px-8 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors shadow-lg shadow-gray-200 disabled:opacity-50">
                       {loading ? "Updating..." : "Update Password"}
                     </button>
                   </div>
                 </form>
               </div>
            )}

            {/* --- ORDERS TAB --- */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">Order History</h2>
                    <Link to="/ordernow" className="text-sm font-bold text-rose-600 hover:underline flex items-center gap-1">
                        Place New Order <ChevronRight size={16} />
                    </Link>
                </div>

                {orderLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
                     <div className="relative w-16 h-16 mb-4">
                        <div className="absolute inset-0 border-4 border-rose-100 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-rose-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-gray-500">Loading your orders...</p>
                  </div>
                ) : orders && orders.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {orders.map((order) => (
                      <div 
                        key={order.id} 
                        className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                      >
                        
                        {/* Main Clickable Row */}
                        <div 
                          className="p-4 sm:p-6 cursor-pointer" 
                          onClick={() => toggleOrderDetails(order.id)}
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                              
                              {/* Left Side: Icon & Details */}
                              <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                                <div className={`p-2.5 sm:p-3 rounded-2xl shrink-0 ${
                                    order.status === 'completed' ? 'bg-green-100 text-green-600' : 
                                    order.status === 'cancelled' ? 'bg-red-100 text-red-600' : 
                                    'bg-orange-100 text-orange-600'
                                }`}>
                                    <ShoppingBag size={20} className="sm:w-6 sm:h-6" />
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className="font-bold text-base sm:text-lg text-gray-900 truncate">
                                          #{order.order_number}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border whitespace-nowrap ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    
                                    {/* Metadata: Stack on tiny screens, flex on larger */}
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500">
                                        <span className="flex items-center gap-1 whitespace-nowrap">
                                          <Clock size={12} className="sm:w-3.5 sm:h-3.5" /> 
                                          {new Date(order.created_at).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1 whitespace-nowrap">
                                          <Wallet size={12} className="sm:w-3.5 sm:h-3.5" /> 
                                          {formatCurrency(order.total_amount)}
                                        </span>
                                        <span className="flex items-center gap-1 whitespace-nowrap">
                                          <Package size={12} className="sm:w-3.5 sm:h-3.5" /> 
                                          {order.items?.length || 0} Items
                                        </span>
                                    </div>
                                </div>
                              </div>

                              {/* Right Side: Action Buttons */}
                              <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto mt-2 md:mt-0 border-t md:border-none border-gray-50 pt-3 md:pt-0">
                                
                                {/* --- ACTION BUTTONS --- */}
                                {order.status === 'pending' && !order.is_paid && (
                                  <div className="flex flex-wrap items-center gap-2">
                                    
                                    {/* 1. CANCEL BUTTON */}
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        initiateCancel(order.id);
                                      }}
                                      className="px-3 py-1.5 sm:py-2 text-red-500 bg-red-50 hover:bg-red-100 text-xs font-bold rounded-lg transition border border-red-100 hover:border-red-200"
                                    >
                                      Cancel
                                    </button>

                                    {/* 2. CONFIRM STATUS BUTTON */}
                                    {order.payment_reference && (
                                      <Link 
                                        to={`/payment/verify/${order.payment_reference}`} 
                                        className="px-3 py-1.5 sm:py-2 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-lg hover:bg-yellow-200 transition text-center whitespace-nowrap"
                                        onClick={(e) => e.stopPropagation()}
                                      >
                                        Verify Pay
                                      </Link>
                                    )}

                                    {/* 3. PAY BUTTON */}
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handlePayNow(order.id);
                                      }}
                                      className="px-4 py-1.5 sm:py-2 bg-green-600 text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-green-700 transition shadow-lg shadow-green-200 active:scale-95 whitespace-nowrap"
                                    >
                                      {order.payment_reference ? "Retry" : "Pay Now"}
                                    </button>
                                  </div>      
                                )}
                                
                                {/* Expand Chevron */}
                                <div className={`p-2 rounded-full transition-transform duration-300 ml-auto md:ml-0 ${expandedOrderId === order.id ? 'bg-gray-100 rotate-180' : ''}`}>
                                    <ChevronDown size={20} className="text-gray-400" />
                                </div>
                              </div>
                          </div>
                          
                          {/* Chef Preparing Pulse Animation */}
                          {(order.status === 'processing' || order.status === 'shipped') && expandedOrderId !== order.id && (
                            <div className="mt-4 pt-4 border-t border-gray-50">
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full w-2/3 animate-pulse"></div>
                                </div>
                                <p className="text-xs text-orange-600 font-bold mt-2 flex items-center gap-1">
                                    <ChefHat size={12}/> Chef is preparing your order...
                                </p>
                            </div>
                          )}
                        </div>

                        {/* Expandable Details Panel */}
                        <div className={`transition-all duration-300 ease-in-out ${
                            expandedOrderId === order.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          <div className="px-4 sm:px-6 pb-6 pt-0 border-t border-gray-100 bg-gray-50/30">
                            
                            <OrderTracker status={order.status} />
                            
                            {/* Order Items List */}
                            <div className="mt-6 sm:mt-8 bg-white rounded-xl border border-gray-100 p-4">
                              <h4 className="font-bold text-gray-900 mb-4 text-xs sm:text-sm uppercase tracking-wider">Items Ordered</h4>
                              <div className="space-y-3">
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-gray-50 last:border-0 gap-2">
                                    
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 shrink-0">
                                            <ChefHat size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm line-clamp-1">{item.food_name || item.food?.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-12 sm:pl-0">
                                        <span className="font-bold text-gray-900 text-sm">
                                            {formatCurrency(item.food_price || item.total_price || 0)}
                                        </span>
                                        
                                        {/* Review Button Logic */}
                                        {order.status === 'completed' && (
                                          item.has_reviewed ? (
                                              <span className="text-[10px] sm:text-xs flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-1 rounded-lg border border-green-100 whitespace-nowrap">
                                                  <CheckCircle size={12} /> Reviewed
                                              </span>
                                          ) : (
                                              <button 
                                                  onClick={() => openReviewModal(item, order.id)} 
                                                  className="text-[10px] sm:text-xs flex items-center gap-1 bg-rose-50 text-rose-600 px-2 py-1.5 rounded-lg font-bold hover:bg-rose-100 transition-colors whitespace-nowrap"
                                              >
                                                  <Star size={12} className="fill-rose-600" /> Write Review
                                              </button>
                                          )
                                        )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                                  <span className="text-gray-500 text-sm">Total Paid</span>
                                  <span className="text-xl font-extrabold text-rose-600">{formatCurrency(order.total_amount)}</span>
                              </div>
                            </div>

                            <div className="mt-4 flex gap-2 text-xs text-gray-500 break-words">
                                <MapPin size={14} className="shrink-0" />
                                <span>Delivering to: <span className="font-medium text-gray-700">{order.delivery_address || user?.address || "Saved Address"}</span></span>
                            </div>

                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-12 text-center">
                    <div className="w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <ShoppingBag className="text-rose-300" size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No orders yet</h3>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">Hungry? Explore our menu and place your first order today!</p>
                    <Link to="/ordernow" className="px-8 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-200 inline-block">
                      Browse Menu
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
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
                 <div className="p-4 bg-orange-50 flex justify-center">
                     <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
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
                             Cancel
                         </button>
                         <button 
                             onClick={confirmModal.onConfirm}
                             className="flex-1 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-200"
                         >
                             Yes, I'm sure
                         </button>
                     </div>
                 </div>
             </div>
         </div>
      )}

      {/* =====================
          REVIEW MODAL
      ===================== */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-rose-50">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <MessageSquare size={20} className="text-rose-600" />
                        Rate Item
                    </h3>
                    <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-gray-600 transition"><X size={20} /></button>
                </div>
                
                <form onSubmit={submitReview} className="p-6">
                    <div className="mb-4 text-center">
                        <p className="text-sm text-gray-500 mb-2">How was your...</p>
                        <h4 className="text-xl font-bold text-gray-800">{selectedItem?.food_name || "Food Item"}</h4>
                    </div>

                    {/* Star Rating Input */}
                    <div className="flex justify-center gap-2 mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setReviewForm({...reviewForm, rating: star})}
                                className="transition-transform hover:scale-110 focus:outline-none"
                            >
                                <Star 
                                    size={32} 
                                    fill={star <= reviewForm.rating ? "#FBBF24" : "none"} 
                                    className={star <= reviewForm.rating ? "text-yellow-400" : "text-gray-300"} 
                                />
                            </button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Comments</label>
                        <textarea 
                            required 
                            rows="3" 
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition resize-none"
                            placeholder="Tell us what you liked (or didn't like)..."
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={reviewSubmitting}
                        className="w-full mt-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-200 disabled:opacity-50"
                    >
                        {reviewSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}

// --- HELPER COMPONENTS ---

const OrderTracker = ({ status }) => {
  const steps = [
    { id: 'pending', label: 'Placed', icon: Clock },
    { id: 'processing', label: 'Preparing', icon: ChefHat }, 
    { id: 'shipped', label: 'On Way', icon: Truck },
    { id: 'completed', label: 'Delivered', icon: CheckCircle },
  ];

  let activeIndex = 0;
  if (status === 'processing') activeIndex = 1;
  if (status === 'shipped') activeIndex = 2;
  if (status === 'completed') activeIndex = 3;
  if (status === 'cancelled') activeIndex = -1;

  if (activeIndex === -1) {
    return (
      <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-xl flex items-center gap-3 border border-red-100">
        <XCircle size={24} />
        <div>
            <p className="font-bold">Order Cancelled</p>
            <p className="text-sm">This order was cancelled. Contact support for details.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 mb-4 px-4">
      <div className="relative flex justify-between w-full">
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
        <div 
          className="absolute top-5 left-0 h-1 bg-green-500 z-0 transition-all duration-700 ease-out rounded-full" 
          style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((step, index) => {
          const isCompleted = index <= activeIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                  isCompleted 
                    ? "bg-green-500 border-green-500 text-white shadow-lg scale-110" 
                    : "bg-white border-gray-200 text-gray-300"
                }`}
              >
                <Icon size={16} strokeWidth={3} />
              </div>
              <span 
                className={`text-xs font-bold mt-3 transition-colors duration-300 ${
                  isCompleted ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SidebarBtn = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
        active 
        ? "bg-rose-50 text-rose-600 font-bold shadow-sm" 
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`}
  >
    <div className={`${active ? "text-rose-600" : "text-gray-400"}`}>{icon}</div>
    <span>{label}</span>
    {active && <div className="ml-auto w-1.5 h-1.5 bg-rose-600 rounded-full"></div>}
  </button>
);

const InputGroup = ({ label, type = "text", value, onChange, disabled, icon }) => (
  <div>
    <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-4 top-3.5 text-gray-400">{icon}</div>}
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        disabled={disabled} 
        className={`w-full ${icon ? 'pl-11' : 'px-4'} pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 outline-none transition font-medium ${
            disabled ? "bg-gray-50 text-gray-500 cursor-not-allowed" : "bg-white text-gray-900"
        }`} 
      />
    </div>
  </div>
);