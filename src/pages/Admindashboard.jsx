// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useMenu } from "../contexts/MenuContext"; 
import { orderAPI, menuAPI, authAPI, reviewAPI } from "../api/api";
import { 
  LayoutDashboard, Users, User, ShoppingBag, UtensilsCrossed, Phone, PanelLeft,
  Settings, LogOut, DollarSign, Search, MessageSquare, Star, CheckCircle, XCircle,
  Plus, Trash2, Edit, X, UploadCloud, Loader, TrendingUp, Filter, Truck, AlertTriangle, AlertCircle, MapPin, ShieldCheck
} from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  
  // Menu Context
  const { 
    foods, categories, addFood, deleteFood, getAdminFoods, getCategories, 
    loading: menuLoading 
  } = useMenu();
  
  // Persist Active Tab
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("adminActiveTab") || "overview";
  });

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  // Local State
  const [usersList, setUsersList] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  // Mobile Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal & Form State
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  // --- ALERT & CONFIRM MODAL STATES ---
  const [alertModal, setAlertModal] = useState({ show: false, type: 'success', title: '', message: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, title: '', message: '', onConfirm: null });

  const [formData, setFormData] = useState({
    name: "", description: "", price: "", category: "", 
    preparation_time: 15, is_available: true
  });

  // --- 1. DATA FETCHING ---
  useEffect(() => {
    const fetchData = async () => {
        if (activeTab === "menu" || activeTab === "overview" || showModal) {
            await Promise.all([getAdminFoods(), getCategories()]);
        }
        if (activeTab === "orders" || activeTab === "overview") {
            await fetchAllOrders();
        }
        if (activeTab === "users") {
            await fetchUsers();
        }
        if (activeTab === "reviews") {
            await fetchReviews();
        }
    };
    fetchData();
  }, [activeTab, showModal]);

  const fetchAllOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await orderAPI.getAllOrders();
      setOrders(response.data.results || response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const toggleOrderDetails = (orderId) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null); 
        } else {
            setExpandedOrderId(orderId); 
        }
    };

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const response = await authAPI.getAllUsers();
      setUsersList(response.data.results || response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const response = await reviewAPI.getAllReviews();
      setReviews(response.data.results || response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setReviewsLoading(false);
    }
  };

  // --- 2. HELPERS ---
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount || 0);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'processing': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPaymentColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'successful': 
      case 'paid':
      case 'verified':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const showAlert = (type, title, msg) => {
    setAlertModal({ show: true, type, title, message: msg });
  };

  const closeAlert = () => {
    setAlertModal(prev => ({ ...prev, show: false }));
  };

  const closeConfirm = () => {
    setConfirmModal(prev => ({ ...prev, show: false }));
  };

  const totalRevenue = orders.reduce((acc, order) => acc + Number(order.total_amount || 0), 0);
  
  const stats = [
    { label: "Total Users", value: usersList.length > 0 ? usersList.length : "120+", icon: <Users size={24} />, color: "bg-blue-500", bg: "bg-blue-50" },
    { label: "Total Orders", value: orders.length, icon: <ShoppingBag size={24} />, color: "bg-red-500", bg: "bg-red-50" },
    { label: "Revenue", value: formatCurrency(totalRevenue), icon: <DollarSign size={24} />, color: "bg-green-500", bg: "bg-green-50" },
    { label: "Menu Items", value: foods.length, icon: <UtensilsCrossed size={24} />, color: "bg-orange-500", bg: "bg-orange-50" },
  ];

  const filteredFoods = foods.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- 3. ACTIONS ---

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({ name: "", description: "", price: "", category: "", preparation_time: 15, is_available: true });
    setImageFile(null);
    setShowModal(true);
  };

  const handleEditClick = (food) => {
    setEditingId(food.id);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.current_price || food.price,
      category: food.category?.id || food.category || "", 
      preparation_time: food.preparation_time,
      is_available: food.is_available
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (!formData.category) { 
          showAlert('error', 'Validation Error', "Please select a category");
          setSubmitting(false); 
          return; 
      }

      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('description', formData.description);
      payload.append('price', formData.price);
      payload.append('preparation_time', formData.preparation_time);
      payload.append('is_available', formData.is_available ? 'True' : 'False');
      payload.append('category', formData.category);

      if (imageFile) {
        payload.append('image', imageFile);
      }

      let result;
      if (editingId) {
        const response = await menuAPI.updateFood(editingId, payload);
        result = { success: true, data: response.data };
        getAdminFoods();
      } else {
        result = await addFood(payload);
      }
      
      if (result.success) {
        setShowModal(false);
        showAlert('success', 'Success', editingId ? 'Item updated successfully!' : 'Item created successfully!');
      } else {
        showAlert('error', 'Operation Failed', result.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      showAlert('error', 'Error', "Failed to save item.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- DELETE FOOD LOGIC ---
  const initiateDeleteFood = (id) => {
      setConfirmModal({
          show: true,
          title: "Delete Menu Item?",
          message: "Are you sure you want to delete this food item? This action cannot be undone.",
          onConfirm: () => proceedWithDeleteFood(id)
      });
  };

  const proceedWithDeleteFood = async (id) => {
    closeConfirm();
    const result = await deleteFood(id);
    if (!result.success) {
        showAlert('error', 'Delete Failed', result.error || 'Could not delete item.');
    } else {
        showAlert('success', 'Deleted', 'Menu item has been removed.');
    }
  };

  // --- UPDATE ORDER STATUS LOGIC ---
  const initiateUpdateStatus = (orderId, newStatus) => {
      setConfirmModal({
          show: true,
          title: "Update Order Status?",
          message: `Are you sure you want to mark Order #${orderId} as ${newStatus}?`,
          onConfirm: () => proceedWithUpdateStatus(orderId, newStatus)
      });
  };

  const proceedWithUpdateStatus = async (orderId, newStatus) => {
    closeConfirm();
    try {
      await orderAPI.updateStatus(orderId, newStatus);
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      showAlert('success', 'Status Updated', `Order #${orderId} is now ${newStatus}.`);
    } catch (error) {
      let msg = "Failed to update status.";
      if (error.response?.data) msg += "\n" + JSON.stringify(error.response.data);
      showAlert('error', 'Update Failed', msg);
    }
  };

  const handleToggleApproval = async (reviewId) => {
    try {
      setReviews(prev => prev.map(r => 
        r.id === reviewId ? { ...r, is_approved: !r.is_approved } : r
      ));
      await reviewAPI.toggleApproval(reviewId);
    } catch (error) {
      console.error("Failed to toggle approval:", error);
      showAlert('error', 'Error', "Failed to update review status");
      fetchReviews(); 
    }
  };

  const initiateLogout = () => {
      setConfirmModal({
          show: true,
          title: "Sign Out?",
          message: "Are you sure you want to log out of the admin panel?",
          onConfirm: () => {
              closeConfirm();
              logout();
          }
      });
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[10px] flex font-sans">
      
      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed top-0 bottom-0 left-0 w-64 bg-white border-r border-gray-200 z-40 
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:fixed lg:top-20 lg:h-[calc(100vh-80px)] lg:block
      `}>
        <div className="flex flex-col h-full">
            <div className="p-6 flex items-center justify-between lg:hidden">
                <div className="flex items-center gap-3">
                    <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                        <LayoutDashboard size={20} />
                    </div>
                    <span className="font-bold text-gray-800 tracking-tight">Admin Panel</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-rose-600">
                    <X size={24} />
                </button>
            </div>

            <div className="hidden lg:flex items-center gap-3 mb-8 px-8 pt-6">
                <div className="bg-rose-100 p-2 rounded-lg text-rose-600">
                    <LayoutDashboard size={20} />
                </div>
                <span className="font-bold text-gray-800 tracking-tight">Admin Panel</span>
            </div>

            <div className="flex-1 overflow-y-auto px-6">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Main Menu</h2>
                <nav className="space-y-1">
                    <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === "overview"} onClick={() => handleNavClick("overview")} />
                    <SidebarItem icon={<ShoppingBag size={18} />} label="Orders" active={activeTab === "orders"} onClick={() => handleNavClick("orders")} />
                    <SidebarItem icon={<UtensilsCrossed size={18} />} label="Menu Items" active={activeTab === "menu"} onClick={() => handleNavClick("menu")} />
                    <SidebarItem icon={<Users size={18} />} label="Customers" active={activeTab === "users"} onClick={() => handleNavClick("users")} />
                    <SidebarItem icon={<MessageSquare size={18} />} label="Reviews" active={activeTab === "reviews"} onClick={() => handleNavClick("reviews")} />
                </nav>
            </div>
            
            <div className="p-4 border-t border-gray-100">
                <button onClick={initiateLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors group">
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-45 p-4 sm:p-8 overflow-x-hidden pt-20 lg:pt-5">
        <div className="max-w-7xl mx-auto">
          
          <header className="mb-8 flex items-center gap-4">
            <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden relative group p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-rose-500/10 hover:border-rose-100 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 active:translate-y-0"
            >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <PanelLeft 
                    size={24} 
                    className="relative z-10 text-gray-500 group-hover:text-rose-600 transition-colors duration-300" 
                />
            </button>
            
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 capitalize mb-1">{activeTab}</h1>
                <p className="text-sm sm:text-base text-gray-500">Manage your restaurant efficiently.</p>
            </div>
          </header>

          {activeTab === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color.replace('bg-', 'text-')}`}>
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* === ORDERS TABLE === */}
          {(activeTab === "orders" || activeTab === "overview") && (
             <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <ShoppingBag size={20} className="text-gray-400" /> Recent Orders
                    </h2>
                    {activeTab === "overview" && (
                        <button onClick={() => setActiveTab("orders")} className="text-sm font-medium text-rose-600 hover:text-rose-700">View All</button>
                    )}
                </div>
                
                {ordersLoading ? (
                    <div className="p-12 flex justify-center"><Loader className="animate-spin text-rose-600" /></div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Payment</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Total</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {orders.slice(0, activeTab === "overview" ? 5 : undefined).map(order => (
                                  <React.Fragment key={order.id}>
                                      <tr 
                                          onClick={() => toggleOrderDetails(order.id)} 
                                          className={`cursor-pointer transition-colors ${
                                              expandedOrderId === order.id ? 'bg-rose-50/50' : 'hover:bg-gray-50/80'
                                          }`}
                                      >
                                          <td className="px-6 py-4 font-medium text-gray-900">
                                              #{order.order_number}
                                              {expandedOrderId === order.id && (
                                                  <span className="block text-[10px] text-rose-600 font-bold mt-1">Viewing Details</span>
                                              )}
                                          </td>
                                          <td className="px-6 py-4 text-gray-600">
                                              <div className="font-medium text-gray-900">{order.user_name || "Guest"}</div>
                                              <div className="text-xs text-gray-400">{order.user_email}</div>
                                          </td>
                                          
                                          {/* Payment Status Cell */}
                                          <td className="px-6 py-4">
                                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getPaymentColor(order.payment_status)}`}>
                                                  {order.payment_status || 'Pending'}
                                              </span>
                                          </td>

                                          <td className="px-6 py-4">
                                              <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                                                  {order.status}
                                              </span>
                                          </td>
                                          <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(order.total_amount)}</td>
                                          
                                          <td className="px-6 py-4 text-right">
                                              <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                  {order.status === 'pending' && (
                                                      <>
                                                        {(order.payment_status === 'successful' || order.payment_status === 'verified') ? (
                                                            <button 
                                                                onClick={() => initiateUpdateStatus(order.id, 'shipped')} 
                                                                className="group flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all"
                                                            >
                                                                <Truck size={14} /> <span>Ship order</span>
                                                            </button>
                                                        ) : (
                                                            <span className="flex items-center gap-1 text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded border border-red-100 whitespace-nowrap" title="Verify payment first">
                                                                <AlertTriangle size={12} /> No Payment
                                                            </span>
                                                        )}
                                                      </>
                                                  )}

                                                  {order.status === 'shipped' && (
                                                      <button 
                                                          onClick={() => initiateUpdateStatus(order.id, 'completed')} 
                                                          className="group flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg shadow-md hover:bg-green-700 transition-all"
                                                      >
                                                          <CheckCircle size={14} /> <span>Complete order</span>
                                                      </button>
                                                  )}
                                              </div>
                                          </td>
                                      </tr>

                                      {/* --- EXPANDED DETAILS ROW (Shows Products) --- */}
                                      {expandedOrderId === order.id && (
                                          <tr>
                                              <td colSpan="6" className="p-0 border-b border-gray-100">
                                                  <div className="bg-gray-50 p-6 shadow-inner">
                                                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                          <ShoppingBag size={16} /> Order Contents & Instructions
                                                      </h4>
                                                      
                                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                                              {order.items.map((item, idx) => (
                                                                  <div key={idx} className="p-3 flex justify-between items-start border-b border-gray-100 last:border-0">
                                                                      <div className="flex gap-3">
                                                                          <div className="bg-rose-50 text-rose-600 w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold">
                                                                              {item.quantity}x
                                                                          </div>
                                                                          <div>
                                                                              <p className="font-bold text-sm text-gray-800">{item.food_name}</p>
                                                                              
                                                                              {(item.selected_variant || (item.selected_addons && item.selected_addons.length > 0)) && (
                                                                                  <p className="text-xs text-gray-500">
                                                                                      {item.selected_variant} 
                                                                                      {item.selected_addons && ` + ${item.selected_addons.join(', ')}`}
                                                                                  </p>
                                                                              )}

                                                                              {item.notes && (
                                                                                  <p className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded mt-1 border border-orange-100 inline-block font-medium">
                                                                                      Item Note: {item.notes}
                                                                                  </p>
                                                                              )}
                                                                          </div>
                                                                      </div>
                                                                      <span className="font-bold text-sm text-gray-700">
                                                                          {formatCurrency(item.total_price || item.food_price)}
                                                                      </span>
                                                                  </div>
                                                              ))}
                                                              <div className="p-3 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                                                                  <span className="text-xs font-bold text-gray-500 uppercase">Subtotal</span>
                                                                  <span className="font-bold text-rose-600">{formatCurrency(order.total_amount)}</span>
                                                              </div>
                                                          </div>

                                                          {/* Delivery Info Column */}
                                                          <div className="space-y-4">
                                                              <div className="bg-white p-4 rounded-xl border border-gray-200 h-full">
                                                                  <h5 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                                                                    <Truck size={14} /> Delivery Details
                                                                  </h5>
                                                                  
                                                                  <div className="space-y-3">
                                                                      <div>
                                                                          <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Address</p>
                                                                          <p className="text-sm font-medium text-gray-900 flex items-start gap-2">
                                                                             <MapPin size={16} className="text-rose-500 shrink-0 mt-0.5" />
                                                                             {order.delivery_address || "No address provided"}
                                                                          </p>
                                                                      </div>
                                                                      
                                                                      <div>
                                                                          <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Phone</p>
                                                                          <p className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                                              <Phone size={16} className="text-rose-500" />
                                                                              {order.phone_number || "No phone provided"}
                                                                          </p>
                                                                      </div>

                                                                      {/* FIXED: Check for any possible delivery instruction field */}
                                                                      {(() => {
                                                                          const instruction = order.note || order.notes || order.delivery_note || order.delivery_notes;
                                                                          
                                                                          if (instruction) {
                                                                              return (
                                                                                  <div className="mt-2 text-xs bg-amber-50 text-amber-900 p-3 rounded-lg border border-amber-100">
                                                                                      <strong className="block mb-1 text-amber-700 flex items-center gap-1">
                                                                                          <AlertCircle size={12} /> Delivery Instruction:
                                                                                      </strong>
                                                                                      {instruction}
                                                                                  </div>
                                                                              );
                                                                          }
                                                                          return null;
                                                                      })()}

                                                                      {/* ADMIN NOTE */}
                                                                      {order.admin_notes && (
                                                                          <div className="mt-2 text-xs bg-blue-50 text-blue-900 p-3 rounded-lg border border-blue-100">
                                                                              <strong className="block mb-1 text-blue-700 flex items-center gap-1">
                                                                                  <ShieldCheck size={12} /> Admin Internal Note:
                                                                              </strong>
                                                                              {order.admin_notes}
                                                                          </div>
                                                                      )}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </td>
                                          </tr>
                                      )}
                                  </React.Fragment>
                              ))}
                          </tbody>
                        </table>
                    </div>
                )}
             </div>
          )}

          {/* ... (Menu, Users, Reviews sections kept as is) ... */}
          {activeTab === "menu" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* ... Menu Table Code ... */}
              <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative w-full sm:w-96 group">
                  <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search menu items..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-sm" 
                  />
                </div>
                <button onClick={handleAddNew} className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-rose-600 transition-all flex items-center gap-2 shadow-lg shadow-gray-200">
                    <Plus size={16} /> Add Item
                </button>
              </div>

              {menuLoading ? (
                <div className="p-12 flex justify-center"><Loader className="animate-spin text-rose-600" /></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Item</th>
                        <th className="px-6 py-4">Category</th>
                        <th className="px-6 py-4">Price</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredFoods.map((food) => (
                        <tr key={food.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                                {food.image ? (
                                    <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300"><UtensilsCrossed size={16} /></div>
                                )}
                              </div>
                              <span className="font-medium text-gray-900">{food.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            <span className="bg-gray-100 px-2 py-1 rounded text-xs">{food.category?.name || "General"}</span>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(food.current_price || food.price)}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${food.is_available ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${food.is_available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                              {food.is_available ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEditClick(food)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button onClick={() => initiateDeleteFood(food.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "users" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Users size={20} className="text-gray-400" /> Registered Customers
                </h2>
              </div>
              
              {usersLoading ? (
                <div className="p-12 flex justify-center"><Loader className="animate-spin text-rose-600" /></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Email</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Role</th>
                        <th className="px-6 py-4">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {usersList.map((customer) => (
                        <tr key={customer.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-xs border border-rose-100">
                                {customer.first_name?.[0] || <User size={14} />}
                              </div>
                              <span className="font-medium text-gray-900">
                                {customer.first_name} {customer.last_name}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{customer.email}</td>
                          <td className="px-6 py-4 text-gray-500 text-sm">{customer.phone_number || "N/A"}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                                customer.is_staff ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                                {customer.is_staff ? 'Admin' : 'User'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(customer.date_joined || Date.now()).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <MessageSquare size={20} className="text-gray-400" /> Customer Reviews
                </h2>
              </div>

              {reviewsLoading ? (
                <div className="p-12 flex justify-center"><Loader className="animate-spin text-rose-600" /></div>
              ) : reviews.length === 0 ? (
                 <div className="p-12 text-center text-gray-500">No reviews found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[700px]">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                      <tr>
                        <th className="px-6 py-4">User</th>
                        <th className="px-6 py-4">Item</th>
                        <th className="px-6 py-4">Rating</th>
                        <th className="px-6 py-4">Comment</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Moderation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reviews.map((review) => (
                        <tr key={review.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4 font-medium text-gray-900 text-sm">
                            {review.user_name || "Anonymous"}
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm">
                            {review.food_details?.name || "Unknown Item"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  fill={i < review.rating ? "currentColor" : "none"} 
                                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
                                />
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                            {review.comment}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                              review.is_approved 
                                ? "bg-green-50 text-green-700 border-green-100" 
                                : "bg-red-50 text-red-700 border-red-100"
                            }`}>
                              {review.is_approved ? "Visible" : "Hidden"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                             <button 
                               onClick={() => handleToggleApproval(review.id)}
                               className={`p-2 rounded-lg transition-colors ${
                                 review.is_approved 
                                   ? "text-red-500 hover:bg-red-50" 
                                   : "text-green-500 hover:bg-green-50"
                               }`}
                               title={review.is_approved ? "Hide Review" : "Approve Review"}
                             >
                               {review.is_approved ? <XCircle size={18} /> : <CheckCircle size={18} />}
                             </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Edit/Create Item Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-bold text-gray-900">{editingId ? "Edit Item" : "Add New Item"}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSaveItem} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Item Name</label>
                    <input required className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Price (₦)</label>
                    <input required type="number" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                <select className="w-full p-2.5 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-rose-500/20 outline-none text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="">Select Category</option>
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                <textarea required rows="3" className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 outline-none transition text-sm resize-none" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => setImageFile(e.target.files[0])} />
                <div className="flex flex-col items-center gap-2 text-gray-400">
                    <UploadCloud size={24} />
                    <span className="text-sm font-medium">{imageFile ? imageFile.name : "Click to upload image"}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input type="checkbox" id="avail" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={formData.is_available} onChange={e => setFormData({...formData, is_available: e.target.checked})} />
                    <label htmlFor="avail" className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${formData.is_available ? 'bg-green-500' : 'bg-gray-300'}`}></label>
                </div>
                <label htmlFor="avail" className="text-sm font-medium text-gray-700">Available for Order</label>
              </div>

              <button type="submit" disabled={submitting} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-rose-600 transition-all shadow-lg shadow-gray-200 disabled:opacity-50">
                {submitting ? "Saving..." : (editingId ? "Update Item" : "Create Item")}
              </button>
            </form>
          </div>
        </div>
      )}

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

    </div>
  );
}

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm mb-1 ${active ? "bg-rose-50 text-rose-600 font-medium" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}`}>
    {icon} <span>{label}</span>
  </button>
);