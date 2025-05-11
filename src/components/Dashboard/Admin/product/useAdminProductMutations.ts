import { useState } from "react";
import { client } from "../../../../graphqlClient";
import {
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
  DELETE_PRODUCT_MUTATION,
} from "./Product.mutations";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export function useAdminProductMutations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createProduct = async (input: Omit<Product, "id">) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ createProduct: Product }>(CREATE_PRODUCT_MUTATION, input);
      return data.createProduct;
    } catch (e) {
      setError("Error al crear producto");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, input: Partial<Omit<Product, "id">>) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ updateProduct: Product }>(UPDATE_PRODUCT_MUTATION, { id, ...input });
      return data.updateProduct;
    } catch (e) {
      setError("Error al actualizar producto");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    setError("");
    try {
      const data = await client.request<{ deleteProduct: Product }>(DELETE_PRODUCT_MUTATION, { id });
      return data.deleteProduct;
    } catch (e) {
      setError("Error al eliminar producto");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createProduct, updateProduct, deleteProduct, loading, error };
}
