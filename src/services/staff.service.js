import api from "./api";

export const getStaff = async () => {
  const res = await api.get("/staff");
  return res.data;
};

export const addStaff = async (staff) => {
  const res = await api.post("/staff", staff);
  return res.data;
};

export const updateStaff = async (id, staff) => {
  const res = await api.put(`/staff/${id}`, staff);
  return res.data;
};

export const removeStaff = async (id) => {
  const res = await api.delete(`/staff/${id}`);
  return res.data;
};