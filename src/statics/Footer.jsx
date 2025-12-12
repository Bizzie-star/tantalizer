import React from "react";
import Log from "../assets/Logo(1).jpg";
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="flex justify-center items-center w-full bg-gray-50 py-10 px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-20 w-full max-w-6xl">
        {/* --- Logo & Intro --- */}
        <div className="flex flex-col gap-4 text-sm text-gray-700">
          <img
            src={Log}
            alt="Logo"
            className="h-50 w-auto mb-2"
          />
          <p className="leading-relaxed">
            Every bite, a promise kept
          </p>

          <div className="font-bold mt-2">Connect with us:</div>
          <p className="text-xs text-gray-500">
            2025 | All rights reserved by Westbrian
          </p>
        </div>

        {/* --- Useful Links --- */}
        <div className="flex flex-col items-start md:items-center">
          <h2 className="font-bold mb-3 text-lg">Useful Links</h2>
          <ul className="flex flex-col gap-2 text-gray-700 text-sm">
            <li className="hover:text-orange-600 cursor-pointer">Career</li>
            <li className="hover:text-orange-600 cursor-pointer">Franchise</li>
            <li className="hover:text-orange-600 cursor-pointer">Outlets</li>
            <li className="hover:text-orange-600 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-orange-600 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* --- Contact Info --- */}
        <div className="text-gray-700 text-sm">
          <h2 className="mb-4 font-bold text-lg">Contact Info</h2>

          <p className="flex items-start gap-3 mb-3">
            <MapPin className="text-orange-600 mt-1 flex-shrink-0" />
            <span>Ikot Akpaden</span>
          </p>

          <p className="flex items-center gap-3 mb-2">
            <Mail className="text-orange-600 flex-shrink-0" />
            info@etoroabasibassey2006@gmail.com
          </p>

          <p className="flex items-center gap-3 mb-2">
            <Phone className="text-orange-600 flex-shrink-0" />
         08038131661, 09160416617
          </p>

          <p className="flex items-center gap-3">
            🕓 Mon - Sun 8:00AM - 9:30PM
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
