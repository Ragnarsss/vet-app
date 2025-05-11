import React, { useState } from "react";
import { useAdminPetMutations, Pet } from "./useAdminPetMutations";
import { client } from "../../../../graphqlClient";
import {  GET_CUSTOMER_ID_BY_EMAIL, GET_PETS_BY_CUSTOMER } from "./Pet.queries";

// Consulta GraphQL real para obtener el customer_id por email
export async function fetchCustomerIdByEmail(email: string): Promise<string | null> {
  const query = `
    query AllCustomers {
      customers {
        id
        user { email }
      }
    }
  `;
  try {
    const res: any = await client.request(query);
    const found = res.customers.find((c: any) => c.user?.email === email);
    return found?.id || null;
  } catch {
    return null;
  }
}

// Consulta GraphQL real para obtener mascotas por customer_id
export async function fetchPetsByCustomerId(customerId: string): Promise<Pet[]> {
  try {
    const res = await client.request<{ customer: { pets: Pet[] } }>(GET_PETS_BY_CUSTOMER, { id: customerId });
    return res.customer?.pets || [];
  } catch {
    return [];
  }
}

// Extiende el tipo Pet para incluir todos los campos opcionales usados en el formulario
export interface PetForm {
  name: string;
  species: string;
  breed: string;
  age: number;
  customer_id: string;
  sex?: string;
  weight?: number;
  color?: string;
  marks?: string;
  birth_date?: string;
  notes?: string;
}

const AdminPetManager: React.FC = () => {
  const { createPet, loading, error } = useAdminPetMutations();
  const [form, setForm] = useState<PetForm>({ name: "", species: "", breed: "", age: 0, customer_id: "", sex: "", weight: undefined, color: "", marks: "", birth_date: "", notes: "" });
  const [result, setResult] = useState<any>(null);
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Solo mostrar formulario simple para crear mascota
  return (
    <div>
      <h2>Crear Mascota</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: 350, margin: '0 auto' }}>
        <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          Email del cliente:
          <input name="email" placeholder="Ej: cliente@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', marginTop: 4 }} />
        </label>
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
          Sexo:
          <select name="sex" value={form.sex || ""} onChange={handleChange} style={{ width: '100%', marginTop: 4 }}>
            <option value="">Selecciona sexo</option>
            <option value="male">Macho</option>
            <option value="female">Hembra</option>
          </select>
        </label>
        
        <button type="button" onClick={async () => {
          if (!email) {
            setResult({ error: "Debes ingresar el email del cliente" });
            return;
          }
          // Buscar el id del cliente por email usando la query de customers
          const query = `
            query AllCustomers {
              customers {
                id
                user { email }
              }
            }
          `;
          let customerId = null;
          try {
            const res: any = await client.request(query);
            const found = res.customers.find((c: any) => c.user?.email === email);
            customerId = found?.id || null;
          } catch {
            customerId = null;
          }
          if (!customerId) {
            setResult({ error: "No se encontró un cliente con ese email" });
            return;
          }
          const res = await createPet({
            name: form.name,
            species: form.species,
            breed: form.breed,
            age: Number(form.age),
            customer_id: customerId,
            sex: "",
            weight: undefined,
            color: "",
            marks: "",
            birth_date: form.birth_date || "",
            notes: ""
          });
          setResult(res);
        }} disabled={loading} style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 18px', fontWeight: 500 }}>Crear Mascota</button>
      </form>
      {error && <div style={{color: 'red', marginTop: 10}}>{error}</div>}
      {result && <pre style={{marginTop: 10}}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default AdminPetManager;
