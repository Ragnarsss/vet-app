import { useState } from "react";
import { client } from "../../graphqlClient";
import { LOGIN_VETERINARIAN_MUTATION } from "./Veterinarian.mutations";

export function useLoginVeterinarian() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loginVeterinarian = async ({ email, password }: { email: string; password: string }) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await client.request(LOGIN_VETERINARIAN_MUTATION, { email, password });
      setSuccess("Inicio de sesión exitoso");
      return response;
    } catch (e: any) {
      setError(e.response?.errors?.[0]?.message || "Error al iniciar sesión");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loginVeterinarian, loading, error, success };
}
