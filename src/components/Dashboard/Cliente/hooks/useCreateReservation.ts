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
    console.log("[useCreateReservation] Iniciando creación de reserva:", input);

    try {
      // Obtener el customer_id del localStorage si no viene en input
      const customerId =
        input.customer_id || localStorage.getItem("cliente_id") || "";

      // Asegurar que status sea "pending" por defecto
      const status = input.status || "pending";

      // Convertir IDs a formato numérico si son cadenas
      const pet_id =
        typeof input.pet_id === "string" ? input.pet_id : String(input.pet_id);
      const veterinarian_id =
        typeof input.veterinarian_id === "string"
          ? input.veterinarian_id
          : String(input.veterinarian_id);

      // Asegurar que service_ids sea un array
      const service_ids = Array.isArray(input.service_ids)
        ? input.service_ids
        : input.service_ids
        ? [input.service_ids]
        : [];

      const variables = {
        date_time: input.date_time,
        pet_id,
        pet_name: input.pet_name,
        notes: input.notes || null,
        customer_id: customerId,
        veterinarian_id,
        reason: input.reason || "",
        status,
        service_ids,
      };

      console.log("[useCreateReservation] Variables preparadas:", variables);

      const response = await client.request<CreateReservationResponse>(
        CREATE_RESERVATION_MUTATION,
        variables
      );

      console.log(
        "[useCreateReservation] Reserva creada exitosamente:",
        response.createReservation
      );
      setSuccess("Reservation scheduled successfully");
      return response.createReservation;
    } catch (err: unknown) {
      console.error("[useCreateReservation] Error al crear reserva:", err);
      if (err instanceof Error) {
        setError(err.message || "Error scheduling reservation");
      } else {
        setError("Error scheduling reservation");
      }
      throw err;
    } finally {
      setLoading(false);
      console.log("[useCreateReservation] Proceso de creación finalizado");
    }
  };

  return { createReservation, loading, error, success };
}
