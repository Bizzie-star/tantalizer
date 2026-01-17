import React, { useState } from 'react';

export default function SignUp() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would connect to authentication
    if (phone && password) {
      alert(`Welcome back! Signing you in with phone: ${phone} `);
      // You can redirect to /order or dashboard here
    } else {
      alert('Please enter your phone number and password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <span className="text-6xl"></span>
          </div>
          {/* Replace above with your logo when ready */}
          {/* <img src="/path-to-logo.png" alt="B's Kitchen" className="w-48 mx-auto mb-6" /> */}

          <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
          <p className="text-xl text-gray-600 mt-3">Sign in to B's Kitchen</p>
          <p className="text-lg text-gray-600 mt-2">
            Order faster, track your favorites 
          </p>
        </div>

        {/* Sign In Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="tel"
                placeholder="e.g. emybassey@gmail.com"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
              <p className="text-sm text-gray-500 mt-2">
             
              </p>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold text-xl py-4 rounded-lg hover:bg-blue-700 transition shadow-lg"
            >
              Sign In 
            </button>
          </form>

          {/* Forgot Password & Sign Up Links */}
          <div className="mt-8 text-center space-y-3">
            <a href="/forgot-password" className="text-blue-600 hover:underline text-lg">
              Forgot your password?
            </a>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-700">
                New to B's Kitchen?
              </p>
              <a
                href="/signup"
                className="inline-block mt-3 text-blue-600 font-bold text-xl hover:underline"
              >
                Create an Account →
              </a>
            </div>
          </div>
        </div>

        {/* Guest Option */}
        <div className="text-center mt-8">
          <p className="text-gray-600">Don't want to sign in?</p>
          <a
            href="/order"
            className="inline-block mt-3 bg-gray-200 text-gray-800 font-bold text-lg py-3 px-8 rounded-lg hover:bg-gray-300 transition"
          >
            Continue as Guest 
          </a>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-12 text-gray-600 text-sm">
          B's Kitchen — Fresh meals, made with love on campus 
        </p>
      </div>
    </div>
  );
}