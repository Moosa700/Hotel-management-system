import { useEffect, useState } from "react";
import { BedDouble, CalendarDays, ClipboardList, Wrench } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getBookings } from "@/services/booking.service";
import { getRooms } from "@/services/room.service";
import { getHousekeepingTasks } from "@/services/housekeeping.service";
import { getMaintenanceRequests } from "@/services/maintenance.service";

function parseArray(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

function Stat({ icon: Icon, label, value, detail }) {
  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <Icon className="mb-3 text-emerald-800" size={25} aria-hidden="true" />
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-gray-950">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{detail}</p>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState({ bookings: [], rooms: [], tasks: [], maintenance: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [bookings, rooms, tasks, maintenance] = await Promise.all([
          getBookings(),
          getRooms(),
          getHousekeepingTasks(),
          getMaintenanceRequests(),
        ]);
        setData({
          bookings: parseArray(bookings),
          rooms: parseArray(rooms),
          tasks: parseArray(tasks),
          maintenance: parseArray(maintenance),
        });
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load staff dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const pendingTasks = data.tasks.filter((task) => !["Completed", "Inspected"].includes(task.status));
  const openMaintenance = data.maintenance.filter((request) => !["Completed", "Cancelled"].includes(request.status));
  const today = new Date().toDateString();
  const todayBookings = data.bookings.filter((booking) => new Date(booking.checkIn).toDateString() === today);
  const checkedIn = data.bookings.filter((booking) => booking.bookingStatus === "Checked In");
  const recentBookings = [...data.bookings].sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt)).slice(0, 5);
  const notifications = [
    ...pendingTasks.slice(0, 3).map((task) => `Room ${task.roomNumber}: ${task.cleaningType} (${task.status})`),
    ...openMaintenance.slice(0, 3).map((request) => `${request.roomId?.roomNumber ? `Room ${request.roomId.roomNumber}: ` : ""}${request.title} (${request.priority})`),
  ].slice(0, 5);

  return (
    <div className="min-w-0 space-y-6 sm:space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Today at the hotel</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Staff overview</h1>
        <p className="mt-2 text-sm text-gray-600">Reservations, room readiness and active work items.</p>
      </header>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Staff dashboard summary">
        <Stat icon={CalendarDays} label="Today's arrivals" value={loading ? "—" : todayBookings.length} detail="Scheduled check-ins" />
        <Stat icon={BedDouble} label="Guests in house" value={loading ? "—" : checkedIn.length} detail="Checked-in reservations" />
        <Stat icon={ClipboardList} label="Housekeeping" value={loading ? "—" : pendingTasks.length} detail="Tasks not completed" />
        <Stat icon={Wrench} label="Maintenance" value={loading ? "—" : openMaintenance.length} detail="Open requests" />
      </section>

      <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <section className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 p-4 sm:px-5">
            <h2 className="font-semibold text-gray-900">Recent reservations</h2>
          </div>
          {loading ? (
            <p className="p-5 text-sm text-gray-600" role="status">Loading reservations...</p>
          ) : recentBookings.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-500">No reservations have been made.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-120 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-4 py-3 font-medium">Guest</th><th className="px-4 py-3 font-medium">Room</th><th className="px-4 py-3 font-medium">Status</th></tr></thead>
                <tbody>{recentBookings.map((booking) => (
                  <tr key={booking._id} className="border-t border-gray-100">
                    <td className="px-4 py-3"><p className="font-medium text-gray-900">{booking.guestName || booking.userId?.name || "Guest"}</p><p className="text-xs text-gray-500">{booking.guestEmail || booking.userId?.email}</p></td>
                    <td className="px-4 py-3 text-gray-600">{booking.roomId?.roomType || "Room"} {booking.roomNumber}</td>
                    <td className="px-4 py-3 text-gray-600">{booking.bookingStatus}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </section>

        <div className="space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">Operational alerts</h2>
            {notifications.length ? (
              <ul className="mt-4 space-y-3">
                {notifications.map((notification, index) => <li key={`${notification}-${index}`} className="border-l-2 border-amber-500 pl-3 text-sm text-gray-700">{notification}</li>)}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-gray-500">No open housekeeping or maintenance alerts.</p>
            )}
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-gray-900">Quick actions</h2>
            <div className="mt-4 grid gap-2">
              <Link to="/dashboard/staff/checkin" className="rounded-lg bg-[#0F3D3E] px-4 py-3 text-center text-sm font-semibold text-white">Open check-in list</Link>
              <Link to="/dashboard/staff/checkout" className="rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700">Open check-out list</Link>
              <Link to="/dashboard/staff/housekeeping" className="rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700">Housekeeping tasks</Link>
              <Link to="/dashboard/staff/maintenance" className="rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-semibold text-gray-700">Maintenance requests</Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}