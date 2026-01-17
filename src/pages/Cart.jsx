import React, { useState } from 'react';

export default function Cart() {
  // Sample cart items - replace with real cart data later
  const [cartItems, setCartItems] = useState([
    { id: '1', name: 'Jollof Rice with Chicken', price: 3500, quantity: 2 },
    { id: '2', name: 'Egusi Soup with Pounded Yam', price: 4500, quantity: 1 },
    { id: '5', name: 'Chapman Drink', price: 1500, quantity: 3 },
    { id: '8', name: 'Puff Puff (6 pieces)', price: 1200, quantity: 2 },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Format price in Naira with proper commas and two decimals
  const formatPrice = (amount) => {
    const amountStr = Number(amount).toFixed(2);
    const [integerPart, decimalPart] = amountStr.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `₦${formattedInteger}.${decimalPart}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
            <span role="img" aria-label="shopping cart"></span>
            My Cart - B's Kitchen
          </h1>
          <div className="bg-white rounded-lg shadow-md p-16">
            <p className="text-2xl text-gray-600 mb-6">Your cart is empty!!!</p>
            <a
              href="/order"
              className="inline-block bg-blue-600 text-white font-bold text-xl py-4 px-8 rounded-lg hover:bg-blue-700 transition"
            >
              Browse Menu
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <span role="img" aria-label="shopping cart"></span>
            My Cart - B's Kitchen
          </h1>
          <p className="text-gray-600 mt-2">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
          <p className="text-lg text-blue-600 mt-2 font-medium">Delicious meals made with love </p>
        </div>

        {/* Cart Items */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Your Order</h2>

          <div className="space-y-6">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between py-6 border-b border-gray-200 last:border-0"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-medium">{item.name}</h3>
                  <p className="text-gray-600">{formatPrice(item.price)} each</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-4 py-2 text-xl hover:bg-gray-100 rounded-l-lg"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 text-lg font-semibold min-w-16 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-4 py-2 text-xl hover:bg-gray-100 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-32">
                    <p className="text-xl font-bold text-blue-600">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-red-600 hover:text-red-800 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-right mb-8">
            <p className="text-3xl font-bold text-blue-600">
              Total: {formatPrice(subtotal)}
            </p>
          </div>

          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white font-bold text-xl py-4 rounded-lg hover:bg-blue-700 transition">
              Proceed to Checkout 💳
            </button>

            <a
              href="/order"
              className="block w-full text-center border-2 border-blue-600 text-blue-600 font-bold text-xl py-4 rounded-lg hover:bg-blue-50 transition"
            >
              Continue Shopping ←
            </a>
          </div>
        </div>

        <p className="text-center text-gray-600 mt-10">
          Freshly prepared by B's Kitchen • Ready in 15-25 minutes • Thank you for choosing us! 🍲
        </p>
      </div>
    </div>
  );
}