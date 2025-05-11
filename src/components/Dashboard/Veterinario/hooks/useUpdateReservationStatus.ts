import { useState } from "react";
import { client } from "../../../../graphqlClient";
import { UPDATE_RESERVATION_STATUS } from "../mutations";
import { Reservation } from "../types";

export function useUpdateReservationStatus() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const updateStatus = async (
    id: Reservation["id"],
    status: Reservation["status"]
  ) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await client.request({
        query: UPDATE_RESERVATION_STATUS,
        variables: { id, status },
      });
      setSuccess("Estado actualizado correctamente");
    } catch (err) {
      setError("Error al actualizar estado");
    } finally {
      setLoading(false);
    }
  };
  return { updateStatus, loading, error, success };
}
