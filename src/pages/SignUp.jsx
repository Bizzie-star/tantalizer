import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use the login function from your AuthContext
    const result = await login(email, password);
    
    if (result.success) {
      // result.user contains the data from your Django UserProfileSerializer
      // Check the role (is_admin) to send them to the right place
      if (result.user.is_admin) {
        navigate('/admindashboard');
      } else {
        navigate('/userdashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="bg-blue-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl">🍳</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Welcome!</h1>
          <p className="text-xl text-gray-600 mt-3">Sign in to B's Kitchen</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Sign In Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="emybassey@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white font-bold text-xl py-4 rounded-lg hover:bg-blue-700 transition shadow-lg ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center space-y-3">
            <Link to="/forgot-password" title="reset password" className="text-blue-600 hover:underline text-sm">
              Forgot your password?
            </Link>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-700">New to B's Kitchen?</p>
              <Link
                to="/register"
                className="inline-block mt-3 text-blue-600 font-bold text-xl hover:underline"
              >
                Create an Account →
              </Link>
            </div>
          </div>
        </div>

        {/* Guest Option */}
        <div className="text-center mt-8">
          <Link
            to="/foods"
            className="inline-block mt-3 bg-gray-200 text-gray-800 font-bold text-lg py-3 px-8 rounded-lg hover:bg-gray-300 transition"
          >
            Continue as Guest 
          </Link>
        </div>
      </div>
    </div>
  );
}