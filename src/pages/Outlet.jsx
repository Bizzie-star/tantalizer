import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, Navigation, ChefHat, ArrowRight, Truck } from 'lucide-react';

export default function Outlets() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* =====================
          HERO SECTION 
      ===================== */}
      <div className="relative bg-rose-900 text-white py-20 px-6 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 ring-1 ring-white/20 shadow-lg">
            <MapPin size={24} className="text-orange-300 mr-2" />
            <span className="font-bold tracking-wide text-sm uppercase">Locate Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            Find B's Kitchen <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-rose-200">
              Near You
            </span>
          </h1>
          <p className="text-xl text-rose-100 max-w-2xl mx-auto leading-relaxed">
            Fresh, hot meals served right on campus. Visit our hub or order for swift delivery to your hostel.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-12 relative z-20">
        
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          <div className="md:w-1/2 bg-gray-200 min-h-[350px] relative group overflow-hidden">
            <iframe 
              src="https://maps.google.com/maps?q=UbongAbasi+Street,+Ikot+Akpaden&t=&z=15&ie=UTF8&iwloc=&output=embed"
              title="B's Kitchen Location at AKSU"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full border-0"
            ></iframe>
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none flex flex-col justify-end p-8">
              <a 
                  href="https://maps.app.goo.gl/YourActualGoogleMapsLinkHere"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl w-fit flex items-center gap-2 shadow-lg pointer-events-auto hover:bg-white transition-colors cursor-pointer"
              >
                  <Navigation size={18} className="text-rose-600" />
                  <span className="font-bold text-gray-900 text-sm">Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                    Open Now
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-500 text-sm font-medium">Main Hub</span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ikot Akpaden Campus</h2>
            
            <div className="space-y-6">
               <InfoRow 
                 icon={<MapPin className="text-rose-600" />} 
                 title="Address" 
                 text="UbongAbasi Street, along school road." 
               />
               <InfoRow 
                 icon={<Clock className="text-rose-600" />} 
                 title="Opening Hours" 
                 text="Mon - Sun: 8:00 AM - 9:30 PM" 
               />
               <InfoRow 
                 icon={<Phone className="text-rose-600" />} 
                 title="Contact Lines" 
                 content={
                   <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                     <a href="tel:09160416617" className="hover:text-rose-600 underline decoration-rose-200">0916 041 6617</a>
                     <a href="tel:07089828558" className="hover:text-rose-600 underline decoration-rose-200">0708 982 8558</a>
                   </div>
                 }
               />
               <InfoRow 
                 icon={<Truck className="text-rose-600" />} 
                 title="Delivery Coverage" 
                 text="Fast delivery to all hostels, departments, and lecture halls." 
               />
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
               <Link to="/ordernow" className="inline-flex items-center gap-2 text-rose-600 font-bold hover:text-rose-700 transition group">
                  Order from this outlet <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
          </div>
        </div>

        {/* =====================
            EXPANSION SECTION 
        ===================== */}
        <div className="mt-16 bg-gradient-to-br from-rose-50 to-orange-50 rounded-3xl p-8 md:p-12 text-center border border-rose-100">
           <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <ChefHat size={32} className="text-orange-500" />
           </div>
           
           <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon to More Campuses!</h2>
           <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
             B's Kitchen is growing fast. We are actively looking for partners to help us bring affordable, delicious meals to universities across Nigeria.
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/franchise" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-rose-600 transition-all shadow-lg hover:shadow-rose-200 hover:-translate-y-1"
              >
                Become a Franchise Partner
              </Link>
              <button 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                onClick={() => alert("Suggest a location feature coming soon!")}
              >
                Suggest a Location
              </button>
           </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 pb-8">
           <p className="text-gray-400 font-medium flex items-center justify-center gap-2">
             Made with <span className="text-rose-500 text-xl">♥</span> at B's Kitchen
           </p>
        </div>

      </div>
    </div>
  );
}

// --- Helper Component ---
const InfoRow = ({ icon, title, text, content }) => (
  <div className="flex items-start gap-4">
    <div className="mt-1 p-2 bg-rose-50 rounded-lg shrink-0">
        {icon}
    </div>
    <div>
        <h4 className="font-bold text-gray-900 text-sm mb-1">{title}</h4>
        <div className="text-gray-600 text-sm leading-relaxed font-medium">
            {content ? content : text}
        </div>
    </div>
  </div>
);