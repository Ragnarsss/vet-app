import { useState, useEffect } from "react";
import { client } from "../../../graphqlClient";
import { VETERINARIO_MASCOTAS_QUERY } from "./VeterinarioDashboard.queries";

export interface Mascota {
  id: string;
  nombre: string;
  clienteId: string;
}

interface MascotasResponse {
  mascotas: Mascota[];
}

export function useVeterinarioMascotas() {
  const [mascotas, setMascotas] = useState<Mascota[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    client
      .request<MascotasResponse>(VETERINARIO_MASCOTAS_QUERY)
      .then((data) => setMascotas(data.mascotas))
      .catch(() => setError("Error al cargar mascotas"))
      .finally(() => setLoading(false));
  }, []);

  return { mascotas, loading, error };
}
