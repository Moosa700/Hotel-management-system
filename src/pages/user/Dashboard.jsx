import {
  CalendarDays,
  BedDouble,
  CreditCard,
  Clock,
  MapPin,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import useBookings from "@/hooks/useBooking";

const today = new Date();
today.setHours(0, 0, 0, 0);

function isUpcomingBooking(booking) {
  const checkIn = new Date(booking.checkIn);

  return (
    !Number.isNaN(checkIn.getTime()) &&
    checkIn >= today &&
    !["Cancelled", "Checked Out"].includes(booking.bookingStatus)
  );
}

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

export default function Dashboard() {
  const { user } = useAuth();
  const { bookings, loading, error } = useBookings();
  const customerName =
    user?.name?.trim() || user?.email?.split("@")[0] || "Guest";
  const upcomingBookings = bookings
    .filter(isUpcomingBooking)
    .sort((first, second) => new Date(first.checkIn) - new Date(second.checkIn));
  const nextBooking = upcomingBookings[0];
  const totalPaid = bookings
    .filter((booking) => booking.paymentStatus === "Paid")
    .reduce((total, booking) => total + Number(booking.totalPrice || 0), 0);
  const pendingPayments = bookings.filter((booking) =>
    ["Pending", "Partially Paid"].includes(booking.paymentStatus)
  ).length;

  return (
    <div className="min-h-screen min-w-0 space-y-6 bg-gray-100 p-4 sm:space-y-8 sm:p-8">
      {/* Header */}

      <div>
        <h1 className="wrap-break-word text-2xl font-bold leading-tight text-[#0F3D3E] sm:text-3xl lg:text-4xl">
          Welcome Back, {customerName} 👋
        </h1>

        <p className="mt-2 text-gray-600">
          Here's a summary of your hotel bookings and activities.
        </p>
      </div>

      {/* Stats */}

      <div className="grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <CalendarDays className="mb-4 text-blue-600" size={38} />
          <h2 className="text-3xl font-bold">{bookings.length}</h2>
          <p className="text-gray-500">Total Bookings</p>
        </div>

        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <BedDouble className="mb-4 text-green-600" size={38} />
          <h2 className="text-3xl font-bold">{upcomingBookings.length}</h2>
          <p className="text-gray-500">Upcoming Stay</p>
        </div>

        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <CreditCard className="mb-4 text-purple-600" size={38} />
          <h2 className="wrap-break-word text-3xl font-bold">${totalPaid.toLocaleString()}</h2>
          <p className="text-gray-500">Total Paid</p>
        </div>

        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <Clock className="mb-4 text-yellow-500" size={38} />
          <h2 className="text-3xl font-bold">{pendingPayments}</h2>
          <p className="text-gray-500">Pending Payments</p>
        </div>
      </div>

      {/* Main Section */}

      <div className="grid min-w-0 gap-5 lg:grid-cols-3 lg:gap-8">
        {/* Upcoming Booking */}

        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-8 lg:col-span-2">
          <h2 className="mb-5 text-xl font-bold text-[#0F3D3E] sm:mb-6 sm:text-2xl">
            Upcoming Booking
          </h2>

          {error ? (
            <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert">{error}</p>
          ) : loading ? (
            <p className="p-4 text-sm text-gray-600" role="status">Loading your bookings...</p>
          ) : nextBooking ? (
          <div className="min-w-0 rounded-2xl border border-gray-200 p-4 sm:p-6">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h3 className="wrap-break-word text-xl font-bold sm:text-2xl">
                  {nextBooking.roomId?.roomType ||
                    (nextBooking.roomNumber ? `Room ${nextBooking.roomNumber}` : "Reserved Room")}
                </h3>

                <p className="mt-2 break-all text-sm text-gray-500 sm:text-base">
                  Booking ID: {nextBooking._id}
                </p>
              </div>

              <span className="shrink-0 self-start rounded-full bg-green-100 px-3 py-1.5 text-sm font-semibold text-green-700 sm:px-4 sm:py-2">
                {nextBooking.bookingStatus || "Booked"}
              </span>
            </div>

            <div className="mt-6 grid min-w-0 gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">

              <div className="flex min-w-0 items-center gap-3">
                <CalendarDays className="text-[#0F3D3E]" />
                <div className="min-w-0">
                  <p className="text-gray-500 text-sm">Check-In</p>
                  <p className="wrap-break-word font-semibold">{formatDate(nextBooking.checkIn)}</p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                <Clock className="text-[#0F3D3E]" />
                <div className="min-w-0">
                  <p className="text-gray-500 text-sm">Check-Out</p>
                  <p className="wrap-break-word font-semibold">{formatDate(nextBooking.checkOut)}</p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                <MapPin className="text-[#0F3D3E]" />
                <div className="min-w-0">
                  <p className="text-gray-500 text-sm">Hotel</p>
                  <p className="wrap-break-word font-semibold">
                    {nextBooking.hotelName || "LuxuryStay"}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-3">
                <BedDouble className="text-[#0F3D3E]" />
                <div className="min-w-0">
                  <p className="text-gray-500 text-sm">Room</p>
                  <p className="wrap-break-word font-semibold">
                    {nextBooking.roomId?.roomNumber || nextBooking.roomNumber || "Room details unavailable"}
                  </p>
                </div>
              </div>

            </div>

            <Link to={`/dashboard/user/bookings/${nextBooking._id}`} className="mt-6 inline-flex w-full justify-center rounded-xl bg-[#0F3D3E] px-5 py-3 text-white hover:bg-[#0B3132] sm:mt-8 sm:w-auto sm:px-6">
              View Booking
            </Link>
          </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center sm:p-8">
              <p className="font-semibold text-gray-800">No upcoming bookings</p>
              <p className="mt-2 text-sm text-gray-600">Your upcoming stays will appear here after you book a room.</p>
              <Link to="/rooms" className="mt-5 inline-flex rounded-xl bg-[#0F3D3E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0B3132]">
                Browse rooms
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}

        <div className="space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="mb-5 text-xl font-bold text-[#0F3D3E]">
              Quick Actions
            </h2>

            <div className="space-y-4">
              <Link to="/rooms" className="flex w-full justify-center rounded-xl bg-[#0F3D3E] py-3 text-white hover:bg-[#0B3132]">
                Book New Room
              </Link>

              <Link to="/dashboard/user/invoices" className="flex w-full justify-center rounded-xl border border-[#0F3D3E] py-3 text-[#0F3D3E] hover:bg-[#0F3D3E] hover:text-white">
                View Invoices
              </Link>

              <Link to="/dashboard/user/profile" className="flex w-full justify-center rounded-xl border border-[#0F3D3E] py-3 text-[#0F3D3E] hover:bg-[#0F3D3E] hover:text-white">
                Update Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}