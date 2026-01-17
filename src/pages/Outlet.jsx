import React from 'react';
import { Link } from 'react-router-dom';

export default function Outlets() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <span role="img" aria-label="location"></span>
            Our Outlets
          </h1>
          <p className="text-xl text-gray-600 mt-3">
            Find B's Kitchen on campus — Fresh meals, always close by!
          </p>
          <p className="text-lg text-blue-600 mt-2 font-medium">
            Proudly serving our university community 
          </p>
        </div>

        {/* Current Outlet */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Main Outlet (Currently Serving)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-bold mb-4">B's Kitchen - Ikot Akpaden</h3>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-center gap-3">
                  <span className="text-2xl"></span>
                  <span>UbongAbasi Street, along school road.</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl"></span>
                  <span>Monday - Sunday: 8:00 AM - 9:30 PM</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl"></span>
                  <span>
                    <a href="tel:09160416617" className="text-blue-600 hover:underline">0916 041 6617</a> | 
                    <a href="tel:07089828558" className="text-blue-600 hover:underline ml-1">0708 982 8558</a>
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-2xl"></span>
                  <span>Free & fast delivery to all hostels, departments, and lecture halls on campus</span>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Future Expansion */}
        <div className="bg-blue-50 rounded-lg shadow-md p-8 mb-12 border border-blue-200">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-800">
            Coming Soon to More Campuses!
          </h2>
          <p className="text-center text-gray-700 mb-6 leading-relaxed">
            B's Kitchen is growing! We're actively looking to open new outlets in other universities across Nigeria.
          </p>
          <div className="text-center">
            <p className="text-lg mb-4">
              Want B's Kitchen at <strong>your</strong> school?
            </p>
            <a
              href="/franchise"
              className="inline-block bg-blue-600 text-white font-bold text-xl py-4 px-8 rounded-lg hover:bg-blue-700 transition"
            >
              Learn About Franchise Opportunities →
            </a>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-6">
            Can't wait to serve you delicious, affordable meals every day!
          </p>
         
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-lg">
            Made with love at <span className="font-bold text-blue-600">B's Kitchen</span>
          </p>
          <p className="mt-2">Your favorite campus kitchen</p>
        </div>
      </div>
    </div>
  );
}