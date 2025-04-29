import { useState, useEffect } from "react";
import { client } from "../../../graphqlClient";
import { RESERVAS_POR_CLIENTE_QUERY } from "./ClientReservations.queries";

export interface ReservaCliente {
  id: number;
  horario: string;
  mascota_nombre: string;
  estado: string;
  observaciones: string;
}

interface ReservasPorClienteResponse {
  reservasPorCliente: ReservaCliente[];
}

export function useClientReservations(cliente_id: number | null) {
  const [reservas, setReservas] = useState<ReservaCliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cliente_id) return;
    setLoading(true);
    setError("");
    client
      .request<ReservasPorClienteResponse>(RESERVAS_POR_CLIENTE_QUERY, {
        cliente_id,
      })
      .then((data) => {
        setReservas(data.reservasPorCliente);
      })
      .catch(() => {
        setError("No se pudo cargar el historial. Inténtalo más tarde.");
      })
      .finally(() => setLoading(false));
  }, [cliente_id]);

  return { reservas, loading, error };
}
