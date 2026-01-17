import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
  const { cart, loading, total, updateCartItem, removeCartItem, fetchCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Ensure cart is fresh when the component mounts
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/signup');
    } else {
      navigate('/checkout'); // Or wherever your checkout flow starts
    }
  };

  if (loading && cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
            🛒 My Cart - B's Kitchen
          </h1>
          <div className="bg-white rounded-lg shadow-md p-16">
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty!!!</p>
            <Link
              to="/ordernow"
              className="inline-block bg-blue-600 text-white font-bold text-xl py-4 px-8 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            🛒 My Cart - B's Kitchen
          </h1>
          <p className="text-gray-600 mt-2">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Your Order</h2>
            <div className="divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-6">
                  <div className="flex items-center gap-4 flex-1">
                    {item.food.image && (
                      <img 
                        src={item.food.image} 
                        alt={item.food.name} 
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-medium">{item.food.name}</h3>
                      <p className="text-gray-600">{formatPrice(item.unit_price)} each</p>
                      {item.selected_variant && (
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {item.selected_variant}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-xl hover:bg-gray-100 rounded-l-lg"
                      >
                        −
                      </button>
                      <span className="px-4 py-1 text-lg font-semibold min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartItem(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-xl hover:bg-gray-100 rounded-r-lg"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="text-xl font-bold text-blue-600">
                        {formatPrice(item.total_price)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeCartItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      title="Remove item"
                    >
                      <span className="text-2xl">×</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Summary */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <span className="text-2xl font-medium text-gray-700">Subtotal</span>
            <span className="text-3xl font-bold text-blue-600">
              {formatPrice(total)}
            </span>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white font-bold text-xl py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              Proceed to Checkout 💳
            </button>

            <Link
              to="/ordernow"
              className="block w-full text-center border-2 border-blue-600 text-blue-600 font-bold text-xl py-4 rounded-lg hover:bg-blue-50 transition"
            >
              Continue Shopping ←
            </Link>
          </div>
        </div>

        <p className="text-center text-gray-600 mt-10 italic">
          Freshly prepared by B's Kitchen • Ready in 15-25 minutes • Thank you for choosing us! 🍲
        </p>
      </div>
    </div>
  );
}