import { useEffect, useState } from "react";
import { getRooms } from "@/services/room.service";

export default function useRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getRooms();
        const roomList = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : Array.isArray(data?.rooms)
              ? data.rooms
              : [];

        setRooms(roomList);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            requestError.message ||
            "Unable to load rooms. Please try again."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  return {
    rooms,
    loading,
    error,
  };
}