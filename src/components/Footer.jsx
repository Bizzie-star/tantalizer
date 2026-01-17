import React from "react";
import log from "../assets/logo.jpg"; // Fixed variable name (Log → Logo)

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1: Logo & Brand */}
        <div className="flex flex-col">
          <img
            src={log}
            alt="B's Kitchen Logo"
            className="h-32 w-auto mb-6 object-contain"
          />
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            Every bite, a promise kept.
          </p>
          <p className="text-xs text-gray-500">
            © 2026 B's Kitchen. All rights reserved.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 mb-5">Quick Links</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="hover:text-orange-600 cursor-pointer transition">Home</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Menu</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Order</li>
            <li className="hover:text-orange-600 cursor-pointer transition">Contact Us</li>
            <li className="hover:text-orange-600 cursor-pointer transition">About Us</li>
          </ul>
        </div>

        {/* Column 3: Service Info */}
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 mb-5">Service Area</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Proudly serving students and staff on campus with fresh, delicious meals.
          </p>
          <div className="mt-5 space-y-3 text-sm text-gray-700">
            <p className="flex items-center gap-2">
              <span className="text-orange-600"></span>
              Ikot Akpaden, Campus
            </p>
            <p className="flex items-center gap-2">
              <span className="text-orange-600"></span>
              Mon - Sun: 8:00 AM - 9:30 PM
            </p>
          </div>
        </div>

        {/* Column 4: Contact Details */}
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-gray-800 mb-5">Get in Touch</h3>
          <div className="space-y-4 text-sm text-gray-700">
            <p className="flex items-center gap-3">
              <span className="text-orange-600 text-lg">Call</span>
              <span>
                <a href="tel:09160416617" className="hover:text-orange-600 transition">0916 041 6617</a><br />
                <a href="tel:08038131661" className="hover:text-orange-600 transition">0803 813 1661</a>
              </span>
            </p>

            <p className="flex items-center gap-3">
              <span className="text-orange-600 text-lg">✉️</span>
              <a 
                href="mailto:etoroabasibassey2006@gmail.com" 
                className="hover:text-orange-600 transition break-all"
              >
                etoroabasibassey2006@gmail.com
              </a>
            </p>

            <p className="flex items-center gap-3">
              <span className="text-orange-600 text-lg">💬</span>
              WhatsApp us for quick orders!
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Credit */}
      <div className="mt-12 pt-8 border-t border-gray-300 text-center text-xs text-gray-500">
        Made with love for the campus community | B's Kitchen 2026
      </div>
    </footer>
  );
}

export default Footer;