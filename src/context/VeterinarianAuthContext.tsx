import { Veterinarian, VeterinarianAuthData } from "../types/Veterinarian";
import { createContext } from "react";

export interface VeterinarianAuthContextType {
  veterinarian: Veterinarian | null;
  authData: VeterinarianAuthData | null;
  loading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const VeterinarianAuthContext = createContext<
  VeterinarianAuthContextType | undefined
>(undefined);
