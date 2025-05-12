import { LOGIN_VETERINARIAN_MUTATION } from "@/context/veterinarian.mutations";
import { client } from "../graphqlClient";

export interface VeterinarianLoginResponse {
  loginVeterinarian: {
    message: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    veterinarian?: {
      id: string;
      phone?: string;
    };
    data: {
      auth_token: string;
      refresh_token?: string;
    };
  };
}

export const loginVeterinarian = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  console.log("[veterinarianService] Iniciando login con email:", email);

  try {
    console.log("[veterinarianService] Enviando petición GraphQL...");
    const response = await client.request<VeterinarianLoginResponse>(
      LOGIN_VETERINARIAN_MUTATION,
      { email, password }
    );

    console.log("[veterinarianService] Respuesta recibida:", response);

    if (!response.loginVeterinarian) {
      console.error("[veterinarianService] Respuesta inválida del servidor");
      throw new Error("Respuesta inválida del servidor");
    }

    return response;
  } catch (err: unknown) {
    console.error("[veterinarianService] Error en el servicio de login:", err);
    throw err;
  }
};
