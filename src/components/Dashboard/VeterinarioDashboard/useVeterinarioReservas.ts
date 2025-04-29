import { useState, useEffect } from "react";
import { client } from "../../../graphqlClient";
import { VETERINARIO_RESERVAS_QUERY } from "./VeterinarioDashboard.queries";

export interface Reserva {
  id: string;
  mascotaId: string;
  clienteId: string;
  estado: "cancelada" | "pendiente" | "realizada";
}

interface ReservasResponse {
  reservas: Reserva[];
}

export function useVeterinarioReservas() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    client
      .request<ReservasResponse>(VETERINARIO_RESERVAS_QUERY)
      .then((data) => setReservas(data.reservas))
      .catch(() => setError("Error al cargar reservas"))
      .finally(() => setLoading(false));
  }, []);

  return { reservas, loading, error };
}
