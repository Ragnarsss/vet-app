import React, { useState, useEffect } from "react";
import { useAdminReservationMutations, ReservationInput } from "./hooks/useAdminReservationMutations";
import { useAdminReservations } from "./hooks/useAdminReservations";

const initialForm: ReservationInput = {
  date_time: "",
  pet_id: "",
  pet_name: "",
  notes: "",
  customer_id: "",
  veterinarian_id: "",
  reason: "",
  status: "pending",
  service_ids: [],
};

const AdminReservationManager: React.FC = () => {
  const { createReservation, updateReservation, deleteReservation, loading, error } = useAdminReservationMutations();
  const { reservations, fetchAllReservations } = useAdminReservations();
  const [form, setForm] = useState<ReservationInput>(initialForm);
  const [reservationId, setReservationId] = useState("");
  const [result, setResult] = useState<any>(null);
  const [modal, setModal] = useState<null | "create" | "update" | "delete">(null);
  const [searchId, setSearchId] = useState("");

  // Modal helpers
  const openModal = (type: "create" | "update" | "delete") => {
    setModal(type);
    setResult(null);
    setForm(initialForm);
    setReservationId("");
    setSearchId("");
  };
  const closeModal = () => setModal(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceIdsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ids = e.target.value.split(",").map((id) => id.trim()).filter(Boolean);
    setForm((prev) => ({ ...prev, service_ids: ids }));
  };

  const handleCreate = async () => {
    const res = await createReservation({ ...form });
    setResult(res);
  };

  const handleUpdate = async () => {
    if (!reservationId) return;
    const res = await updateReservation(reservationId, { notes: form.notes, status: form.status });
    setResult(res);
  };

  const handleDelete = async () => {
    if (!reservationId) return;
    const res = await deleteReservation(reservationId);
    setResult(res);
  };

  // Cargar reservas al abrir modal de editar/eliminar
  useEffect(() => {
    if (modal === "update" || modal === "delete") {
      fetchAllReservations();
    }
  }, [modal, fetchAllReservations]);

  // Para buscar reserva por ID o por nombre de mascota
  const reservationToEdit = reservations.find(r => r.id === reservationId || r.pet?.name?.toLowerCase() === reservationId.toLowerCase());

  return (
    <div>
      <h2>Gestión de Reservas</h2>
      <div style={{ display: 'flex', gap: 12, marginBottom: 18, justifyContent: 'center' }}>
        <button className="admin-btn" onClick={() => openModal("create")}>Crear Reserva</button>
        <button className="admin-btn" onClick={() => openModal("update")}>Editar Reserva</button>
        <button className="admin-btn" onClick={() => openModal("delete")}>Eliminar Reserva</button>
      </div>
      {/* Modal para crear */}
      {modal === "create" && (
        <div className="modal-bg">
          <div className="modal-content">
            <h3>Crear Reserva</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input name="date_time" type="datetime-local" value={form.date_time} onChange={handleChange} placeholder="Fecha y hora" />
              <input name="pet_id" placeholder="ID Mascota" value={form.pet_id} onChange={handleChange} />
              <input name="pet_name" placeholder="Nombre Mascota" value={form.pet_name} onChange={handleChange} />
              <textarea name="notes" placeholder="Notas" value={form.notes} onChange={handleChange} />
              <input name="customer_id" placeholder="ID Cliente" value={form.customer_id} onChange={handleChange} />
              <input name="veterinarian_id" placeholder="ID Veterinario" value={form.veterinarian_id} onChange={handleChange} />
              <input name="reason" placeholder="Motivo" value={form.reason} onChange={handleChange} />
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
              </select>
              <input name="service_ids" placeholder="IDs de servicios (1,2)" value={form.service_ids?.join(",") || ""} onChange={handleServiceIdsChange} />
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="button" className="admin-btn" onClick={handleCreate} disabled={loading}>Crear</button>
                <button type="button" className="admin-btn" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
            {error && <div style={{color: 'red', marginTop: 10}}>{error}</div>}
            {result && <pre style={{marginTop: 10}}>{JSON.stringify(result, null, 2)}</pre>}
          </div>
        </div>
      )}
      {/* Modal para editar */}
      {modal === "update" && (
        <div className="modal-bg">
          <div className="modal-content">
            <h3>Editar Reserva</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input name="reservationId" placeholder="Buscar por ID o nombre de mascota" value={reservationId} onChange={e => setReservationId(e.target.value)} />
              {reservationToEdit && (
                <div style={{background:'#f7fafd',borderRadius:6,padding:10,marginBottom:8,fontSize:13}}>
                  <b>Reserva encontrada:</b><br/>
                  Cliente: {reservationToEdit.customer?.user?.name || '-'}<br/>
                  Mascota: {reservationToEdit.pet?.name || '-'}<br/>
                  Fecha: {reservationToEdit.date_time || '-'}<br/>
                  Estado: {reservationToEdit.status || '-'}<br/>
                  Notas: {reservationToEdit.notes || '-'}
                </div>
              )}
              <textarea name="notes" placeholder="Notas" value={form.notes} onChange={handleChange} />
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="pending">Pendiente</option>
                <option value="confirmed">Confirmada</option>
                <option value="cancelled">Cancelada</option>
              </select>
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="button" className="admin-btn" onClick={handleUpdate} disabled={loading}>Actualizar</button>
                <button type="button" className="admin-btn" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
            {error && <div style={{color: 'red', marginTop: 10}}>{error}</div>}
            {result && <pre style={{marginTop: 10}}>{JSON.stringify(result, null, 2)}</pre>}
          </div>
        </div>
      )}
      {/* Modal para eliminar */}
      {modal === "delete" && (
        <div className="modal-bg">
          <div className="modal-content">
            <h3>Eliminar Reserva</h3>
            <form style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input name="reservationId" placeholder="Buscar por ID o nombre de mascota" value={reservationId} onChange={e => setReservationId(e.target.value)} />
              {reservationToEdit && (
                <div style={{background:'#f7fafd',borderRadius:6,padding:10,marginBottom:8,fontSize:13}}>
                  <b>Reserva encontrada:</b><br/>
                  Cliente: {reservationToEdit.customer?.user?.name || '-'}<br/>
                  Mascota: {reservationToEdit.pet?.name || '-'}<br/>
                  Fecha: {reservationToEdit.date_time || '-'}<br/>
                  Estado: {reservationToEdit.status || '-'}<br/>
                  Notas: {reservationToEdit.notes || '-'}
                </div>
              )}
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="button" className="admin-btn" onClick={handleDelete} disabled={loading}>Eliminar</button>
                <button type="button" className="admin-btn" onClick={closeModal}>Cancelar</button>
              </div>
            </form>
            {error && <div style={{color: 'red', marginTop: 10}}>{error}</div>}
            {result && <pre style={{marginTop: 10}}>{JSON.stringify(result, null, 2)}</pre>}
          </div>
        </div>
      )}
      {/* Estilos básicos para modal */}
      <style>{`
        .modal-bg {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .modal-content {
          background: #fff; border-radius: 10px; padding: 28px 24px; min-width: 320px; box-shadow: 0 2px 16px rgba(0,0,0,0.12);
        }
      `}</style>
    </div>
  );
};

export default AdminReservationManager;
