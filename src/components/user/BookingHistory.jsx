const bookings = [
  {
    id: "BK-1001",
    room: "Executive Suite",
    checkIn: "12 Jul 2026",
    checkOut: "15 Jul 2026",
    amount: "$750",
    status: "Completed",
  },
  {
    id: "BK-1002",
    room: "Deluxe Room",
    checkIn: "20 Jun 2026",
    checkOut: "22 Jun 2026",
    amount: "$360",
    status: "Completed",
  },
  {
    id: "BK-1003",
    room: "Family Suite",
    checkIn: "10 May 2026",
    checkOut: "15 May 2026",
    amount: "$1,200",
    status: "Completed",
  },
];

export default function BookingHistory() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <h2 className="mb-6 text-2xl font-bold">
        Booking History
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="pb-3 text-left">Booking ID</th>
            <th className="pb-3 text-left">Room</th>
            <th className="pb-3 text-left">Check In</th>
            <th className="pb-3 text-left">Check Out</th>
            <th className="pb-3 text-left">Amount</th>
            <th className="pb-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b">
              <td className="py-4">{booking.id}</td>
              <td>{booking.room}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{booking.amount}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}