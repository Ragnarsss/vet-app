import { useState } from "react";
import { client } from "../../../../graphqlClient";
import { CREATE_VETERINARIAN_MUTATION } from "./Veterinarian.mutations";
import { CREATE_USER_MUTATION } from "./User.mutations";

export interface VeterinarianInput {
  user: string; // user debe ser el id del usuario creado
  phone?: string;
  availability?: string[];
}

export function useAdminVeterinarianMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createUser = async (user: { name: string; email: string; password: string }) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ createUser: { id: string; name: string; email: string } }>(CREATE_USER_MUTATION, user);
      return data.createUser;
    } catch (e) {
      setError("Error al crear usuario");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createVeterinarian = async (input: { user: string; phone?: string; availability?: string[] }) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ createVeterinarian: any }>(CREATE_VETERINARIAN_MUTATION, input);
      return data.createVeterinarian;
    } catch (e) {
      setError("Error al crear veterinario");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createUser, createVeterinarian, loading, error };
}
