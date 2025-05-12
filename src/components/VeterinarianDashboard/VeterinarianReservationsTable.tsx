import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Reservation } from "../../types/Reservation";
import ReservationDetailsDialog from "./ReservationDetailsDialog";

interface Props {
  reservations: Reservation[];
  loading: boolean;
  error: string;
  onStatusChange: (id: string, status: string) => void;
}

const statusOptions = ["pendiente", "confirmada", "completada"];

const VeterinarianReservationsTable: React.FC<Props> = ({
  reservations,
  loading,
  error,
  onStatusChange,
}) => {
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedReservation(null);
    setDialogOpen(false);
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha/Hora</TableHead>
            <TableHead>Mascota</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Motivo</TableHead>
            <TableHead>Notas</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={7}>Cargando...</TableCell>
            </TableRow>
          ) : (
            reservations.map((res) => (
              <TableRow key={res.id}>
                <TableCell>{res.date_time}</TableCell>
                <TableCell>{res.pet_name}</TableCell>
                <TableCell>{res.customer_id}</TableCell>
                <TableCell>{res.reason}</TableCell>
                <TableCell>{res.notes}</TableCell>
                <TableCell>{res.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-1"
                    onClick={() => handleOpenDialog(res)}
                  >
                    Ver detalles
                  </Button>
                  {statusOptions.map(
                    (opt) =>
                      opt !== res.status && (
                        <Button
                          key={opt}
                          onClick={() => onStatusChange(res.id!, opt)}
                          variant="outline"
                          size="sm"
                          className="ml-1"
                        >
                          Marcar como {opt}
                        </Button>
                      )
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      {selectedReservation && (
        <ReservationDetailsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          reservation={selectedReservation}
        />
      )}
    </>
  );
};

export default VeterinarianReservationsTable;
