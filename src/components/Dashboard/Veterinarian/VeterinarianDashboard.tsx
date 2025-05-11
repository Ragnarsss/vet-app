import React, { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { useVeterinarianReservations } from "@/hooks/useVeterinarianReservations";
import { useUpdateReservationStatus } from "@/hooks/useUpdateReservationStatus";
import { useCreateCareOrder } from "@/hooks/useCreateCareOrder";
import ReservationCard from "@/components/ReservationCard";
import CareOrderDialog from "@/components/CareOrderDialog";

const VeterinarianDashboard: React.FC = () => {
  const { reservations, loading, error } = useVeterinarianReservations();
  const updateReservationStatus = useUpdateReservationStatus();
  const createCareOrder = useCreateCareOrder();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Panel de Veterinario</h1>
      {loading && <div>Cargando reservas...</div>}
      {error && <Alert variant="destructive">{error}</Alert>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reservations.map((res) => (
          <ReservationCard
            key={res.id}
            reservation={res}
            onStatusChange={updateReservationStatus.updateStatus}
            onCreateCareOrder={() => {
              setSelectedReservation(res);
              setDialogOpen(true);
            }}
            loading={updateReservationStatus.loading}
          />
        ))}
      </div>
      <CareOrderDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        reservation={selectedReservation}
        createCareOrder={createCareOrder.createCareOrder}
        loading={createCareOrder.loading}
        error={createCareOrder.error}
      />
    </div>
  );
};

export default VeterinarianDashboard;
