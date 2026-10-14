import { useEffect, useState } from "react";
import {
  BarChart3,
  BedDouble,
  CalendarCheck,
  CreditCard,
  Download,
  Users,
} from "lucide-react";
import { dashboardStats } from "@/services/dashboard.service";
import { getBookings } from "@/services/booking.service";
import { getBills } from "@/services/billing.service";

function dateValue(date) {
  const adjusted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return adjusted.toISOString().slice(0, 10);
}

function csvValue(value) {
  const text = String(value ?? "").replace(/[\r\n]+/g, " ");
  const safe = /^[\s]*[=+\-@]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
}

function downloadCsv(filename, rows) {
  if (!rows.length) return false;
  const columns = Object.keys(rows[0]);
  const csv = [columns, ...rows.map((row) => columns.map((column) => row[column]))]
    .map((row) => row.map(csvValue).join(","))
    .join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
  return true;
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export default function Reports() {
  const today = dateValue(new Date());
  const firstOfMonth = dateValue(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [from, setFrom] = useState(firstOfMonth);
  const [to, setTo] = useState(today);
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        const [dashboard, reservations, invoices] = await Promise.all([
          dashboardStats(),
          getBookings(),
          getBills(),
        ]);
        setStats(dashboard);
        setBookings(Array.isArray(reservations) ? reservations : []);
        setBills(Array.isArray(invoices) ? invoices : []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load report data.");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  const inRange = (value) => {
    if (!value) return false;
    const date = dateValue(new Date(value));
    return date >= from && date <= to;
  };
  const rangeBookings = bookings.filter((booking) => inRange(booking.createdAt));
  const rangeBills = bills.filter((bill) => inRange(bill.paidAt || bill.createdAt));
  const paidBills = rangeBills.filter((bill) => bill.paymentStatus === "Paid");
  const revenue = paidBills.reduce((total, bill) => total + Number(bill.totalAmount || 0), 0);
  const roomStats = stats?.statistics || {};
  const occupancy = roomStats.totalRooms
    ? Math.round((Number(roomStats.occupiedRooms || 0) / roomStats.totalRooms) * 100)
    : 0;
  const checkedIn = bookings.filter((booking) => booking.bookingStatus === "Checked In").length;

  const revenueByMonth = paidBills.reduce((groups, bill) => {
    const date = new Date(bill.paidAt || bill.createdAt);
    const month = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(date);
    groups[month] = (groups[month] || 0) + Number(bill.totalAmount || 0);
    return groups;
  }, {});
  const monthlyRows = Object.entries(revenueByMonth).map(([month, amount]) => ({ month, amount }));
  const maxRevenue = Math.max(1, ...monthlyRows.map((row) => row.amount));

  const reports = [
    { key: "revenue", title: "Revenue report", description: "Paid invoice totals in selected period.", icon: CreditCard, rows: paidBills.map((bill) => ({ invoice: bill.invoiceNumber, amount: bill.totalAmount, status: bill.paymentStatus, paidAt: bill.paidAt || bill.createdAt })) },
    { key: "occupancy", title: "Room occupancy", description: "Current room status counts.", icon: BedDouble, rows: Object.entries(stats?.roomStatus || {}).map(([status, rooms]) => ({ status, rooms })) },
    { key: "bookings", title: "Booking report", description: "Reservations created in selected period.", icon: CalendarCheck, rows: rangeBookings.map((booking) => ({ bookingId: booking._id, guest: booking.guestName, email: booking.guestEmail, room: booking.roomId?.roomNumber || booking.roomNumber, checkIn: booking.checkIn, checkOut: booking.checkOut, status: booking.bookingStatus, total: booking.totalPrice })) },
    { key: "guests", title: "Recent guest report", description: "Most recently registered guest profiles.", icon: Users, rows: (stats?.recentCustomers || []).map((customer) => ({ name: customer.name, email: customer.email, joined: customer.createdAt })) },
    { key: "payments", title: "Payment report", description: "Paid and pending invoices in selected period.", icon: CreditCard, rows: rangeBills.map((bill) => ({ invoice: bill.invoiceNumber, bookingId: bill.bookingId?._id || bill.bookingId, amount: bill.totalAmount, method: bill.paymentMethod, status: bill.paymentStatus, date: bill.paidAt || bill.createdAt })) },
  ];

  function exportReport(report) {
    if (!downloadCsv(`${report.key}-${from}-to-${to}.csv`, report.rows)) {
      setError(`No ${report.title.toLowerCase()} data is available for this period.`);
    } else {
      setError("");
    }
  }

  function exportAll() {
    const rows = [
      ...rangeBookings.map((booking) => ({ type: "Booking", id: booking._id, guest: booking.guestName, status: booking.bookingStatus, amount: booking.totalPrice, date: booking.createdAt })),
      ...rangeBills.map((bill) => ({ type: "Invoice", id: bill.invoiceNumber, guest: bill.guestId?.name, status: bill.paymentStatus, amount: bill.totalAmount, date: bill.paidAt || bill.createdAt })),
    ];
    if (!downloadCsv(`hotel-report-${from}-to-${to}.csv`, rows)) {
      setError("No booking or invoice records are available for this period.");
    } else {
      setError("");
    }
  }

  return (
    <div className="min-w-0 space-y-6">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Decision support</p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Reports & analytics</h1>
          <p className="mt-2 text-sm text-gray-600">Live booking, payment and room-status summaries.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <label className="grid gap-1 text-xs font-medium text-gray-600">From<input type="date" value={from} max={to} onChange={(event) => setFrom(event.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" /></label>
          <label className="grid gap-1 text-xs font-medium text-gray-600">To<input type="date" value={to} min={from} max={today} onChange={(event) => setTo(event.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900" /></label>
          <button type="button" onClick={exportAll} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-[#0F3D3E] px-4 py-2 text-sm font-semibold text-white"><Download size={16} />Export CSV</button>
        </div>
      </header>

      {error && <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800" role="status">{error}</p>}
      {loading && <p className="text-sm text-gray-600" role="status">Loading reports...</p>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Report summary">
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Paid revenue · selected period</p><p className="mt-1 text-2xl font-semibold">{loading ? "—" : formatCurrency(revenue)}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Bookings · selected period</p><p className="mt-1 text-2xl font-semibold">{loading ? "—" : rangeBookings.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Current occupancy</p><p className="mt-1 text-2xl font-semibold">{loading ? "—" : `${occupancy}%`}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Currently checked in</p><p className="mt-1 text-2xl font-semibold">{loading ? "—" : checkedIn}</p></div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div><h2 className="text-lg font-semibold text-gray-900">Revenue by month</h2><p className="mt-1 text-sm text-gray-500">Paid invoices within the selected period</p></div>
          <BarChart3 className="text-emerald-800" aria-hidden="true" />
        </div>
        {monthlyRows.length ? (
          <div className="mt-6 space-y-4">
            {monthlyRows.map((row) => (
              <div key={row.month} className="grid grid-cols-[70px_minmax(0,1fr)_90px] items-center gap-3 text-sm">
                <span className="text-gray-600">{row.month}</span>
                <div className="h-3 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-emerald-700" style={{ width: `${(row.amount / maxRevenue) * 100}%` }} /></div>
                <span className="text-right font-medium text-gray-900">{formatCurrency(row.amount)}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 rounded-lg border border-dashed border-gray-300 px-4 py-8 text-center text-sm text-gray-500">No paid invoices in this period.</p>
        )}
      </section>

      <section>
        <div className="mb-4"><h2 className="text-lg font-semibold text-gray-900">Exportable reports</h2><p className="mt-1 text-sm text-gray-500">CSV files use current database records and date filters.</p></div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reports.map((report) => {
            const Icon = report.icon;
            return (
              <article key={report.key} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between"><Icon className="text-emerald-800" size={23} /><span className="text-sm text-gray-500">{report.rows.length} rows</span></div>
                <h3 className="mt-4 font-semibold text-gray-900">{report.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{report.description}</p>
                <button type="button" onClick={() => exportReport(report)} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#0F3D3E] hover:underline"><Download size={16} />Download CSV</button>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}