import React, { useState } from "react";
import { useAdminVeterinarianMutations } from "./useAdminVeterinarianMutations";

const AdminVeterinarianRegister: React.FC = () => {
  const { createUser, createVeterinarian, loading, error } = useAdminVeterinarianMutations();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    availability: ""
  });
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    // 1. Crear usuario
    const userRes = await createUser({
      name: form.name,
      email: form.email,
      password: form.password
    });
    if (!userRes || !userRes.id) {
      setResult({ error: "Error al crear usuario" });
      return;
    }
    // 2. Crear veterinario con user como string (id)
    const vetInput = {
      user_id: userRes.id, // <-- SOLO el id
      phone: form.phone,
      availability: form.availability
        ? form.availability.split(",").map((d) => d.trim())
        : []
    };
    const res = await createVeterinarian(vetInput);
    setResult(res);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px #0001", padding: 24 }}>
      <h2>Registrar Veterinario</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label>
          Nombre:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Contraseña:
          <input name="password" type="password" value={form.password} onChange={handleChange} required />
        </label>
        <label>
          Teléfono:
          <input name="phone" value={form.phone} onChange={handleChange} />
        </label>
        <label>
          Disponibilidad (elige los días):
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
            {["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"].map((dia) => (
              <label key={dia} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <input
                  type="checkbox"
                  checked={form.availability.split(",").map(d => d.trim()).includes(dia)}
                  onChange={e => {
                    const dias = form.availability ? form.availability.split(",").map(d => d.trim()) : [];
                    let newDias;
                    if (e.target.checked) {
                      newDias = [...dias, dia];
                    } else {
                      newDias = dias.filter(d => d !== dia);
                    }
                    setForm({ ...form, availability: newDias.join(",") });
                  }}
                />
                {dia}
              </label>
            ))}
          </div>
        </label>
        <button type="submit" disabled={loading} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 500 }}>
          {loading ? "Registrando..." : "Registrar Veterinario"}
        </button>
      </form>
      {error && <div style={{ marginTop: 16, color: 'red' }}>{error}</div>}
      {result && !error && (
        <div style={{ marginTop: 16, color: 'green' }}>¡Veterinario registrado!</div>
      )}
    </div>
  );
};

export default AdminVeterinarianRegister;
