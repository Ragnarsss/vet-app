import { useState, useEffect } from "react";
import { client } from "../graphqlClient";
import { GET_VETERINARIANS_QUERY } from "../components/Dashboard/Cliente/queries/Veterinarians.queries";
import { Veterinarian } from "@/types/Veterinarian";

export function useVeterinarians() {
  const [veterinarians, setVeterinarians] = useState<Veterinarian[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVeterinarians = async () => {
      setLoading(true);
      setError("");
      console.log("[useVeterinarians] Fetching veterinarians...");
      try {
        const data = await client.request<{ veterinarians: Veterinarian[] }>(
          GET_VETERINARIANS_QUERY
        );
        console.log("[useVeterinarians] Data received:", data);
        setVeterinarians(data.veterinarians);
      } catch (err: unknown) {
        console.error("[useVeterinarians] Error fetching veterinarians:", err);
        if (err instanceof Error) {
          setError(err.message || "Error fetching veterinarians");
        } else {
          setError("Error fetching veterinarians");
        }
      } finally {
        setLoading(false);
        console.log("[useVeterinarians] Fetch completed");
      }
    };
    fetchVeterinarians();
  }, []);

  return { veterinarians, loading, error };
}
