import React, { useEffect, useState } from "react";

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}

function StatusBadge({ status }) {
  const colors = {
    Delivered: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        colors[status]
      }`}
    >
      {status}
    </span>
  );
}

export default function UserDashboard() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Mock data (replace with API later)
    const data = [
      {
        id: 1,
        meal: "Jollof Rice & Chicken",
        amount: 2500,
        date: "2025-01-10",
        status: "Delivered",
      },
      {
        id: 2,
        meal: "Fried Rice & Turkey",
        amount: 3000,
        date: "2025-01-18",
        status: "Pending",
      },
      {
        id: 3,
        meal: "Burger & Fries",
        amount: 2000,
        date: "2025-01-22",
        status: "Cancelled",
      },
    ];

    setOrders(data);
  }, []);

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, o) => sum + o.amount, 0);
  const lastOrderDate =
    orders.length > 0 ? orders[orders.length - 1].date : "—";

  const filteredOrders = orders.filter((order) =>
    order.meal.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">👋 Welcome back</h1>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Orders" value={totalOrders} />
        <StatCard title="Meals Ordered" value={totalOrders} />
        <StatCard title="Total Spent (₦)" value={totalSpent} />
        <StatCard title="Last Order" value={lastOrderDate} />
      </div>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-4 mb-6">
        <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg">
          Order Food
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
          View All Orders
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search meals..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full sm:w-64 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
      />

      {/* ORDERS TABLE */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="p-4">Meal</th>
              <th className="p-4">Amount (₦)</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{order.meal}</td>
                  <td className="p-4">{order.amount}</td>
                  <td className="p-4">{order.date}</td>
                  <td className="p-4">
                    <StatusBadge status={order.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
