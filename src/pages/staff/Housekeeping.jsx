import { useEffect, useState } from "react";
import {
  BedDouble,
  CheckCircle,
  ClipboardList,
  Clock,
} from "lucide-react";
import {
  getHousekeepingTasks,
  updateHousekeepingTask,
} from "@/services/housekeeping.service";

function parseTasks(response) {
  return Array.isArray(response) ? response : [];
}

export default function Housekeeping() {
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setTasks(parseTasks(await getHousekeepingTasks()));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load housekeeping tasks.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  const pending = tasks.filter((task) => ["Pending", "Assigned"].includes(task.status));
  const inProgress = tasks.filter((task) => task.status === "In Progress");
  const completed = tasks.filter((task) => ["Completed", "Inspected"].includes(task.status));
  const visibleTasks = tasks.filter((task) => {
    const room = task.roomId?.roomNumber || task.roomNumber || "";
    return `${room} ${task.cleaningType} ${task.status} ${task.priority}`
      .toLowerCase()
      .includes(query.trim().toLowerCase());
  });

  async function changeStatus(task, status) {
    setBusyId(task._id);
    setError("");
    try {
      const updated = await updateHousekeepingTask(task._id, { status });
      setTasks((current) => current.map((item) => item._id === task._id ? { ...item, ...updated } : item));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update this task.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="min-w-0 space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Room operations</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Housekeeping</h1>
        <p className="mt-2 text-sm text-gray-600">Work through room cleaning tasks and update room readiness.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Housekeeping summary">
        <div className="rounded-xl border border-gray-200 bg-white p-4"><BedDouble className="mb-3 text-sky-700" size={28} /><p className="text-sm text-gray-500">Rooms</p><p className="mt-1 text-2xl font-semibold">{new Set(tasks.map((task) => task.roomId?._id || task.roomNumber)).size}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><ClipboardList className="mb-3 text-amber-600" size={28} /><p className="text-sm text-gray-500">Pending</p><p className="mt-1 text-2xl font-semibold">{pending.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><Clock className="mb-3 text-orange-600" size={28} /><p className="text-sm text-gray-500">In progress</p><p className="mt-1 text-2xl font-semibold">{inProgress.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><CheckCircle className="mb-3 text-emerald-700" size={28} /><p className="text-sm text-gray-500">Completed</p><p className="mt-1 text-2xl font-semibold">{completed.length}</p></div>
      </section>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div><h2 className="font-semibold text-gray-900">Cleaning tasks</h2><p className="mt-1 text-sm text-gray-500">{visibleTasks.length} tasks</p></div>
          <input type="search" aria-label="Search housekeeping tasks" placeholder="Search room or task" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm sm:w-72" />
        </div>

        {loading ? (
          <p className="p-6 text-sm text-gray-600" role="status">Loading tasks...</p>
        ) : visibleTasks.length === 0 ? (
          <div className="px-5 py-12 text-center"><p className="font-medium text-gray-800">No housekeeping tasks</p><p className="mt-1 text-sm text-gray-500">Checkout and maintenance cleaning tasks will show here.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-140 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-4 py-3 font-medium">Room</th><th className="px-4 py-3 font-medium">Task</th><th className="px-4 py-3 font-medium">Priority</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Assigned to</th><th className="px-4 py-3 font-medium">Update</th></tr></thead>
              <tbody>
                {visibleTasks.map((task) => (
                  <tr key={task._id} className="border-t border-gray-100">
                    <td className="px-4 py-4 font-medium text-gray-900">{task.roomId?.roomNumber || task.roomNumber}</td>
                    <td className="px-4 py-4 text-gray-600"><p>{task.cleaningType}</p>{task.notes && <p className="mt-1 max-w-xs text-xs text-gray-500">{task.notes}</p>}</td>
                    <td className="px-4 py-4 text-gray-600">{task.priority}</td>
                    <td className="px-4 py-4 text-gray-600">{task.status}</td>
                    <td className="px-4 py-4 text-gray-600">{task.assignedTo?.name || "Unassigned"}</td>
                    <td className="px-4 py-4"><select aria-label={`Update room ${task.roomNumber} task`} disabled={busyId === task._id} value={task.status} onChange={(event) => changeStatus(task, event.target.value)} className="rounded-lg border border-gray-300 px-2 py-2 text-xs"><option>Pending</option><option>Assigned</option><option>In Progress</option><option>Completed</option><option>Inspected</option></select></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}