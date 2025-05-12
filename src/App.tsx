import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminDashboard from "./components/Dashboard/Admin/AdminDashboard";
import ClientDashboard from "./components/Dashboard/Cliente/ClientDashboard";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/Register/RegisterForm";
import VeterinarianDashboard from "./components/VeterinarianDashboard/VeterinarianDashboard";
import { VeterinarianAuthProvider } from "./context/VeterinarianAuthProvider";

function App() {
  return (
    <VeterinarianAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/veterinarian" element={<VeterinarianDashboard />} />
        </Routes>
      </Router>
    </VeterinarianAuthProvider>
  );
}

export default App;
