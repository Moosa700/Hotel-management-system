import { Search } from "lucide-react";

export default function RoomFilters({
  search,
  setSearch,
  roomType,
  setRoomType,
  availability,
  setAvailability,
}) {
  return (
    <div className="mb-10 rounded-2xl bg-white p-6 shadow-md">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search rooms..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-primary"
          />
        </div>

        {/* Room Type */}
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary"
        >
          <option value="All">All Room Types</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Executive">Executive</option>
          <option value="Family">Family</option>
          <option value="Presidential">Presidential</option>
          <option value="Honeymoon">Honeymoon</option>
        </select>

        {/* Availability */}
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-primary"
        >
          <option value="All">All Rooms</option>
          <option value="Available">Available Only</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>
    </div>
  );
}