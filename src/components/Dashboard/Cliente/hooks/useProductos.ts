
import { useState, useEffect } from "react";
import { client } from "../../../../graphql/graphqlClient";
import { PRODUCTOS_QUERY } from "../../../../graphql/queries/product.queries";

export interface Producto {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface ProductosResponse {
  productos: Producto[];
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
      .then((data) => setProductos(data.productos))
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setLoading(false));
  }, []);

  return { productos, loading, error };
}