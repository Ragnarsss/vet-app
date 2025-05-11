import { useState } from "react";
import { client } from "../../graphqlClient";
import { LOGIN_USER_MUTATION } from "./Login.mutations";

interface LoginVariables {
  email: string;
  password: string;
}

interface LoginResponse {
  loginUser: {
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
      const response = await client.request<LoginResponse>(
        LOGIN_USER_MUTATION,
        variables
      );
      setSuccess("Login exitoso");
      return response.loginUser;
    } catch (err: any) {
      setError("Error al iniciar sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, success };
}
