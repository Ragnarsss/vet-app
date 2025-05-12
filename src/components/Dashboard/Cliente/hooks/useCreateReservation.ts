import { useState } from "react";
import { client } from "../../../../graphqlClient";
import { CREATE_RESERVATION_MUTATION } from "../mutations/Reservation.mutations";
import {
  Reservation,
  CreateReservationInput,
} from "../types/Reservation.types";

export interface CreateReservationResponse {
  createReservation: Reservation;
}

export function useCreateReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createReservation = async (input: CreateReservationInput) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Obtener el customer_id del localStorage si no viene en input
      const customerId =
        input.customer_id || localStorage.getItem("cliente_id") || "";
      const variables = {
        date_time: input.date_time,
        pet_id: input.pet_id,
        pet_name: input.pet_name,
        notes: input.notes || null,
        customer_id: customerId,
        veterinarian_id: input.veterinarian_id,
        reason: input.reason,
        status: input.status,
        service_ids: input.service_ids,
      };
      const response = await client.request<CreateReservationResponse>(
        CREATE_RESERVATION_MUTATION,
        variables
      );
      setSuccess("Reservation scheduled successfully");
      return response.createReservation;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error scheduling reservation");
      } else {
        setError("Error scheduling reservation");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createReservation, loading, error, success };
}
