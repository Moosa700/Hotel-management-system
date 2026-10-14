import api from "./api";

export async function getSystemSettings() {
  const response = await api.get("/settings");
  return response.data.data ?? response.data;
}

export async function saveSystemSettings(settings) {
  const response = await api.put("/settings", settings);
  return response.data.data ?? response.data;
}