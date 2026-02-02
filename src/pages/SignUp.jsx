import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, ArrowLeft, Loader } from 'lucide-react';
import log from "../assets/logo.jpg";

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Local loading state for immediate feedback

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const { login, error, setError, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (from) {
        navigate(from, { replace: true });
      } else if (user.is_staff || user.is_superuser) {
        navigate('/admindashboard', { replace: true });
      } else {
        navigate('/userdashboard', { replace: true });
      }
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoggingIn(true); // Start visible loading immediately

    try {
      await login(email, password);
      // Note: We don't set setIsLoggingIn(false) here on success 
      // because the page will redirect, and we want to keep the spinner going until then.
    } catch (err) {
      setIsLoggingIn(false); // Stop loading only if there's an error
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* =======================
          LEFT SIDE: Image/Brand (Hidden on Mobile)
      ======================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-rose-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" 
            alt="Delicious Dining" 
            className="w-full h-full object-cover opacity-80 animate-scale-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-rose-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between w-full p-16 text-white h-full">
          <Link to="/" className="flex items-center gap-2 w-fit group">
            <div className="bg-white/20 p-2.5 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium tracking-wide group-hover:translate-x-1 transition-transform">Back to Home</span>
          </Link>
          
          <div className="mb-8">
            <h1 className="text-5xl xl:text-6xl font-extrabold mb-6 leading-tight">
              Welcome back to <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-400">
                Flavor Paradise
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-lg leading-relaxed">
              Sign in to manage your orders, track deliveries in real-time, and unlock exclusive member discounts.
            </p>
          </div>
        </div>
      </div>

      {/* =======================
          RIGHT SIDE: Form 
      ======================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 relative">
          
          {/* Mobile Home Link */}
          <Link to="/" className="lg:hidden absolute top-6 left-6 flex items-center gap-2 text-gray-500 text-sm hover:text-rose-600 transition-colors">
            <ArrowLeft size={16} /> Back
          </Link>

          <div className="text-center mb-10 mt-4 lg:mt-0">
            <img src={log} alt="Logo" className="w-24 h-24 mx-auto rounded-full object-cover shadow-lg mb-6 border-4 border-rose-50" />
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign In</h2>
            <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 animate-fade-in">
              <div className="bg-red-100 p-1.5 rounded-full text-red-600 shrink-0 mt-0.5">
                <AlertCircle size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
              <button onClick={() => setError(null)} className="text-red-400 hover:text-red-600 transition-colors">
                <X size={18} />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all duration-200 font-medium"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-gray-700">Password</label>
                <Link to="/forgotpassword" className="text-sm font-bold text-rose-600 hover:text-rose-700 hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-rose-500 transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-11 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-500/10 focus:border-rose-500 transition-all duration-200 font-medium"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full flex justify-center items-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-rose-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl active:translate-y-0 ${
                isLoggingIn 
                  ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-rose-600 to-orange-500 hover:to-orange-600'
              }`}
            >
              {isLoggingIn ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer / Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-rose-600 hover:text-rose-700 hover:underline transition-all">
                Create Account
              </Link>
            </p>
          </div>
          
        </div>
      </div>

    </div>
  );
}