import { useState } from "react";
import { client } from "../../../../graphqlClient";
import { ALL_RESERVATIONS_QUERY, RESERVATION_BY_ID_QUERY, RESERVATIONS_BY_CUSTOMER_QUERY, RESERVATIONS_BY_VETERINARIAN_QUERY, PAGINATED_RESERVATIONS_QUERY,} from "../queries/Reservation.queries";

export function useAdminReservations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState<any[]>([]);

  const fetchAllReservations = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ reservations: any[] }>(ALL_RESERVATIONS_QUERY);
      setReservations(data.reservations);
    } catch (e) {
      setError("Error al cargar reservas");
    } finally {
      setLoading(false);
    }
  };

  // Puedes agregar más funciones para los otros queries si lo necesitas

  return {
    reservations,
    loading,
    error,
    fetchAllReservations,
  };
}
