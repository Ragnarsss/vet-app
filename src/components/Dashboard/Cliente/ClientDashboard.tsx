import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ClientDashboard.css";
import AppointmentForm from "./AppointmentForm";
import ClientReservations from "./ClientReservations";

const getClienteFromLocalStorage = () => {
  return {
    name: localStorage.getItem("cliente_nombre") || "",
    email: localStorage.getItem("cliente_email") || "",
    phone: "",
    address: "",
    id: localStorage.getItem("cliente_id") || "",
  };
};

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState(getClienteFromLocalStorage());
  const [tempClientData, setTempClientData] = useState(clientData);
  const [isEditing, setIsEditing] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    fecha: "",
    hora: "",
    mascota_nombre: "",
    observaciones: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] =
    useState(false);

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/");
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setTempClientData(clientData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTempClientData({ ...tempClientData, [name]: value });
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSave = () => {
    setClientData(tempClientData);
    setIsEditing(false);
    console.log("Datos guardados:", tempClientData);
  };

  const handleScheduleAppointment = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !appointmentData.fecha ||
      !appointmentData.hora ||
      !appointmentData.mascota_nombre
    ) {
      setErrorMessage("Por favor, completa todos los campos obligatorios.");
      return;
    }

    console.log("Agendando cita con los datos:", appointmentData);

    setSuccessMessage("¡Cita agendada con éxito!");
    setErrorMessage("");
    setAppointmentData({
      fecha: "",
      hora: "",
      mascota_nombre: "",
      observaciones: "",
    });
    setIsAppointmentModalVisible(false);
  };

  const openModal = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openAppointmentModal = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsAppointmentModalVisible(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalVisible(false);
  };

  useEffect(() => {
    setClientData(getClienteFromLocalStorage());
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-logo-title">
          <img src="/assets/Logo.png" alt="Logo" className="logo" />
          <h1>Clinica Capa 8</h1>
        </div>
        <button className="logout-button" onClick={() => navigate("/")}>
          Cerrar Sesión
        </button>
      </header>
      <main className="dashboard-main">
        <div className="dashboard-card">
          <h2>Perfil del Cliente</h2>
          {isEditing ? (
            <div>
              <label>
                Nombre:
                <input
                  type="text"
                  name="name"
                  value={tempClientData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Correo:
                <p className="readonly-field">{tempClientData.email}</p>
              </label>
              <label>
                Teléfono:
                <input
                  type="text"
                  name="phone"
                  value={tempClientData.phone}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Dirección:
                <input
                  type="text"
                  name="address"
                  value={tempClientData.address}
                  onChange={handleInputChange}
                />
              </label>
              <button className="dashboard-button" onClick={handleSave}>
                Guardar
              </button>
              <button className="dashboard-button" onClick={handleEditToggle}>
                Cancelar
              </button>
            </div>
          ) : (
            <div>
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
              <button className="dashboard-button" onClick={handleEditToggle}>
                Editar
              </button>
            </div>
          )}
        </div>
        <div className="dashboard-card">
          <h2>Agendar Cita</h2>
          <button className="dashboard-button" onClick={openAppointmentModal}>
            Agendar
          </button>
        </div>
        <div className="dashboard-card">
          <h2>Historial de Citas</h2>
          <button className="dashboard-button" onClick={openModal}>
            Ver Historial
          </button>
        </div>
      </main>

      {isAppointmentModalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close-button"
              onClick={closeAppointmentModal}
            >
              &times;
            </button>
            <h2>Agendar Cita</h2>
            {errorMessage && <p className="error">{errorMessage}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
            <AppointmentForm
              onSuccess={(msg) => {
                setSuccessMessage(msg);
                setErrorMessage("");
              }}
              onError={(msg) => {
                setErrorMessage(msg);
                setSuccessMessage("");
              }}
              onClose={closeAppointmentModal}
            />
          </div>
        </div>
      )}

      <ClientReservations
        isModalVisible={isModalVisible}
        onClose={closeModal}
      />
    </div>
  );
};

export default ClientDashboard;
