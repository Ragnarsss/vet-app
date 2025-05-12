import { client } from "@/graphqlClient";
import { Veterinarian } from "@/types/Veterinarian";
import { VeterinarianAuthData } from "@/types/VeterinarianAuthData";
import { ReactNode, useState } from "react";
import { VeterinarianAuthContext } from "./VeterinarianAuthContext";
import { LOGIN_VETERINARIAN_MUTATION } from "./veterinarian.mutations";

export const VeterinarianAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [veterinarian, setVeterinarian] = useState<Veterinarian | null>(null);
  const [authData, setAuthData] = useState<VeterinarianAuthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      const variables = { input: { email, password } };
      const data = (await client.request(
        LOGIN_VETERINARIAN_MUTATION,
        variables
      )) as {
        loginVeterinarian: {
          veterinarian: Veterinarian;
          user: any;
          data: VeterinarianAuthData;
        };
      };
      setVeterinarian({
        ...data.loginVeterinarian.veterinarian,
        user: data.loginVeterinarian.user,
      });
      setAuthData(data.loginVeterinarian.data);
    } catch (e: unknown) {
      if (e instanceof Error && e.message) {
        setError(e.message);
      } else {
        setError("Error de autenticación");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setVeterinarian(null);
    setAuthData(null);
  };

  return (
    <VeterinarianAuthContext.Provider
      value={{ veterinarian, authData, loading, error, login, logout }}
    >
      {children}
    </VeterinarianAuthContext.Provider>
  );
};
