import React, { useState } from "react";
import { useAdminServiceMutations, Service } from "./useAdminServiceMutations";

const AdminServiceManager: React.FC = () => {
  const { createService, updateService, deleteService, loading, error } = useAdminServiceMutations();
  const [form, setForm] = useState<Omit<Service, "id">>({ name: "", description: "", price: 0 });
  const [serviceId, setServiceId] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const res = await createService({ ...form, price: Number(form.price) });
    setResult(res);
  };

  const handleUpdate = async () => {
    if (!serviceId) return;
    const res = await updateService(serviceId, { ...form, price: Number(form.price) });
    setResult(res);
  };

  const handleDelete = async () => {
    if (!serviceId) return;
    const res = await deleteService(serviceId);
    setResult(res);
  };

  return (
    <div>
      <h2>Gestión de Servicios</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: 350, margin: '0 auto' }}>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Nombre del servicio:
          <input name="name" placeholder="Ej: Vacunación" value={form.name} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Descripción:
          <textarea name="description" placeholder="Ej: Vacuna anual para perros" value={form.description} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Precio:
          <input name="price" type="number" placeholder="Ej: 15000" value={form.price} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          ID (para editar/eliminar):
          <input name="serviceId" placeholder="Ej: 1" value={serviceId} onChange={e => setServiceId(e.target.value)} style={{ width: '100%', marginTop: 4 }} />
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

export default AdminServiceManager;
