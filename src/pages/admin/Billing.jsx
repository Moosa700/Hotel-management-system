import { useEffect, useState } from "react";
import { CreditCard, Download, Receipt, Search } from "lucide-react";
import { getBills, markBillPaid } from "@/services/billing.service";

function parseBills(response) {
  return Array.isArray(response) ? response : [];
}

function csvValue(value) {
  const text = String(value ?? "").replace(/[\r\n]+/g, " ");
  return `"${text.replaceAll('"', '""')}"`;
}

export default function Billing() {
  const [bills, setBills] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [error, setError] = useState("");

  async function loadBills() {
    try {
      setError("");
      setBills(parseBills(await getBills()));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to load invoices.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBills();
  }, []);

  const paidBills = bills.filter((bill) => bill.paymentStatus === "Paid");
  const pendingBills = bills.filter((bill) => bill.paymentStatus === "Pending");
  const paidTotal = paidBills.reduce((total, bill) => total + Number(bill.totalAmount || 0), 0);
  const pendingTotal = pendingBills.reduce((total, bill) => total + Number(bill.totalAmount || 0), 0);
  const visibleBills = bills.filter((bill) => {
    const room = bill.bookingId?.roomId?.roomNumber || "";
    const guest = bill.guestId?.name || bill.guestId?.email || "";
    return `${bill.invoiceNumber} ${room} ${guest} ${bill.paymentStatus}`.toLowerCase().includes(query.trim().toLowerCase());
  });

  async function setPaid(bill) {
    setBusyId(bill._id);
    setError("");
    try {
      const updated = await markBillPaid(bill._id);
      setBills((current) => current.map((item) => item._id === bill._id ? { ...item, ...updated } : item));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to record payment.");
    } finally {
      setBusyId("");
    }
  }

  function exportBills() {
    if (!visibleBills.length) return;
    const rows = [
      ["Invoice", "Guest", "Room", "Amount", "Method", "Status", "Date"],
      ...visibleBills.map((bill) => [
        bill.invoiceNumber,
        bill.guestId?.name || bill.guestId?.email || "Guest",
        bill.bookingId?.roomId?.roomNumber || "Room",
        bill.totalAmount,
        bill.paymentMethod,
        bill.paymentStatus,
        bill.createdAt,
      ]),
    ];
    const csv = rows.map((row) => row.map(csvValue).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "hotel-invoices.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-w-0 space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Finance</p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Billing & payments</h1>
          <p className="mt-2 text-sm text-gray-600">Track invoices and record payments.</p>
        </div>
        <button type="button" onClick={exportBills} disabled={!visibleBills.length} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 disabled:opacity-50"><Download size={16} />Export CSV</button>
      </header>

      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Billing summary">
        <div className="rounded-xl border border-gray-200 bg-white p-4"><CreditCard className="mb-3 text-emerald-700" size={25} /><p className="text-sm text-gray-500">Revenue collected</p><p className="mt-1 text-2xl font-semibold">${paidTotal.toLocaleString()}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><Receipt className="mb-3 text-amber-600" size={25} /><p className="text-sm text-gray-500">Pending balance</p><p className="mt-1 text-2xl font-semibold">${pendingTotal.toLocaleString()}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Invoices</p><p className="mt-1 text-2xl font-semibold">{bills.length}</p></div>
        <div className="rounded-xl border border-gray-200 bg-white p-4"><p className="text-sm text-gray-500">Pending invoices</p><p className="mt-1 text-2xl font-semibold">{pendingBills.length}</p></div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div><h2 className="font-semibold text-gray-900">Invoices</h2><p className="mt-1 text-sm text-gray-500">{visibleBills.length} records</p></div>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} /><input type="search" aria-label="Search invoices" placeholder="Search invoice, guest or room" value={query} onChange={(event) => setQuery(event.target.value)} className="min-w-0 rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm sm:w-80" /></div>
        </div>
        {loading ? <p className="p-6 text-sm text-gray-600" role="status">Loading invoices...</p> : visibleBills.length === 0 ? (
          <div className="px-5 py-12 text-center"><p className="font-medium text-gray-800">No invoices found</p><p className="mt-1 text-sm text-gray-500">Invoices are generated when a reservation is created.</p></div>
        ) : (
          <div className="overflow-x-auto"><table className="w-full min-w-160 text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500"><tr><th className="px-4 py-3 font-medium">Invoice</th><th className="px-4 py-3 font-medium">Guest / room</th><th className="px-4 py-3 font-medium">Amount</th><th className="px-4 py-3 font-medium">Method</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Action</th></tr></thead>
            <tbody>{visibleBills.map((bill) => (
              <tr key={bill._id} className="border-t border-gray-100">
                <td className="px-4 py-4"><p className="font-medium text-gray-900">{bill.invoiceNumber}</p><p className="mt-1 text-xs text-gray-500">{bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : ""}</p></td>
                <td className="px-4 py-4"><p className="font-medium text-gray-800">{bill.guestId?.name || bill.guestId?.email || "Guest"}</p><p className="text-xs text-gray-500">Room {bill.bookingId?.roomId?.roomNumber || "—"}</p></td>
                <td className="px-4 py-4 font-semibold">${Number(bill.totalAmount || 0).toLocaleString()}</td>
                <td className="px-4 py-4 text-gray-600">{bill.paymentMethod || "Unspecified"}</td>
                <td className="px-4 py-4 text-gray-600">{bill.paymentStatus}</td>
                <td className="px-4 py-4">{bill.paymentStatus === "Pending" && <button type="button" disabled={busyId === bill._id} onClick={() => setPaid(bill)} className="rounded-lg bg-[#0F3D3E] px-3 py-2 text-xs font-semibold text-white disabled:opacity-60">{busyId === bill._id ? "Saving..." : "Mark paid"}</button>}</td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
}