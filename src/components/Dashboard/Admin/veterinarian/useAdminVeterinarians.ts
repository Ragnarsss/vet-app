import { client } from "@/graphqlClient";
import { Veterinarian } from "@/types/Veterinarian";
import { useEffect, useState } from "react";
import { GET_VETERINARIANS_DETAILED } from "./veterinarian.queries";

export function useAdminVeterinarians() {
  const [vets, setVets] = useState<Veterinarian[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    console.log("[useAdminVeterinarians] fetching veterinarians...");
    client
      .request<{ veterinarians: Veterinarian[] }>(GET_VETERINARIANS_DETAILED)
      .then((data) => {
        console.log("[useAdminVeterinarians] data", data);
        setVets(data.veterinarians);
      })
      .catch((err) => {
        console.error("[useAdminVeterinarians] error", err);
        setError("Error al cargar veterinarios");
      })
      .finally(() => {
        setLoading(false);
        console.log("[useAdminVeterinarians] fetch finished");
      });
  }, []);

  return { vets, loading, error };
}
