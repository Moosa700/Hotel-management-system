import { Bell, Search } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Welcome back to LuxuryStay Hotel Management System
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            placeholder="Search..."
            className="rounded-xl border py-3 pl-11 pr-5"
          />

        </div>

        <button className="rounded-xl bg-white p-3 shadow">
          <Bell />
        </button>

      </div>
    </header>
  );
}