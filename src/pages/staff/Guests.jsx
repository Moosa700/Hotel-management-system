import { Search, Users, Phone, Mail, BedDouble } from "lucide-react";

const guests = [
  {
    id: "GST-001",
    name: "Ali Khan",
    email: "ali@example.com",
    phone: "+92 300 1234567",
    room: "Deluxe 204",
    status: "Checked In",
  },
  {
    id: "GST-002",
    name: "Sara Ahmed",
    email: "sara@example.com",
    phone: "+92 321 9876543",
    room: "Suite 305",
    status: "Reserved",
  },
  {
    id: "GST-003",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 555 123456",
    room: "Executive 112",
    status: "Checked Out",
  },
];

export default function Guests() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-[#0F3D3E]">
          Guest Management
        </h1>

        <p className="mt-2 text-gray-600">
          View and manage all hotel guests.
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">
          <Users className="mb-4 text-blue-600" size={40} />
          <h2 className="text-3xl font-bold">84</h2>
          <p className="text-gray-500">Total Guests</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <BedDouble className="mb-4 text-green-600" size={40} />
          <h2 className="text-3xl font-bold">52</h2>
          <p className="text-gray-500">Checked In</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <Users className="mb-4 text-orange-500" size={40} />
          <h2 className="text-3xl font-bold">18</h2>
          <p className="text-gray-500">Reservations</p>
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
            placeholder="Search guest..."
            className="w-full rounded-xl border py-3 pl-11 pr-4 focus:border-[#0F3D3E] focus:outline-none"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>
              <th className="p-4 text-left">Guest</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Room</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {guests.map((guest) => (

              <tr
                key={guest.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4 font-semibold">
                  {guest.name}
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {guest.email}
                  </div>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {guest.phone}
                  </div>
                </td>

                <td className="p-4">{guest.room}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      guest.status === "Checked In"
                        ? "bg-green-100 text-green-700"
                        : guest.status === "Reserved"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {guest.status}
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