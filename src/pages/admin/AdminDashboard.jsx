import {
  BedDouble,
  CalendarDays,
  DollarSign,
  Plus,
  Users,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import StatsCard from "@/components/dashboard/StatsCard";
import OccupancyChart from "@/components/dashboard/OccupancyChart";
import RecentBookings from "@/components/dashboard/RecentBookings";
import useDashboard from "@/hooks/useDashboard";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export default function AdminDashboard() {
  const { stats, loading, error } = useDashboard();
  const summary = stats?.statistics || {};

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">
            Hotel operations
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">
            Admin overview
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Live reservations, rooms, guests, and collected revenue.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard/admin/rooms"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0F3D3E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0B3132]"
          >
            <Plus size={17} aria-hidden="true" /> Add a room
          </Link>
          <Link
            to="/dashboard/admin/bookings"
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            View bookings
          </Link>
        </div>
      </header>

      {error && (
        <p className="rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Collected revenue"
          value={loading ? "—" : formatCurrency(summary.totalRevenue)}
          icon={DollarSign}
          color="bg-emerald-600"
          detail="Paid invoices"
        />

        <StatsCard
          title="Bookings"
          value={loading ? "—" : summary.totalBookings ?? 0}
          icon={CalendarDays}
          color="bg-sky-700"
          detail="All reservations"
        />

        <StatsCard
          title="Guests"
          value={loading ? "—" : summary.totalCustomers ?? 0}
          icon={Users}
          color="bg-amber-600"
          detail="Registered customers"
        />

        <StatsCard
          title="Rooms"
          value={loading ? "—" : summary.totalRooms ?? 0}
          icon={BedDouble}
          color="bg-teal-700"
          detail={`${summary.availableRooms ?? 0} available · ${summary.occupiedRooms ?? 0} occupied`}
        />
      </div>

      <div className="grid min-w-0 gap-6 xl:grid-cols-3">
        <div className="min-w-0 space-y-6 xl:col-span-2">
          <RecentBookings bookings={stats?.recentBookings || []} />
        </div>

        <div className="min-w-0 space-y-6">
          <OccupancyChart
            roomStatus={stats?.roomStatus}
            totalRooms={summary.totalRooms || 0}
          />

          <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold text-gray-900">Recently added guests</h2>
            {stats?.recentCustomers?.length ? (
              <ul className="mt-4 divide-y divide-gray-100">
                {stats.recentCustomers.map((customer) => (
                  <li key={customer._id} className="py-3 first:pt-0 last:pb-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {customer.name || "Unnamed guest"}
                    </p>
                    <p className="truncate text-sm text-gray-500">{customer.email}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-gray-500">No guests have registered yet.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}