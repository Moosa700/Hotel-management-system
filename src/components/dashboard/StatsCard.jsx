export default function StatsCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
  detail,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-md transition hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold">{value}</h2>

          {detail && <p className="mt-3 text-sm text-gray-500">{detail}</p>}
        </div>

        <div
          className={`${color} flex h-16 w-16 items-center justify-center rounded-2xl text-white`}
        >
          <Icon size={30} />
        </div>
      </div>
    </div>
  );
}