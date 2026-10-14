import {
  CalendarDays,
  Search,
  Users,
  BedDouble,
  CheckCircle,
} from "lucide-react";

const reservations = [
  {
    id: "RES-1001",
    guest: "Ali Khan",
    room: "Deluxe 204",
    checkIn: "10 Jul 2026",
    checkOut: "13 Jul 2026",
    status: "Confirmed",
  },
  {
    id: "RES-1002",
    guest: "Sara Ahmed",
    room: "Executive 305",
    checkIn: "11 Jul 2026",
    checkOut: "14 Jul 2026",
    status: "Pending",
  },
  {
    id: "RES-1003",
    guest: "John Smith",
    room: "Suite 402",
    checkIn: "12 Jul 2026",
    checkOut: "15 Jul 2026",
    status: "Checked In",
  },
  {
    id: "RES-1004",
    guest: "Emma Wilson",
    room: "Standard 115",
    checkIn: "13 Jul 2026",
    checkOut: "16 Jul 2026",
    status: "Cancelled",
  },
];

export default function Reservations() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-[#0F3D3E]">
          Reservations
        </h1>

        <p className="mt-2 text-gray-600">
          Manage hotel reservations and booking schedules.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow">
          <CalendarDays size={40} className="mb-4 text-blue-600" />
          <h2 className="text-3xl font-bold">145</h2>
          <p className="text-gray-500">Total Reservations</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <Users size={40} className="mb-4 text-green-600" />
          <h2 className="text-3xl font-bold">34</h2>
          <p className="text-gray-500">Today's Check-Ins</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <BedDouble size={40} className="mb-4 text-orange-500" />
          <h2 className="text-3xl font-bold">27</h2>
          <p className="text-gray-500">Available Rooms</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <CheckCircle size={40} className="mb-4 text-purple-600" />
          <h2 className="text-3xl font-bold">118</h2>
          <p className="text-gray-500">Confirmed</p>
        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white p-6 shadow">

        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search reservation..."
            className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-[#0F3D3E] focus:outline-none"
          />
        </div>

      </div>

      {/* Reservation Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Reservation ID</th>
              <th className="p-4 text-left">Guest</th>
              <th className="p-4 text-left">Room</th>
              <th className="p-4 text-left">Check In</th>
              <th className="p-4 text-left">Check Out</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {reservations.map((reservation) => (

              <tr
                key={reservation.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">
                  {reservation.id}
                </td>

                <td className="p-4">
                  {reservation.guest}
                </td>

                <td className="p-4">
                  {reservation.room}
                </td>

                <td className="p-4">
                  {reservation.checkIn}
                </td>

                <td className="p-4">
                  {reservation.checkOut}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      reservation.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : reservation.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : reservation.status === "Checked In"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>

                <td className="p-4 text-center">
                  <button className="rounded-lg bg-[#0F3D3E] px-4 py-2 text-white hover:bg-[#0B3132]">
                    View
                  </button>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}