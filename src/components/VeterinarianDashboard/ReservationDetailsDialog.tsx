import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { client } from "@/graphqlClient";
import { GET_SERVICES } from "./veterinarian.queries";
import { useVeterinarianReservations } from "./useVeterinarianReservations";
import { Reservation } from "../../types/Reservation";

interface ReservationDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: Reservation;
}

interface Service {
  id: string;
  name: string;
  price: number;
}

const ReservationDetailsDialog: React.FC<ReservationDetailsDialogProps> = ({
  open,
  onOpenChange,
  reservation,
}) => {
  const [showCareOrderDialog, setShowCareOrderDialog] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const { completeOrder, updateReservationStatus } =
    useVeterinarianReservations();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showCareOrderDialog && services.length === 0) {
      client.request<{ services: Service[] }>(GET_SERVICES).then((data) => {
        setServices(data.services);
      });
    }
  }, [showCareOrderDialog, services.length]);

  const handleFinishReservation = () => {
    setShowCareOrderDialog(true);
  };

  const handleServiceToggle = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleCreateCareOrder = async () => {
    setLoading(true);
    setError("");
    try {
      await updateReservationStatus(String(reservation.id), "completed");
      await completeOrder(String(reservation.id), [], selectedServices);
      setShowCareOrderDialog(false);
      onOpenChange(false);
    } catch {
      setError("Error al completar la reserva y crear la boleta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles de la Reserva</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div>
              <b>Fecha/Hora:</b> {reservation.date_time}
            </div>
            <div>
              <b>Mascota:</b> {reservation.pet_name}
            </div>
            <div>
              <b>Cliente:</b>{" "}
              {reservation.customer_id}
            </div>
            <div>
              <b>Motivo:</b> {reservation.reason}
            </div>
            <div>
              <b>Notas:</b> {reservation.notes}
            </div>
            <div>
              <b>Estado:</b> {reservation.status}
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleFinishReservation}
              disabled={reservation.status === "completada"}
            >
              Terminar reserva
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showCareOrderDialog} onOpenChange={setShowCareOrderDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear Boleta (Care Order)</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div>Selecciona los servicios realizados:</div>
            {services.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={() => handleServiceToggle(service.id)}
                  id={`service-${service.id}`}
                />
                <label htmlFor={`service-${service.id}`}>
                  {service.name} (${service.price})
                </label>
              </div>
            ))}
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
          <DialogFooter>
            <Button
              onClick={handleCreateCareOrder}
              disabled={loading || selectedServices.length === 0}
            >
              Confirmar y generar boleta
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCareOrderDialog(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReservationDetailsDialog;
