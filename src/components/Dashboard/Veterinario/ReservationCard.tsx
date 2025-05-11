import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useReservationById } from "./hooks/useReservationById";
import { useUpdateReservationStatus } from "./hooks/useUpdateReservationStatus";
import { useCareOrderDialog } from "./hooks/useCareOrderDialog";

interface ReservationCardProps {
  reservationId: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservationId }) => {
  const { reservation, loading, error } = useReservationById(reservationId);
  const updateReservationStatus = useUpdateReservationStatus();
  const { dialogOpen, openDialog, closeDialog, CareOrderDialog } =
    useCareOrderDialog(reservationId);

  if (loading) return <div>Cargando reserva...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!reservation) return null;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Reserva #{reservation.id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>
          <b>Mascota:</b> {reservation.pet?.name}
        </div>
        <div>
          <b>Cliente:</b> {reservation.customer?.user?.name}
        </div>
        <div>
          <b>Fecha:</b> {reservation.date}
        </div>
        <div>
          <b>Estado:</b> {reservation.status}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            disabled={updateReservationStatus.loading}
            onClick={() =>
              updateReservationStatus.updateStatus(reservation.id, "confirmed")
            }
          >
            Confirmar
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={updateReservationStatus.loading}
            onClick={() =>
              updateReservationStatus.updateStatus(reservation.id, "completed")
            }
          >
            Completar
          </Button>
          <Button
            size="sm"
            variant="destructive"
            disabled={updateReservationStatus.loading}
            onClick={() =>
              updateReservationStatus.updateStatus(reservation.id, "canceled")
            }
          >
            Cancelar
          </Button>
          <Button size="sm" onClick={openDialog}>
            Cerrar y crear Care Order
          </Button>
        </div>
        {CareOrderDialog}
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
