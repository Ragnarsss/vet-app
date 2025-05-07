import { useState, useEffect } from "react";
import { client } from "../../../../graphqlClient";
import { GET_CLIENT_RESERVATIONS_QUERY } from "../queries/ClientReservations.queries";
import { Reservation } from "../types/Reservation.types";

export function useClientReservations(clientId: string) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await client.request<{
          clientReservations: Reservation[];
        }>(GET_CLIENT_RESERVATIONS_QUERY, { clientId });
        setReservations(data.clientReservations);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Error fetching reservations");
        } else {
          setError("Error fetching reservations");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [clientId]);

  return { reservations, loading, error };
}
