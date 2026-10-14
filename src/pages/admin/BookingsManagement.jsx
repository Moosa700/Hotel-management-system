import { useEffect, useState } from "react";
import {
  checkInBooking,
  checkOutBooking,
  createBooking,
  getBookingCustomers,
  getBookings,
} from "@/services/booking.service";
import { getRooms } from "@/services/room.service";

function responseBookings(response) {
  const data = response?.data ?? response;
  return Array.isArray(data) ? data : Array.isArray(data?.bookings) ? data.bookings : [];
}

export default function BookingsManagement() {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ guestId: "", roomId: "", checkIn: "", checkOut: "", guests: "1", guestPhone: "" });
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  async function loadBookings() {
    try {
      setError("");
      setBookings(responseBookings(await getBookings()));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBookings();
  }, []);

  async function openCreateForm() {
    setShowCreateForm(true);
    setError("");
    try {
      const [guestData, roomData] = await Promise.all([getBookingCustomers(), getRooms()]);
      setCustomers(responseBookings(guestData));
      setRooms(responseBookings(roomData).filter((room) => room.isActive !== false && !["Maintenance", "Out of Service"].includes(room.status)));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load guests and rooms.");
    }
  }

  async function submitReservation(event) {
    event.preventDefault();
    setCreating(true);
    setError("");
    try {
      await createBooking({ ...form, guests: Number(form.guests) });
      setShowCreateForm(false);
      setForm({ guestId: "", roomId: "", checkIn: "", checkOut: "", guests: "1", guestPhone: "" });
      await loadBookings();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create this reservation.");
    } finally {
      setCreating(false);
    }
  }

  async function transitionBooking(booking) {
    setBusyId(booking._id);
    setError("");
    try {
      if (booking.bookingStatus === "Confirmed") {
        await checkInBooking(booking._id);
      } else if (booking.bookingStatus === "Checked In") {
        await checkOutBooking(booking._id);
      }
      await loadBookings();
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update booking status.");
    } finally {
      setBusyId("");
    }
  }

  const visibleBookings = bookings.filter((booking) => {
    const text = `${booking.userId?.name || booking.guestName || ""} ${booking.userId?.email || booking.guestEmail || ""} ${booking.roomId?.roomNumber || booking.roomNumber || ""} ${booking.bookingStatus || ""}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  return (
    <div className="min-w-0 space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Reservations</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Bookings</h1>
        <p className="mt-2 text-sm text-gray-600">Review reservations and advance their stay status.</p>
        </div>
        <button type="button" onClick={showCreateForm ? () => setShowCreateForm(false) : openCreateForm} className="min-h-11 rounded-lg bg-[#0F3D3E] px-4 py-2 text-sm font-semibold text-white">{showCreateForm ? "Close form" : "New reservation"}</button>
      </header>

      {showCreateForm && (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 font-semibold text-gray-900">Book a room for a guest</h2>
          <form onSubmit={submitReservation} className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Guest<select required value={form.guestId} onChange={(event) => { const guest = customers.find((item) => item._id === event.target.value); setForm({ ...form, guestId: event.target.value, guestPhone: guest?.phone || "" }); }} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal"><option value="">Select a guest</option>{customers.map((guest) => <option key={guest._id} value={guest._id}>{guest.name} · {guest.email}</option>)}</select></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Room<select required value={form.roomId} onChange={(event) => setForm({ ...form, roomId: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal"><option value="">Select a room</option>{rooms.map((room) => <option key={room._id} value={room._id}>{room.roomType} · {room.roomNumber} · ${room.price}/night</option>)}</select></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Guest phone<input required type="tel" value={form.guestPhone} onChange={(event) => setForm({ ...form, guestPhone: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Check-in<input required type="date" min={new Date().toISOString().slice(0, 10)} value={form.checkIn} onChange={(event) => setForm({ ...form, checkIn: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Check-out<input required type="date" min={form.checkIn || new Date().toISOString().slice(0, 10)} value={form.checkOut} onChange={(event) => setForm({ ...form, checkOut: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Guests<input required type="number" min="1" value={form.guests} onChange={(event) => setForm({ ...form, guests: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <div className="flex items-end sm:col-span-2 xl:col-span-3"><button type="submit" disabled={creating || !customers.length || !rooms.length} className="min-h-11 rounded-lg bg-[#0F3D3E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">{creating ? "Creating reservation..." : "Create reservation"}</button></div>
          </form>
          {(!customers.length || !rooms.length) && <p className="mt-3 text-sm text-amber-800">Add an active guest and a room before creating a reservation.</p>}
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Booking totals">
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Total</p><p className="mt-1 text-2xl font-semibold">{bookings.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Confirmed</p><p className="mt-1 text-2xl font-semibold">{bookings.filter((item) => item.bookingStatus === "Confirmed").length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Checked in</p><p className="mt-1 text-2xl font-semibold">{bookings.filter((item) => item.bookingStatus === "Checked In").length}</p></div>
      </section>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div><h2 className="font-semibold text-gray-900">All reservations</h2><p className="mt-1 text-sm text-gray-500">{visibleBookings.length} results</p></div>
          <input type="search" aria-label="Search bookings" placeholder="Search guest, room, status" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm sm:w-72" />
        </div>

        {loading ? (
          <p className="p-6 text-sm text-gray-600" role="status">Loading bookings...</p>
        ) : visibleBookings.length === 0 ? (
          <div className="px-5 py-12 text-center"><p className="font-medium text-gray-800">No bookings found</p><p className="mt-1 text-sm text-gray-500">Reservations will appear here when guests book.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-160 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-4 py-3 font-medium">Guest</th><th className="px-4 py-3 font-medium">Room</th><th className="px-4 py-3 font-medium">Stay</th><th className="px-4 py-3 font-medium">Total</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Action</th></tr></thead>
              <tbody>
                {visibleBookings.map((booking) => (
                  <tr key={booking._id} className="border-t border-gray-100">
                    <td className="px-4 py-4"><p className="font-medium text-gray-900">{booking.userId?.name || booking.guestName}</p><p className="mt-1 text-xs text-gray-500">{booking.userId?.email || booking.guestEmail}</p></td>
                    <td className="px-4 py-4 text-gray-700">{booking.roomId?.roomType || "Room"} {booking.roomId?.roomNumber || booking.roomNumber}</td>
                    <td className="px-4 py-4 text-gray-600">{new Date(booking.checkIn).toLocaleDateString()} – {new Date(booking.checkOut).toLocaleDateString()}</td>
                    <td className="px-4 py-4 font-medium">${Number(booking.totalPrice || 0).toLocaleString()}</td>
                    <td className="px-4 py-4"><span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">{booking.bookingStatus}</span></td>
                    <td className="px-4 py-4">{["Confirmed", "Checked In"].includes(booking.bookingStatus) && <button type="button" disabled={busyId === booking._id} onClick={() => transitionBooking(booking)} className="whitespace-nowrap rounded-lg bg-[#0F3D3E] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60">{busyId === booking._id ? "Updating..." : booking.bookingStatus === "Confirmed" ? "Check in" : "Check out"}</button>}</td>
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