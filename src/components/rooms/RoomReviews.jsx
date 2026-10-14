import { Star } from "lucide-react";

export default function RoomReviews({ room }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        Guest Reviews
      </h2>

      <div className="mb-4 flex items-center gap-2">
        <Star
          className="fill-yellow-400 text-yellow-400"
          size={20}
        />

        <span className="text-xl font-bold">
          {room.rating}
        </span>

        <span className="text-gray-500">
          ({room.reviews} Reviews)
        </span>
      </div>

      <p className="leading-8 text-gray-600">
        Guests consistently praise the comfort, cleanliness,
        and exceptional hospitality offered in this room.
        Every stay is designed to provide a luxurious and
        memorable experience.
      </p>
    </div>
  );
}