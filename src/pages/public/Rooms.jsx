import { useNavigate, useSearch } from "@tanstack/react-router";
import useRooms from "@/hooks/useRooms";

export default function Rooms() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const guestCount = Number(search.guests) || 0;

  const { rooms = [], loading, error } = useRooms();
  const visibleRooms = guestCount
    ? rooms.filter(
        (room) =>
          room.isActive !== false &&
          room.status === "Available" &&
          Number(room.capacity) >= guestCount
      )
    : rooms;

  if (loading) {
    return (
      <section className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold">Loading Rooms...</h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto py-20 text-center">
        <h2 className="text-3xl font-semibold text-red-600">
          Failed to load rooms
        </h2>
        <p className="mt-3 text-gray-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-20">
      <h1 className="mb-10 text-center text-5xl font-bold">
        Our Luxury Rooms
      </h1>

      {visibleRooms.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">
            {guestCount
              ? `No available rooms fit ${guestCount} ${guestCount === 1 ? "guest" : "guests"}.`
              : "No rooms available."}
          </h2>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {visibleRooms.map((room) => (
            <div
              key={room._id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <img
                src={
                  room.image ||
                  "https://placehold.co/600x400?text=Luxury+Room"
                }
                alt={room.roomType}
                className="h-64 w-full object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold">
                  {room.roomType}
                </h2>

                <p className="mt-1 text-gray-500">
                  Room #{room.roomNumber}
                </p>

                <p className="mt-4 line-clamp-3 text-gray-600">
                  {room.description || "Luxury room with premium facilities."}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {room.amenities?.map((item, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl font-bold text-primary">
                      ${room.price}
                    </h3>
                    <p className="text-sm text-gray-500">
                      per night
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate({
                        to: `/rooms/${room._id}`,
                      })
                    }
                    className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}