// src/pages/Outlets.jsx
import React, { useState } from "react";

const sampleOutlets = [
  { id: 1, name: "Festac I - Festac Town", address: "Makay Plaza, I Close, 21 Road, Festac Town" },
  { id: 2, name: "Lagos I - Broad Street", address: "19 Broad Str, Opp. Bookshop House, Lagos" },
  { id: 3, name: "Allen - Allen Avenue", address: "117 Allen Ave, Opp Alade Shopping Mall, Ikeja" },
  { id: 4, name: "Apapa - Kofo Abayomi", address: "62 Kofo Abayomi Ave, Apapa" },
  // add more or fetch from API
];

export default function Outlets() {
  const [query, setQuery] = useState("");
  const filtered = sampleOutlets.filter(
    (o) =>
      o.name.toLowerCase().includes(query.toLowerCase()) ||
      o.address.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* header */}
        <div className="px-6 py-6 border-b">
          <h1 className="text-2xl font-bold">Outlets</h1>
          <p className="text-sm text-gray-500 mt-1">
            Below are a list of all our outlets across Nigeria. Check them out to see the one closest to you.
          </p>
        </div>

        {/* search + actions */}
        <div className="px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-1/2">
            <input
              aria-label="Search outlets"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by city, outlet name or address..."
              className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-orange-600 text-white hover:bg-orange-700">
              View on map
            </button>
            <a href="/franchise" className="text-sm text-orange-600 underline">
              Franchise info
            </a>
          </div>
        </div>

        {/* list */}
        <div className="px-6 py-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">S/N</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Outlet</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Outlet Address</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                      No outlets found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((o, idx) => (
                    <tr key={o.id}>
                      <td className="px-4 py-4 text-sm text-gray-700">{idx + 1}</td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">{o.name}</td>
                      <td className="px-4 py-4 text-sm text-gray-700">{o.address}</td>
                      <td className="px-4 py-4 text-right">
                        <a
                          href={`https://www.google.com/maps/search/${encodeURIComponent(o.address)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
                        >
                          Open in Maps
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* footer */}
        <div className="px-6 py-5 border-t bg-gray-50 text-sm text-gray-600">
          <div className="max-w-6xl mx-auto">
            <p>For more outlet information or franchise requests, visit the Franchise page.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
