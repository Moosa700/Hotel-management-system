export default function HousekeepingCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">
        Housekeeping
      </h2>

      <h1 className="text-5xl font-bold text-yellow-500">
        12
      </h1>

      <p className="mt-2 text-gray-500">
        Rooms waiting for cleaning.
      </p>
    </div>
  );
}