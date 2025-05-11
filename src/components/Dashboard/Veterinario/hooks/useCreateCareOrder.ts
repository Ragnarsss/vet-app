import { useState } from "react";
import { client } from "../../../../graphqlClient";
import { CREATE_CARE_ORDER } from "../mutations";
import { Reservation } from "../types";

export function useCreateCareOrder() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const createCareOrder = async (
    reservationId: Reservation["id"],
    products: any[] = [],
    services: any[] = [],
    notes: string = ""
  ) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await client.request({
        query: CREATE_CARE_ORDER,
        variables: { input: { reservationId, products, services, notes } },
      });
      setSuccess("Orden de cuidado creada correctamente");
    } catch (err) {
      setError("Error al crear orden de cuidado");
    } finally {
      setLoading(false);
    }
  };
  return { createCareOrder, loading, error, success };
}
