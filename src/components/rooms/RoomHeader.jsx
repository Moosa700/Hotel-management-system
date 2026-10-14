import { Star, Users, BedDouble } from "lucide-react";

export default function RoomHeader({ room }) {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            {room.roomType}
          </span>

          <h1 className="mt-4 text-4xl font-bold">
            {room.title}
          </h1>

          <p className="mt-4 max-w-3xl text-gray-600">
            {room.description}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex items-center gap-2">
            <Star
              className="fill-yellow-400 text-yellow-400"
              size={20}
            />
            <span className="text-xl font-bold">
              {room.rating}
            </span>
          </div>

          <p className="mt-2 text-gray-500">
            {room.reviews} Reviews
          </p>

          <div className="mt-5 space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <BedDouble size={18} />
              {room.bed}
            </div>

            <div className="flex items-center gap-2">
              <Users size={18} />
              {room.capacity} Guests
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}