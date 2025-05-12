import { useState } from "react";
import { loginVeterinarian } from "../services/veterinarianService";

interface AuthData {
  auth_token: string;
  refresh_token: string;
}

interface Veterinarian {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export const useVeterinarianAuth = () => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [veterinarian, setVeterinarian] = useState<Veterinarian | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    console.log("[useVeterinarianAuth] Iniciando login con email:", email);
    setLoading(true);
    setError("");

    try {
      console.log("[useVeterinarianAuth] Llamando a loginVeterinarian...");
      const response = await loginVeterinarian({ email, password });
      console.log(
        "[useVeterinarianAuth] Respuesta de loginVeterinarian:",
        response
      );

      if (!response) {
        console.error(
          "[useVeterinarianAuth] No se recibió respuesta del servidor"
        );
        throw new Error("No se pudo contactar al servidor");
      }

      if (!response.loginVeterinarian) {
        console.error(
          "[useVeterinarianAuth] Formato de respuesta inválido:",
          response
        );
        throw new Error("Formato de respuesta inválido");
      }

      const { message, user, data, veterinarian } = response.loginVeterinarian;

      console.log("[useVeterinarianAuth] Mensaje:", message);
      console.log("[useVeterinarianAuth] Usuario:", user);
      console.log("[useVeterinarianAuth] Datos de autenticación:", data);
      console.log(
        "[useVeterinarianAuth] Información del veterinario:",
        veterinarian
      );

      if (!data || !data.auth_token) {
        console.error(
          "[useVeterinarianAuth] Token de autenticación no encontrado"
        );
        throw new Error("Token de autenticación no encontrado");
      }

      setVeterinarian({
        id: veterinarian?.id || user?.id || "",
        name: user?.name || "",
        email: user?.email || email,
        phone: veterinarian?.phone || "",
      });

      setAuthData({
        auth_token: data.auth_token,
        refresh_token: data.refresh_token || "",
      });

      console.log(
        "[useVeterinarianAuth] Login exitoso, guardando en localStorage"
      );

      // Guardar en localStorage
      localStorage.setItem(
        "veterinarian_auth",
        JSON.stringify({
          auth_token: data.auth_token,
          refresh_token: data.refresh_token || "",
        })
      );
      localStorage.setItem(
        "veterinarian",
        JSON.stringify({
          id: veterinarian?.id || user?.id || "",
          name: user?.name || "",
          email: user?.email || email,
          phone: veterinarian?.phone || "",
        })
      );

      console.log(
        "[useVeterinarianAuth] Datos guardados en localStorage exitosamente"
      );
    } catch (err: unknown) {
      console.error(
        "[useVeterinarianAuth] Error durante el proceso de login:",
        err
      );

      if (err instanceof Error) {
        setError(err.message || "Error al iniciar sesión");
      } else {
        setError("Error desconocido durante el inicio de sesión");
      }

      setVeterinarian(null);
      setAuthData(null);
    } finally {
      console.log("[useVeterinarianAuth] Proceso de login finalizado");
      setLoading(false);
    }
  };

  return {
    authData,
    veterinarian,
    loading,
    error,
    login,
  };
};
