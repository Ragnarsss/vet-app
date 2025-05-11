import React, { useState } from "react";
import { useAdminProductMutations, Product } from "./useAdminProductMutations";

const AdminProductManager: React.FC = () => {
  const { createProduct, updateProduct, deleteProduct, loading, error } = useAdminProductMutations();
  const [form, setForm] = useState<Omit<Product, "id">>({ name: "", description: "", price: 0 });
  const [productId, setProductId] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const res = await createProduct({ name: form.name, description: form.description, price: Number(form.price) });
    setResult(res);
  };

  const handleUpdate = async () => {
    if (!productId) return;
    const res = await updateProduct(productId, { name: form.name, description: form.description, price: Number(form.price) });
    setResult(res);
  };

  const handleDelete = async () => {
    if (!productId) return;
    const res = await deleteProduct(productId);
    setResult(res);
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: 350, margin: '0 auto' }}>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Nombre del producto:
          <input name="name" placeholder="Ej: Antiparasitario" value={form.name} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Descripción:
          <textarea name="description" placeholder="Ej: Tabletas para desparasitar perros" value={form.description} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Precio:
          <input name="price" type="number" placeholder="Ej: 5000" value={form.price} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          ID (para editar/eliminar):
          <input name="productId" placeholder="Ej: 1" value={productId} onChange={e => setProductId(e.target.value)} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <div style={{ display: 'flex', gap: '12px', margin: '18px 0', justifyContent: 'center' }}>
          <button type="button" onClick={handleCreate} disabled={loading} style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 500 }}>Crear</button>
          <button type="button" onClick={handleUpdate} disabled={loading} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 500 }}>Actualizar</button>
          <button type="button" onClick={handleDelete} disabled={loading} style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 500 }}>Eliminar</button>
        </div>
      </form>
      {error && <div style={{color: 'red', marginTop: 10}}>{error}</div>}
      {result && <pre style={{marginTop: 10}}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default AdminProductManager;
