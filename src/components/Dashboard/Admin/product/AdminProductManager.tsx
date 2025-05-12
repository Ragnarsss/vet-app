import React, { useState } from "react";
import { useAdminProductMutations, Product } from "./useAdminProductMutations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AdminProductManager: React.FC = () => {
  const { createProduct, updateProduct, deleteProduct, loading, error } =
    useAdminProductMutations();
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    description: "",
    price: 0,
  });
  const [productId, setProductId] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const res = await createProduct({
      name: form.name,
      description: form.description,
      price: Number(form.price),
    });
    setResult(res);
  };

  const handleUpdate = async () => {
    if (!productId) return;
    const res = await updateProduct(productId, {
      name: form.name,
      description: form.description,
      price: Number(form.price),
    });
    setResult(res);
  };

  const handleDelete = async () => {
    if (!productId) return;
    const res = await deleteProduct(productId);
    setResult(res);
  };

  return (
    <Card className="max-w-md mx-auto shadow-lg border border-blue-100">
      <CardHeader>
        <CardTitle className="text-lg">Gestión de Productos</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 font-medium text-blue-900">
              Nombre del producto
            </label>
            <Input
              name="name"
              placeholder="Ej: Antiparasitario"
              value={form.name}
              onChange={handleChange}
              className="rounded-lg border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-900">
              Descripción
            </label>
            <Textarea
              name="description"
              placeholder="Ej: Tabletas para desparasitar perros"
              value={form.description}
              onChange={handleChange}
              className="rounded-lg border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-900">
              Precio
            </label>
            <Input
              name="price"
              type="number"
              placeholder="Ej: 5000"
              value={form.price}
              onChange={handleChange}
              className="rounded-lg border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-blue-900">
              ID (para editar/eliminar)
            </label>
            <Input
              name="productId"
              placeholder="Ej: 1"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="rounded-lg border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          <div className="flex gap-3 mt-2 justify-end">
            <Button
              type="button"
              onClick={handleCreate}
              disabled={loading}
              variant="default"
            >
              Crear
            </Button>
            <Button
              type="button"
              onClick={handleUpdate}
              disabled={loading}
              variant="secondary"
            >
              Actualizar
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              variant="destructive"
            >
              Eliminar
            </Button>
          </div>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {result && (
          <pre className="mt-2 bg-gray-50 rounded p-2 text-xs">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminProductManager;
