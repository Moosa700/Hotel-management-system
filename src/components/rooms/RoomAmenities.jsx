import {
  Wifi,
  Tv,
  Coffee,
  Snowflake,
  Bath,
  Utensils,
} from "lucide-react";

const icons = {
  WiFi: Wifi,
  "Smart TV": Tv,
  TV: Tv,
  Breakfast: Utensils,
  "Mini Bar": Coffee,
  "Coffee Maker": Coffee,
  "Air Conditioning": Snowflake,
  Jacuzzi: Bath,
};

export default function RoomAmenities({ amenities }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        Amenities
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {amenities.map((item) => {
          const Icon = icons[item];

          return (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl bg-gray-50 p-4"
            >
              {Icon ? (
                <Icon className="text-primary" size={22} />
              ) : (
                <div className="h-2 w-2 rounded-full bg-primary" />
              )}

              <span>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}