import { useState, useEffect } from "react";
import { client } from "../../../../graphqlClient";
import { RESERVATIONS_BY_CUSTOMER_QUERY } from "../../Admin/queries/Reservation.queries";
import { Reservation } from "../types/Reservation.types";

export function useClientReservations() {
  const customer_id = localStorage.getItem("cliente_id") || "";
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await client.request<{
          reservationsByCustomer: Reservation[];
        }>(RESERVATIONS_BY_CUSTOMER_QUERY, { customer_id });
        setReservations(data.reservationsByCustomer);
      } catch {
        setError("Error al cargar reservas");
      } finally {
        setLoading(false);
      }
    };
    if (customer_id) fetchReservations();
  }, [customer_id]);

  return { reservations, loading, error };
}
