import {
  useEffect,
  useState,
} from "react";
import AuthContext from "@/context/auth-context";

import {
  login,
  register,
  logout,
  refreshUser,
} from "@/services/auth.service";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ---------------- Restore Login ---------------- */

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    if (!localStorage.getItem("accessToken")) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await refreshUser();

      setUser(data.user || data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- Login ---------------- */

  async function loginUser(credentials) {
    const data = await login(credentials);

    setUser(data.user);

    return data;
  }

  /* ---------------- Register ---------------- */

  async function registerUser(userData) {
    const data = await register(userData);

    setUser(data.user);

    return data;
  }

  /* ---------------- Logout ---------------- */

  async function logoutUser() {
    try {
      await logout();
    } finally {
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        isAuthenticated: !!user,

        loginUser,

        registerUser,

        logoutUser,

        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

