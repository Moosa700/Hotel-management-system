import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data.data ?? res.data;
};

export const createGuest = async (guest) => {
  const res = await api.post("/users", guest);
  return res.data.data ?? res.data;
};

export const changeUserRole = async (id, role) => {
  const res = await api.put(`/users/role/${id}`, { role });
  return res.data.data ?? res.data;
};

export const toggleUserStatus = async (id) => {
  const res = await api.put(`/users/status/${id}`);
  return res.data.data ?? res.data;
};

export const getProfile = async () => {
  const res = await api.get("/users/profile");
  return res.data.data ?? res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/users/profile", data);
  return res.data.data ?? res.data;
};