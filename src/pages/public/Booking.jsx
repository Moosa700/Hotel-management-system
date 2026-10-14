import { useEffect, useState } from "react";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { CalendarDays, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { getRooms } from "@/services/room.service";
import { createBooking } from "@/services/booking.service";

function localDateValue(date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function parseRooms(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.rooms)) return response.rooms;
  return [];
}

export default function Booking() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const { user, loading: authLoading } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [form, setForm] = useState({
    roomId: search.roomId || "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    guestPhone: user?.phone || "",
    specialRequest: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm((current) => ({ ...current, roomId: search.roomId || current.roomId }));
  }, [search.roomId]);

  useEffect(() => {
    setForm((current) => ({ ...current, guestPhone: user?.phone || current.guestPhone }));
  }, [user?.phone]);

  useEffect(() => {
    async function loadRooms() {
      try {
        const response = await getRooms();
        setRooms(parseRooms(response).filter(
          (room) => room.isActive !== false && room.status === "Available"
        ));
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load available rooms. Please try again."
        );
      } finally {
        setRoomsLoading(false);
      }
    }

    loadRooms();
  }, []);

  const selectedRoom = rooms.find((room) => room._id === form.roomId);
  const nights = form.checkIn && form.checkOut
    ? Math.max(0, Math.ceil((new Date(`${form.checkOut}T00:00:00`) - new Date(`${form.checkIn}T00:00:00`)) / 86400000))
    : 0;

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      setError("Please sign in before confirming your reservation.");
      return;
    }

    if (!selectedRoom) {
      setError("Choose an available room.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const response = await createBooking({
        roomId: form.roomId,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: Number(form.guests),
        guestPhone: form.guestPhone.trim(),
        specialRequest: form.specialRequest.trim(),
      });
      const booking = response.data?.booking || response.booking || response.data;

      if (!booking?._id) {
        throw new Error("Reservation was created but the response was incomplete.");
      }

      await navigate({ to: "/dashboard/user/bookings/$bookingId", params: { bookingId: booking._id } });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          (requestError.message === "Network Error"
            ? "Could not reach the server. Please try again."
            : requestError.message) ||
          "Unable to create this reservation. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  const today = localDateValue(new Date());

  return (
    <section className="min-h-screen bg-(--background) px-4 pb-16 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto grid min-w-0 max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.2em] text-(--secondary)">
            Reservations
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-(--primary) sm:text-4xl">
            Book your stay
          </h1>
          <p className="mt-3 max-w-xl text-gray-600">
            Choose an available room and dates. Your final price is calculated securely from the room rate.
          </p>

          {authLoading ? (
            <p className="mt-8 text-sm text-gray-600" role="status">Checking your account...</p>
          ) : !user ? (
            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5">
              <p className="font-medium text-gray-900">Sign in to make a reservation</p>
              <p className="mt-1 text-sm text-gray-600">Your reservation will be linked to your account.</p>
              <Link to="/login" className="mt-4 inline-flex rounded-lg bg-(--primary) px-4 py-2.5 text-sm font-semibold text-white">
                Sign in
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
              {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700" role="alert">{error}</p>}

              <label className="grid gap-2 text-sm font-medium text-gray-700">
                Room
                <select name="roomId" required value={form.roomId} onChange={handleChange} disabled={roomsLoading || rooms.length === 0} className="min-w-0 rounded-lg border border-gray-300 px-3 py-3 font-normal disabled:bg-gray-50">
                  <option value="">{roomsLoading ? "Loading rooms..." : rooms.length ? "Select a room" : "No rooms currently available"}</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.roomType} · Room {room.roomNumber} · ${room.price}/night · up to {room.capacity}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid min-w-0 gap-2 text-sm font-medium text-gray-700">
                  <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> Check-in</span>
                  <input type="date" name="checkIn" min={today} required value={form.checkIn} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-3 font-normal" />
                </label>
                <label className="grid min-w-0 gap-2 text-sm font-medium text-gray-700">
                  <span className="inline-flex items-center gap-2"><CalendarDays size={16} /> Check-out</span>
                  <input type="date" name="checkOut" min={form.checkIn || today} required value={form.checkOut} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-3 font-normal" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-medium text-gray-700">
                  <span className="inline-flex items-center gap-2"><Users size={16} /> Guests</span>
                  <input type="number" name="guests" min="1" max={selectedRoom?.capacity || undefined} required value={form.guests} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-3 font-normal" />
                </label>
                <label className="grid gap-2 text-sm font-medium text-gray-700">
                  Contact phone
                  <input type="tel" name="guestPhone" autoComplete="tel" required value={form.guestPhone} onChange={handleChange} className="min-w-0 rounded-lg border border-gray-300 px-3 py-3 font-normal" placeholder="Your phone number" />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-medium text-gray-700">
                Special request <span className="font-normal text-gray-500">(optional)</span>
                <textarea name="specialRequest" rows="3" value={form.specialRequest} onChange={handleChange} className="min-w-0 resize-y rounded-lg border border-gray-300 px-3 py-3 font-normal" />
              </label>

              <div className="flex flex-col gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-600">
                  {selectedRoom && nights > 0
                    ? `${nights} ${nights === 1 ? "night" : "nights"} · estimated $${(selectedRoom.price * nights).toLocaleString()}`
                    : "Final total is confirmed by the server."}
                </p>
                <button type="submit" disabled={saving || roomsLoading || !rooms.length} className="min-h-11 rounded-lg bg-(--primary) px-5 py-2.5 text-sm font-semibold text-white hover:bg-(--primary-mid) disabled:cursor-not-allowed disabled:opacity-60">
                  {saving ? "Confirming..." : "Confirm reservation"}
                </button>
              </div>
            </form>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="font-semibold text-gray-900">Reservation summary</h2>
          {selectedRoom ? (
            <div className="mt-4 space-y-2 text-sm">
              <p className="font-medium text-gray-900">{selectedRoom.roomType} · {selectedRoom.roomNumber}</p>
              <p className="text-gray-600">${selectedRoom.price} per night</p>
              <p className="text-gray-600">Capacity: {selectedRoom.capacity} guests</p>
              {nights > 0 && <p className="border-t border-gray-100 pt-3 font-semibold text-gray-900">Estimated total: ${(selectedRoom.price * nights).toLocaleString()}</p>}
            </div>
          ) : (
            <p className="mt-3 text-sm text-gray-600">Select dates and a room to see the estimated total.</p>
          )}
          <Link to="/rooms" className="mt-5 inline-flex text-sm font-semibold text-(--primary) hover:underline">
            Browse all rooms
          </Link>
        </aside>
      </div>
    </section>
  );
}