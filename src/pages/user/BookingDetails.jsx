import { Link, useParams } from "@tanstack/react-router";
import {
  BedDouble,
  CalendarDays,
  CreditCard,
  Users,
} from "lucide-react";
import useBookings from "@/hooks/useBooking";

function formatDate(value) {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function BookingDetails() {
  const { bookingId } = useParams({ strict: false });
  const { bookings, loading, error } = useBookings();
  const booking = bookings.find((item) => item._id === bookingId);

  if (loading) {
    return <div className="p-4 text-gray-600 sm:p-8" role="status">Loading booking details...</div>;
  }

  if (error) {
    return <p className="m-4 rounded-xl bg-red-50 p-4 text-red-700 sm:m-8" role="alert">{error}</p>;
  }

  if (!booking) {
    return (
      <div className="m-4 rounded-2xl bg-white p-6 text-center shadow sm:m-8 sm:p-10">
        <h1 className="text-2xl font-bold text-[#0F3D3E]">Booking not found</h1>
        <p className="mt-2 text-gray-600">
          This reservation is not in your booking history.
        </p>
        <Link
          to="/dashboard/user/bookings"
          className="mt-5 inline-flex rounded-xl bg-[#0F3D3E] px-5 py-3 text-white"
        >
          Back to my bookings
        </Link>
      </div>
    );
  }

  const roomName =
    booking.roomId?.roomType ||
    (booking.roomNumber ? `Room ${booking.roomNumber}` : "Reserved room");

  return (
    <div className="min-h-screen min-w-0 bg-gray-100 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6 sm:space-y-8">
        <header>
          <h1 className="wrap-break-word text-2xl font-bold text-[#0F3D3E] sm:text-4xl">
            Booking Details
          </h1>
          <p className="mt-2 text-gray-600">Reservation {booking._id}</p>
        </header>

        <article className="min-w-0 overflow-hidden rounded-2xl bg-white shadow-lg">
          <div className="bg-[#0F3D3E] p-5 text-white sm:p-8">
            <p className="text-sm text-white/75">Reservation</p>
            <h2 className="mt-1 wrap-break-word text-xl font-bold sm:text-3xl">
              {roomName}
            </h2>
            <p className="mt-2 wrap-break-word text-sm text-white/80">Booking ID: {booking._id}</p>
          </div>

          <div className="grid min-w-0 gap-6 p-5 sm:grid-cols-2 sm:p-8">
            <div className="space-y-6">
              <div className="flex min-w-0 items-center gap-4">
                <BedDouble className="shrink-0 text-[#0F3D3E]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Room</p>
                  <p className="wrap-break-word font-semibold">
                    {booking.roomId?.roomNumber
                      ? `Room ${booking.roomId.roomNumber}`
                      : booking.roomNumber || "Room details unavailable"}
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 items-center gap-4">
                <CalendarDays className="shrink-0 text-[#0F3D3E]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Check in</p>
                  <p className="font-semibold">{formatDate(booking.checkIn)}</p>
                </div>
              </div>
              <div className="flex min-w-0 items-center gap-4">
                <CalendarDays className="shrink-0 text-[#0F3D3E]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Check out</p>
                  <p className="font-semibold">{formatDate(booking.checkOut)}</p>
                </div>
              </div>
              <div className="flex min-w-0 items-center gap-4">
                <Users className="shrink-0 text-[#0F3D3E]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-semibold">{booking.guests || 1}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex min-w-0 items-center gap-4">
                <CreditCard className="shrink-0 text-[#0F3D3E]" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="font-semibold">
                    {booking.paymentStatus || "Pending"} · ${Number(booking.totalPrice || 0).toLocaleString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Booking status</p>
                <span className="mt-1 inline-flex rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700">
                  {booking.bookingStatus || "Booked"}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Nights</p>
                <p className="font-semibold">{booking.nights || 1}</p>
              </div>
            </div>
          </div>

          <div className="border-t bg-gray-50 p-5 sm:p-8">
            <h2 className="mb-5 text-xl font-bold text-[#0F3D3E] sm:text-2xl">
              Price Summary
            </h2>
            <div className="space-y-4">
              <div className="flex flex-wrap justify-between gap-2">
                <span>Room rate per night</span>
                <span>${Number(booking.roomPrice || 0).toLocaleString()}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-2">
                <span>Nights</span>
                <span>{booking.nights || 1}</span>
              </div>
              <hr />
              <div className="flex flex-wrap justify-between gap-2 text-lg font-bold sm:text-xl">
                <span>Total</span>
                <span>${Number(booking.totalPrice || 0).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <Link
              to="/dashboard/user/bookings"
              className="inline-flex rounded-xl border border-[#0F3D3E] px-5 py-3 text-[#0F3D3E] hover:bg-[#0F3D3E] hover:text-white"
            >
              Back to my bookings
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}