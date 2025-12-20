import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from '../api/api';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validate() {
    if (!email) return 'Please enter your email';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Please enter a valid email';
    if (!newPassword) return 'Please enter new password';
    if (newPassword.length < 6) return 'Password must be at least 6 characters';
    if (newPassword !== confirmPassword) return 'Passwords do not match';
    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const response = await authAPI.resetPassword(email, newPassword, confirmPassword);
      
      if (response.data.success) {
        setSuccess('Password reset successfully! Redirecting to login...');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/signup');
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
    <div className="min-h-screen bg-white flex flex-col">
      <header className="relative bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/assets/hero-signup.jpg')` }}>
        <div className="max-w-6xl mx-auto px-6 py-16 flex items-center justify-between">
          <div className="text-blacks">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Every Bite, a Promise Kept</h1>
            <p className="mt-2 text-sm sm:text-base text-white/90">Reset your password to continue</p>
          </div>
          <div className="hidden md:block text-right text-white/80">
            <div className="text-sm">Connect with us:</div>
            <div className="mt-2 text-xs">Makay Plaza, Festac Town · +234 701 599 9154</div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center -mt-8 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
         
          <div className="p-8">
            <h1 className="text-2xl font-extrabold">Forgot Password?</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your email and new password to reset</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
              {success && <div className="text-sm text-green-600 bg-green-50 p-2 rounded">{success}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700">E-Mail Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Enter new password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Your new password"
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>

              <div className="flex items-center justify-between">
                <Link to="/login" className="text-sm text-orange-600 underline">
                  Back to Login
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-orange-600 text-white rounded font-medium disabled:opacity-60"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-orange-600 underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}