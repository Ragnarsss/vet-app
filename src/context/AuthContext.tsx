import React, { createContext, useState, useEffect } from "react";
import { Cliente } from "@/types/Cliente";

interface AuthContextType {
  cliente: Cliente | null;
  login: (cliente: Cliente) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    // Cargar cliente desde localStorage al iniciar
    const id = localStorage.getItem("cliente_id");
    const nombre = localStorage.getItem("cliente_nombre");
    const email = localStorage.getItem("cliente_email");
    const access_token = localStorage.getItem("access_token");
    if (id && nombre && email) {
      setCliente({
        id,
        user: { id, name: nombre, email },
        access_token: access_token ?? undefined,
      });
    }
  }, []);

  const login = (cliente: Cliente) => {
    setCliente(cliente);
    localStorage.setItem("cliente_id", cliente.id);
    localStorage.setItem("cliente_nombre", cliente.user.name);
    localStorage.setItem("cliente_email", cliente.user.email);
    if (cliente.access_token)
      localStorage.setItem("access_token", cliente.access_token);
  };

  const logout = () => {
    setCliente(null);
    localStorage.removeItem("cliente_id");
    localStorage.removeItem("cliente_nombre");
    localStorage.removeItem("cliente_email");
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider value={{ cliente, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
