import React from 'react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent to B\'s Kitchen. We will get back to you soon ');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <span role="img" aria-label="phone"></span>
            Contact B's Kitchen
          </h1>
          <p className="text-xl text-gray-600 mt-3">
            We're here to help! Reach out for orders, inquiries, or feedback
          </p>
          <p className="text-lg text-blue-600 mt-2 font-medium">
            Your satisfaction is our priority 
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Phone Numbers */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <span className="text-5xl block mb-4"></span>
            <h3 className="text-2xl font-semibold mb-4">Call or WhatsApp</h3>
            <div className="space-y-3">
              <p className="text-lg">
                <a href="tel:09160416617" className="text-blue-600 font-medium hover:underline">
                  0916 041 6617
                </a>
              </p>
              <p className="text-lg">
                <a href="tel:07089828558" className="text-blue-600 font-medium hover:underline">
                  0708 982 8558
                </a>
              </p>
            </div>
            <p className="text-gray-600 mt-4 text-sm">Available 8:00 AM - 9:00 PM daily</p>
          </div>

          {/* Email */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <span className="text-5xl block mb-4"></span>
            <h3 className="text-2xl font-semibold mb-4">Email Us</h3>
            <p className="text-lg break-all">
              <a href="mailto:etoroabasibassey2006@gmail.com" className="text-blue-600 font-medium hover:underline">
                etoroabasibassey2006@gmail.com
              </a>
            </p>
            <p className="text-gray-600 mt-4 text-sm">We reply within 24 hours</p>
          </div>

          {/* Campus Service */}
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <span className="text-5xl block mb-4"></span>
            <h3 className="text-2xl font-semibold mb-4">Campus Delivery</h3>
            <p className="text-lg text-gray-700">
              We serve students and staff within the campus only
            </p>
            <p className="text-gray-600 mt-4 text-sm">
              Fast & free delivery to hostels, departments, and lecture halls
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Send Us a Message or Complaint
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Have a question, suggestion, or complaint? Let us know — we value your feedback!
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
                placeholder="Your Phone Number"
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>

            <input
              type="email"
              placeholder="Your Email (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
            />

            <select
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
            >
              <option value="">Select Message Type</option>
              <option value="order">Order Inquiry</option>
              <option value="complaint">Complaint / Issue</option>
              <option value="suggestion">Suggestion</option>
              <option value="feedback">General Feedback</option>
              <option value="other">Other</option>
            </select>

            <textarea
              placeholder="Write your message here... (e.g., delivery location on campus, complaint about food, special requests, etc.)"
              rows="6"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold text-xl py-4 rounded-lg hover:bg-blue-700 transition"
            >
              Send Message 📤
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-lg">
            Proudly serving our campus community at <span className="font-bold text-blue-600">B's Kitchen</span> 🍲
          </p>
          <p className="mt-2">Fresh, affordable, and delicious — made just for you </p>
        </div>
      </div>
    </div>
  );
}