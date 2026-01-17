import React from "react";

export default function Admindashboard() {
  const reviews = [
    {
      id: 1,
      name: "Amina Yusuf",
      rating: 5,
      comment: "The food was very fresh and delivery was super fast. I loved it!",
      date: "12 Aug 2025",
    },
    {
      id: 2,
      name: "John David",
      rating: 4,
      comment: "Great taste and good portion size. Will definitely order again.",
      date: "10 Aug 2025",
    },
    {
      id: 3,
      name: "Blessing Okon",
      rating: 5,
      comment: "Affordable and delicious. Customer service was polite.",
      date: "08 Aug 2025",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
          Logout
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* WELCOME */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold mb-2">Welcome back 👋</h2>
          <p className="text-gray-600">Here’s what customers are saying about your food.</p>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Total Reviews</h3>
            <p className="text-3xl font-bold text-red-600">{reviews.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Average Rating</h3>
            <p className="text-3xl font-bold text-red-600">4.8 ⭐</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-gray-500 mb-2">Satisfied Customers</h3>
            <p className="text-3xl font-bold text-red-600">95%</p>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>

          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b last:border-b-0 pb-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-lg">{review.name}</h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>

                <p className="text-red-600 mb-2">{"⭐".repeat(review.rating)}</p>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
