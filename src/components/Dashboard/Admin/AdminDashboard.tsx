import React, { useState } from "react";
import AdminServiceManager from "./service/AdminServiceManager";
import AdminProductManager from "./product/AdminProductManager";
import AdminPetManager from "./pet/AdminPetManager";
import AdminReservationsPanel from "./AdminReservationsPanel";
import AdminReservationManager from "./AdminReservationManager";
import AdminCartView from "./AdminCartView";
import AdminAddToCartModal from "./AdminAddToCartModal";
import AdminVeterinarianRegister from "./veterinarian/AdminVeterinarianRegister";
import AdminVeterinarianTable from "./veterinarian/AdminVeterinarianTable";
import "./AdminDashboard.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminDashboard: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [activeModal, setActiveModal] = useState<
    | null
    | "services"
    | "products"
    | "pets"
    | "reservations"
    | "reservationManager"
    | "addToCart"
    | "registerVeterinarian"
    | "veterinarianTable"
  >(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <div className="max-w-5xl mx-auto py-8 px-2">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">Panel de Administración</CardTitle>
            <Button
              variant="destructive"
              onClick={() => (window.location.href = "/")}
            >
              Cerrar Sesión
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 mb-4">
              <Button
                onClick={() => setShowCart((prev) => !prev)}
                variant="outline"
              >
                🛒 Carrito
              </Button>
              <Button onClick={() => setActiveModal("services")}>
                Gestión de Servicios
              </Button>
              <Button onClick={() => setActiveModal("products")}>
                Gestión de Productos
              </Button>
              <Button onClick={() => setActiveModal("pets")}>
                Gestión de Mascotas
              </Button>
              <Button onClick={() => setActiveModal("reservations")}>
                Reservas
              </Button>
              <Button onClick={() => setActiveModal("reservationManager")}>
                Gestión de Reservas (CRUD)
              </Button>
              <Button onClick={() => setActiveModal("addToCart")}>
                Agregar al Carrito
              </Button>
              <Button
                onClick={() => setActiveModal("registerVeterinarian")}
                variant="secondary"
              >
                Registrar Veterinario
              </Button>
              <Button
                onClick={() => setActiveModal("veterinarianTable")}
                variant="secondary"
              >
                Ver Veterinarios
              </Button>
            </div>
            <p className="text-muted-foreground mb-4">
              Selecciona una opción para gestionar servicios, productos,
              mascotas o reservas.
            </p>
            {showCart && (
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle>Carrito</CardTitle>
                </CardHeader>
                <CardContent>
                  <AdminCartView />
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
        <Dialog
          open={activeModal === "services"}
          onOpenChange={() => setActiveModal(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gestión de Servicios</DialogTitle>
            </DialogHeader>
            <AdminServiceManager />
          </DialogContent>
        </Dialog>
        <Dialog
          open={activeModal === "products"}
          onOpenChange={() => setActiveModal(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gestión de Productos</DialogTitle>
            </DialogHeader>
            <AdminProductManager />
          </DialogContent>
        </Dialog>
        <Dialog
          open={activeModal === "pets"}
          onOpenChange={() => setActiveModal(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gestión de Mascotas</DialogTitle>
            </DialogHeader>
            <AdminPetManager />
          </DialogContent>
        </Dialog>
        <Dialog
          open={activeModal === "reservations"}
          onOpenChange={() => setActiveModal(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Reservas</DialogTitle>
            </DialogHeader>
            <AdminReservationsPanel />
          </DialogContent>
        </Dialog>
        <Dialog
          open={activeModal === "reservationManager"}
          onOpenChange={() => setActiveModal(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Gestión de Reservas (CRUD)</DialogTitle>
            </DialogHeader>
            <AdminReservationManager />
          </DialogContent>
        </Dialog>
        <Dialog
          open={activeModal === "addToCart"}
          onOpenChange={() => setActiveModal(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                Agregar productos o servicios al carrito
              </DialogTitle>
            </DialogHeader>
            <AdminAddToCartModal onClose={() => setActiveModal(null)} />
          </DialogContent>
        </Dialog>
        <Dialog
          open={activeModal === "registerVeterinarian"}
          onOpenChange={() => setActiveModal(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Registrar Veterinario</DialogTitle>
            </DialogHeader>
            <AdminVeterinarianRegister />
          </DialogContent>
        </Dialog>
        <Dialog
          open={activeModal === "veterinarianTable"}
          onOpenChange={() => setActiveModal(null)}
        >
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle>Veterinarios Registrados</DialogTitle>
            </DialogHeader>
            <AdminVeterinarianTable />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminDashboard;
