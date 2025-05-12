import { useState } from "react";
import { client } from "../../graphqlClient";
import { LOGIN_USER_MUTATION } from "./Login.mutations";

interface LoginVariables {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  customer: {
    id: string;
    phone: string;
    address: string;
  };
  data: {
    auth_token: string;
    refresh_token: string;
  };
}

export function useLoginUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loginUser = async (variables: LoginVariables) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // El tipo LoginResponse es el shape interno, pero la respuesta real es { loginUser: LoginResponse }
      const response = await client.request<{ loginUser: LoginResponse }>(
        LOGIN_USER_MUTATION,
        variables
      );
      setSuccess("Login exitoso");
      return response;
    } catch (err: unknown) {
      setError((err as Error).message || "Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, success };
}
