import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle, Clock, Plus, Wrench } from "lucide-react";
import { getRooms } from "@/services/room.service";
import {
  createMaintenanceRequest,
  getMaintenanceRequests,
  updateMaintenanceRequest,
} from "@/services/maintenance.service";

function parseArray(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
}

const initialForm = { roomId: "", title: "", description: "", priority: "Medium" };

export default function Maintenance() {
  const [requests, setRequests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [requestData, roomData] = await Promise.all([
          getMaintenanceRequests(),
          getRooms(),
        ]);
        setRequests(parseArray(requestData));
        setRooms(parseArray(roomData));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load maintenance data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const openRequests = requests.filter((request) => !["Completed", "Cancelled"].includes(request.status));
  const highPriority = openRequests.filter((request) => ["High", "Urgent"].includes(request.priority));
  const completed = requests.filter((request) => request.status === "Completed");
  const visibleRequests = requests.filter((request) => {
    const room = request.roomId?.roomNumber || request.roomId || "";
    const text = `${room} ${request.title} ${request.description} ${request.status}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  async function submitRequest(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await createMaintenanceRequest(form);
      const room = rooms.find((item) => item._id === form.roomId);
      setRequests((current) => [{ ...response, roomId: room }, ...current]);
      setForm(initialForm);
      setShowForm(false);
      setNotice("Maintenance request submitted.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to submit this request.");
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(request, status) {
    setBusyId(request._id);
    setError("");
    setNotice("");
    try {
      await updateMaintenanceRequest(request._id, { status });
      setRequests((current) => current.map((item) => item._id === request._id ? { ...item, status } : item));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update this request.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="min-w-0 space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Facilities</p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Maintenance</h1>
          <p className="mt-2 text-sm text-gray-600">Report room issues and track resolution.</p>
        </div>
        <button type="button" onClick={() => { setShowForm(!showForm); setError(""); setNotice(""); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0F3D3E] px-4 py-2 text-sm font-semibold text-white">
          <Plus size={17} /> {showForm ? "Close form" : "Report an issue"}
        </button>
      </header>

      {notice && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{notice}</p>}
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      {showForm && (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 font-semibold text-gray-900">New maintenance request</h2>
          <form onSubmit={submitRequest} className="grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">
              Room
              <select required value={form.roomId} onChange={(event) => setForm({ ...form, roomId: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal">
                <option value="">Select a room</option>
                {rooms.map((room) => <option key={room._id} value={room._id}>{room.roomNumber} · {room.roomType}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">
              Priority
              <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal">
                {["Low", "Medium", "High", "Urgent"].map((priority) => <option key={priority}>{priority}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700 sm:col-span-2">
              Issue title
              <input required maxLength="100" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" placeholder="e.g. Air conditioner not cooling" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700 sm:col-span-2">
              Details
              <textarea required maxLength="1000" rows="3" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-w-0 resize-y rounded-lg border border-gray-300 px-3 py-2.5 font-normal" />
            </label>
            <div className="flex gap-3 sm:col-span-2">
              <button type="submit" disabled={saving || rooms.length === 0} className="min-h-11 rounded-lg bg-[#0F3D3E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Submitting..." : "Submit request"}</button>
              <button type="button" onClick={() => setShowForm(false)} className="min-h-11 rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700">Cancel</button>
            </div>
          </form>
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Maintenance summary">
        <div className="rounded-xl border border-gray-200 bg-white p-4"><Wrench className="mb-3 text-sky-700" size={28} /><p className="text-sm text-gray-500">All requests</p><p className="mt-1 text-2xl font-semibold">{requests.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><Clock className="mb-3 text-amber-600" size={28} /><p className="text-sm text-gray-500">Open</p><p className="mt-1 text-2xl font-semibold">{openRequests.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><AlertTriangle className="mb-3 text-red-600" size={28} /><p className="text-sm text-gray-500">High / urgent</p><p className="mt-1 text-2xl font-semibold">{highPriority.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><CheckCircle className="mb-3 text-emerald-700" size={28} /><p className="text-sm text-gray-500">Completed</p><p className="mt-1 text-2xl font-semibold">{completed.length}</p></div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div><h2 className="font-semibold text-gray-900">Maintenance requests</h2><p className="mt-1 text-sm text-gray-500">{visibleRequests.length} requests</p></div>
          <input type="search" aria-label="Search maintenance requests" placeholder="Search room or issue" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm sm:w-72" />
        </div>
        {loading ? (
          <p className="p-6 text-sm text-gray-600" role="status">Loading requests...</p>
        ) : visibleRequests.length === 0 ? (
          <div className="px-5 py-12 text-center"><p className="font-medium text-gray-800">No maintenance requests</p><p className="mt-1 text-sm text-gray-500">Report an issue when a room needs repair.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-4 py-3 font-medium">Room</th><th className="px-4 py-3 font-medium">Issue</th><th className="px-4 py-3 font-medium">Priority</th><th className="px-4 py-3 font-medium">Reported by</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Update</th></tr></thead>
              <tbody>
                {visibleRequests.map((request) => (
                  <tr key={request._id} className="border-t border-gray-100">
                    <td className="px-4 py-4 font-medium text-gray-900">{request.roomId?.roomNumber || request.roomId}</td>
                    <td className="px-4 py-4"><p className="font-medium text-gray-800">{request.title}</p><p className="mt-1 max-w-xs text-xs text-gray-500">{request.description}</p></td>
                    <td className="px-4 py-4 text-gray-600">{request.priority}</td>
                    <td className="px-4 py-4 text-gray-600">{request.reportedBy?.name || "Staff"}</td>
                    <td className="px-4 py-4 text-gray-600">{request.status}</td>
                    <td className="px-4 py-4"><select aria-label={`Update ${request.title}`} disabled={busyId === request._id} value={request.status} onChange={(event) => changeStatus(request, event.target.value)} className="rounded-lg border border-gray-300 px-2 py-2 text-xs"><option>Pending</option><option>Assigned</option><option>In Progress</option><option>Completed</option><option>Cancelled</option></select></td>
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