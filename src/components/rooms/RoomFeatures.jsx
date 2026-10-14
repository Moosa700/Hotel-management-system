import { BedDouble, Users, Bath } from "lucide-react";

export default function RoomFeatures({ room }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <div className="rounded-xl bg-white p-5 shadow">
        <BedDouble className="mb-3 text-primary" />

        <h4 className="font-semibold">Bed</h4>

        <p className="text-gray-500">
          {room.bed}
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <Users className="mb-3 text-primary" />

        <h4 className="font-semibold">Guests</h4>

        <p className="text-gray-500">
          {room.capacity} Guests
        </p>
      </div>

      <div className="rounded-xl bg-white p-5 shadow">
        <Bath className="mb-3 text-primary" />

        <h4 className="font-semibold">Bathroom</h4>

        <p className="text-gray-500">
          {room.bathroom}
        </p>
      </div>
    </div>
  );
}