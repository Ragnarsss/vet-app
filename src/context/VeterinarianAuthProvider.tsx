import { client } from "@/graphqlClient";
import { Veterinarian } from "@/types/Veterinarian";
import { VeterinarianAuthData } from "@/types/VeterinarianAuthData";
import { ReactNode, useState } from "react";
import { VeterinarianAuthContext } from "./VeterinarianAuthContext";
import { LOGIN_VETERINARIAN_MUTATION } from "./veterinarian.mutations";
import { gql } from "graphql-request";

// Query actualizada para obtener datos completos del veterinario por user_id
const VETERINARIAN_BY_USER_ID_QUERY = gql`
  query VeterinarianByUserId($userId: String!) {
    veterinarianByUserId(user_id: $userId) {
      id
      phone
      user {
        id
        name
        email
      }
    }
  }
`;

export const VeterinarianAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [veterinarian, setVeterinarian] = useState<Veterinarian | null>(null);
  const [authData, setAuthData] = useState<VeterinarianAuthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    setError("");
    try {
      const variables = { email, password };
      const response = (await client.request(
        LOGIN_VETERINARIAN_MUTATION,
        variables
      )) as {
        loginVeterinarian: {
          message: string;
          user: {
            id: string;
            name: string;
            email: string;
          };
          veterinarian: {
            id: string;
            phone?: string;
          };
          data: VeterinarianAuthData;
        };
      };
      const { user, data } = response.loginVeterinarian;
      setAuthData({
        auth_token: data.auth_token,
        refresh_token: data.refresh_token,
      });
      localStorage.setItem(
        "vet_auth_data",
        JSON.stringify({
          auth_token: data.auth_token,
          refresh_token: data.refresh_token,
        })
      );
      if (user?.id) {
        try {
          const { veterinarianByUserId } = await client.request<{
            veterinarianByUserId: Veterinarian;
          }>(VETERINARIAN_BY_USER_ID_QUERY, { userId: user.id });
          const vetData = veterinarianByUserId;
          if (vetData && vetData.user) {
            setVeterinarian({
              id: vetData.id,
              phone: vetData.phone,
              user: {
                id: vetData.user.id,
                name: vetData.user.name,
                email: vetData.user.email,
              },
            });
            localStorage.setItem("vet_full_data", JSON.stringify(vetData));
            localStorage.setItem("vet_id", vetData.id);
          } else {
            setVeterinarian(null);
            localStorage.removeItem("vet_full_data");
            localStorage.removeItem("vet_id");
          }
        } catch (vetErr) {
          setVeterinarian(null);
          localStorage.removeItem("vet_full_data");
          localStorage.removeItem("vet_id");
        }
      }
    } catch (e: unknown) {
      if (typeof e === "object" && e !== null && "response" in e) {
        const errObj = e as { response?: { errors?: { message?: string }[] } };
        const errorMsg =
          errObj.response?.errors?.[0]?.message || "Error de autenticación";
        setError(errorMsg);
      } else if (e instanceof Error && e.message) {
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
