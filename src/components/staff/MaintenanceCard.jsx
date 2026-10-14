export default function MaintenanceCard() {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">
        Maintenance
      </h2>

      <h1 className="text-5xl font-bold text-red-500">
        5
      </h1>

      <p className="mt-2 text-gray-500">
        Pending maintenance requests.
      </p>
    </div>
  );
}