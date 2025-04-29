import React from "react";
import { useClientReservations } from "./useClientReservations";

interface ClientReservationsProps {
  isModalVisible: boolean;
  onClose: () => void;
}

const ClientReservations: React.FC<ClientReservationsProps> = ({
  isModalVisible,
  onClose,
}) => {
  const clienteIdStr = localStorage.getItem("cliente_id");
  const cliente_id = clienteIdStr ? Number(clienteIdStr) : null;
  const { reservas, loading, error } = useClientReservations(cliente_id);

  if (!isModalVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content"></div>
      <button className="modal-close-button" onClick={onClose}>
        &times;
      </button>
      <h2>Historial de Citas</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && reservas.length > 0 ? (
        <table className="historial-table">
          <thead>
            <tr>
              <th>Fecha y Hora</th>
              <th>Mascota</th>
              <th>Estado</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((cita) => {
              const fechaHora = new Date(cita.horario);
              const fechaFormateada = `${fechaHora.toLocaleDateString()} ${fechaHora.getHours()}:00`;
              return (
                <tr key={cita.id}>
                  <td>{fechaFormateada}</td>
                  <td>{cita.mascota_nombre}</td>
                  <td>{cita.estado}</td>
                  <td>{cita.observaciones}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !loading && <p>No hay citas registradas.</p>
      )}
    </div>
  );
};

export default ClientReservations;
