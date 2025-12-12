import React from "react";

const sampleCart = {
  items: [
     { id: 1, title: 'Jollof Rice', price: 600, img: '/src/assets/jollofrice.jpg' },
    { id: 2, title: 'Fried Rice', price: 600, img: '/src/assets/friedrice.jpg' },
    { id: 3, title: 'Coconut Rice', price: 600, img: '/src/assets/coconutrice.jpg' },
    { id: 4, title: 'White Rice', price: 600, img: '/src/assets/riceandstew.jpg' },
  ],
};

export default function Cart() {
  const { items } = sampleCart;
  const subtotal = items.reduce((s, it) => s + it.price * it.qty, 0);

  return (
    <div className="min-h-screen w-full  bg-gray-50">
      {/* Brown Header / Progress Bar Section */}
      <div className="bg-orange-900 text-white py-6">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          <div className="mt-3 flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <span className="font-bold">1.</span>
              <span>Shopping Cart</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center space-x-1">
              <span className="font-bold">2.</span>
              <span>Check out</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center space-x-1">
              <span className="font-bold">3.</span>
              <span>Order Complete</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center space-x-1">
              <span className="font-bold">4.</span>
              <span>Track your order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Cart Content */}
      <div className="px-4 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Cart Items / Details */}
          <div className="md:col-span-2 bg-white shadow rounded-2xl p-6">
            {items.length === 0 ? (
              <div className="py-20 text-center text-gray-500">Your cart is empty.</div>
            ) : (
              <>
                <div className="space-y-4">
                  {items.map((it) => (
                    <div key={it.id} className="flex items-center gap-4 border rounded-lg p-3">
                      <img
                        src={it.image}
                        alt={it.title}
                        className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                        onError={(e) => (e.currentTarget.src = "/images/placeholder.png")}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{it.title}</h3>
                          <div className="text-sm font-medium">₦{it.price.toLocaleString()}</div>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button className="px-3 py-1 text-gray-600">−</button>
                            <div className="px-4 py-1 bg-gray-50">{it.qty}</div>
                            <button className="px-3 py-1 text-gray-600">+</button>
                          </div>
                          <button className="text-sm text-red-600 underline">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-3 border-t">
                    <div className="text-gray-600">Subtotal</div>
                    <div className="text-lg font-semibold">₦{subtotal.toLocaleString()}</div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <a
                      href="/checkout"
                      className="px-5 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-700"
                    >
                      Proceed to Checkout
                    </a>
                    <a href="/menu" className="px-5 py-3 rounded-lg border">Continue Shopping</a>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Recommendations / Summary */}
          <aside className="bg-white shadow rounded-2xl p-6">
            <h4 className="text-lg font-medium mb-3">Can we tantalize you with?</h4>
            <div className="space-y-3">
              {/** Display sample recommended items */}
              <div className="flex items-center gap-3">
                <img
                  src="/images/veg-salad.jpg"
                  alt="Vegetable Salad"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <div className="text-sm font-medium">Fried Rice</div>
                  <div className="text-sm text-gray-500">₦850</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/src/assets/jollofrice.jpg"
                  alt="Jollof Rice"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <div className="text-sm font-medium">Coconut Rice</div>
                  <div className="text-sm text-gray-500">₦1,500</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/chicken-salad.jpg"
                  alt="Chicken Salad"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <div className="text-sm font-medium">Jollof Rice</div>
                  <div className="text-sm text-gray-500">₦1,500</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src="/images/chicken-salad.jpg"
                  alt="Chicken Salad"
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <div className="text-sm font-medium">Rice and Stew</div>
                  <div className="text-sm text-gray-500">₦1,500</div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-500">Prices Inclusive of VAT and Consumption Tax</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
