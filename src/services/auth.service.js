import api from "./api";

/* ---------------- REGISTER ---------------- */
export async function register(data) {
  const response = await api.post("/auth/register", data);
  const result = response.data.data ?? response.data;

  if (result.token) {
    localStorage.setItem("accessToken", result.token);
  }

  return result;
}

/* ---------------- LOGIN ---------------- */
export async function login(data) {
  const response = await api.post("/auth/login", data);
  const result = response.data.data ?? response.data;

  if (result.token) {
    localStorage.setItem("accessToken", result.token);
  }

  return result;
}

/* ---------------- LOGOUT ---------------- */
export async function logout() {
  try {
    await api.post("/auth/logout");
  } catch {
    // ignore if backend doesn't have logout
  }

  localStorage.removeItem("accessToken");
}

/* ---------------- PROFILE ---------------- */
export async function getProfile() {
  const response = await api.get("/auth/profile");
  return response.data.data ?? response.data;
}

/* ---------------- REFRESH USER ---------------- */
export async function refreshUser() {
  const response = await api.get("/auth/profile");
  return response.data.data ?? response.data;
}