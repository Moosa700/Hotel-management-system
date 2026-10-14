import { useEffect, useState } from "react";
import { dashboardStats } from "@/services/dashboard.service";

export default function useDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await dashboardStats();
        setStats(data);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load dashboard data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return { stats, loading, error };
}