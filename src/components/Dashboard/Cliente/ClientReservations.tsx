import React from "react";
import { useClientReservations } from "./hooks/useClientReservations";
import { Reservation } from "./types/Reservation.types";

interface ClientReservationsProps {
  isModalVisible: boolean;
  onClose: () => void;
}

const ClientReservations: React.FC<ClientReservationsProps> = ({
  isModalVisible,
  onClose,
}) => {
  const clientId = localStorage.getItem("cliente_id") || "";
  const { reservations, loading, error } = useClientReservations(clientId);

  if (!isModalVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content"></div>
      <button className="modal-close-button" onClick={onClose}>
        &times;
      </button>
      <h2>Historial de Citas</h2>
      {loading && <p>Cargando...</p>}
      {error && <div className="error">{error}</div>}
      {!loading && reservations.length > 0 ? (
        <table className="historial-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Pet</th>
              <th>Veterinarian</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation: Reservation) => {
              const date = new Date(reservation.date_time);
              const formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              )}`;
              return (
                <tr key={reservation.id}>
                  <td>{formattedDate}</td>
                  <td>{reservation.pet?.name || reservation.pet_name}</td>
                  <td>{reservation.veterinarian?.user?.name || "-"}</td>
                  <td>{reservation.status}</td>
                  <td>{reservation.reason || "-"}</td>
                  <td>{reservation.notes || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        !loading && <p>No reservations found.</p>
      )}
    </div>
  );
};

export default ClientReservations;
