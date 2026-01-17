import React from "react";
import { Link } from "react-router-dom";


// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Dummy Data
const delicacies = [
  {
    id: 1,
    img: "src/assets/roastedchicken.jpeg", 
    title: "Roasted Chicken",
    price: "₦2,000",
  },
  {
    id: 2,
    img: "src/assets/grilledfish.jpeg",
    title: "Grilled Fish",
    price: "₦2,500",
  },
  {
    id: 3,
    img: "src/assets/friedrice.jpeg",
    title: "Fried Rice",
    price: "₦1,500",
  },
  {
    id: 4,
    img: "src/assets/riceandstew.jpg",
    title: "Rice and Stew",
    price: "₦2,000",
  },
  {
    id: 5,
    img: "src/assets/fries.jpeg",
    title: "Fries",
    price: "₦2,000",
  },
  {
    id: 6,
    img: "src/assets/coconutrice.jpeg",
    title: "Coconut Rice",
    price: "₦1,500",
  },
  {
    id: 7,
    img: "src/assets/spagh.jpeg",
    title: "Spaghetti",
    price: "₦2,500",
  },
 
  {
    id: 8,
    img: "src/assets/jollofrice.jpg",
    title: "Jollof Rice",
    price: "₦2,500",
  },
  

];

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden w-full">
      
      

  
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100">
      
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-200 to-amber-200 opacity-60 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-emerald-100 to-teal-100 opacity-40 animate-pulse-slow-delayed"></div>

     
      
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 animate-fade-in-up">
          Welcome to <span className="text-rose-600">B's Kitchen</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-10 animate-fade-in-up-delayed">
          Savor authentic flavors crafted with passion. Fresh ingredients, warm ambiance, unforgettable experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up-delayed-2">
          <button className="px-10 py-4 bg-rose-600 text-white font-semibold rounded-full shadow-lg hover:bg-rose-700 hover:scale-105 transition-all duration-300">
            Order Now!
          </button>
          <button className="px-10 py-4 bg-transparent border-2 border-gray-800 text-gray-800 font-semibold rounded-full shadow-lg hover:bg-gray-800 hover:text-white transition-all duration-300">
            Enjoy Greatness
          </button>
        </div>
      </div>

      {/* Custom styles for animations (add to your global CSS or Tailwind config) */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float { animation: float 12s ease-in-out infinite; }
        .animate-float-delayed { animation: float 15s ease-in-out infinite 2s; }
        .animate-float-slow { animation: float 18s ease-in-out infinite; }
        .animate-float-reverse { animation: float 14s ease-in-out infinite reverse; }
        .animate-pulse-slow { animation: pulse-slow 20s ease-in-out infinite; }
        .animate-pulse-slow-delayed { animation: pulse-slow 22s ease-in-out infinite 5s; }
        .animate-fade-in-up { animation: fade-in-up 1.2s ease-out; }
        .animate-fade-in-up-delayed { animation: fade-in-up 1.4s ease-out; }
        .animate-fade-in-up-delayed-2 { animation: fade-in-up 1.6s ease-out; }
      `}</style>

    </section>
  
    <section className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-rose-50 via-amber-50 to-emerald-50">
      {/* Subtle animated wave background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-rose-100 to-transparent opacity-30 animate-shimmer"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-emerald-100 to-transparent opacity-20 animate-shimmer-delayed"></div>
      </div>

      {/* Floating soft orbs for warmth and depth */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-drift-slow"></div>
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-drift"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-drift-reverse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
            Why Guests <span className="text-rose-600">Love Us</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-delayed">
            Every dish tells a story. Every visit feels like coming home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
          {/* Feature 1 */}
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-200 transition-colors duration-300">
                <span className="text-4xl"></span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Farm-Fresh Ingredients</h3>
              <p className="text-gray-600 leading-relaxed">
                Hand-picked daily from local farms. Seasonality drives our menu — taste nature at its peak.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 animate-fade-in-up-delayed">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-200 transition-colors duration-300">
                <span className="text-4xl"></span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Crafted with Passion</h3>
              <p className="text-gray-600 leading-relaxed">
                Our chefs pour heart into every plate. Tradition meets innovation in flavors that linger.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="group relative bg-white/70 backdrop-blur-sm rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 animate-fade-in-up-delayed-2">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-transparent rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                <span className="text-4xl"></span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Warm Hospitality</h3>
              <p className="text-gray-600 leading-relaxed">
                More than a meal — it's an experience. Cozy ambiance, attentive service, memories made.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action at the bottom */}
        <div className="text-center mt-20 animate-fade-in-up-delayed-3">
          <p className="text-2xl text-gray-700 mb-8">
            Ready to taste the difference?
          </p>
          <button className="px-12 py-5 bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold text-lg rounded-full shadow-2xl hover:shadow-rose-500/50 hover:scale-105 transition-all duration-300">
            Place that order today!
          </button>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes drift {
          0% { transform: translate(0, 0); }
          50% { transform: translate(50px, -50px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift-slow {
          0% { transform: translate(0, 0); }
          50% { transform: translate(-60px, 60px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes drift-reverse {
          0% { transform: translate(0, 0); }
          50% { transform: translate(40px, -40px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-shimmer { animation: shimmer 15s linear infinite; }
        .animate-shimmer-delayed { animation: shimmer 18s linear infinite 6s; }
        .animate-drift { animation: drift 20s ease-in-out infinite; }
        .animate-drift-slow { animation: drift-slow 25s ease-in-out infinite; }
        .animate-drift-reverse { animation: drift-reverse 22s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 1.5s ease-out; }
        .animate-fade-in-delayed { animation: fade-in 1.5s ease-out 0.4s both; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-fade-in-up-delayed { animation: fade-in-up 1s ease-out 0.3s both; }
        .animate-fade-in-up-delayed-2 { animation: fade-in-up 1s ease-out 0.6s both; }
        .animate-fade-in-up-delayed-3 { animation: fade-in-up 1s ease-out 1s both; }
      `}</style>
    </section>
  



      {/* ✅ Special Delicacies Carousel */}
      <section className="flex flex-col  items-center justify-center py-16 px-6 sm:px-10 md:px-20">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="font-bold text-3xl sm:text-5xl text-gray-800 mb-8 text-center sm:text-left">
            Special Delicacies
          </h2>

          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            className="mySwiper"
          >
            {delicacies.map((item) => (
              <SwiperSlide key={item.id}>
                <div className=" overflow-hidden hover:scale-105 transition-transform duration-300">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4 flex flex-col items-center">
                    <h1 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      {item.title}
                    </h1>
                    <p className="text-red-700 text-lg font-bold">{item.price}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      
    </div>
  );
}
