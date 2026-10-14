import api from "./api";

export async function getMyServiceRequests() {
  const response = await api.get("/services/mine");
  return response.data.data ?? response.data;
}

export async function createGuestServiceRequest(request) {
  const response = await api.post("/services", request);
  return response.data.data ?? response.data;
}