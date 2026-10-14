// src/pages/admin/Booking.jsx

import React, { useState } from "react";
import {
  CalendarDays,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const bookings = [
  {
    id: "BK-1001",
    guest: "John Smith",
    room: "101",
    roomType: "Deluxe",
    checkIn: "06 Jul 2026",
    checkOut: "09 Jul 2026",
    amount: "$450",
    status: "Confirmed",
  },
  {
    id: "BK-1002",
    guest: "Emma Watson",
    room: "204",
    roomType: "Suite",
    checkIn: "07 Jul 2026",
    checkOut: "11 Jul 2026",
    amount: "$980",
    status: "Pending",
  },
  {
    id: "BK-1003",
    guest: "Ali Khan",
    room: "305",
    roomType: "Standard",
    checkIn: "08 Jul 2026",
    checkOut: "10 Jul 2026",
    amount: "$220",
    status: "Cancelled",
  },
  {
    id: "BK-1004",
    guest: "Sophia Brown",
    room: "112",
    roomType: "Executive",
    checkIn: "10 Jul 2026",
    checkOut: "14 Jul 2026",
    amount: "$760",
    status: "Confirmed",
  },
];

const Booking = () => {
  const [search, setSearch] = useState("");

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.guest.toLowerCase().includes(search.toLowerCase()) ||
      booking.id.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status) => {
    switch (status) {
      case "Confirmed":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
            <CheckCircle size={14} />
            {status}
          </span>
        );

      case "Pending":
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
            <Clock size={14} />
            {status}
          </span>
        );

      default:
        return (
          <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-medium">
            <XCircle size={14} />
            {status}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-gray-500">
            View and manage all hotel bookings.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2">
          <CalendarDays size={18} />
          New Booking
        </button>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Bookings</p>
          <h2 className="text-3xl font-bold mt-2">245</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Confirmed</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">185</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Pending</p>
          <h2 className="text-3xl font-bold text-yellow-500 mt-2">34</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Cancelled</p>
          <h2 className="text-3xl font-bold text-red-500 mt-2">26</h2>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:w-96">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search booking..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button className="flex items-center gap-2 border px-4 py-2 rounded-lg hover:bg-gray-100">
          <Filter size={18} />
          Filter
        </button>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="text-gray-600">
              <th className="p-4">Booking ID</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Room</th>
              <th className="p-4">Type</th>
              <th className="p-4">Check-In</th>
              <th className="p-4">Check-Out</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredBookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{booking.id}</td>
                <td className="p-4">{booking.guest}</td>
                <td className="p-4">{booking.room}</td>
                <td className="p-4">{booking.roomType}</td>
                <td className="p-4">{booking.checkIn}</td>
                <td className="p-4">{booking.checkOut}</td>
                <td className="p-4 font-semibold text-green-600">
                  {booking.amount}
                </td>
                <td className="p-4">{statusBadge(booking.status)}</td>

                <td className="p-4">
                  <div className="flex justify-center">
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredBookings.length === 0 && (
              <tr>
                <td
                  colSpan="9"
                  className="text-center py-8 text-gray-500"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;