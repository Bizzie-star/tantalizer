import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

// Tantalizers-style Login page (single-file React component)
// Uses Tailwind CSS utility classes (assumes Tailwind is configured in your project)

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email) return 'Please enter your email';
    // simple email regex
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
      // TODO: replace with real API call
      await new Promise(r => setTimeout(r, 800));
      // fake success: redirect or show success
      // Example: navigate('/account') or set auth state
      alert('Logged in (demo) — replace with real auth flow');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero / Top */}
      <header className="relative bg-cover bg-center" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/assets/hero-signup.jpg')` }}>
        <div className="max-w-6xl mx-auto px-6 py-16 flex items-center justify-between">
          <div className="text-blacks">
            <h1 className="text-3xl sm:text-4xl font-extrabold">Every Bite, a Promise Kept</h1>
            <p className="mt-2 text-sm sm:text-base text-white/90">Welcome back — Sign in to continue your order</p>
          </div>
          <div className="hidden md:block text-right text-white/80">
            <div className="text-sm">Connect with us:</div>
            <div className="mt-2 text-xs">Makay Plaza, Festac Town · +234 701 599 9154</div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center -mt-8 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
         
          {/* Right - form */}
          <div className="p-8">
            <h1 className="text-10 font-extrabold">Forgot Password?</h1>
            <p className="text-sm text-gray-500 mt-1">Enter your email and new password to reset</p>

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
                <label className="block text-sm font-medium text-gray-700">Enter new password</label>
                <input
                  type="newpassword"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Your new password"
                  autoComplete="current-password"
                />
               
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm password</label>
                <input
                  type="newpassword"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Confirm password"
                  autoComplete="current-password"
                />
               
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
                <p className="text-sm text-gray-500">Don't have an account? <a href="/register" className="text-orange-600 underline">Sign Up</a></p>
              </div>
            </form>

           
          </div>
        </div>
      </main>

      
      
    </div>
  );
}
