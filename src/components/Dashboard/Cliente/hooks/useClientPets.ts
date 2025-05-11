import { useState, useEffect } from "react";
import { client } from "../../../../graphqlClient";
import { Pet } from "@/types/Pet";
import {
  GET_PETS_BY_CUSTOMER,
  CREATE_PET,
  UPDATE_PET,
  DELETE_PET,
} from "../queries/Pet.queries";

const MOCK_PETS: Pet[] = [
  {
    id: "1",
    name: "Firulais",
    species: "Perro",
    breed: "Labrador",
    age: 3,
    sex: "Macho",
    weight: 25,
    color: "Negro",
    marks: "Mancha blanca en el pecho",
    customer_id: "mock",
    birth_date: "2020-01-01",
    notes: "Muy juguetón",
  },
  {
    id: "2",
    name: "Mishi",
    species: "Gato",
    breed: "Siames",
    age: 2,
    sex: "Hembra",
    weight: 4,
    color: "Gris",
    marks: "Cola corta",
    customer_id: "mock",
    birth_date: "2021-05-10",
    notes: "Le gusta dormir mucho",
  },
];

export function useClientPets() {
  const customer_id = localStorage.getItem("cliente_id") || "";
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await client.request<{ customer: { pets: Pet[] } }>(
        GET_PETS_BY_CUSTOMER,
        { customer_id }
      );
      setPets(data.customer?.pets || []);
    } catch (err: unknown) {
      setError("Error al cargar mascotas. Mostrando datos de ejemplo.");
      setPets(MOCK_PETS);
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
    try {
      const variables = { input: { ...input, customer_id } };
      const data = await client.request<{ createPet: Pet }>(
        CREATE_PET,
        variables
      );
      setPets((prev) => [...prev, data.createPet]);
      return data.createPet;
    } catch (err: unknown) {
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
