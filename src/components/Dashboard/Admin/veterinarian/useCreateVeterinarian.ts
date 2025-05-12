import { useState } from "react";
import { client } from "../../../../graphqlClient";
import { CREATE_USER_MUTATION } from "./User.mutations";
import { Veterinarian } from "@/types/Veterinarian";
import { CREATE_VETERINARIAN_MUTATION } from "./Veterinarian.mutations";

// Input para el formulario (todos los datos necesarios)
export interface VeterinarianFormInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Lo que se envía a la mutación de veterinario
interface VeterinarianMutationInput {
  user_id: string;
  phone?: string;
}

// Lo que se envía a la mutación de usuario
interface UserMutationInput {
  name: string;
  email: string;
  password: string;
}

export function useCreateVeterinarian() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función principal que ejecuta todo el proceso
  const registerVeterinarian = async (formData: VeterinarianFormInput) => {
    setLoading(true);
    setError("");
    console.log("[useCreateVeterinarian] Iniciando proceso de registro");

    try {
      // 1. Crear el usuario primero
      console.log("[useCreateVeterinarian] Creando usuario...");
      const userInput: UserMutationInput = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      const userData = await client.request<{
        createUser: { id: string; name: string; email: string };
      }>(CREATE_USER_MUTATION, userInput);

      if (!userData.createUser || !userData.createUser.id) {
        throw new Error("No se pudo crear el usuario");
      }

      console.log(
        "[useCreateVeterinarian] Usuario creado con éxito:",
        userData.createUser
      );

      // 2. Crear el veterinario usando el user_id obtenido
      console.log("[useCreateVeterinarian] Creando veterinario...");
      const vetInput: VeterinarianMutationInput = {
        user_id: userData.createUser.id,
        phone: formData.phone,
      };

      const vetData = await client.request<{
        createVeterinarian: Veterinarian;
      }>(CREATE_VETERINARIAN_MUTATION, vetInput);

      console.log(
        "[useCreateVeterinarian] Veterinario creado con éxito:",
        vetData.createVeterinarian
      );
      return vetData.createVeterinarian;
    } catch (err) {
      console.error("[useCreateVeterinarian] Error:", err);
      setError(
        err instanceof Error ? err.message : "Error al registrar veterinario"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registerVeterinarian, loading, error };
}
