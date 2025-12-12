 import React, { useState } from "react";
 import franc from "../assets/franci.jpg";

export default function Fran() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // For now, just log or you can integrate your API
    console.log("Submit franchise form:", form);
    alert("Form submitted — in real app you'd send it to server.");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / header section */}
      <div className="bg-cover bg-center h-64 md:h-96 relative"
       style={{ backgroundImage: `url(${franc})`,
        
       }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-white px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center">Become a Franchisee</h1>
          <p className="mt-4 text-center max-w-xl">
            Join the B's family. Run your own outlet under a trusted brand with full support.
          </p>
        </div>
      </div>

      {/* Content section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-8">
          {/* Info section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Opportunity Awaits</h2>
            <p className="text-gray-700 leading-relaxed">
              With over 50 outlets in Nigeria, B's Kitchen is expanding. We offer comprehensive support — site selection, supply chain, training, ongoing operations — to help you succeed.
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700">
              <li>1-week induction & training at support center</li>
              <li>Site selection & lease assistance</li>
              <li>Structured supply chain for food, packaging, equipment</li>
              <li>Ongoing operational & brand support</li>
            </ul>
          </div>

          {/* Contact / Form section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-orange-200"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-orange-200"
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-orange-200"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-orange-200 h-32 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
            <p className="text-gray-700">Ikot Akpaden, Mkpat Enin.</p>
            <p className="text-gray-700 mt-2">Email: etoroabasibassey2006@gmail.com</p>
            <p className="text-gray-700 mt-2">Phone: 08038131661, 09160416617</p>
          </div>
        </div>
      </div>
    </div>
  );
}
