const rooms = [
  {
    id: "101",
    type: "Deluxe",
    price: "$180",
    status: "Available",
  },
  {
    id: "102",
    type: "Executive",
    price: "$250",
    status: "Occupied",
  },
  {
    id: "103",
    type: "Family",
    price: "$320",
    status: "Cleaning",
  },
  {
    id: "104",
    type: "Presidential",
    price: "$450",
    status: "Maintenance",
  },
];

export default function RoomTable() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Rooms</h2>

        <button className="rounded-lg bg-primary px-5 py-2 text-white">
          Add Room
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="pb-3 text-left">Room</th>
            <th className="pb-3 text-left">Type</th>
            <th className="pb-3 text-left">Price</th>
            <th className="pb-3 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-b">
              <td className="py-4">{room.id}</td>
              <td>{room.type}</td>
              <td>{room.price}</td>
              <td>{room.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}