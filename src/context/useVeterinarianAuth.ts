import { useContext } from "react";
import { VeterinarianAuthContext } from "./VeterinarianAuthContext";

export function useVeterinarianAuth() {
  const context = useContext(VeterinarianAuthContext);
  if (!context)
    throw new Error(
      "useVeterinarianAuth must be used within VeterinarianAuthProvider"
    );
  return context;
}
