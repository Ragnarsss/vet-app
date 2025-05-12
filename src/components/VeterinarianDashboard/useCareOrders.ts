import { useState, useEffect } from "react";
import { client } from "@/graphqlClient";
import { GET_CARE_ORDERS } from "./veterinarian.queries";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Reservation {
  id: string;
  date_time: string;
  status: string;
}

interface Customer {
  id: string;
  user: {
    name: string;
  };
}

interface Veterinarian {
  id: string;
  user: {
    name: string;
  };
}

export interface CareOrder {
  id: string;
  status: string;
  total: number;
  created_at: string;
  products: Product[];
  reservation?: Reservation;
  customer?: Customer;
  veterinarian?: Veterinarian;
}

export function useCareOrders(veterinarianId?: string) {
  const [careOrders, setCareOrders] = useState<CareOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener el id del veterinario desde localStorage si no se pasa como argumento
  const vetId = veterinarianId || localStorage.getItem("vet_id") || undefined;

  const fetchCareOrders = async () => {
    if (!vetId) {
      setError("No se encontró el id del veterinario");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = (await client.request(GET_CARE_ORDERS, {
        veterinarian_id: vetId,
      })) as { careOrdersByVeterinarian: CareOrder[] };

      setCareOrders(data.careOrdersByVeterinarian);
    } catch (err) {
      console.error("Error fetching care orders:", err);
      setError("Error al obtener care orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (vetId) fetchCareOrders();
    // eslint-disable-next-line
  }, [vetId]);

  return {
    careOrders,
    loading,
    error,
    fetchCareOrders,
  };
}
