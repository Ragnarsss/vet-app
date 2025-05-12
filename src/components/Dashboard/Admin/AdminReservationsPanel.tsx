import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const AdminReservationsPanel: React.FC = () => {
  // Aquí deberías traer las reservas y mostrarlas en una tabla o lista
  // Ejemplo de UI moderna con shadcn/ui
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Reservas recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground text-center py-8">
          Aquí se mostrarán las reservas del sistema.
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminReservationsPanel;
