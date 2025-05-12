import React from "react";
import "./VeterinarianDashboard.css";
import VeterinarianReservationsTable from "./VeterinarianReservationsTable";
import { useVeterinarianReservations } from "./useVeterinarianReservations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCareOrders, CareOrder } from "./useCareOrders";

const VeterinarianDashboard: React.FC = () => {
  const { reservations, loading, error, updateReservationStatus } =
    useVeterinarianReservations();
  const {
    careOrders,
    loading: loadingCareOrders,
    error: errorCareOrders,
  } = useCareOrders();

  // Filtrar reservas pendientes e historial
  const pendingReservations = reservations.filter(
    (res) => res.status === "pendiente"
  );
  const historyReservations = reservations.filter(
    (res) => res.status !== "pendiente"
  );

  return (
    <div
      className="vet-dashboard-container"
      style={{ maxWidth: 900, margin: "40px auto" }}
    >
      <h1 style={{ marginBottom: 32 }}>Reservas - Veterinario</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <Card>
          <CardHeader>
            <CardTitle>Pendientes</CardTitle>
          </CardHeader>
          <CardContent>
            <VeterinarianReservationsTable
              reservations={pendingReservations}
              loading={loading}
              error={error}
              onStatusChange={updateReservationStatus}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Historial</CardTitle>
          </CardHeader>
          <CardContent>
            <VeterinarianReservationsTable
              reservations={historyReservations}
              loading={loading}
              error={error}
              onStatusChange={() => {}}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Care Orders Cerradas</CardTitle>
          </CardHeader>
          <CardContent>
            {errorCareOrders && <div className="error">{errorCareOrders}</div>}
            {loadingCareOrders ? (
              <div>Cargando...</div>
            ) : (
              <table className="vet-reservations-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Cliente</th>
                    <th>Servicios</th>
                  </tr>
                </thead>
                <tbody>
                  {careOrders.map((order: CareOrder) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.reservation?.date_time}</td>
                      <td>${order.total}</td>
                      <td>{order.customer?.user?.name}</td>
                      <td>{order.products?.map((p) => p.name).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VeterinarianDashboard;
