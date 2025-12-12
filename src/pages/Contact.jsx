import React from "react";
import contus from "../assets/contus.jpg";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="flex flex-col overflow-x-hidden w-full">
      {/* Hero Section */}
      <div
  className="relative w-full h-64 md:h-80 flex items-center justify-center text-white"
  style={{
    backgroundImage: `url(${contus})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>

        <div className="absolute inset-0 bg-black/30"></div>
        <h1 className="relative text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
        
        </h1>
      </div>

      {/* Contact Info + Form Section */}
      <section className="py-12 px-6 md:px-16 bg-white flex flex-col md:flex-row gap-10 justify-center">
        {/* Contact Info */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-md w-full md:w-1/3">
          <h2 className="text-2xl font-semibold mb-6 text-orange-900">
            Contact Info
          </h2>
          <div className="space-y-4 text-gray-700">
            <p className="flex items-start gap-3">
              <MapPin className="text-orange-600 mt-1" />
              <span>
               Ikot Akpaden
              </span>
            </p>
            <p className="flex items-center gap-3">
              <Mail className="text-orange-600" /> info@etoroabasibassey2006@gmail.com
            </p>
            <p className="flex items-center gap-3">
              <Phone className="text-orange-600" /> +234 8038131661, +234 9160416617
            </p>

            {/* Social Media */}
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="hover:text-orange-600">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-orange-600">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-orange-600">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="hover:text-orange-600">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-50 p-8 rounded-2xl shadow-md w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-6 text-orange-900">
            Send us a message
          </h2>
          <p className="text-gray-600 mb-6">
            If you have any inquiries, please do not hesitate to send us a
            message. We reply within 24 hours!
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <input
              type="text"
              placeholder="Subject"
              className="border border-gray-300 rounded-lg p-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <textarea
              placeholder="Type your message..."
              rows="4"
              className="border border-gray-300 rounded-lg p-3 md:col-span-2 focus:outline-none focus:ring-2 focus:ring-orange-600"
            ></textarea>
            <button
              type="submit"
              className="md:col-span-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-all duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}