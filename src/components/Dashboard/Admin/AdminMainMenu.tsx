import React, { useState } from "react";
import AdminVeterinarianRegister from "./veterinarian/AdminVeterinarianRegister";

const AdminMainMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 24 }}>
      <button
        onClick={() => setOpen(true)}
        style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '10px 22px', fontWeight: 500 }}
      >
        Registrar Veterinario
      </button>
      {open && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 12px #0002', padding: 0, minWidth: 420, position: 'relative' }}>
            <button
              onClick={() => setOpen(false)}
              style={{ position: 'absolute', top: 10, right: 16, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }}
              aria-label="Cerrar"
            >
              ×
            </button>
            <AdminVeterinarianRegister />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMainMenu;
