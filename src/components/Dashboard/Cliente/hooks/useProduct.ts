import { useState, useEffect } from "react";
import { client } from "../../../../graphqlClient";
import { PRODUCTOS_QUERY } from "../queries/product.queries";

export interface Producto {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductosResponse {
  products: Producto[];
}

export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    client
      .request<ProductosResponse>(PRODUCTOS_QUERY)
      .then((data) => setProductos(data.products))
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setLoading(false));
  }, []);

  return { productos, loading, error };
}