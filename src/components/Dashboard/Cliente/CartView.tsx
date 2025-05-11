import React from "react";
import { useCart } from "../hooks/useCart";

const CartView: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", background: "#fff", borderRadius: 10, boxShadow: "0 2px 12px #0001", padding: 24 }}>
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li key={item.type + item.id} style={{ borderBottom: "1px solid #eee", marginBottom: 10, paddingBottom: 10 }}>
                <b>{item.name}</b> <span style={{ color: "#888" }}>({item.type})</span>
                <div>{item.description}</div>
                <div>Precio: ${item.price}</div>
                <div>
                  Cantidad:
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e => updateQuantity(item.id, item.type, Number(e.target.value))}
                    style={{ width: 50, marginLeft: 8 }}
                  />
                  <button onClick={() => removeFromCart(item.id, item.type)} style={{ marginLeft: 12, color: "#d32f2f", background: "none", border: "none", cursor: "pointer" }}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ fontWeight: 600, marginTop: 16 }}>Total: ${total}</div>
          <button onClick={clearCart} style={{ marginTop: 16, background: "#d32f2f", color: "#fff", border: "none", borderRadius: 6, padding: "8px 18px", fontWeight: 500 }}>Vaciar carrito</button>
        </>
      )}
    </div>
  );
};

export default CartView;
