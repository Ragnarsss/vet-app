import React from "react";
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
    </>
  );
};

export default VeterinarianReservationsTable;
