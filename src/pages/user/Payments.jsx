import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  Clock,
  CreditCard,
  Search,
} from "lucide-react";
import api from "@/services/api";

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

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadPayments() {
      try {
        const response = await api.get("/billing/mine");
        const data = response.data.data ?? response.data;
        setPayments(Array.isArray(data) ? data : []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load your payments. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  const paidPayments = payments.filter((payment) => payment.paymentStatus === "Paid");
  const pendingPayments = payments.filter((payment) => payment.paymentStatus === "Pending");
  const totalPaid = paidPayments.reduce(
    (total, payment) => total + Number(payment.totalAmount || 0),
    0
  );
  const visiblePayments = payments.filter((payment) => {
    const room = payment.bookingId?.roomId?.roomType || "";
    const text = `${payment.invoiceNumber} ${room} ${payment.paymentStatus} ${payment.paymentMethod}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  if (loading) {
    return <div className="p-4 text-gray-600 sm:p-8" role="status">Loading your payments...</div>;
  }

  return (
    <div className="min-h-screen min-w-0 space-y-6 bg-gray-100 p-4 sm:space-y-8 sm:p-8">
      <header>
        <h1 className="wrap-break-word text-2xl font-bold text-gray-800 sm:text-3xl">
          Payment History
        </h1>
        <p className="mt-2 text-gray-500">Your reservation payments and invoice status.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-5" aria-label="Payment summary">
        <div className="min-w-0 rounded-xl bg-white p-4 shadow sm:p-5">
          <CreditCard className="mb-3 text-green-600" size={32} />
          <h2 className="wrap-break-word text-2xl font-bold">${totalPaid.toLocaleString()}</h2>
          <p className="text-gray-500">Total Paid</p>
        </div>
        <div className="min-w-0 rounded-xl bg-white p-4 shadow sm:p-5">
          <CheckCircle className="mb-3 text-green-500" size={32} />
          <h2 className="text-2xl font-bold">{paidPayments.length}</h2>
          <p className="text-gray-500">Paid</p>
        </div>
        <div className="min-w-0 rounded-xl bg-white p-4 shadow sm:p-5">
          <Clock className="mb-3 text-yellow-500" size={32} />
          <h2 className="text-2xl font-bold">{pendingPayments.length}</h2>
          <p className="text-gray-500">Pending</p>
        </div>
        <div className="min-w-0 rounded-xl bg-white p-4 shadow sm:p-5">
          <CreditCard className="mb-3 text-blue-500" size={32} />
          <h2 className="text-2xl font-bold">{payments.length}</h2>
          <p className="text-gray-500">Transactions</p>
        </div>
      </section>

      <div className="rounded-xl bg-white p-4 shadow sm:p-5">
        <div className="relative w-full sm:max-w-96">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            type="search"
            placeholder="Search payments..."
            aria-label="Search payments"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full min-w-0 rounded-lg border py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-[#0F3D3E] focus:outline-none"
          />
        </div>
      </div>

      {error ? (
        <p className="rounded-xl bg-red-50 p-4 text-red-700" role="alert">{error}</p>
      ) : visiblePayments.length === 0 ? (
        <div className="rounded-xl bg-white p-8 text-center shadow">
          <h2 className="text-xl font-semibold text-[#0F3D3E]">
            {payments.length === 0 ? "No payment activity yet" : "No matching payments"}
          </h2>
          <p className="mt-2 text-gray-600">
            {payments.length === 0
              ? "Payments for your reservations will appear here."
              : "Try another invoice number, room, or status."}
          </p>
        </div>
      ) : (
        <section className="grid min-w-0 gap-4" aria-label="Your payments">
          {visiblePayments.map((payment) => {
            const booking = payment.bookingId;
            const room =
              booking?.roomId?.roomType ||
              (booking?.roomNumber ? `Room ${booking.roomNumber}` : "Reservation");
            const paid = payment.paymentStatus === "Paid";

            return (
              <article
                key={payment._id}
                className="grid min-w-0 gap-3 rounded-xl bg-white p-4 shadow sm:grid-cols-2 sm:p-5 lg:grid-cols-5 lg:items-center"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-gray-500">Invoice</p>
                  <p className="wrap-break-word font-medium">{payment.invoiceNumber}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-gray-500">Room</p>
                  <p className="wrap-break-word">{room}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Amount</p>
                  <p className="font-semibold">${Number(payment.totalAmount || 0).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Method / Date</p>
                  <p>{payment.paymentMethod || "Not specified"}</p>
                  <p className="text-sm text-gray-500">{formatDate(payment.createdAt)}</p>
                </div>
                <div className="flex items-center justify-between gap-3 lg:justify-end">
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${paid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {payment.paymentStatus || "Pending"}
                  </span>
                  {booking?._id && (
                    <Link
                      to={`/dashboard/user/bookings/${booking._id}`}
                      className="text-sm font-semibold text-[#0F3D3E] hover:underline"
                    >
                      Booking
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}