import { useState, useEffect } from "react";
import { client } from "../../../../graphqlClient";
import { Pet } from "@/types/Pet";
import {
  GET_PETS_BY_CUSTOMER,
  UPDATE_PET,
  DELETE_PET,
} from "../queries/Pet.queries";
import { CREATE_PET_MUTATION } from "../mutations/Pet.mutations";

export function useClientPets() {
  const customer_id = localStorage.getItem("cliente_id") || "";
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    console.log("[useClientPets] fetchPets: customer_id", customer_id);
    try {
      const data = await client.request<{ customer: { pets: Pet[] } }>(
        GET_PETS_BY_CUSTOMER,
        { customer_id }
      );
      console.log("[useClientPets] fetchPets: data", data);
      setPets(data.customer?.pets || []);
    } catch (err) {
      console.error("[useClientPets] fetchPets: error", err);
      setError("Error al cargar mascotas.");
      setPets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customer_id) {
      fetchPets();
    } else {
      setPets([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer_id]);

  const createPet = async (input: Omit<Pet, "id">) => {
    setLoading(true);
    setError(null);
    console.log("[useClientPets] createPet: input", input);
    try {
      const variables = { input: { ...input, customer_id } };
      console.log("[useClientPets] createPet: variables", variables);
      const data = await client.request<{ createPet: Pet }>(
        CREATE_PET_MUTATION,
        variables
      );
      console.log("[useClientPets] createPet: response", data);
      await fetchPets();
      return data.createPet;
    } catch (err: unknown) {
      console.error("[useClientPets] createPet: error", err);
      setError("Error al crear mascota");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePet = async (id: string, input: Partial<Omit<Pet, "id">>) => {
    setLoading(true);
    setError(null);
    try {
      const variables = { id, input };
      const data = await client.request<{ updatePet: Pet }>(
        UPDATE_PET,
        variables
      );
      setPets((prev) =>
        prev.map((pet) => (pet.id === id ? data.updatePet : pet))
      );
      return data.updatePet;
    } catch (err: unknown) {
      setError("Error al actualizar mascota");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePet = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await client.request(DELETE_PET, { id });
      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err: unknown) {
      setError("Error al eliminar mascota");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { pets, loading, error, fetchPets, createPet, updatePet, deletePet };
}
