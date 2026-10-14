import { useEffect, useState } from "react";
import {
  CheckCircle,
  CreditCard,
  FileText,
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

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadInvoices() {
      try {
        const response = await api.get("/billing/mine");
        const data = response.data.data ?? response.data;
        setInvoices(Array.isArray(data) ? data : []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load your invoices. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadInvoices();
  }, []);

  const paidInvoices = invoices.filter((invoice) => invoice.paymentStatus === "Paid");
  const pendingInvoices = invoices.filter((invoice) => invoice.paymentStatus === "Pending");
  const totalPaid = paidInvoices.reduce(
    (total, invoice) => total + Number(invoice.totalAmount || 0),
    0
  );
  const visibleInvoices = invoices.filter((invoice) => {
    const room = invoice.bookingId?.roomId?.roomType || "";
    const searchText = `${invoice.invoiceNumber} ${room} ${invoice.paymentStatus}`.toLowerCase();
    return searchText.includes(query.trim().toLowerCase());
  });

  if (loading) {
    return <div className="p-4 text-gray-600 sm:p-8" role="status">Loading your invoices...</div>;
  }

  return (
    <div className="min-h-screen min-w-0 space-y-6 bg-gray-100 p-4 sm:space-y-8 sm:p-8">
      <header>
        <h1 className="wrap-break-word text-2xl font-bold text-[#0F3D3E] sm:text-4xl">
          My Invoices
        </h1>
        <p className="mt-2 text-gray-600">View invoices for your reservations.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6" aria-label="Invoice summary">
        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <FileText className="mb-4 text-blue-600" size={36} />
          <h2 className="text-3xl font-bold">{invoices.length}</h2>
          <p className="text-gray-500">Total Invoices</p>
        </div>
        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <CreditCard className="mb-4 text-green-600" size={36} />
          <h2 className="wrap-break-word text-3xl font-bold">${totalPaid.toLocaleString()}</h2>
          <p className="text-gray-500">Total Paid</p>
        </div>
        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <CheckCircle className="mb-4 text-green-600" size={36} />
          <h2 className="text-3xl font-bold">{paidInvoices.length}</h2>
          <p className="text-gray-500">Paid Invoices</p>
        </div>
        <div className="min-w-0 rounded-2xl bg-white p-4 shadow sm:p-6">
          <CreditCard className="mb-4 text-orange-500" size={36} />
          <h2 className="text-3xl font-bold">{pendingInvoices.length}</h2>
          <p className="text-gray-500">Pending</p>
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
            placeholder="Search invoices..."
            aria-label="Search invoices"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full min-w-0 rounded-xl border py-3 pl-11 pr-4 focus:border-[#0F3D3E] focus:outline-none"
          />
        </div>
      </div>

      {error ? (
        <p className="rounded-xl bg-red-50 p-4 text-red-700" role="alert">{error}</p>
      ) : visibleInvoices.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow">
          <h2 className="text-xl font-semibold text-[#0F3D3E]">
            {invoices.length === 0 ? "No invoices yet" : "No matching invoices"}
          </h2>
          <p className="mt-2 text-gray-600">
            {invoices.length === 0
              ? "Invoices for your reservations will appear here."
              : "Try another invoice number, room, or payment status."}
          </p>
        </div>
      ) : (
        <section className="grid min-w-0 gap-4" aria-label="Your invoices">
          {visibleInvoices.map((invoice) => {
            const room =
              invoice.bookingId?.roomId?.roomType ||
              (invoice.bookingId?.roomId?.roomNumber
                ? `Room ${invoice.bookingId.roomId.roomNumber}`
                : "Reservation");
            const paid = invoice.paymentStatus === "Paid";

            return (
              <article
                key={invoice._id}
                className="grid min-w-0 gap-4 rounded-2xl bg-white p-4 shadow sm:grid-cols-2 sm:p-6 lg:grid-cols-4 lg:items-center"
              >
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-gray-500">Invoice</p>
                  <p className="wrap-break-word font-semibold">{invoice.invoiceNumber}</p>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase text-gray-500">Reservation</p>
                  <p className="wrap-break-word">{room}</p>
                  <p className="wrap-break-word text-sm text-gray-500">
                    Booking {invoice.bookingId?._id || "unavailable"}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-gray-500">Issued</p>
                  <p>{formatDate(invoice.createdAt)}</p>
                  <p className="font-semibold">${Number(invoice.totalAmount || 0).toLocaleString()}</p>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${paid ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {invoice.paymentStatus || "Pending"}
                  </span>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </div>
  );
}