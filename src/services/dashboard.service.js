import api from "./api";

export const dashboardStats = async () => {
  const res = await api.get("/dashboard/admin");
  return res.data.data ?? res.data;
};

export const dashboardNotifications = async () => {
  const res = await api.get("/dashboard/notifications");
  return res.data;
};