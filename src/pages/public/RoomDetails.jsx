import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { getRoom } from "@/services/room.service";

export default function RoomDetails() {
  const { roomId } = useParams();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRoom() {
      try {
        const response = await getRoom(roomId);
        setRoom(response.data?.room || response.data || response.room || response);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load this room. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadRoom();
  }, [roomId]);

  if (loading) {
    return (
      <div className="py-32 text-center">
        Loading room details...
      </div>
    );
  }

  if (error || !room) {
    return (
      <section className="container py-32 text-center">
        <h1 className="text-3xl font-semibold">Room unavailable</h1>
        <p className="mt-3 text-gray-600">{error || "This room could not be found."}</p>
        <Link to="/rooms" className="btn-primary mt-6">Browse rooms</Link>
      </section>
    );
  }

  return (
    <section className="container min-w-0 py-24 sm:py-28">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <img
            src={room.image || "https://placehold.co/1200x800?text=Luxury+Room"}
            alt={`${room.roomType} room`}
            className="aspect-16/10 w-full rounded-xl object-cover"
          />
          <p className="mt-7 text-xs font-semibold uppercase tracking-[.18em] text-(--secondary)">
            {room.roomNumber ? `Room ${room.roomNumber}` : "LuxuryStay room"}
          </p>
          <h1 className="mt-2 wrap-break-word text-3xl font-semibold text-(--primary) sm:text-4xl">
            {room.roomType}
          </h1>
          <p className="mt-4 text-gray-600">
            {room.description || "A comfortable room with everything you need for a relaxing stay."}
          </p>
          {!!room.amenities?.length && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {room.amenities.map((amenity) => (
                <li key={amenity} className="rounded-full bg-white px-3 py-1.5 text-sm text-gray-700">
                  {amenity}
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-600">Rate per night</p>
          <p className="mt-1 text-3xl font-semibold text-(--primary)">
            ${Number(room.price || 0).toLocaleString()}
          </p>
          <p className="mt-2 text-sm text-gray-600">Up to {room.capacity || 1} guests</p>
          <Link
            to="/booking"
            search={{ roomId: room._id }}
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-(--primary) px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90"
          >
            Reserve this room
          </Link>
        </aside>
      </div>
    </section>
  );
}