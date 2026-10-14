import RoomCard from "./RoomCard";

export default function RoomGrid({ rooms }) {
  if (rooms.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-md">
        <h2 className="text-2xl font-semibold">
          No rooms found
        </h2>

        <p className="mt-2 text-gray-500">
          Try changing your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room}
        />
      ))}
    </div>
  );
}