// src/pages/Register.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, Mail, Phone, Lock, Eye, EyeOff, 
  ArrowRight, ArrowLeft, ChefHat, Info, Loader 
} from 'lucide-react';
import log from "../assets/logo.jpg";

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    phone_number: '',
    password: '',
    password2: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // Local loading state
   
  const { register, login, error, setError, user } = useAuth();
  const navigate = useNavigate();

  // Redirect logic
  useEffect(() => {
    if (user) {
      if (user.is_staff || user.is_superuser) {
        navigate('/admindashboard');
      } else {
        navigate('/userdashboard');
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // --- STRONG PASSWORD VALIDATION LOGIC ---
  const validatePassword = (pwd) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    // 1. Check Matching
    if (formData.password !== formData.password2) {
      setError("Passwords do not match!");
      return;
    }

    // 2. Check Strength
    const strengthError = validatePassword(formData.password);
    if (strengthError) {
      setError(strengthError);
      return;
    }

    // 3. Start Loading & Register
    setIsRegistering(true);

    try {
      const registerResult = await register(formData);

      // 4. Auto-Login if successful
      if (registerResult.success) {
        const loginResult = await login(formData.email, formData.password);
        
        if (!loginResult.success) {
          setIsRegistering(false); // Stop loading if login fails
          navigate('/login');
        }
        // If login successful, useEffect handles redirect. Keep loading true.
      } else {
        setIsRegistering(false); // Stop loading if register fails
      }
    } catch (err) {
      setIsRegistering(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans">
      
      {/* =======================
          LEFT SIDE: Image/Brand 
      ======================= */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-orange-900">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop" 
            alt="Chef Cooking" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-orange-900/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 flex flex-col justify-between w-full p-12 text-white h-full">
          <Link to="/" className="flex items-center gap-2 w-fit group">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium group-hover:underline">Back to Home</span>
          </Link>
          
          <div className="mb-8">
            <div className="bg-orange-600/20 w-fit p-3 rounded-2xl mb-6 backdrop-blur-md border border-orange-400/30">
                <ChefHat size={32} className="text-orange-300" />
            </div>
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Join the <br/>
              <span className="text-orange-400">Culinary Family</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-md leading-relaxed">
              Create an account to start your journey of taste. Exclusive deals, faster checkout, and order tracking await.
            </p>
          </div>
        </div>
      </div>

      {/* =======================
          RIGHT SIDE: Form 
      ======================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 bg-gray-50 overflow-y-auto">
        <div className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100 my-4">
          
          {/* Mobile Home Link */}
          <Link to="/" className="lg:hidden flex items-center gap-2 text-gray-500 mb-6 text-sm hover:text-rose-600">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <div className="text-center mb-8">
            <img src={log} alt="Logo" className="w-16 h-16 mx-auto rounded-full object-cover shadow-md mb-4 border-4 border-rose-50" />
            <h2 className="text-3xl font-extrabold text-gray-900">Create Account</h2>
            <p className="text-gray-500 mt-2">Sign up for B's Kitchen today</p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-sm animate-fade-in">
               <div className="flex items-start gap-3">
                 <div className="text-red-600 shrink-0">⚠️</div>
                 <div className="text-red-700">
                   {typeof error === 'object' ? (
                     <ul className="list-disc ml-4 space-y-1">
                       {Object.entries(error).map(([key, value]) => (
                         <li key={key} className="capitalize">{`${key.replace('_', ' ')}: ${value}`}</li>
                       ))}
                     </ul>
                   ) : (
                     <span>{error}</span>
                   )}
                 </div>
               </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="first_name"
                    type="text"
                    placeholder="e.g. Etoro"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="phone_number"
                    type="tel"
                    placeholder="080123..."
                    value={formData.phone_number}
                    onChange={handleChange}
                    required
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Row 2: Email */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
              </div>
            </div>

            {/* Row 3: Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {/* Password Requirement Hint */}
              <div className="flex items-start gap-2 mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded-lg border border-gray-100">
                <Info size={14} className="mt-0.5 text-blue-500 shrink-0" />
                <span>
                  Must be at least 8 chars with 1 uppercase, 1 lowercase, 1 number & 1 special char.
                </span>
              </div>
            </div>

            {/* Row 4: Confirm Password */}
            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="password2"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  value={formData.password2}
                  onChange={handleChange}
                  required
                  className="block w-full pl-11 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full flex justify-center items-center gap-2 py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg shadow-rose-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl mt-6 ${
                isRegistering 
                  ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-rose-600 to-orange-500 hover:to-orange-600'
              }`}
            >
              {isRegistering ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Creating Account...
                </>
              ) : (
                <>
                  Get Started <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-rose-600 hover:text-rose-700 hover:underline transition-all">
                Sign In
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}