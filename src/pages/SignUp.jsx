import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from '../api/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validate() {
    if (!email) return 'Please enter your email';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return 'Please enter a valid email';
    if (!password) return 'Please enter your password';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      const response = await authAPI.login(email, password);
      
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      alert(`Welcome back, ${response.data.user.first_name}!`);
      
      // Redirect based on user type
      if (response.data.user.is_admin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
      
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid email or password.');
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Login failed. Please try again.');
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
            <p className="mt-2 text-sm sm:text-base text-white/90">Welcome back — Sign in to continue your order</p>
          </div>
          <div className="hidden md:block text-right text-white/80">
            <div className="text-sm">Connect with us:</div>
            <div className="mt-2 text-xs">@Ikot Akpaden, Mkpat Enin.</div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center -mt-8 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
         
          <div className="p-8">
            <h1 className="text-10 font-extrabold">Login to Your Account</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your email and password to access your account</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-700">E-Mail Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Your password"
                  autoComplete="current-password"
                />
                <div className="mt-2 text-right">
                 <Link to ="/forgotpassword"  className="text-sm hidden md:block text-orange-600 underline">
                 Forgot password?
                 </Link>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input id="remember" type="checkbox" className="w-4 h-4" />
                  <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-orange-600 text-white rounded font-medium disabled:opacity-60"
                >
                  {loading ? 'Signing in...' : 'Login'}
                </button>
              </div>

              <div className="pt-4 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-500">Don't have an account? <a href="/register" className="text-orange-600 underline">Register</a></p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}