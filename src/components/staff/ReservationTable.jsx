const reservations = [
  {
    id: "BK-1001",
    guest: "John Smith",
    room: "Executive Suite",
    checkIn: "12 Jul",
    checkOut: "15 Jul",
    status: "Confirmed",
  },
  {
    id: "BK-1002",
    guest: "Sarah Khan",
    room: "Deluxe Room",
    checkIn: "14 Jul",
    checkOut: "16 Jul",
    status: "Checked In",
  },
  {
    id: "BK-1003",
    guest: "Ali Ahmed",
    room: "Family Suite",
    checkIn: "18 Jul",
    checkOut: "22 Jul",
    status: "Pending",
  },
];

export default function ReservationTable() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        Reservations
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="pb-3 text-left">Booking ID</th>
            <th className="pb-3 text-left">Guest</th>
            <th className="pb-3 text-left">Room</th>
            <th className="pb-3 text-left">Check In</th>
            <th className="pb-3 text-left">Check Out</th>
            <th className="pb-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((booking) => (
            <tr key={booking.id} className="border-b">
              <td className="py-4">{booking.id}</td>
              <td>{booking.guest}</td>
              <td>{booking.room}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>{booking.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}