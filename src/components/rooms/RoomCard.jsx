import { Link } from "@tanstack/react-router";
import { BedDouble, Users, Star } from "lucide-react";

export default function RoomCard({ room }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl">
      <img
        src={room.image}
        alt={room.title}
        className="h-64 w-full object-cover"
      />

      <div className="p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
            {room.roomType}
          </span>

          <div className="flex items-center gap-1">
            <Star
              className="fill-yellow-400 text-yellow-400"
              size={16}
            />
            <span className="text-sm font-semibold">
              {room.rating}
            </span>
          </div>
        </div>

        <h3 className="mb-2 text-2xl font-bold">
          {room.title}
        </h3>

        <p className="mb-5 text-gray-600">
          {room.description}
        </p>

        <div className="mb-5 flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-2">
            <BedDouble size={18} />
            <span>{room.bed}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} />
            <span>{room.capacity} Guests</span>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {room.amenities.slice(0, 3).map((item) => (
            <span
              key={item}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-primary">
              ${room.price}
            </span>

            <span className="text-gray-500">
              {" "}
              / night
            </span>
          </div>

          <Link
            to="/rooms/$roomId"
            params={{ roomId: room.id }}
            className="rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:opacity-90"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}