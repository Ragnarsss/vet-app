import React from "react";
import "./VeterinarianDashboard.css";
import VeterinarianReservationsTable from "./VeterinarianReservationsTable";
import { useVeterinarianReservations } from "./useVeterinarianReservations";

const VETERINARIAN_ID = "v1"; // Reemplaza esto por el ID real del veterinario autenticado

const VeterinarianDashboard: React.FC = () => {
  const { reservations, loading, error, updateReservationStatus } =
    useVeterinarianReservations(VETERINARIAN_ID);

  return (
    <div className="vet-dashboard-container">
      <h1>Reservas - Veterinario</h1>
      <VeterinarianReservationsTable
        reservations={reservations}
        loading={loading}
        error={error}
        onStatusChange={updateReservationStatus}
      />
    </div>
  );
};

export default VeterinarianDashboard;
