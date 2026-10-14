import api from "./api";

export async function getMaintenanceRequests() {
  const response = await api.get("/maintenance");
  return response.data.data ?? response.data;
}

export async function createMaintenanceRequest(request) {
  const response = await api.post("/maintenance", request);
  return response.data.data ?? response.data;
}

export async function updateMaintenanceRequest(id, updates) {
  const response = await api.put(`/maintenance/${id}`, updates);
  return response.data.data ?? response.data;
}