import React, { useState, useMemo } from "react";
import { useVeterinarioMascotas } from "./useVeterinarioMascotas";
import { useVeterinarioClientes } from "./useVeterinarioClientes";
import { useVeterinarioReservas } from "./useVeterinarioReservas";
import "./VeterinarioDashboard.css";

const VeterinarioDashboard: React.FC = () => {
  const {
    mascotas,
    loading: loadingMascotas,
    error: errorMascotas,
  } = useVeterinarioMascotas();
  const {
    clientes,
    loading: loadingClientes,
    error: errorClientes,
  } = useVeterinarioClientes();
  const {
    reservas,
    loading: loadingReservas,
    error: errorReservas,
  } = useVeterinarioReservas();

  const [selectedMascotaId, setSelectedMascotaId] = useState<string | null>(
    null
  );
  const [selectedClienteId, setSelectedClienteId] = useState<string | null>(
    null
  );

  const filteredMascotas = useMemo(() => {
    if (selectedClienteId) {
      return mascotas.filter((m) => m.clienteId === selectedClienteId);
    }
    return mascotas;
  }, [mascotas, selectedClienteId]);

  const filteredClientes = useMemo(() => {
    if (selectedMascotaId) {
      const mascota = mascotas.find((m) => m.id === selectedMascotaId);
      if (mascota) {
        return clientes.filter((c) => c.id === mascota.clienteId);
      }
      return [];
    }
    return clientes;
  }, [clientes, mascotas, selectedMascotaId]);

  const filteredReservas = useMemo(() => {
    if (selectedMascotaId) {
      return reservas.filter((r) => r.mascotaId === selectedMascotaId);
    }
    if (selectedClienteId) {
      return reservas.filter((r) => r.clienteId === selectedClienteId);
    }
    return reservas;
  }, [reservas, selectedMascotaId, selectedClienteId]);

  const handleMascotaSelect = (id: string) => {
    setSelectedMascotaId(id);
    setSelectedClienteId(null);
  };
  const handleClienteSelect = (id: string) => {
    setSelectedClienteId(id);
    setSelectedMascotaId(null);
  };

  return (
    <div className="vet-dashboard-container">
      <header className="vet-dashboard-header">
        <h1>Panel Veterinario</h1>
      </header>
      <main className="vet-dashboard-main">
        <div className="vet-dashboard-column">
          <h2>Mascotas</h2>
          {loadingMascotas ? (
            <p>Cargando...</p>
          ) : errorMascotas ? (
            <p className="error">{errorMascotas}</p>
          ) : (
            <ul>
              {filteredMascotas.map((mascota) => (
                <li
                  key={mascota.id}
                  className={mascota.id === selectedMascotaId ? "selected" : ""}
                  onClick={() => handleMascotaSelect(mascota.id)}
                >
                  {mascota.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="vet-dashboard-column">
          <h2>Clientes</h2>
          {loadingClientes ? (
            <p>Cargando...</p>
          ) : errorClientes ? (
            <p className="error">{errorClientes}</p>
          ) : (
            <ul>
              {filteredClientes.map((cliente) => (
                <li
                  key={cliente.id}
                  className={cliente.id === selectedClienteId ? "selected" : ""}
                  onClick={() => handleClienteSelect(cliente.id)}
                >
                  {cliente.nombre}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="vet-dashboard-column">
          <h2>Reservas</h2>
          {loadingReservas ? (
            <p>Cargando...</p>
          ) : errorReservas ? (
            <p className="error">{errorReservas}</p>
          ) : (
            <ul>
              {filteredReservas.map((reserva) => (
                <li key={reserva.id}>
                  Reserva #{reserva.id} - Estado: {reserva.estado}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
};

export default VeterinarioDashboard;
