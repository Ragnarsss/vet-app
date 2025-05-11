import { useState } from "react";
import { client } from "../../../../graphqlClient";
import {
  CREATE_SERVICE_MUTATION,
  UPDATE_SERVICE_MUTATION,
  DELETE_SERVICE_MUTATION,
} from "./Service.mutations";

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
}

export function useAdminServiceMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createService = async (input: Omit<Service, "id">) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ createService: Service }>(CREATE_SERVICE_MUTATION, input);
      return data.createService;
    } catch (e) {
      setError("Error al crear servicio");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateService = async (id: string, input: Partial<Omit<Service, "id">>) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ updateService: Service }>(UPDATE_SERVICE_MUTATION, { id, ...input });
      return data.updateService;
    } catch (e) {
      setError("Error al actualizar servicio");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteService = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ deleteService: Service }>(DELETE_SERVICE_MUTATION, { id });
      return data.deleteService;
    } catch (e) {
      setError("Error al eliminar servicio");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createService, updateService, deleteService, loading, error };
}
