export default function RecentBookings({ bookings = [] }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          <p className="mt-1 text-sm text-gray-500">Latest reservations across the hotel</p>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-gray-300 px-4 py-10 text-center">
          <p className="font-medium text-gray-700">No bookings yet</p>
          <p className="mt-1 text-sm text-gray-500">New reservations will appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-0 text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase text-gray-500">
                <th className="pb-3 pr-4 font-medium">Guest</th>
                <th className="pb-3 pr-4 font-medium">Room</th>
                <th className="pb-3 pr-4 font-medium">Check-in</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-b last:border-0">
                  <td className="py-4 pr-4">
                    <p className="font-medium text-gray-900">{booking.userId?.name || booking.guestName || "Guest"}</p>
                    <p className="mt-1 text-xs text-gray-500">{booking.userId?.email || booking.guestEmail || ""}</p>
                  </td>
                  <td className="py-4 pr-4 text-gray-600">
                    {booking.roomId?.roomType || booking.roomNumber || "Room unavailable"}
                  </td>
                  <td className="py-4 pr-4 text-gray-600">
                    {booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : "—"}
                  </td>
                  <td className="py-4">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                      {booking.bookingStatus || "Booked"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}