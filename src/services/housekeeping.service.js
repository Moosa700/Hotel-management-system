import api from "./api";

export async function getHousekeepingTasks() {
  const response = await api.get("/housekeeping");
  return response.data.data ?? response.data;
}

export async function updateHousekeepingTask(id, updates) {
  const response = await api.put(`/housekeeping/${id}`, updates);
  return response.data.data ?? response.data;
}