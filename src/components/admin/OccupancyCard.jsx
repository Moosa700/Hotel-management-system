import { BedDouble } from "lucide-react";

export default function OccupancyCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500">
            Occupancy Rate
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            92%
          </h2>

          <p className="mt-2 text-blue-600">
            115 / 125 Rooms
          </p>
        </div>

        <div className="rounded-2xl bg-blue-500 p-5 text-white">
          <BedDouble size={35} />
        </div>
      </div>
    </div>
  );
}