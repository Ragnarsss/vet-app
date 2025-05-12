import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { useClientReservations } from "./hooks/useClientReservations";

const ReservationHistory: React.FC = () => {
  const { reservations = [], loading, error } = useClientReservations();
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="max-h-[400px] overflow-y-auto">
      {error && <Alert variant="destructive">{error}</Alert>}
      {loading && <div className="text-muted-foreground">Cargando...</div>}
      {reservations.length === 0 && !loading && (
        <div className="text-muted-foreground">
          No hay reservas registradas.
        </div>
      )}
      <ul className="space-y-2">
        {reservations.map((res) => (
          <li
            key={res.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <div className="font-semibold">
                {res.pet?.name || res.pet_name || "-"} -{" "}
                {res.date_time || "Sin fecha"}
              </div>
              <div className="text-xs text-muted-foreground">
                Estado: {res.status || "-"}
              </div>
            </div>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setSelected(res)}
            >
              Ver Detalle
            </Button>
          </li>
        ))}
      </ul>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalle de Reserva</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-2">
              <div>
                <strong>Mascota:</strong>{" "}
                {selected.pet?.name || selected.pet_name || "-"}
              </div>
              <div>
                <strong>Fecha/Hora:</strong> {selected.date_time || "-"}
              </div>
              <div>
                <strong>Veterinario:</strong>{" "}
                {selected.veterinarian?.user?.name ||
                  selected.veterinarian_name ||
                  "-"}
              </div>
              <div>
                <strong>Motivo:</strong> {selected.reason || "-"}
              </div>
              <div>
                <strong>Estado:</strong> {selected.status || "-"}
              </div>
              <div>
                <strong>Notas:</strong> {selected.notes || "-"}
              </div>
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Cerrar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReservationHistory;
