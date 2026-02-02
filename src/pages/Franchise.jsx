import React from 'react';
import { Handshake, TrendingUp, Wallet, BookOpen, MapPin, CheckCircle, Send, Users } from 'lucide-react';

export default function Franchise() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your interest in franchising with B\'s Kitchen! We will review your inquiry and get back to you soon ❤️');
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* =====================
          HERO SECTION 
      ===================== */}
      <div className="relative bg-rose-900 text-white py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl opacity-20 translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-sm rounded-full mb-6 ring-1 ring-white/20">
            <Handshake size={24} className="text-orange-300 mr-2" />
            <span className="font-bold tracking-wide text-sm uppercase">Partner with Us</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Own a Slice of <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-rose-200">
              B's Kitchen Success
            </span>
          </h1>
          <p className="text-xl text-rose-100 max-w-2xl mx-auto leading-relaxed">
            Bring the most loved campus dining experience to your university. Proven model, loyal customers, and full operational support.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 -mt-16 relative z-20">
        
        {/* =====================
            WHY FRANCHISE CARDS
        ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-16">
          <FeatureCard 
            icon={<TrendingUp size={32} className="text-rose-600" />}
            title="Proven Campus Success"
            desc="High demand from students, affordable pricing, and quick service — specifically designed for university environments."
          />
          <FeatureCard 
            icon={<Wallet size={32} className="text-orange-600" />}
            title="Low Startup Costs"
            desc="Simple setup with minimal equipment needed. Ideal for small spaces like campus kiosks or hostels."
          />
          <FeatureCard 
            icon={<BookOpen size={32} className="text-blue-600" />}
            title="Comprehensive Training"
            desc="You don't need to be a chef. We provide recipes, operational playbooks, and hands-on training for your team."
          />
          <FeatureCard 
            icon={<MapPin size={32} className="text-green-600" />}
            title="Exclusive Territories"
            desc="We grant protected territories on campuses to ensure you maximize your revenue without internal competition."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* =====================
              REQUIREMENTS LIST
          ===================== */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Users className="text-rose-600" /> Who We Are Looking For
            </h2>
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
              <p className="text-gray-600 mb-4">
                We are looking for passionate partners who understand student culture and want to build a profitable business while serving the community.
              </p>
              
              <RequirementItem text="Passionate individuals or teams with leadership drive." />
              <RequirementItem text="Access to a suitable location on or near a university campus." />
              <RequirementItem text="Initial investment capital starting from ₦5,000,000." />
              <RequirementItem text="Commitment to hygiene, quality, and customer service." />
              <RequirementItem text="Willingness to follow the B's Kitchen operational system." />
            </div>

            {/* Testimonial / Social Proof Placeholder */}
            <div className="mt-8 bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <p className="text-orange-800 italic font-medium">
                    "Franchising with B's Kitchen was the best decision. The student response was immediate, and the support team is incredible."
                </p>
                <div className="mt-4 flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-200 rounded-full"></div>
                    <span className="text-sm font-bold text-orange-900">Mr. Adebayo, Franchise Partner (UNILAG)</span>
                </div>
            </div>
          </div>

          {/* =====================
              INQUIRY FORM
          ===================== */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 lg:p-10">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Apply for a Franchise</h2>
                <p className="text-gray-500 mt-2">Fill out the form below to receive our information pack.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup type="text" placeholder="Full Name" />
                <InputGroup type="tel" placeholder="Phone Number" />
              </div>

              <InputGroup type="email" placeholder="Email Address" />
              <InputGroup type="text" placeholder="Proposed Location (e.g. UNIBEN, Edo State)" />

              <div className="space-y-1">
                <label className="text-sm font-semibold text-gray-700 ml-1">Why do you want to partner with us?</label>
                <textarea
                    rows="4"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-rose-600 to-orange-500 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:shadow-rose-200 hover:-translate-y-1 transition-all duration-300"
              >
                Submit Inquiry <Send size={20} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

// --- Helper Components ---

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
        {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const RequirementItem = ({ text }) => (
  <div className="flex items-start gap-3">
    <CheckCircle className="text-green-500 mt-0.5 shrink-0" size={20} />
    <span className="text-gray-700 font-medium">{text}</span>
  </div>
);

const InputGroup = ({ type, placeholder }) => (
  <div className="space-y-1">
    <label className="text-sm font-semibold text-gray-700 ml-1">{placeholder}</label>
    <input
        type={type}
        required
        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 outline-none transition-all"
    />
  </div>
);