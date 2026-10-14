import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  BedDouble,
  CalendarDays,
  Clock,
  CreditCard,
  Search,
} from "lucide-react";
import useBookings from "@/hooks/useBooking";
import { cancelBooking } from "@/services/booking.service";

function formatDate(value) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function isUpcoming(booking) {
  const checkIn = new Date(booking.checkIn);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    !Number.isNaN(checkIn.getTime()) &&
    checkIn >= today &&
    !["Cancelled", "Checked Out"].includes(booking.bookingStatus)
  );
}

export default function MyBookings() {
  const { bookings, setBookings, loading, error } = useBookings();
  const [query, setQuery] = useState("");
  const [cancellingId, setCancellingId] = useState("");
  const [actionError, setActionError] = useState("");
  const upcomingCount = bookings.filter(isUpcoming).length;
  const totalPaid = bookings
    .filter((booking) => booking.paymentStatus === "Paid")
    .reduce((total, booking) => total + Number(booking.totalPrice || 0), 0);
  const visibleBookings = bookings.filter((booking) => {
    const room = booking.roomId?.roomType || booking.roomNumber || "";
    const searchText = `${room} ${booking._id} ${booking.bookingStatus}`.toLowerCase();
    return searchText.includes(query.trim().toLowerCase());
  });

  async function handleCancel(booking) {
    setCancellingId(booking._id);
    setActionError("");

    try {
      await cancelBooking(booking._id);
      setBookings((current) => current.map((item) =>
        item._id === booking._id ? { ...item, bookingStatus: "Cancelled" } : item
      ));
    } catch (requestError) {
      setActionError(requestError.response?.data?.message || "Unable to cancel this reservation.");
    } finally {
      setCancellingId("");
    }
  }

  if (loading) {
    return (
      <div className="p-4 text-gray-600 sm:p-8" role="status">
        Loading your bookings...
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-0 space-y-6 bg-gray-100 p-4 sm:space-y-8 sm:p-8">
      <header>
        <h1 className="wrap-break-word text-2xl font-bold text-[#0F3D3E] sm:text-4xl">
          My Bookings
        </h1>
        <p className="mt-2 text-gray-600">
          View and manage your hotel reservations.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6" aria-label="Booking summary">
        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <CalendarDays className="mb-4 text-blue-600" size={36} />
          <h2 className="text-3xl font-bold">{bookings.length}</h2>
          <p className="text-gray-500">Total Bookings</p>
        </div>
        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <Clock className="mb-4 text-orange-500" size={36} />
          <h2 className="text-3xl font-bold">{upcomingCount}</h2>
          <p className="text-gray-500">Upcoming</p>
        </div>
        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <CreditCard className="mb-4 text-green-600" size={36} />
          <h2 className="wrap-break-word text-3xl font-bold">
            ${totalPaid.toLocaleString()}
          </h2>
          <p className="text-gray-500">Total Paid</p>
        </div>
      </section>

      <div className="rounded-2xl bg-white p-4 shadow sm:p-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search bookings..."
            aria-label="Search bookings"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full min-w-0 rounded-xl border py-3 pl-11 pr-4 focus:border-[#0F3D3E] focus:outline-none"
          />
        </div>
      </div>

      {actionError && <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">{actionError}</p>}

      {error ? (
        <p className="rounded-xl bg-red-50 p-4 text-red-700" role="alert">
          {error}
        </p>
      ) : visibleBookings.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-xl font-semibold text-[#0F3D3E]">
            {bookings.length === 0 ? "No bookings yet" : "No matching bookings"}
          </h2>
          <p className="mt-2 text-gray-600">
            {bookings.length === 0
              ? "Your reservations will appear here after you book a room."
              : "Try another room, booking ID, or status."}
          </p>
          {bookings.length === 0 && (
            <Link
              to="/rooms"
              className="mt-5 inline-flex rounded-xl bg-[#0F3D3E] px-5 py-3 text-white"
            >
              Browse rooms
            </Link>
          )}
        </div>
      ) : (
        <section className="grid min-w-0 gap-6" aria-label="Your bookings">
          {visibleBookings.map((booking) => {
            const roomName =
              booking.roomId?.roomType ||
              (booking.roomNumber ? `Room ${booking.roomNumber}` : "Reserved room");
            const bookingId = booking._id;
            const status = booking.bookingStatus || "Booked";
            const statusStyle =
              status === "Confirmed" || status === "Checked In"
                ? "bg-green-100 text-green-700"
                : status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-200 text-gray-700";

            return (
              <article
                key={bookingId}
                className="min-w-0 rounded-2xl bg-white p-4 shadow transition hover:shadow-lg sm:p-6"
              >
                <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 space-y-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="shrink-0 rounded-full bg-[#0F3D3E] p-3 text-white">
                        <BedDouble size={22} />
                      </div>
                      <div className="min-w-0">
                        <h2 className="wrap-break-word text-xl font-bold text-[#0F3D3E] sm:text-2xl">
                          {roomName}
                        </h2>
                        <p className="wrap-break-word text-sm text-gray-500">
                          Booking ID: {bookingId}
                        </p>
                      </div>
                    </div>

                    <div className="grid min-w-0 gap-2 text-gray-600 sm:grid-cols-2">
                      <p><strong>Check-In:</strong> {formatDate(booking.checkIn)}</p>
                      <p><strong>Check-Out:</strong> {formatDate(booking.checkOut)}</p>
                      <p><strong>Guests:</strong> {booking.guests}</p>
                      <p><strong>Total:</strong> ${Number(booking.totalPrice || 0).toLocaleString()}</p>
                    </div>
                  </div>

                    <div className="flex flex-row items-center justify-between gap-3 lg:flex-col">
                    <span className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${statusStyle}`}>
                      {status}
                    </span>
                      <div className="flex flex-wrap justify-end gap-2">
                        <Link
                          to={`/dashboard/user/bookings/${bookingId}`}
                          className="rounded-xl bg-[#0F3D3E] px-4 py-3 text-center text-sm text-white hover:bg-[#0B3132]"
                        >
                          View Details
                        </Link>
                        {["Confirmed", "Pending"].includes(status) && (
                          <button
                            type="button"
                            disabled={cancellingId === bookingId}
                            onClick={() => handleCancel(booking)}
                            className="rounded-xl border border-red-300 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                          >
                            {cancellingId === bookingId ? "Cancelling..." : "Cancel"}
                          </button>
                        )}
                      </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}