import React, { useState } from "react";
import AdminServiceManager from "./service/AdminServiceManager";
import AdminProductManager from "./product/AdminProductManager";
import AdminPetManager from "./pet/AdminPetManager";
import AdminReservationsPanel from "./AdminReservationsPanel";
import AdminReservationManager from "./AdminReservationManager";
import AdminCartView from "./AdminCartView";
import AdminAddToCartModal from "./AdminAddToCartModal";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [activeModal, setActiveModal] = useState<null | 'services' | 'products' | 'pets' | 'reservations' | 'reservationManager' | 'addToCart'>(null);

  return (
    <div className="admin-dashboard-bg">
      <div className="admin-dashboard-main">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 32px 0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <button className="admin-btn" onClick={() => setShowCart((prev) => !prev)}>
              🛒 Carrito
            </button>
          </div>
          <button className="admin-btn" style={{ background: '#d32f2f' }} onClick={() => window.location.href = '/'}>
            Cerrar Sesión
          </button>
        </header>
        <div className="admin-dashboard-content">
          <h1>Panel de Administración</h1>
          <p style={{color: '#888', marginBottom: 24}}>Selecciona una opción para gestionar servicios o productos.</p>
          <div className="admin-dashboard-actions">
            <button className="admin-btn" onClick={() => setActiveModal('services')}>
              Gestión de Servicios
            </button>
            <button className="admin-btn" onClick={() => setActiveModal('products')}>
              Gestión de Productos
            </button>
            <button className="admin-btn" onClick={() => setActiveModal('pets')}>
              Gestión de Mascotas
            </button>
            <button className="admin-btn" onClick={() => setActiveModal('reservations')}>
              Reservas
            </button>
            <button className="admin-btn" onClick={() => setActiveModal('reservationManager')}>
              Gestión de Reservas (CRUD)
            </button>
            <button className="admin-btn" onClick={() => setActiveModal('addToCart')}>
              Agregar productos o servicios al carrito
            </button>
          </div>
          {showCart && (
            <div className="admin-panel-section" style={{ maxWidth: 520, margin: '24px auto 0 auto' }}>
              <AdminCartView />
            </div>
          )}
          {activeModal === 'services' && (
            <div className="modal-bg"><div className="modal-content"><button className="admin-btn" style={{float:'right'}} onClick={()=>setActiveModal(null)}>&times;</button><AdminServiceManager /></div></div>
          )}
          {activeModal === 'products' && (
            <div className="modal-bg"><div className="modal-content"><button className="admin-btn" style={{float:'right'}} onClick={()=>setActiveModal(null)}>&times;</button><AdminProductManager /></div></div>
          )}
          {activeModal === 'pets' && (
            <div className="modal-bg"><div className="modal-content"><button className="admin-btn" style={{float:'right'}} onClick={()=>setActiveModal(null)}>&times;</button><AdminPetManager /></div></div>
          )}
          {activeModal === 'reservations' && (
            <div className="modal-bg"><div className="modal-content"><button className="admin-btn" style={{float:'right'}} onClick={()=>setActiveModal(null)}>&times;</button><AdminReservationsPanel /></div></div>
          )}
          {activeModal === 'reservationManager' && (
            <div className="modal-bg"><div className="modal-content"><button className="admin-btn" style={{float:'right'}} onClick={()=>setActiveModal(null)}>&times;</button><AdminReservationManager /></div></div>
          )}
          {activeModal === 'addToCart' && (
            <AdminAddToCartModal onClose={() => setActiveModal(null)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
