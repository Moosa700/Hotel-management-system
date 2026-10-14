import { useEffect, useState } from "react";
import { checkInBooking, checkOutBooking, getBookings } from "@/services/booking.service";

function parseBookings(response) {
  const data = response?.data ?? response;
  return Array.isArray(data) ? data : Array.isArray(data?.bookings) ? data.bookings : [];
}

export default function BookingTransitions({ mode }) {
  const isArrival = mode === "check-in";
  const sourceStatus = isArrival ? "Confirmed" : "Checked In";
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setBookings(parseBookings(await getBookings()));
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load reservations.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  const sourceBookings = bookings.filter((booking) => booking.bookingStatus === sourceStatus);
  const visibleBookings = sourceBookings.filter((booking) => {
    const text = `${booking.guestName} ${booking.guestEmail} ${booking.roomNumber} ${booking._id}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  async function handleTransition(booking) {
    setBusyId(booking._id);
    setError("");
    try {
      if (isArrival) await checkInBooking(booking._id);
      else await checkOutBooking(booking._id);

      setBookings((current) => current.map((item) =>
        item._id === booking._id
          ? { ...item, bookingStatus: isArrival ? "Checked In" : "Checked Out" }
          : item
      ));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to update this reservation.");
    } finally {
      setBusyId("");
    }
  }

  return (
    <div className="min-w-0 space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Front desk</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">
          {isArrival ? "Guest check-in" : "Guest check-out"}
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          {isArrival ? "Confirm arrivals and mark rooms occupied." : "Complete departures and send rooms to housekeeping."}
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2" aria-label="Front desk summary">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{isArrival ? "Awaiting check-in" : "Currently checked in"}</p>
          <p className="mt-1 text-2xl font-semibold">{sourceBookings.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{isArrival ? "Today's arrivals" : "Today's departures"}</p>
          <p className="mt-1 text-2xl font-semibold">
            {sourceBookings.filter((booking) => {
              const date = new Date(isArrival ? booking.checkIn : booking.checkOut);
              return date.toDateString() === new Date().toDateString();
            }).length}
          </p>
        </div>
      </section>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 className="font-semibold text-gray-900">{isArrival ? "Confirmed reservations" : "In-house guests"}</h2>
            <p className="mt-1 text-sm text-gray-500">{visibleBookings.length} results</p>
          </div>
          <input type="search" aria-label="Search guests" placeholder="Search guest, room, booking" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2 text-sm sm:w-72" />
        </div>

        {loading ? (
          <p className="p-6 text-sm text-gray-600" role="status">Loading reservations...</p>
        ) : visibleBookings.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="font-medium text-gray-800">No guests {isArrival ? "awaiting check-in" : "currently checked in"}</p>
            <p className="mt-1 text-sm text-gray-500">This list updates from confirmed reservations.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-140 text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                <tr><th className="px-4 py-3 font-medium">Guest</th><th className="px-4 py-3 font-medium">Room</th><th className="px-4 py-3 font-medium">{isArrival ? "Check-in" : "Check-out"}</th><th className="px-4 py-3 font-medium">Total</th><th className="px-4 py-3 font-medium">Action</th></tr>
              </thead>
              <tbody>
                {visibleBookings.map((booking) => (
                  <tr key={booking._id} className="border-t border-gray-100">
                    <td className="px-4 py-4"><p className="font-medium text-gray-900">{booking.guestName}</p><p className="mt-1 text-xs text-gray-500">{booking.guestEmail}</p></td>
                    <td className="px-4 py-4 text-gray-600">{booking.roomId?.roomType || "Room"} {booking.roomNumber}</td>
                    <td className="px-4 py-4 text-gray-600">{new Date(isArrival ? booking.checkIn : booking.checkOut).toLocaleDateString()}</td>
                    <td className="px-4 py-4 font-medium">${Number(booking.totalPrice || 0).toLocaleString()}</td>
                    <td className="px-4 py-4"><button type="button" disabled={busyId === booking._id} onClick={() => handleTransition(booking)} className="whitespace-nowrap rounded-lg bg-[#0F3D3E] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60">{busyId === booking._id ? "Updating..." : isArrival ? "Check in" : "Complete check-out"}</button></td>
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