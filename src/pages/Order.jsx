import React, { useState } from 'react';
import sign from '../assets/signup.jpg';

export default function OrderPage() {
  const [city, setCity] = useState('Lagos');
  const cities = [
    'Abeokuta',
    'Abuja',
    'Benin',
    'Ibadan',
    'Lagos',
    'Port Harcourt',
    'Anambra',
    'Uyo'
  ];

  const menu = [
    { id: 1, title: 'Jollof Rice', price: 600, img: '/src/assets/jollofrice.jpg' },
    { id: 2, title: 'Fried Rice', price: 600, img: '/src/assets/friedrice.jpg' },
    { id: 3, title: 'Coconut Rice', price: 600, img: '/src/assets/coconutrice.jpg' },
    { id: 4, title: 'White Rice', price: 600, img: '/src/assets/riceandstew.jpg' },
    { id: 5, title: 'Chinese Rice', price: 800, img: '/src/assets/chineserice.jpg' },
    { id: 6, title: 'French Fries (Chips)', price: 1800, img: '/src/assets/fries.jpg' },
    { id: 7, title: 'Spaghetti', price: 600, img: '/src/assets/spaghetti.jpg' },
    { id: 8, title: 'Barbeque (BBQ) Chicken', price: 3800, img: '/src/assets/barbacue.jpg' },
    { id: 9, title: 'Crunchy Chicken', price: 3800, img: '/src/assets/crustedchicken.jpg' },
    { id: 10, title: "Peppered Grilled Chicken (PPG)", price: 3800, img: '/src/assets/barbacue.jpg' },
    { id: 11, title: 'Roasted Chicken', price: 3800, img: '/src/assets/roastedchicken.jpg' },
    { id: 12, title: "1/8 Crunchy Chicken Piece", price: 2000, img: '/src/assets/friedchicken.jpg' },
    { id: 13, title: 'Chicken Wings', price: 2000, img: '/src/assets/chickenwing.jpg' },
    { id: 14, title: "Tantis Fish Ola", price: 3000, img: '/src/assets/barbacue.jpg' }
  ];

  const [cart, setCart] = useState([]);

  function addToCart(item) {
    setCart(prev => [...prev, item]);
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <header
        className="relative bg-cover bg-center min-h-[420px] flex items-center"
        style={{
          backgroundImage: `url(${sign})`,
        }}
      >
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 text-center">
         
          

          <div className="mt-8 inline-flex items-center bg-white rounded-full shadow-md overflow-hidden">
            <select
              value={city}
              onChange={e => setCity(e.target.value)}
              className="px-4 py-3 outline-none"
            >
              {cities.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button className="px-6 py-3 bg-orange-600 text-white font-semibold">
              Let's go!
            </button>
          </div>
        </div>
      </header>

      {/* Menu Section */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Special Delicacies</h2>
          <div className="text-sm text-gray-600">
            Showing outlets in <span className="font-semibold">{city}</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {menu.map(item => (
            <div key={item.id} className="bg-white rousnded-xl shadow p-3 flex flex-col">
              <div className="aspect-[4/3] rounded-lg  overflow-hidden bg-gray-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  ₦ {item.price.toLocaleString()}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={() => addToCart(item)}
                    className="px-3 py-2 bg-orange-600 text-white rounded-md text-sm"
                  >
                    Add
                  </button>
                  <button className="text-xs text-gray-600">View</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <section className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-bold">How it works</h3>
          <ol className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <li className="p-4 bg-white rounded shadow">
             <input type="text"
             placeholder="Search meal" /> 
            </li>
            <li className="p-4 bg-white rounded shadow">
             <input type="text"
             placeholder="Enter amount" /> 
            </li>
            <li className="p-4 bg-white rounded shadow">
             <input type="text"
             placeholder="Mode of Payment" /> 
            </li>
             <button className="font-medium text-white text-sm sm:text-base rounded-xl px-6 py-3 bg-red-700 hover:bg-red-800 transition">
                Let’s Go!
              </button> 
          </ol>
         
        </section>

        {/* Simple cart preview */}
        <aside className="mt-8 p-4 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">
              Cart <span className="text-sm text-gray-500">({cart.length})</span>
            </h4>
            <button className="text-sm text-orange-600">Go to checkout</button>
          </div>
          {cart.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500">
              Your cart is empty — add something yummy!
            </p>
          ) : (
            <ul className="mt-3 space-y-2">
              {cart.map((c, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span>{c.title}</span>
                  <span>₦ {c.price.toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </main>
    </div>
  );
}
