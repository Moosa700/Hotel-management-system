const upcoming = [
  {
    id: "BK-2001",
    room: "Presidential Suite",
    checkIn: "18 July 2026",
    checkOut: "22 July 2026",
    guests: 2,
  },
];

export default function UpcomingBookings() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Upcoming Booking
      </h2>

      {upcoming.map((booking) => (
        <div
          key={booking.id}
          className="rounded-xl border p-6"
        >
          <h3 className="text-xl font-semibold">
            {booking.room}
          </h3>

          <p className="mt-2 text-gray-500">
            Booking ID: {booking.id}
          </p>

          <p className="mt-2">
            Check In : {booking.checkIn}
          </p>

          <p>
            Check Out : {booking.checkOut}
          </p>

          <p>
            Guests : {booking.guests}
          </p>

          <button className="mt-6 rounded-lg bg-primary px-6 py-3 text-white">
            View Booking
          </button>
        </div>
      ))}
    </div>
  );
}