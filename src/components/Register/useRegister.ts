import { useState } from "react";
import { client } from "../../graphqlClient";
import { REGISTER_USER_MUTATION } from "./Register.mutations";

export type RegisterVariables = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string; // Added the missing 'address' property
};

interface RegisterResponse {
  registerUser: {
    id: string;
    phone: string;
    address: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
    reservations: Array<{ id: string; date_time: string }>;
    pets: Array<{ id: string; name: string }>;
    careOrders: Array<{ id: string; status: string; total: number }>;
  };
}

export function useRegisterUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const registerUser = async (variables: RegisterVariables) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await client.request<RegisterResponse>(
        REGISTER_USER_MUTATION,
        variables
      );
      setSuccess("Usuario registrado correctamente");
      return response.registerUser;
    } catch (err: any) {
      setError("Error al registrar usuario");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error, success };
}
