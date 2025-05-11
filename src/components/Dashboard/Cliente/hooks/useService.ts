import { useState, useEffect } from "react";
import { client } from "../../../../graphqlClient";
import { GET_SERVICES } from "../queries/service.queries";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number; // Si los servicios tienen categorías
}

interface ServicesResponse {
  services: Service[];
}

export function useService() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    client
      .request<ServicesResponse>(GET_SERVICES)
      .then((data) => setServices(data.services))
      .catch(() => setError("Error al cargar servicios"))
      .finally(() => setLoading(false));
  }, []);

  return { services, loading, error };
}