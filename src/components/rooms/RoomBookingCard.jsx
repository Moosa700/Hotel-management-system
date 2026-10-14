import { Link } from "@tanstack/react-router";

export default function RoomBookingCard({ room }) {
  return (
    <div className="sticky top-24 rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-4xl font-bold text-primary">
        ${room.price}
        <span className="text-lg text-gray-500">
          {" "}
          / night
        </span>
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-1 block font-medium">
            Check In
          </label>

          <input
            type="date"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Check Out
          </label>

          <input
            type="date"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-1 block font-medium">
            Guests
          </label>

          <input
            type="number"
            min="1"
            max={room.capacity}
            defaultValue="1"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <Link
          to="/booking"
          search={{
            roomId: room.id,
          }}
          className="block rounded-xl bg-primary py-4 text-center font-semibold text-white"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}