import { useState, useEffect } from "react";
import { client } from "../../../graphqlClient";
import { VETERINARIO_CLIENTES_QUERY } from "./VeterinarioDashboard.queries";

export interface Cliente {
  id: string;
  nombre: string;
}

interface ClientesResponse {
  clientes: Cliente[];
}

export function useVeterinarioClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    client
      .request<ClientesResponse>(VETERINARIO_CLIENTES_QUERY)
      .then((data) => setClientes(data.clientes))
      .catch(() => setError("Error al cargar clientes"))
      .finally(() => setLoading(false));
  }, []);

  return { clientes, loading, error };
}
