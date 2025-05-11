import React, { useState } from "react";
import { useAdminPetMutations, Pet } from "./useAdminPetMutations";

const AdminPetManager: React.FC = () => {
  const { createPet, updatePet, deletePet, loading, error } = useAdminPetMutations();
  const [form, setForm] = useState<Omit<Pet, "id">>({ name: "", species: "", breed: "", age: 0, customer_id: "" });
  const [petId, setPetId] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const res = await createPet({
      name: form.name,
      species: form.species,
      breed: form.breed,
      age: Number(form.age),
      customer_id: form.customer_id
    });
    setResult(res);
  };

  const handleUpdate = async () => {
    if (!petId) return;
    const res = await updatePet(petId, {
      name: form.name,
      species: form.species,
      breed: form.breed,
      age: Number(form.age)
    });
    setResult(res);
  };

  const handleDelete = async () => {
    if (!petId) return;
    const res = await deletePet(petId);
    setResult(res);
  };

  return (
    <div>
      <h2>Gestión de Mascotas</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: 350, margin: '0 auto' }}>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Nombre de la mascota:
          <input name="name" placeholder="Ej: Firulais" value={form.name} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Especie:
          <input name="species" placeholder="Ej: Perro" value={form.species} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Raza:
          <input name="breed" placeholder="Ej: Labrador" value={form.breed} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Edad:
          <input name="age" type="number" placeholder="Ej: 3" value={form.age} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          ID del cliente:
          <input name="customer_id" placeholder="Ej: 1" value={form.customer_id} onChange={handleChange} style={{ width: '100%', marginTop: 4 }} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          ID de mascota (para editar/eliminar):
          <input name="petId" placeholder="Ej: 1" value={petId} onChange={e => setPetId(e.target.value)} style={{ width: '100%', marginTop: 4 }} />
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

export default AdminPetManager;
