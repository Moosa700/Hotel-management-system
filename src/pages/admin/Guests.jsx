import { useEffect, useState } from "react";
import { Mail, Phone, Plus, Search, X } from "lucide-react";
import { createGuest, getUsers, toggleUserStatus } from "@/services/user.service";
import { getBookings } from "@/services/booking.service";

const initialForm = { name: "", email: "", phone: "", address: "", password: "" };

function parseArray(value) {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data)) return value.data;
  return [];
}

export default function Guests() {
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    async function loadGuests() {
      try {
        const [users, reservations] = await Promise.all([getUsers(), getBookings()]);
        setGuests(parseArray(users).filter((user) => user.role === "customer"));
        setBookings(parseArray(reservations));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load guest profiles.");
      } finally {
        setLoading(false);
      }
    }

    loadGuests();
  }, []);

  const activeGuests = guests.filter((guest) => guest.isActive !== false);
  const checkedIn = bookings.filter((booking) => booking.bookingStatus === "Checked In").length;
  const reserved = bookings.filter((booking) => ["Pending", "Confirmed"].includes(booking.bookingStatus)).length;
  const visibleGuests = guests.filter((guest) =>
    `${guest.name} ${guest.email} ${guest.phone || ""}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  async function submitGuest(event) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const guest = await createGuest(form);
      setGuests((current) => [guest, ...current]);
      setForm(initialForm);
      setShowForm(false);
      setNotice(`Guest profile created for ${guest.name}.`);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create guest profile.");
    } finally {
      setSaving(false);
    }
  }

  async function toggleGuest(guest) {
    setError("");
    try {
      const updated = await toggleUserStatus(guest._id);
      setGuests((current) => current.map((item) => item._id === guest._id ? { ...item, ...updated } : item));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update guest account.");
    }
  }

  function latestBooking(guest) {
    return [...bookings]
      .filter((booking) => (booking.userId?._id || booking.userId) === guest._id)
      .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))[0];
  }

  return (
    <div className="min-w-0 space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">People</p><h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Guest profiles</h1><p className="mt-2 text-sm text-gray-600">Contact details and current reservation status.</p></div>
        <button type="button" onClick={() => { setShowForm(!showForm); setError(""); setNotice(""); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#0F3D3E] px-4 py-2 text-sm font-semibold text-white">{showForm ? <X size={17} /> : <Plus size={17} />}{showForm ? "Close form" : "Add guest"}</button>
      </header>

      {notice && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{notice}</p>}
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      {showForm && (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 font-semibold text-gray-900">New guest profile</h2>
          <form onSubmit={submitGuest} className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Full name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Email<input required type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Phone<input type="tel" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Address<input value={form.address} onChange={(event) => setForm({ ...form, address: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Temporary password<input required type="password" minLength="8" autoComplete="new-password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal" /></label>
            <div className="flex items-end"><button disabled={saving} className="min-h-11 rounded-lg bg-[#0F3D3E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">{saving ? "Creating..." : "Create guest"}</button></div>
          </form>
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-3" aria-label="Guest summary">
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Guest profiles</p><p className="mt-1 text-2xl font-semibold">{guests.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Active accounts</p><p className="mt-1 text-2xl font-semibold">{activeGuests.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Reservations in house / confirmed</p><p className="mt-1 text-2xl font-semibold">{checkedIn} / {reserved}</p></div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div><h2 className="font-semibold text-gray-900">Guests</h2><p className="mt-1 text-sm text-gray-500">{visibleGuests.length} profiles</p></div>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={17} /><input type="search" aria-label="Search guests" placeholder="Search name, email or phone" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm sm:w-80" /></div>
        </div>
        {loading ? <p className="p-6 text-sm text-gray-600" role="status">Loading guest profiles...</p> : visibleGuests.length === 0 ? (
          <div className="px-5 py-12 text-center"><p className="font-medium text-gray-800">No guest profiles found</p><p className="mt-1 text-sm text-gray-500">Guest registrations and staff-created profiles will appear here.</p></div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-160 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-4 py-3 font-medium">Guest</th><th className="px-4 py-3 font-medium">Contact</th><th className="px-4 py-3 font-medium">Reservation</th><th className="px-4 py-3 font-medium">Account</th><th className="px-4 py-3 font-medium">Action</th></tr></thead>
            <tbody>{visibleGuests.map((guest) => {
              const booking = latestBooking(guest);
              return <tr key={guest._id} className="border-t border-gray-100">
                <td className="px-4 py-4"><p className="font-medium text-gray-900">{guest.name}</p><p className="mt-1 text-xs text-gray-500">{guest.address || "No address provided"}</p></td>
                <td className="px-4 py-4 text-gray-600"><p className="flex items-center gap-2"><Mail size={14} />{guest.email}</p><p className="mt-1 flex items-center gap-2 text-xs"><Phone size={14} />{guest.phone || "No phone"}</p></td>
                <td className="px-4 py-4 text-gray-600">{booking ? `${booking.bookingStatus} · Room ${booking.roomNumber}` : "No reservation"}</td>
                <td className="px-4 py-4 text-gray-600">{guest.isActive === false ? "Inactive" : "Active"}</td>
                <td className="px-4 py-4"><button type="button" onClick={() => toggleGuest(guest)} className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold text-gray-700">{guest.isActive === false ? "Activate" : "Deactivate"}</button></td>
              </tr>;
            })}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
}