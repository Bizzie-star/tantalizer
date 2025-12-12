




import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/image.png";
import black from "../assets/blackback.jpg";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import loc from '../assets/location.jpg'

// Dummy Data
const delicacies = [
  {
    id: 1,
    img: "src/assets/crustedchicken.jpg",
    title: "Roasted Chicken",
    price: "₦4,000",
  },
  {
    id: 2,
    img: "src/assets/barbacue.jpg",
    title: "Barbacue",
    price: "₦5,500",
  },
  {
    id: 3,
    img: "src/assets/chineserice.jpg",
    title: "Chinese Rice",
    price: "₦5,000",
  },
  {
    id: 4,
    img: "src/assets/riceandstew.jpg",
    title: "Rice and Stew",
    price: "₦3,000",
  },
  {
    id: 5,
    img: "src/assets/fries.jpg",
    title: "Fries",
    price: "₦2,500",
  },
  {
    id: 6,
    img: "src/assets/coconutrice.jpg",
    title: "Coconut Rice",
    price: "₦2,500",
  },
  {
    id: 7,
    img: "src/assets/spaghetti.jpg",
    title: "Spaghetti",
    price: "₦2,500",
  },
  {
    id: 8,
    img: "src/assets/roastedchicken.jpg",
    title: "Roasted Chicken",
    price: "₦2,500",
  },
  {
    id: 9,
    img: "src/assets/jollofrice.jpg",
    title: "Jollof Rice",
    price: "₦2,500",
  },
  

];

export default function Hero() {
  return (
    <div className="flex flex-col overflow-x-hidden w-full">
      {/* ✅ Hero Section */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-black text-center px-6 py-10 sm:px-10 md:px-20">
          <h1 className="text-4xl sm:text-6xl md:text-[90px] leading-tight font-extrabold mb-6 text-white drop-shadow-lg">
            Every Bite,
            <br />
            a Promise Kept
          </h1>

          {/* Card Container */}
          <div className="mt-8 sm:mt-12 flex flex-col justify-center items-center bg-white/80 backdrop-blur-md border border-white rounded-3xl p-6 sm:p-8 shadow-xl w-[90%] max-w-[400px]">
            
            {/* Category Buttons */}
            {/* <div className="flex justify-between items-center w-full bg-gray-200 rounded-2xl p-2 mb-5">
              <button className="rounded-3xl  text-black text-sm sm:text-lg font-semibold border border-white px-3 py-1 sm:px-4 sm:py-2">
                B's Kitchen
              </button>
              <button className="text-black text-sm sm:text-lg mr-2 font-medium">
                Tantis Pot
              </button>
            </div> */}

            {/* Input Fields */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center justify-between border border-gray-300 bg-white rounded-xl px-3 py-2">
                <input
                  type="text"
                  placeholder="Select Campus"
                  className="flex-1 text-gray-700 outline-none text-sm sm:text-base"
                />
                <select className="ml-2 outline-none bg-transparent text-sm sm:text-base">
                  <option value="" disabled hidden></option>
                  <option value="">Obio Akpa</option>
                  <option value="">Ikot Akpaden</option>
                  
                </select> 
              </div>

              <input
                type="text"
                placeholder="Enter Address"
                className="border border-gray-300 bg-white rounded-xl px-3 py-2 outline-none text-sm sm:text-base"
              />

              <button className="font-medium text-white text-sm sm:text-base rounded-xl px-6 py-3 bg-red-700 hover:bg-red-800 transition">
                Let’s Go!
              </button>
            </div>
          </div>
        </div>
      </div>

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
      <section className="flex flex-col  items-center justify-center py-16 px-6 sm:px-10 md:px-20">
        
        <div 
         className="relative w-full min-h-screen mt-40 bg-cover bg-center flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${black})`,
                  }}>
                    
        <div className="absolute inset-0 bg-black/20"></div>

      
        <div className="relative z-10 flex flex-col items-center justify-center text-black text-center px-6 py-10 sm:px-10 md:px-20">
          <h5 className=" sm:text-6xl md:text-[90px] leading-tight font-extrabold mb-6 text-red-800 drop-shadow-lg">
           
           
          </h5>
                    
        </div>
          
        </div>
      </section>
    </div>
  );
}
