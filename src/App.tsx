import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./components/Dashboard/Admin/AdminDashboard";
import ClientDashboard from "./components/Dashboard/Cliente/ClientDashboard";
import ReservationForm from "./components/Dashboard/Cliente/Reservations/ReservationForm";
import VeterinarioDashboard from "./components/Dashboard/VeterinarioDashboard/VeterinarioDashboard";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/reservation" element={<ReservationForm />} />
        <Route path="/veterinario" element={<VeterinarioDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
