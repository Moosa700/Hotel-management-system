import { useEffect, useState } from "react";
import { getMyBookings } from "@/services/booking.service";

export default function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getMyBookings();
        setBookings(Array.isArray(data) ? data : []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load your bookings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  return {
    bookings,
    setBookings,
    loading,
    error,
  };
}