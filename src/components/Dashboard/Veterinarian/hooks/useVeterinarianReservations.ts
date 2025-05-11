import { useState, useEffect } from "react";
import { client } from "../../../../graphqlClient";
import { Reservation } from "../types";
import { RESERVATIONS_BY_VETERINARIAN } from "./reservationsByVeterinarian.query";

export function useVeterinarianReservations() {
  const veterinarianId = localStorage.getItem("veterinario_id") || "";
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const fetchReservations = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const data = await client.request<{
        reservationsByVeterinarian: Reservation[];
      }>(RESERVATIONS_BY_VETERINARIAN, { veterinarianId });
      setReservations(data.reservationsByVeterinarian);
      setSuccess("Reservas cargadas correctamente");
    } catch {
      setError("Error al cargar reservas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (veterinarianId) fetchReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [veterinarianId]);

  return { reservations, loading, error, success, fetchReservations };
}
