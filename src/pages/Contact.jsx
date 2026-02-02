import React from 'react';
import { Phone, Mail, MapPin, MessageSquare, Send, HelpCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent to B\'s Kitchen. We will get back to you soon ❤️');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* =====================
          HERO SECTION 
      ===================== */}
      <div className="relative bg-rose-900 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 ring-1 ring-white/20 shadow-lg">
            <HelpCircle size={24} className="text-orange-300 mr-2" />
            <span className="font-bold tracking-wide text-sm uppercase">Support Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
            We're Here to <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-rose-200">
              Help You
            </span>
          </h1>
          <p className="text-xl text-rose-100 max-w-2xl mx-auto leading-relaxed">
            Have a question about your order or want to give feedback? Reach out to us directly.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 relative z-20">
        
        {/* =====================
            CONTACT CARDS
        ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Phone */}
          <ContactCard 
            icon={<Phone size={32} className="text-rose-600" />}
            title="Call or WhatsApp"
            desc="Available 8:00 AM - 9:00 PM daily for instant support."
          >
            <div className="flex flex-col gap-2 mt-4">
              <a href="tel:09160416617" className="text-lg font-bold text-gray-800 hover:text-rose-600 transition">0916 041 6617</a>
              <a href="tel:07089828558" className="text-lg font-bold text-gray-800 hover:text-rose-600 transition">0708 982 8558</a>
            </div>
          </ContactCard>

          {/* Email */}
          <ContactCard 
            icon={<Mail size={32} className="text-blue-600" />}
            title="Email Support"
            desc="Send us an email for general inquiries or partnership requests."
          >
            <div className="mt-4">
              <a href="mailto:etoroabasibassey2006@gmail.com" className="text-lg font-bold text-gray-800 hover:text-blue-600 transition break-all">
                etoroabasibassey2006@gmail.com
              </a>
              <p className="text-sm text-gray-500 mt-2">Replies within 24 hours</p>
            </div>
          </ContactCard>

          {/* Location */}
          <ContactCard 
            icon={<MapPin size={32} className="text-green-600" />}
            title="Campus Delivery"
            desc="We serve students and staff within the university campus."
          >
            <div className="mt-4 bg-green-50 text-green-800 px-4 py-2 rounded-lg text-sm font-medium inline-block border border-green-100">
              <span className="flex items-center justify-center gap-2">
                 Free delivery to all hostels & depts
              </span>
            </div>
          </ContactCard>

        </div>

        {/* =====================
            CONTACT FORM
        ===================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Form Side */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <MessageSquare className="text-rose-600" /> Send a Message
              </h2>
              <p className="text-gray-500 mt-2">Whether it's a compliment or a complaint, we want to hear from you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
                  <input type="tel" required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                <div className="relative">
                  <select required className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all appearance-none cursor-pointer">
                    <option value="">Select Message Type</option>
                    <option value="order">Order Inquiry</option>
                    <option value="complaint">Complaint / Issue</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="feedback">General Feedback</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">▼</div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                <textarea 
                  rows="5" 
                  required 
                  placeholder="How can we help you today?"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-1 transition-all duration-300"
              >
                Send Message <Send size={20} />
              </button>
            </form>
          </div>

          {/* Info Side */}
          <div className="lg:mt-12 space-y-8">
             <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100">
                <h3 className="text-xl font-bold text-rose-900 mb-4 flex items-center gap-2">
                   <AlertCircle size={24} /> Urgent Issue?
                </h3>
                <p className="text-rose-800 mb-6 leading-relaxed">
                   If you have an issue with an active order (e.g., late delivery or missing items), please call us immediately for the fastest resolution.
                </p>
                <a href="tel:09160416617" className="inline-flex items-center justify-center px-6 py-3 bg-white text-rose-600 font-bold rounded-xl shadow-sm hover:bg-rose-100 transition-colors w-full sm:w-auto">
                   Call 0916 041 6617
                </a>
             </div>

             <div className="text-center lg:text-left px-4">
                <p className="text-gray-400 font-medium">
                   We typically respond to emails within <span className="text-gray-600 font-bold">24 hours</span>. <br/>
                   Our support team is available <span className="text-gray-600 font-bold">Mon-Sun</span>.
                </p>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}

// --- Helper Component ---
const ContactCard = ({ icon, title, desc, children }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm mb-4">{desc}</p>
    {children}
  </div>
);