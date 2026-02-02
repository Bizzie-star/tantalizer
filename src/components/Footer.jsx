import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // 1. Import Auth Context
import { 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  ArrowRight,
  MessageCircle 
} from "lucide-react";
import log from "../assets/logo.jpg";

function Footer() {
  const { user } = useAuth(); // 2. Get the user state

  // 3. If user is authenticated, do not render anything
  if (user) {
    return null;
  }

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t-4 border-rose-600 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand Identity */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <img
                src={log}
                alt="B's Kitchen Logo"
                className="h-16 w-16 rounded-full object-cover shadow-md border-2 border-rose-100"
              />
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                B's <span className="text-rose-600">Kitchen</span>
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Every bite is a promise kept. We are dedicated to serving the campus community with hygiene, taste, and love in every meal.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={20} />} />
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3">
              <FooterLink to="/" text="Home" />
              <FooterLink to="/ordernow" text="Order Now" />
              <FooterLink to="/outlet" text="Outlets" />
              <FooterLink to="/contact" text="Contact Us" />
              <FooterLink to="/franchise" text="Franchise Info" />
            </ul>
          </div>

          {/* Column 3: Service Info */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Visit Us</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3 text-gray-600">
                <MapPin className="text-rose-600 mt-1 shrink-0" size={20} />
                <p className="text-sm">
                  <span className="font-semibold text-gray-900 block mb-1">Main Hub</span>
                  Ikot Akpaden Campus,<br />
                  Student Center Area.
                </p>
              </div>
              
              <div className="flex items-start gap-3 text-gray-600">
                <Clock className="text-rose-600 mt-1 shrink-0" size={20} />
                <p className="text-sm">
                  <span className="font-semibold text-gray-900 block mb-1">Opening Hours</span>
                  Mon - Sun: 8:00 AM - 9:30 PM
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & CTA */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider">Contact</h3>
            <div className="space-y-4">
              <a href="tel:09160416617" className="flex items-center gap-3 text-gray-600 hover:text-rose-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                  <Phone size={16} className="text-rose-600" />
                </div>
                <span className="text-sm font-medium">0916 041 6617</span>
              </a>

              <a href="tel:08038131661" className="flex items-center gap-3 text-gray-600 hover:text-rose-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                  <Phone size={16} className="text-rose-600" />
                </div>
                <span className="text-sm font-medium">0803 813 1661</span>
              </a>

              <a href="mailto:etoroabasibassey2006@gmail.com" className="flex items-center gap-3 text-gray-600 hover:text-rose-600 transition-colors group">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                  <Mail size={16} className="text-rose-600" />
                </div>
                <span className="text-sm font-medium truncate max-w-[200px]">Send us an Email</span>
              </a>

              <a href="https://wa.link/x96b2a" className="mt-4 flex items-center justify-center w-full py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-all font-semibold gap-2 border border-green-200 shadow-sm">
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © 2026 <span className="font-bold text-gray-700">B's Kitchen</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 font-medium">
            <Link to="/privacy" className="hover:text-rose-600 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-rose-600 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-rose-600 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// --- Helper Components for Cleanliness ---

const FooterLink = ({ to, text }) => (
  <li>
    <Link 
      to={to} 
      className="group flex items-center gap-2 text-sm text-gray-600 hover:text-rose-600 transition-all duration-300"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-rose-200 group-hover:bg-rose-600 transition-colors"></span>
      <span className="group-hover:translate-x-1 transition-transform">{text}</span>
    </Link>
  </li>
);

const SocialIcon = ({ icon }) => (
  <a 
    href="#" 
    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-all duration-300 shadow-sm"
  >
    {icon}
  </a>
);

export default Footer;