import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClientData } from "../../../hooks/useClientData";
import "./ClientDashboard.css";
import ClientReservations from "./ClientReservations";
import PetManager from "./PetManager";
import ProductCatalog from "./ProductCatalog";
import ReservationForm from "./ReservationForm";
import ReservationHistory from "./ReservationHistory";
import ReservationModal from "./ReservationModal";
import ServiceCatalog from "./ServiceCatalog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const clientData = useClientData();
  const [tempClientData, setTempClientData] = useState(clientData);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReservationModalVisible, setReservationModalVisible] =
    useState(false);
  const [isCatalogModalVisible, setIsCatalogModalVisible] = useState(false);
  const [isServiceModalVisible, setIsServiceModalVisible] = useState(false);
  const [reservationMessage, setReservationMessage] = useState("");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setTempClientData(clientData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempClientData({ ...tempClientData, [name]: value });
  };

  const handleSave = () => {
    console.log("Datos guardados:", tempClientData);
    setIsEditing(false);
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openReservationModal = () => setReservationModalVisible(true);
  const closeReservationModal = () => setReservationModalVisible(false);

  const openCatalogModal = () => setIsCatalogModalVisible(true);
  const closeCatalogModal = () => setIsCatalogModalVisible(false);

  const openServiceModal = () => setIsServiceModalVisible(true);
  const closeServiceModal = () => setIsServiceModalVisible(false);

  useEffect(() => {
    setTempClientData(clientData);
  }, [clientData]);

  return (
    <div className="dashboard-container max-w-4xl mx-auto py-8 px-2">
      <header className="dashboard-header flex items-center justify-between mb-8">
        <div className="header-logo-title flex items-center gap-4">
          <img src="/assets/Logo.png" alt="Logo" className="logo w-14 h-14" />
          <h1 className="text-2xl font-bold text-blue-800">Clinica Capa 8</h1>
        </div>
        <Button variant="outline" onClick={() => navigate("/")}>
          Cerrar Sesión
        </Button>
      </header>
      <main className="dashboard-main grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Perfil del Cliente</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form className="space-y-3">
                  <div>
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      value={tempClientData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Correo</Label>
                    <Input
                      id="email"
                      name="email"
                      value={tempClientData.email}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={tempClientData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      name="address"
                      value={tempClientData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      type="button"
                      onClick={handleSave}
                      className="w-full"
                    >
                      Guardar
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleEditToggle}
                      className="w-full"
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <p>
                    <strong>Nombre:</strong> {clientData.name}
                  </p>
                  <p>
                    <strong>Correo:</strong> {clientData.email}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {clientData.phone}
                  </p>
                  <p>
                    <strong>Dirección:</strong> {clientData.address}
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleEditToggle}
                    className="mt-2 w-full"
                  >
                    Editar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          <PetManager />
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Agendar Cita</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={openReservationModal}>
                Agendar
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Historial de Citas</CardTitle>
            </CardHeader>
            <CardContent>
              <ReservationHistory />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Catálogo de Productos</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={openCatalogModal}>
                Ver Catálogo
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Catálogo de Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full" onClick={openServiceModal}>
                Ver Servicios
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      {isReservationModalVisible && (
        <ReservationModal
          isOpen={isReservationModalVisible}
          onClose={closeReservationModal}
        >
          <ReservationForm
            onSuccess={(msg) => {
              setReservationMessage(msg);
              closeReservationModal();
            }}
            onError={(msg) => setReservationMessage(msg)}
            onClose={closeReservationModal}
          />
        </ReservationModal>
      )}

      {reservationMessage && (
        <div className="mt-2">
          <span>{reservationMessage}</span>
        </div>
      )}

      {isModalVisible && (
        <ClientReservations
          isModalVisible={isModalVisible}
          onClose={closeModal}
        />
      )}

      {isCatalogModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeCatalogModal}>
              &times;
            </button>
            <h2>Catálogo de Productos</h2>
            <ProductCatalog />
          </div>
        </div>
      )}

      {isServiceModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeServiceModal}>
              &times;
            </button>
            <h2>Catálogo de Servicios</h2>
            <ServiceCatalog />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
