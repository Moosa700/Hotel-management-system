const roomStates = [
  { key: "available", label: "Available", color: "bg-emerald-500" },
  { key: "occupied", label: "Occupied", color: "bg-sky-500" },
  { key: "maintenance", label: "Maintenance", color: "bg-amber-500" },
];

export default function OccupancyChart({ roomStatus = {}, totalRooms = 0 }) {
  const roomsWithStatus = roomStates.reduce(
    (total, state) => total + Number(roomStatus[state.key] || 0),
    0
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">Room Status</h2>
        <span className="text-sm text-gray-500">{totalRooms} total</span>
      </div>

      <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-gray-100" aria-label={`${roomsWithStatus} rooms with status out of ${totalRooms}`}>
        {roomStates.map((state) => {
          const count = Number(roomStatus[state.key] || 0);
          const width = totalRooms ? `${(count / totalRooms) * 100}%` : "0%";

          return <div key={state.key} className={state.color} style={{ width }} />;
        })}
      </div>

      <div className="mt-6 space-y-4">
        {roomStates.map((state) => {
          const count = Number(roomStatus[state.key] || 0);
          const percentage = totalRooms ? Math.round((count / totalRooms) * 100) : 0;

          return (
            <div key={state.key} className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${state.color}`} />
                <span className="truncate text-sm text-gray-600">{state.label}</span>
              </div>
              <span className="shrink-0 text-sm font-semibold text-gray-900">
                {count} <span className="font-normal text-gray-500">({percentage}%)</span>
              </span>
            </div>
          );
        })}
      </div>

      {totalRooms === 0 && (
        <p className="mt-5 text-sm text-gray-500">Add rooms to see occupancy here.</p>
      )}
    </section>
  );
}