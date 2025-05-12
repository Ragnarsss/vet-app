import { useState, useEffect } from "react";

export function useClientData() {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    id: "",
  });

  useEffect(() => {
    setClientData({
      name: localStorage.getItem("cliente_nombre") || "",
      email: localStorage.getItem("cliente_email") || "",
      phone: localStorage.getItem("cliente_phone") || "",
      address: localStorage.getItem("cliente_address") || "",
      id: localStorage.getItem("cliente_id") || "",
    });
  }, []);

  return clientData;
}
