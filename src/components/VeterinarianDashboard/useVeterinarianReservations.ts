import { useEffect, useState } from "react";
import { client } from "../../graphqlClient";
import { Reservation } from "../../types/Reservation";
import { ProductOrderInput } from "@/types/ProductOrderInput";
import {
  COMPLETE_ORDER,
  GET_RESERVATIONS,
  UPDATE_RESERVATION_STATUS,
} from "./veterinarian.queries";

export function useVeterinarianReservations(veterinarianId: string) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchReservations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = (await client.request(GET_RESERVATIONS, {
        veterinarian_id: veterinarianId,
      })) as { reservationsByVeterinarian: Reservation[] };
      setReservations(data.reservationsByVeterinarian);
    } catch {
      setError("Error al obtener reservas");
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: string) => {
    setLoading(true);
    setError("");
    try {
      await client.request(UPDATE_RESERVATION_STATUS, { id, status });
      setReservations((prev) =>
        prev.map((res) => (res.id === id ? { ...res, status } : res))
      );
    } catch {
      setError("Error al actualizar estado");
    } finally {
      setLoading(false);
    }
  };

  const completeOrder = async (
    reservationId: string,
    products: ProductOrderInput[],
    service_ids: string[]
  ) => {
    setLoading(true);
    setError("");
    try {
      const data = (await client.request(COMPLETE_ORDER, {
        reservationId,
        products,
        service_ids,
      })) as { completeOrder: unknown };
      return data.completeOrder;
    } catch {
      setError("Error al generar la boleta (CareOrder)");
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (veterinarianId) fetchReservations();
    // eslint-disable-next-line
  }, [veterinarianId]);

  return {
    reservations,
    loading,
    error,
    fetchReservations,
    updateReservationStatus,
    completeOrder,
  };
}
