
import React, { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone && password) {
      alert(`Account created successfully! Welcome to B's Kitchen, ${name} `);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mx-auto mb-6 flex items-center justify-center">
            <span className="text-6xl"></span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Join B's Kitchen</h1>
          <p className="text-xl text-gray-600 mt-3">Create your account</p>
          <p className="text-lg text-gray-600 mt-2">Order faster & save your favorites </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="e.g. 09160416617"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-bold text-xl py-4 rounded-lg hover:bg-orange-700 transition shadow-lg"
            >
              Create Account 
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-700">Already have an account?</p>
            <Link to="/signin" className="inline-block mt-3 text-blue-600 font-bold text-xl hover:underline">
              Sign In →
            </Link>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">Or skip signing up</p>
            <Link
              to="/order"
              className="inline-block mt-3 bg-gray-200 text-gray-800 font-bold text-lg py-3 px-8 rounded-lg hover:bg-gray-300 transition"
            >
              Order as Guest 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}