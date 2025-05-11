import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";

interface CareOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: any;
  createCareOrder: (
    reservationId: string,
    products: any[],
    services: any[],
    notes: string
  ) => Promise<void>;
  loading: boolean;
  error: string;
}

const CareOrderDialog: React.FC<CareOrderDialogProps> = ({
  open,
  onOpenChange,
  reservation,
  createCareOrder,
  loading,
  error,
}) => {
  const [notes, setNotes] = useState("");
  const [success, setSuccess] = useState("");

  const handleCreate = async () => {
    if (!reservation) return;
    await createCareOrder(reservation.id, [], [], notes);
    setSuccess("Orden de cuidado creada y reserva cerrada.");
    setNotes("");
    onOpenChange(false);
  };

  React.useEffect(() => {
    if (!open) {
      setNotes("");
      setSuccess("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Orden de Cuidado</DialogTitle>
        </DialogHeader>
        {reservation && (
          <div className="space-y-2">
            <div>
              <b>Reserva:</b> {reservation.id}
            </div>
            <div>
              <b>Mascota:</b> {reservation.pet?.name}
            </div>
            <Textarea
              placeholder="Notas de la orden de cuidado"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="destructive">{error}</Alert>}
          </div>
        )}
        <DialogFooter>
          <Button onClick={handleCreate} disabled={loading}>
            Guardar Orden de Cuidado
          </Button>
          <DialogClose asChild>
            <Button variant="secondary" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CareOrderDialog;
