// src/pages/ResetPassword.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from '../api/api';
import { Info } from 'lucide-react';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- STRONG PASSWORD VALIDATION LOGIC ---
  const validatePasswordStrength = (pwd) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pwd);
    const hasLowerCase = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd);

    if (pwd.length < minLength) return "Password must be at least 8 characters long.";
    if (!hasUpperCase) return "Password must contain at least one uppercase letter.";
    if (!hasLowerCase) return "Password must contain at least one lowercase letter.";
    if (!hasNumber) return "Password must contain at least one number.";
    if (!hasSpecialChar) return "Password must contain at least one special character.";
    
    return null; // Valid
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 1. Basic Validation
    if (!email) return setError('Please enter your email');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setError('Please enter a valid email');
    if (!newPassword) return setError('Please enter new password');

    // 2. Check Password Strength
    const strengthError = validatePasswordStrength(newPassword);
    if (strengthError) {
      return setError(strengthError);
    }

    // 3. Check Matching
    if (newPassword !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      const response = await authAPI.resetPassword(email, newPassword, confirmPassword);
      
      if (response.data.success) {
        setSuccess('Password reset successfully! Redirecting to login...');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(response.data.error || 'Password reset failed');
      }
      
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors).join(' ');
        setError(errors);
      } else {
        setError('Password reset failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <header className="relative bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/assets/hero-signup.jpg')` }}>
        <div className="max-w-6xl mx-auto px-6 py-16 flex items-center justify-between text-white">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Every Bite, a Promise Kept</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-200">Reset your password to continue</p>
          </div>
          <div className="hidden md:block text-right text-gray-300">
            <div className="text-sm font-medium">Connect with us:</div>
            <div className="mt-1 text-xs">Makay Plaza, Festac Town · +234 701 599 9154</div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center -mt-10 px-4 pb-12">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 border border-gray-100">
          
          <div className="p-8 md:p-10">
            <h1 className="text-2xl font-bold text-gray-900">Forgot Password?</h1>
            <p className="text-sm text-gray-500 mt-2">Enter your email and new password to reset</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 flex gap-2 items-start">
                  <span>⚠️</span> {error}
                </div>
              )}
              {success && (
                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 flex gap-2 items-start">
                  <span>✅</span> {success}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Create new password"
                  autoComplete="new-password"
                  disabled={loading}
                />
                {/* Password Requirement Hint */}
                <div className="flex items-start gap-2 mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-md border border-gray-100">
                  <Info size={14} className="mt-0.5 text-blue-500 shrink-0" />
                  <span>
                    Must be at least 8 chars with 1 uppercase, 1 lowercase, 1 number & 1 special char.
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="block w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors">
                  ← Back to Login
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>

              <div className="pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-orange-600 font-bold hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Optional: Right side decorative panel if grid is 2 cols */}
          <div className="hidden md:block bg-orange-50 relative overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>
             <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm text-4xl">
                        🔒
                    </div>
                    <h3 className="text-xl font-bold text-orange-900 mb-2">Secure Reset</h3>
                    <p className="text-orange-800 text-sm">
                        We take security seriously. Your new password will be encrypted and secured immediately.
                    </p>
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}