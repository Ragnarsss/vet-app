import React, { useEffect, useState } from "react";
import { useAdminReservations } from "./hooks/useAdminReservations";

const AdminReservationsPanel: React.FC = () => {
  const { reservations, loading, error, fetchAllReservations } = useAdminReservations();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchAllReservations();
  }, []);

  const filtered = reservations.filter((r) =>
    (r.customer?.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      r.pet?.name?.toLowerCase().includes(search.toLowerCase())) &&
    (status ? r.status === status : true)
  );

  return (
    <div>
      <h2>Reservas</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        <input
          type="text"
          placeholder="Buscar por cliente o mascota"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <select value={status} onChange={e => setStatus(e.target.value)} style={{ padding: 6, borderRadius: 4 }}>
          <option value="">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>
      {loading ? (
        <div>Cargando reservas...</div>
      ) : error ? (
        <div style={{color: 'red'}}>{error}</div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f7fafd' }}>
              <th style={{ padding: 8, border: '1px solid #eee' }}>ID</th>
              <th style={{ padding: 8, border: '1px solid #eee' }}>Cliente</th>
              <th style={{ padding: 8, border: '1px solid #eee' }}>Mascota</th>
              <th style={{ padding: 8, border: '1px solid #eee' }}>Fecha</th>
              <th style={{ padding: 8, border: '1px solid #eee' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 16 }}>No hay reservas</td></tr>
            ) : (
              filtered.map(r => (
                <tr key={r.id}>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{r.id}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{r.customer?.user?.name || '-'}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{r.pet?.name || '-'}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{r.date_time || '-'}</td>
                  <td style={{ padding: 8, border: '1px solid #eee' }}>{r.status || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminReservationsPanel;
