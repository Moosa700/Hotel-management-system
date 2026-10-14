import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { createRoom, getRooms } from "@/services/room.service";

const initialForm = {
  roomNumber: "",
  roomType: "Deluxe",
  price: "",
  capacity: "2",
  floor: "1",
  description: "",
};

function parseRooms(response) {
  const data = response?.data ?? response;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.rooms)) return data.rooms;
  return [];
}

export default function RoomsManagement() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadRooms() {
      try {
        setRooms(parseRooms(await getRooms()));
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load rooms. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadRooms();
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");

    const roomData = {
      ...form,
      price: Number(form.price),
      capacity: Number(form.capacity),
      floor: Number(form.floor),
    };

    try {
      const response = await createRoom(roomData);
      const room = response?.data?.data ?? response?.data ?? response;
      setRooms((current) => [room, ...current]);
      setForm(initialForm);
      setShowForm(false);
      setNotice(`Room ${room.roomNumber} added successfully.`);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to add this room. Please check the details and try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-w-0 space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">
            Inventory
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">
            Rooms
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Add rooms and review current availability.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setError("");
            setNotice("");
          }}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0F3D3E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0B3132]"
        >
          {showForm ? <X size={17} /> : <Plus size={17} />}
          {showForm ? "Close form" : "Add a room"}
        </button>
      </header>

      {notice && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{notice}</p>}
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      {showForm && (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">Room details</h2>
          <form onSubmit={handleSubmit} className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">
              Room number
              <input name="roomNumber" value={form.roomNumber} onChange={handleChange} required className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" placeholder="e.g. 204" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">
              Room type
              <select name="roomType" value={form.roomType} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal">
                {["Single", "Double", "Twin", "Deluxe", "Suite", "Family", "Presidential"].map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">
              Price per night
              <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" placeholder="0.00" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">
              Guest capacity
              <input name="capacity" type="number" min="1" value={form.capacity} onChange={handleChange} required className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">
              Floor
              <input name="floor" type="number" min="0" value={form.floor} onChange={handleChange} required className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" />
            </label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700 sm:col-span-2 xl:col-span-3">
              Description
              <textarea name="description" value={form.description} onChange={handleChange} rows="3" className="min-w-0 resize-y rounded-lg border border-gray-300 px-3 py-2.5 font-normal" placeholder="Optional room details" />
            </label>
            <div className="flex flex-wrap gap-3 sm:col-span-2 xl:col-span-3">
              <button type="submit" disabled={saving} className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#0F3D3E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">
                {saving ? "Saving room..." : "Save room"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="min-h-11 rounded-lg border border-gray-300 px-5 py-2 text-sm font-semibold text-gray-700">
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 sm:px-6">
          <div>
            <h2 className="font-semibold text-gray-900">Room inventory</h2>
            <p className="mt-1 text-sm text-gray-500">{rooms.length} {rooms.length === 1 ? "room" : "rooms"}</p>
          </div>
        </div>
        {loading ? (
          <p className="p-6 text-sm text-gray-600" role="status">Loading rooms...</p>
        ) : rooms.length === 0 ? (
          <div className="px-5 py-12 text-center sm:px-6">
            <h3 className="font-medium text-gray-900">No rooms have been added</h3>
            <p className="mt-1 text-sm text-gray-500">Create the first room to make it available to guests.</p>
            {!showForm && <button onClick={() => setShowForm(true)} className="mt-4 text-sm font-semibold text-emerald-800 hover:underline">Add the first room</button>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr><th className="px-5 py-3 font-medium">Room</th><th className="px-5 py-3 font-medium">Type</th><th className="px-5 py-3 font-medium">Capacity</th><th className="px-5 py-3 font-medium">Rate / night</th><th className="px-5 py-3 font-medium">Status</th></tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id} className="border-t border-gray-100">
                    <td className="px-5 py-4 font-medium text-gray-900">{room.roomNumber}</td>
                    <td className="px-5 py-4 text-gray-600">{room.roomType}</td>
                    <td className="px-5 py-4 text-gray-600">{room.capacity} guests</td>
                    <td className="px-5 py-4 text-gray-600">${Number(room.price || 0).toLocaleString()}</td>
                    <td className="px-5 py-4"><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800">{room.status || "Available"}</span></td>
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