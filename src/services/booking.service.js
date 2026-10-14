import api from "./api";

export const getBookings = async () => {
  const res = await api.get("/bookings");
  return res.data.data ?? res.data;
};

export const getMyBookings = async () => {
  const res = await api.get("/bookings/my-bookings");
  return res.data.data ?? res.data;
};

export const getBooking = async (id) => {
  const res = await api.get(`/bookings/${id}`);
  return res.data;
};

export const createBooking = async (booking) => {
  const res = await api.post("/bookings", booking);
  return res.data;
};

export const cancelBooking = async (id) => {
  const res = await api.patch(`/bookings/${id}/cancel`);
  return res.data.data ?? res.data;
};

export const checkInBooking = async (id) => {
  const res = await api.patch(`/bookings/${id}/check-in`);
  return res.data.data ?? res.data;
};

export const checkOutBooking = async (id) => {
  const res = await api.patch(`/bookings/${id}/check-out`);
  return res.data.data ?? res.data;
};

export const getBookingCustomers = async () => {
  const res = await api.get("/bookings/customers");
  return res.data.data ?? res.data;
};