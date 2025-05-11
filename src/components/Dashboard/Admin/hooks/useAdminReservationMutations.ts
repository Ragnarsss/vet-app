import { useState } from "react";
import { client } from "../../../../graphqlClient";
import {
  CREATE_RESERVATION_MUTATION,
  UPDATE_RESERVATION_MUTATION,
  DELETE_RESERVATION_MUTATION,
} from "../mutations/Reservation.mutations";

export interface ReservationInput {
  date_time: string;
  pet_id: string;
  pet_name: string;
  notes?: string;
  customer_id: string;
  veterinarian_id: string;
  reason: string;
  status: string;
  service_ids?: string[];
}

export function useAdminReservationMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createReservation = async (input: ReservationInput) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request(CREATE_RESERVATION_MUTATION, input);
      return data.createReservation;
    } catch (e) {
      setError("Error al crear reserva");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateReservation = async (id: string, input: { notes?: string; status?: string }) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request(UPDATE_RESERVATION_MUTATION, { id, ...input });
      return data.updateReservation;
    } catch (e) {
      setError("Error al actualizar reserva");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteReservation = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request(DELETE_RESERVATION_MUTATION, { id });
      return data.deleteReservation;
    } catch (e) {
      setError("Error al eliminar reserva");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createReservation, updateReservation, deleteReservation, loading, error };
}
