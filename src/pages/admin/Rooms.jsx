// src/pages/admin/Rooms.jsx

import React, { useState } from "react";
import {
  BedDouble,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  DoorOpen,
} from "lucide-react";

const roomData = [
  {
    id: 101,
    type: "Deluxe",
    floor: 1,
    price: 120,
    capacity: 2,
    status: "Available",
  },
  {
    id: 102,
    type: "Suite",
    floor: 1,
    price: 250,
    capacity: 4,
    status: "Occupied",
  },
  {
    id: 201,
    type: "Standard",
    floor: 2,
    price: 80,
    capacity: 2,
    status: "Available",
  },
  {
    id: 202,
    type: "Executive",
    floor: 2,
    price: 180,
    capacity: 3,
    status: "Maintenance",
  },
  {
    id: 301,
    type: "Presidential",
    floor: 3,
    price: 500,
    capacity: 6,
    status: "Occupied",
  },
];

const Rooms = () => {
  const [search, setSearch] = useState("");

  const filteredRooms = roomData.filter(
    (room) =>
      room.type.toLowerCase().includes(search.toLowerCase()) ||
      room.id.toString().includes(search)
  );

  const statusBadge = (status) => {
    switch (status) {
      case "Available":
        return (
          <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700 flex items-center gap-1 w-fit">
            <CheckCircle size={14} />
            {status}
          </span>
        );

      case "Occupied":
        return (
          <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700 flex items-center gap-1 w-fit">
            <XCircle size={14} />
            {status}
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700 flex items-center gap-1 w-fit">
            <DoorOpen size={14} />
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
            Room Management
          </h1>
          <p className="text-gray-500">
            Manage hotel rooms, pricing, and availability.
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center gap-2">
          <Plus size={18} />
          Add Room
        </button>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Total Rooms</p>
          <h2 className="text-3xl font-bold mt-2">120</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Available</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">58</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Occupied</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">54</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <p className="text-gray-500">Maintenance</p>
          <h2 className="text-3xl font-bold text-yellow-500 mt-2">8</h2>
        </div>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-4 mb-6 flex justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search room..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">Room No.</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Floor</th>
              <th className="p-4 text-left">Capacity</th>
              <th className="p-4 text-left">Price/Night</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRooms.map((room) => (
              <tr
                key={room.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-semibold">{room.id}</td>
                <td className="p-4">{room.type}</td>
                <td className="p-4">{room.floor}</td>
                <td className="p-4">{room.capacity} Guests</td>
                <td className="p-4 font-semibold text-green-600">
                  ${room.price}
                </td>
                <td className="p-4">{statusBadge(room.status)}</td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>

                    <button className="text-yellow-600 hover:text-yellow-700">
                      <Edit size={18} />
                    </button>

                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredRooms.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Room Types */}

      <div className="grid md:grid-cols-4 gap-5 mt-8">
        <div className="bg-white shadow rounded-xl p-5 text-center">
          <BedDouble className="mx-auto text-blue-600 mb-3" size={35} />
          <h3 className="font-semibold">Standard</h3>
          <p className="text-gray-500 text-sm">$80 / Night</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <BedDouble className="mx-auto text-green-600 mb-3" size={35} />
          <h3 className="font-semibold">Deluxe</h3>
          <p className="text-gray-500 text-sm">$120 / Night</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <BedDouble className="mx-auto text-purple-600 mb-3" size={35} />
          <h3 className="font-semibold">Executive</h3>
          <p className="text-gray-500 text-sm">$180 / Night</p>
        </div>

        <div className="bg-white shadow rounded-xl p-5 text-center">
          <BedDouble className="mx-auto text-red-600 mb-3" size={35} />
          <h3 className="font-semibold">Presidential</h3>
          <p className="text-gray-500 text-sm">$500 / Night</p>
        </div>
      </div>
    </div>
  );
};

export default Rooms;