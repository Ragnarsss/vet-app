import { useState } from "react";
import { client } from "../../../../graphqlClient";
import {
  CREATE_PET_MUTATION,
  UPDATE_PET_MUTATION,
  DELETE_PET_MUTATION,
} from "./Pet.mutations";

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: number;
  customer_id: string;
}

export function useAdminPetMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createPet = async (input: Omit<Pet, "id">) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ createPet: Pet }>(CREATE_PET_MUTATION, input);
      return data.createPet;
    } catch (e) {
      setError("Error al crear mascota");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePet = async (id: string, input: Partial<Omit<Pet, "id" | "customer_id">>) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ updatePet: Pet }>(UPDATE_PET_MUTATION, { id, ...input });
      return data.updatePet;
    } catch (e) {
      setError("Error al actualizar mascota");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deletePet = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ deletePet: Pet }>(DELETE_PET_MUTATION, { id });
      return data.deletePet;
    } catch (e) {
      setError("Error al eliminar mascota");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createPet, updatePet, deletePet, loading, error };
}
