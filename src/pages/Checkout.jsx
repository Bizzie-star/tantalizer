// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { orderAPI, paymentAPI } from '../api/api';
import { 
  MapPin, Phone, User, CreditCard, ShieldCheck, 
  Loader, ArrowLeft, AlertCircle, ShoppingBag, Truck 
} from 'lucide-react';

export default function Checkout() {
  const { items, cartTotal, loading: cartLoading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    address: '',
    city: 'Campus Hostel', 
    phone: '',
    note: ''
  });

  useEffect(() => {
    if (user?.phone_number) {
      setFormData(prev => ({ ...prev, phone: user.phone_number }));
    }
  }, [user]);

  useEffect(() => {
    if (!cartLoading && items.length === 0) {
      navigate('/ordernow');
    }
  }, [items, cartLoading, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount || 0);
  };

  const handlePaystackPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Create Order
      const orderPayload = {
        delivery_address: formData.address,
        delivery_city: formData.city,
        phone_number: formData.phone,
        note: formData.note,
        items: items.map(item => ({
          food: item.food.id,
          quantity: item.quantity
        }))
      };

      const orderResponse = await orderAPI.createOrder(orderPayload);
      const resData = orderResponse.data;
      const orderId = resData.order?.id || resData.id || resData.order_id;

      if (!orderId) throw new Error("Order creation failed. Please try again.");

      // 2. Initialize Payment
      const paymentResponse = await paymentAPI.initialize(orderId);
      const payRes = paymentResponse.data;
      
      const authUrl = payRes.data?.payment_url || payRes.data?.authorization_url || payRes.authorization_url;

      if (authUrl) {
        window.location.href = authUrl; 
      } else {
        throw new Error(payRes.message || "Failed to initialize payment.");
      }

    } catch (err) {
      console.error("Checkout Error:", err);
      let msg = "An unexpected error occurred.";
      if (err.response?.data?.message) msg = err.response.data.message;
      else if (err.message) msg = err.message;
      setError(msg);
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 border-4 border-rose-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-rose-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-gray-500 font-medium">Securing your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <button 
                onClick={() => navigate('/cart')} 
                className="flex items-center text-gray-500 hover:text-rose-600 transition group font-medium"
            >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
                Back to Cart
            </button>
            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-bold border border-green-100">
                <ShieldCheck size={16} /> Secure Checkout
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN: Shipping Form (Takes 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8">
              
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600">
                    <Truck size={20} />
                </div>
                Delivery Details
              </h2>

              {error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm flex items-start gap-3 animate-fade-in">
                  <AlertCircle size={20} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="font-bold mb-1">Payment Initialization Failed</p>
                    <span className="whitespace-pre-wrap">{error}</span>
                  </div>
                </div>
              )}

              <form id="checkout-form" onSubmit={handlePaystackPayment} className="space-y-6">
                
                {/* Contact Info Group */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Contact Info</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    disabled
                                    value={user ? `${user.first_name} ${user.last_name}` : ''}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl bg-white text-gray-500 cursor-not-allowed font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    placeholder="e.g. 08012345678"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Address Group */}
                <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Delivery Location</h3>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Hostel / Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="e.g. Hall 3, Block C, Room 102"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">City / Area</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Note (Optional)</label>
                            <textarea
                                name="note"
                                rows="2"
                                placeholder="e.g. Call me when you are at the gate"
                                value={formData.note}
                                onChange={handleChange}
                                className="block w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition bg-white resize-none"
                            />
                        </div>
                    </div>
                </div>

              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Summary (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <ShoppingBag size={20} className="text-rose-600" /> Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start py-3 border-b border-gray-50 last:border-0">
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-rose-50 rounded flex items-center justify-center text-xs font-bold text-rose-600 shrink-0 border border-rose-100">
                        {item.quantity}x
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.food.name}</p>
                        {item.food.category?.name && (
                          <p className="text-xs text-gray-500">{item.food.category.name}</p>
                        )}
                      </div>
                    </div>
                    <span className="font-medium text-gray-900 text-sm">{formatPrice(item.total_price)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t-2 border-dashed border-gray-100 mb-8">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal.subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Delivery Fee</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-xl font-extrabold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-rose-600">{formatPrice(cartTotal.total)}</span>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="submit"
                form="checkout-form"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-green-200 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin" size={20} /> Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={20} /> Pay Now
                  </>
                )}
              </button>

              <div className="mt-6 flex flex-col items-center gap-2 text-xs text-gray-400">
                 <p className="flex items-center gap-1"><ShieldCheck size={12} /> Payments processed securely by Paystack</p>
                 <div className="flex gap-2 opacity-50">
                    {/* Add Paystack/Card logos here if you have them, or use simple divs */}
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                 </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}