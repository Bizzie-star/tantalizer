// src/components/Header.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut, ChevronDown, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext"; // Ensure this path is correct
import log from "../assets/logo.jpg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [confirmModal, setConfirmModal] = useState({ 
    show: false, 
    title: '', 
    message: '', 
    onConfirm: null 
  });

  const { user, logout } = useAuth();
  
  // --- CART COUNT LOGIC ---
  const { cartItems } = useCart(); 

  // Debugging: Check your console to see if items are actually arriving
  // console.log("Header Cart Items:", cartItems);

  // Robust calculation: Handles if quantity is a string ("1") or missing
  const cartCount = (cartItems || []).reduce((total, item) => {
      const qty = parseInt(item.quantity) || 1; // Default to 1 if quantity is missing or 0
      return total + qty;
  }, 0);

  const navigate = useNavigate();
  const location = useLocation();

  const isAdmin = user?.is_staff || user?.is_superuser;
  const dashboardPath = isAdmin ? "/admindashboard" : "/userdashboard";
  const homeDestination = user ? dashboardPath : "/";

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const performLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const allNavItems = [
    { label: "Order Now", to: "/ordernow", hideForAdmin: true }, 
    { label: "Franchise", to: "/franchise", hideForAdmin: true }, 
    { label: "Outlets", to: "/outlet", hideForAdmin: true },      
  ];

  const navItems = allNavItems.filter(item => 
    isAdmin ? !item.hideForAdmin : true
  );

  const isActive = (path) => location.pathname === path;

  // --- MODAL HELPERS ---
  const closeConfirm = () => {
    setConfirmModal(prev => ({ ...prev, show: false }));
  };

  const initiateLogout = () => {
    setConfirmModal({
        show: true,
        title: "Log Out?",
        message: "Are you sure you want to log out of your account?",
        onConfirm: () => {
            closeConfirm();
            performLogout();
        }
    });
  };

  return (
    <>
      {/* 1. MAIN HEADER BAR */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "bg-white/95 backdrop-blur-md shadow-md border-gray-200 py-2" 
            : "bg-white border-transparent py-3 md:py-4"
        }`}
      >
        <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 w-full ${isAdmin ? 'max-w-[1440px]' : 'max-w-7xl'}`}>
          <div className="flex justify-between items-center h-full">
            
            {/* Logo Section */}
            <Link to={homeDestination} className="flex items-center gap-2 md:gap-3 group shrink-0">
              <div className="relative overflow-hidden rounded-full border-2 border-rose-100 shadow-sm group-hover:border-rose-200 transition-colors">
                <img src={log} alt="B's Kitchen" className="h-8 w-8 md:h-10 md:w-10 object-cover" />
              </div>
              <span className="font-bold text-lg md:text-xl tracking-tight text-gray-900 group-hover:text-rose-600 transition-colors whitespace-nowrap">
                B's <span className="text-rose-600">Kitchen</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className={`relative text-sm font-semibold transition-colors duration-300 ${
                        isActive(item.to) ? "text-rose-600" : "text-gray-600 hover:text-rose-600"
                      }`}
                    >
                      {item.label}
                      {isActive(item.to) && (
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="h-6 w-px bg-gray-200 mx-2"></div>

              {/* Desktop Auth & Actions */}
              <div className="flex items-center gap-4">
                {user ? (
                  <>
                    {!isAdmin && (
                      <Link 
                        to="/cart" 
                        className="relative p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-all"
                        title="View Cart"
                      >
                        <ShoppingCart size={22} />
                        
                        {/* NOTIFICATION BADGE */}
                        {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-scale-in">
                            {cartCount}
                          </span>
                        )}
                      </Link>
                    )}

                    <div className="relative group">
                      <Link 
                        to={dashboardPath}
                        className="flex items-center gap-2 pl-1 pr-3 py-1.5 rounded-full border border-gray-200 hover:border-rose-200 hover:bg-rose-50 transition-all"
                      >
                        <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-sm">
                          {user.first_name?.[0] || <User size={16} />}
                        </div>
                        <span className="text-sm font-medium text-gray-700 max-w-[80px] truncate">
                          {user.first_name || "Account"}
                        </span>
                        <ChevronDown size={14} className="text-gray-400" />
                      </Link>
                    </div>

                    <button 
                      onClick={initiateLogout} 
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Logout"
                    >
                      <LogOut size={20} />
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link 
                      to="/login"
                      className="text-sm font-semibold text-gray-600 hover:text-rose-600 transition-colors"
                    >
                      Log In
                    </Link>
                    <Link 
                      to="/register"
                      className="px-5 py-2.5 bg-rose-600 text-white text-sm font-bold rounded-full shadow-lg shadow-rose-200 hover:bg-rose-700 hover:shadow-rose-300 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Toggle & Cart */}
            <div className="flex items-center gap-3 md:gap-4 lg:hidden shrink-0">
              {user && !isAdmin && (
                <Link to="/cart" className="relative text-gray-600 p-1">
                  <ShoppingCart size={24} />
                  
                  {/* MOBILE BADGE */}
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </Link>
              )}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-rose-600 transition-colors focus:outline-none p-1"
              >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MOBILE MENU OVERLAY */}
      <div 
        className={`lg:hidden fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* 3. MOBILE MENU PANEL */}
      <div
        className={`lg:hidden fixed inset-y-0 right-0 z-[70] w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 flex justify-between items-center border-b border-gray-100">
            <span className="font-bold text-lg text-gray-800">Menu</span>
            <button onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-rose-600">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-5 space-y-6">
            {/* User Profile Snippet (Mobile) */}
            {user && (
              <Link 
                to={dashboardPath} 
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-4 p-4 bg-rose-50 rounded-xl mb-6"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-rose-600 font-bold text-xl shadow-sm">
                  {user.first_name?.[0] || <User />}
                </div>
                <div>
                  <p className="font-bold text-gray-900">Hi, {user.first_name || "Guest"}</p>
                  <p className="text-xs text-rose-600 font-medium">
                    {isAdmin ? "Admin Panel" : "My Dashboard"}
                  </p>
                </div>
              </Link>
            )}

            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`text-lg font-medium px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.to) 
                      ? "bg-rose-50 text-rose-600" 
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="p-5 border-t border-gray-100">
            {user ? (
              <button 
                onClick={initiateLogout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
              >
                <LogOut size={18} /> Log Out
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <Link 
                  to="/login"
                  onClick={() => setMenuOpen(false)} 
                  className="flex justify-center py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                >
                  Log In
                </Link>
                <Link 
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex justify-center py-3 bg-rose-600 text-white font-semibold rounded-xl hover:bg-rose-700 shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. CONFIRM MODAL */}
      {confirmModal.show && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
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
                             Yes, Log Out
                         </button>
                     </div>
                 </div>
             </div>
         </div>
      )}

    </>
  );
}

export default Header;