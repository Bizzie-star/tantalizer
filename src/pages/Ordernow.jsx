import React, { useState } from 'react';

export default function Ordernow() {
  const [userType, setUserType] = useState('student');
  const [name, setName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [specialRequests, setSpecialRequests] = useState('');

  // Updated menu with Nigerian dishes and realistic campus prices in Naira (₦)
  const menuItems = [
    { id: '1', name: 'Jollof Rice with Chicken', price: 2500 },
    { id: '2', name: 'Egusi Soup with Pounded Yam', price: 3000 },
    { id: '3', name: 'Fried Rice with Beef', price: 2500 },
    { id: '4', name: 'Beans and Plantain', price: 1500 },
    { id: '5', name: 'Spaghetti Jollof', price: 1800 },
    { id: '6', name: 'White Rice & Stew with Fish', price: 2800 },
    { id: '7', name: 'Zobo Drink', price: 800 },
    { id: '8', name: 'Chapman', price: 1000 },
    { id: '9', name: 'Pure Water (Sachet)', price: 50 },
    { id: '10', name: 'Bottled Water', price: 300 },
    { id: '11', name: 'Puff Puff (6 pieces)', price: 500 },
    { id: '12', name: 'Meat Pie', price: 800 },
    { id: '13', name: 'Chin Chin (small pack)', price: 500 },
  ];

  const toggleItem = (id) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const total = selectedItems.reduce((sum, id) => {
    const item = menuItems.find(i => i.id === id);
    return sum + (item?.price || 0);
  }, 0);

  // Format price with Naira symbol and commas
  const formatPrice = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('Please select at least one item.');
      return;
    }
    alert(`Order placed successfully!\nTotal: ${formatPrice(total)}\nThank you, ${name}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <span role="img" aria-label="shopping cart"></span>
            B's Kitchen Order
          </h1>
          <p className="text-gray-600 mt-2">Fresh, delicious meals served on campus</p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Who are you?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button
              type="button"
              onClick={() => setUserType('student')}
              className={`p-6 rounded-lg border-2 transition-all ${
                userType === 'student'
                  ? 'border-blue-600 bg-blue-50 shadow-lg'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              <span className="text-5xl block mb-3"></span>
              <p className="font-medium text-lg">Student</p>
            </button>

            <button
              type="button"
              onClick={() => setUserType('lecturer')}
              className={`p-6 rounded-lg border-2 transition-all ${
                userType === 'lecturer'
                  ? 'border-purple-600 bg-purple-50 shadow-lg'
                  : 'border-gray-300 hover:border-purple-400'
              }`}
            >
              <span className="text-5xl block mb-3"></span>
              <p className="font-medium text-lg">Lecturer / Staff</p>
            </button>

            <button
              type="button"
              onClick={() => setUserType('visitor')}
              className={`p-6 rounded-lg border-2 transition-all ${
                userType === 'visitor'
                  ? 'border-green-600 bg-green-50 shadow-lg'
                  : 'border-gray-300 hover:border-green-400'
              }`}
            >
              <span className="text-5xl block mb-3"></span>
              <p className="font-medium text-lg">Visitor</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Info */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder={
                  userType === 'student' ? 'Matric Number' :
                  userType === 'lecturer' ? 'Staff ID' : 'Phone Number'
                }
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Menu */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Choose Your Food & Drinks</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium mb-4"> Main Dishes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.slice(0, 6).map(item => (
                    <label key={item.id} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                        <span className="text-lg">{item.name}</span>
                      </div>
                      <span className="font-semibold text-blue-600">{formatPrice(item.price)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Drinks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.slice(6, 10).map(item => (
                    <label key={item.id} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                        <span className="text-lg">{item.name}</span>
                      </div>
                      <span className="font-semibold text-blue-600">{formatPrice(item.price)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4"> Snacks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menuItems.slice(10).map(item => (
                    <label key={item.id} className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleItem(item.id)}
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                        <span className="text-lg">{item.name}</span>
                      </div>
                      <span className="font-semibold text-blue-600">{formatPrice(item.price)}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Special Requests (Optional)</h2>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g., Extra spicy, no onions, deliver to Hall 3 Block B..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Summary & Submit */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-lg">Items selected: <strong>{selectedItems.length}</strong></p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-blue-600">Total: {formatPrice(total)}</p>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold text-xl py-4 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              disabled={selectedItems.length === 0}
            >
              Place Order
            </button>
          </div>
           
        </form>

        <p className="text-center text-gray-600 mt-10">
          Fast delivery within campus • Freshly cooked by B's Kitchen • Thank you! 
        </p>
      </div>
    </div>
  );
}