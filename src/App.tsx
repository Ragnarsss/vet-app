import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard  from "./components/Dashboard/Admin/AdminDashboard";
import ClientDashboard from "./components/Dashboard/Cliente/ClientDashboard";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import VeterinarianDashboard from "./components/Dashboard/Veterinarian/VeterinarianDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/client" element={<ClientDashboard />} />
        <Route path="/veterinario" element={<VeterinarianDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
