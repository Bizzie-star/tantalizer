import React from 'react';

export default function Franchise() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest in franchising with B\'s Kitchen! We will review your inquiry and get back to you soon ❤️');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <span role="img" aria-label="handshake"></span>
            Franchise Opportunities with B's Kitchen
          </h1>
          <p className="text-xl text-gray-600 mt-3">
            Grow with us — Bring delicious, affordable campus meals to your location!
          </p>
          <p className="text-lg text-blue-600 mt-2 font-medium">
            Join our family and cook with love.
          </p>
        </div>

        {/* Introduction Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Why Franchise with B's Kitchen?</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            B's Kitchen started as a beloved campus food spot, serving fresh Nigerian meals to students and staff with speed and care. 
            Now, we're ready to expand and share our proven model with passionate entrepreneurs like you!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="flex items-start gap-4">
              <span className="text-4xl"></span>
              <div>
                <h3 className="font-bold text-lg">Proven Campus Success</h3>
                <p className="text-gray-600">High demand from students, affordable pricing, and quick service — perfect for university environments.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl"></span>
              <div>
                <h3 className="font-bold text-lg">Low Startup Costs</h3>
                <p className="text-gray-600">Simple setup with minimal equipment needed. Ideal for small spaces like campus kiosks or hostels.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl"></span>
              <div>
                <h3 className="font-bold text-lg">Full Training & Support</h3>
                <p className="text-gray-600">Recipes, operations, marketing, and ongoing guidance from our team.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-4xl"></span>
              <div>
                <h3 className="font-bold text-lg">Exclusive Campus Territories</h3>
                <p className="text-gray-600">Protected areas to ensure your success without competition.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Franchise Requirements */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-semibold mb-6">What We're Looking For</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              Passionate individuals or teams with food service experience (preferred but not required)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              Access to a suitable location on or near a university campus
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              Initial investment starting from ₦5,000,000 (includes setup, training, and branding)
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">•</span>
              Commitment to quality, customer service, and our brand values
            </li>
          </ul>
        </div>

        {/* Inquiry Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Apply for a Franchise
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Fill out the form below and we'll send you our franchise information pack!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Full Name"
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
              <input
                type="tel"
                placeholder="Phone Number (WhatsApp preferred)"
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
            />

            <input
              type="text"
              placeholder="Proposed Location (e.g., University Name & City)"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
            />

            <textarea
              placeholder="Tell us about yourself and why you'd be a great B's Kitchen franchise partner..."
              rows="6"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold text-xl py-4 rounded-lg hover:bg-blue-700 transition"
            >
              Submit Franchise Inquiry 
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-lg">
            Let's bring B's Kitchen to more campuses together! 
          </p>
          <p className="mt-2">Limited opportunities available — Apply today!</p>
        </div>
      </div>
    </div>
  );
}