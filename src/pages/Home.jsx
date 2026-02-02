import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ShoppingBag, ArrowRight, Star, Clock, MapPin, Truck } from "lucide-react";
import WelcomeModal from '../components/WelcomeModal'

// CSS Imports
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Dummy Data
const delicacies = [
  { id: 1, img: "src/assets/roastedchicken.jpeg", title: "Roasted Chicken", price: "₦2,000", rating: 4.8 },
  { id: 2, img: "src/assets/grilledfish.jpeg", title: "Grilled Fish", price: "₦2,500", rating: 4.9 },
  { id: 3, img: "src/assets/friedrice.jpeg", title: "Fried Rice", price: "₦1,500", rating: 4.5 },
  { id: 4, img: "src/assets/riceandstew.jpg", title: "Rice and Stew", price: "₦2,000", rating: 4.6 },
  { id: 5, img: "src/assets/fries.jpeg", title: "Crispy Fries", price: "₦2,000", rating: 4.7 },
  { id: 6, img: "src/assets/coconutrice.jpeg", title: "Coconut Rice", price: "₦1,500", rating: 4.8 },
  { id: 7, img: "src/assets/spagh.jpeg", title: "Spicy Spaghetti", price: "₦2,500", rating: 4.5 },
  { id: 8, img: "src/assets/jollofrice.jpg", title: "Smoky Jollof", price: "₦2,500", rating: 5.0 },
];

export default function Home() {
  return (
    <div className="flex flex-col w-full font-sans bg-gray-50">
      <WelcomeModal />
      
      {/* ==================== 
          HERO SECTION 
      ==================== */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop" 
            alt="Delicious Food Spread" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full text-white">
          <span className="bg-rose-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-4 tracking-wider uppercase animate-fade-in">
            Authentic Nigerian Cuisine
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 max-w-3xl drop-shadow-lg">
            Taste the Passion in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
              Every Bite
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
            Experience the finest local and continental dishes delivered hot and fresh to your doorstep. B's Kitchen is where hunger meets happiness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/ordernow" className="group flex items-center justify-center gap-2 px-8 py-4 bg-rose-600 text-white rounded-full font-bold transition-all duration-300 hover:bg-rose-700 hover:scale-105 shadow-lg shadow-rose-600/30">
              Order Now <ShoppingBag size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/menu" className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold transition-all duration-300 hover:bg-white hover:text-black">
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== 
          FEATURES SECTION 
      ==================== */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-orange-50 hover:bg-orange-100 transition-colors duration-300 text-center group">
              <div className="w-16 h-16 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Truck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">Hot and fresh food delivered to your location in record time.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-rose-50 hover:bg-rose-100 transition-colors duration-300 text-center group">
              <div className="w-16 h-16 bg-rose-200 text-rose-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Star size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Premium Quality</h3>
              <p className="text-gray-600">We use only the finest, locally sourced ingredients for our dishes.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-emerald-50 hover:bg-emerald-100 transition-colors duration-300 text-center group">
              <div className="w-16 h-16 bg-emerald-200 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Multiple Outlets</h3>
              <p className="text-gray-600">Conveniently located across the city for pickup or dine-in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 
          MENU CAROUSEL 
      ==================== */}
      <section className="py-20 px-4 md:px-10 bg-gray-50 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h4 className="text-rose-600 font-bold uppercase tracking-wide mb-2">Our Menu</h4>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">Special Delicacies</h2>
            </div>
            <Link to="/menu" className="hidden md:flex items-center gap-2 text-gray-600 hover:text-rose-600 font-semibold transition-colors mt-4 md:mt-0">
              See Full Menu <ArrowRight size={20} />
            </Link>
          </div>

          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            className="pb-16 px-4"
          >
            {delicacies.map((item) => (
              <SwiperSlide key={item.id} className="pb-10">
                <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group h-full border border-gray-100">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-gray-800">{item.rating}</span>
                    </div> */}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-rose-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      Freshly prepared with our secret blend of spices and love.
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-extrabold text-gray-900">{item.price}</span>
                      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm">
                        <ShoppingBag size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="mt-8 text-center md:hidden">
            <Link to="/menu" className="inline-flex items-center gap-2 text-rose-600 font-bold">
                See Full Menu <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== 
          PROMO / CTA SECTION 
      ==================== */}
      <section className="py-20 bg-rose-900 text-white overflow-hidden relative">
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-800 rounded-full translate-y-1/3 -translate-x-1/4 opacity-50"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Hungry?</h2>
            <p className="text-xl text-rose-100 mb-8 max-w-lg">
              Don't wait! Get 20% off your first order when you use code <span className="font-bold text-white bg-rose-800 px-2 py-1 rounded">BSKITCHEN20</span> at checkout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-10 py-4 bg-white text-rose-900 font-bold rounded-full hover:bg-gray-100 transition-colors shadow-xl">
                Order Delivery
                </button>
                <button className="px-10 py-4 border-2 border-rose-400 text-white font-bold rounded-full hover:bg-rose-800 transition-colors">
                Reserve a Table
                </button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
             {/* Use a transparent PNG of food here if you have one, otherwise a nice crop */}
             <div className="relative">
                <div className="absolute inset-0 bg-rose-500 blur-3xl opacity-30 rounded-full"></div>
                <img 
                    src="src/assets/jollofrice.jpg" 
                    alt="Promo Dish" 
                    className="relative w-80 h-80 md:w-96 md:h-96 object-cover rounded-full border-8 border-rose-800/50 shadow-2xl animate-float-slow"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Global Style Overrides for Swiper Pagination Colors */}
      <style jsx>{`
        .swiper-pagination-bullet-active {
          background-color: #e11d48 !important; /* Rose-600 */
        }
        .swiper-button-next, .swiper-button-prev {
          color: #e11d48 !important;
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold;
        }
        @keyframes float-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
}