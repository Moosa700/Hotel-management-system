import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import useBookings from "@/hooks/useBooking";
import {
  createGuestServiceRequest,
  getMyServiceRequests,
} from "@/services/guestService.service";

const serviceTypes = [
  "Room Service",
  "Housekeeping",
  "Laundry",
  "Wake-up Call",
  "Extra Bed",
  "Airport Pickup",
  "Maintenance",
  "Food Delivery",
  "Other",
];

const emptyForm = { bookingId: "", serviceType: "Room Service", description: "" };

export default function ServiceRequests() {
  const { bookings } = useBookings();
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const activeBookings = Array.isArray(bookings) ? bookings.filter((booking) => booking.bookingStatus === "Checked In") : [];

  useEffect(() => {
    async function loadRequests() {
      try {
        const data = await getMyServiceRequests();
        setRequests(Array.isArray(data) ? data : []);
      } catch (requestError) {
        setError(requestError.response?.data?.message || "Unable to load your service requests.");
      } finally {
        setLoading(false);
      }
    }

    loadRequests();
  }, []);

  async function submitRequest(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setNotice("");
    try {
      const request = await createGuestServiceRequest(form);
      const booking = activeBookings.find((item) => String(item._id) === String(form.bookingId));
      setRequests((current) => [{
        ...request,
        bookingId: booking ?? request.bookingId ?? null,
        roomId: booking?.roomId ?? request.roomId ?? null,
      }, ...current]);
      setForm(emptyForm);
      setNotice("Your service request has been sent to the hotel team.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to submit your service request.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-w-0 space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-emerald-700">Guest services</p>
        <h1 className="mt-2 text-2xl font-semibold text-gray-950 sm:text-3xl">Service requests</h1>
        <p className="mt-2 text-sm text-gray-600">Request assistance during an active stay and track its progress.</p>
      </header>

      {notice && <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800" role="status">{notice}</p>}
      {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

      {activeBookings.length ? (
        <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 font-semibold text-gray-900">Request a service</h2>
          <form onSubmit={submitRequest} className="grid min-w-0 gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Active stay<select required value={form.bookingId} onChange={(event) => setForm({ ...form, bookingId: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal"><option value="">Select a stay</option>{activeBookings.map((booking) => <option key={booking._id} value={booking._id}>Room {booking.roomNumber} · {booking._id}</option>)}</select></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700">Service<select value={form.serviceType} onChange={(event) => setForm({ ...form, serviceType: event.target.value })} className="min-w-0 rounded-lg border border-gray-300 px-3 py-2.5 font-normal">{serviceTypes.map((service) => <option key={service}>{service}</option>)}</select></label>
            <label className="grid gap-1.5 text-sm font-medium text-gray-700 sm:col-span-2">Details<textarea required maxLength="1000" rows="3" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="min-w-0 resize-y rounded-lg border border-gray-300 px-3 py-2.5 font-normal" placeholder="Tell us what you need" /></label>
            <div className="sm:col-span-2"><button type="submit" disabled={submitting} className="min-h-11 rounded-lg bg-[#0F3D3E] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60">{submitting ? "Sending..." : "Send request"}</button></div>
          </form>
        </section>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-6 text-center">
          <p className="font-medium text-gray-800">Service requests are available during your stay</p>
          <p className="mt-1 text-sm text-gray-600">After check-in, request room service, laundry, transport and more here.</p>
        </div>
      )}

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4 sm:px-5"><h2 className="font-semibold text-gray-900">Your requests</h2><p className="mt-1 text-sm text-gray-500">{requests.length} requests</p></div>
        {loading ? <p className="p-6 text-sm text-gray-600" role="status">Loading requests...</p> : requests.length === 0 ? (
          <div className="px-5 py-10 text-center"><ClipboardList className="mx-auto mb-3 text-gray-400" /><p className="text-sm text-gray-500">No service requests yet.</p></div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {requests.map((request) => {
              const roomNumber = request.roomId?.roomNumber || request.bookingId?.roomNumber || "—";

              return (
                <li key={request._id} className="flex flex-wrap items-start justify-between gap-3 p-4 sm:px-5">
                  <div>
                    <p className="font-medium text-gray-900">{request.serviceType}</p>
                    <p className="mt-1 text-sm text-gray-600">{request.description}</p>
                    <p className="mt-1 text-xs text-gray-500">Room {roomNumber}</p>
                  </div>
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{request.status}</span>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}