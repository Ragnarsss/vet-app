import React, { useState } from "react";
import { useCart } from "./hooks/useCart";
import { useAdminProductMutations } from "./product/useAdminProductMutations";
import { useAdminServiceMutations } from "./service/useAdminServiceMutations";

const AdminAddToCartModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const { createProduct } = useAdminProductMutations();
  const { createService } = useAdminServiceMutations();
  const [tab, setTab] = useState<'product' | 'service'>('product');
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [selectedQuantity, setSelectedQuantity] = useState<{[key:string]: number}>({});

  // Simulación: deberías reemplazar esto por una consulta real a la API
  React.useEffect(() => {
    setProducts([
      { id: "1", name: "Producto 1", description: "Desc 1", price: 1000 },
      { id: "2", name: "Producto 2", description: "Desc 2", price: 2000 },
      { id: "3", name: "Producto 3", description: "Descripción del producto 3", price: 3990 },
    ]);
    setServices([
      { id: "1", name: "Servicio 1", description: "Desc S1", price: 500 },
      { id: "2", name: "Servicio 2", description: "Desc S2", price: 1500 },
      { id: "3", name: "Servicio 3", description: "Descripción del servicio 3", price: 3990 },
    ]);
  }, []);

  // Cambia la cantidad pendiente
  const handleQuantityChange = (id: string, value: number) => {
    setSelectedQuantity(q => ({ ...q, [id]: value }));
  };

  // Aplica todos los cambios de cantidad al carrito
  const handleApplyChanges = () => {
    const items = tab === 'product' ? products : services;
    items.forEach(item => {
      const qty = selectedQuantity[item.id];
      if (qty === undefined || qty === null) return;
      if (qty > 0) {
        updateQuantity(item.id, tab, qty);
      } else {
        // Si la cantidad es 0, elimina del carrito
        updateQuantity(item.id, tab, 0);
      }
    });
  };

  const filtered = (tab === 'product' ? products : services).filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="modal-bg">
      <div className="modal-content">
        <h3>Agregar al Carrito</h3>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button className="admin-btn" onClick={() => setTab('product')} style={{ background: tab === 'product' ? '#1976d2' : '#eee', color: tab === 'product' ? '#fff' : '#222' }}>Productos</button>
          <button className="admin-btn" onClick={() => setTab('service')} style={{ background: tab === 'service' ? '#1976d2' : '#eee', color: tab === 'service' ? '#fff' : '#222' }}>Servicios</button>
        </div>
        <input
          type="text"
          placeholder={`Buscar ${tab === 'product' ? 'producto' : 'servicio'} por nombre o descripción`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ marginBottom: 16, padding: 6, borderRadius: 4, border: '1px solid #ccc', width: '100%' }}
        />
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="number"
                    min={0}
                    value={selectedQuantity[item.id] ?? cart.find(i => i.id === item.id && i.type === tab)?.quantity ?? 0}
                    onChange={e => handleQuantityChange(item.id, Number(e.target.value))}
                    style={{width:50,padding:2,borderRadius:4,border:'1px solid #ccc'}}
                  />
                </td>
                <td>
                  {cart.find(i => i.id === item.id && i.type === tab)?.quantity ? `En carrito: ${cart.find(i => i.id === item.id && i.type === tab)?.quantity}` : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', gap: 10, marginTop: 18, justifyContent: 'flex-end' }}>
          <button className="admin-btn" onClick={handleApplyChanges}>Aplicar cambios</button>
          <button className="admin-btn" onClick={onClose}>Cerrar</button>
        </div>
        <style>{`
          .modal-bg {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; z-index: 1000;
          }
          .modal-content {
            background: #fff; border-radius: 10px; padding: 28px 24px; min-width: 320px; box-shadow: 0 2px 16px rgba(0,0,0,0.12);
          }
        `}</style>
      </div>
    </div>
  );
};

export default AdminAddToCartModal;
