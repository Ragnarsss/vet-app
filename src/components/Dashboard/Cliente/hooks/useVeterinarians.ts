import { useState, useEffect } from "react";
import { client } from "../../../../graphqlClient";
import { Veterinarian } from "../types/Reservation.types";
import { GET_VETERINARIANS_QUERY } from "../queries/Veterinarians.queries";

export function useVeterinarians() {
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVeterinarians = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await client.request<{ veterinarians: Veterinarian[] }>(
          GET_VETERINARIANS_QUERY
        );
        setVeterinarians(data.veterinarians);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Error fetching veterinarians");
        } else {
          setError("Error fetching veterinarians");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchVeterinarians();
  }, []);

  return { veterinarians, loading, error };
}
