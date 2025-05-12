import React from "react";
import { useCart } from "./hooks/useCart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AdminCartView: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();

  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Carrito de Productos y Servicios</CardTitle>
      </CardHeader>
      <CardContent>
        {cart.length === 0 ? (
          <p className="text-muted-foreground">El carrito está vacío.</p>
        ) : (
          <>
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.type + item.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <b>{item.name}</b>{" "}
                      <span className="text-xs text-muted-foreground">
                        ({item.type})
                      </span>
                      <div className="text-xs text-muted-foreground">
                        {item.description}
                      </div>
                      <div className="text-sm">
                        Precio:{" "}
                        <span className="font-semibold">${item.price}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs">Cantidad:</span>
                        <Input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              item.type,
                              Number(e.target.value)
                            )
                          }
                          className="w-16 h-8"
                        />
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => removeFromCart(item.id, item.type)}
                        >
                          <span className="sr-only">Eliminar</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="font-bold text-right mt-4">Total: ${total}</div>
            <div className="flex gap-3 mt-4 justify-end">
              <Button variant="destructive" onClick={clearCart}>
                Vaciar carrito
              </Button>
              <Button
                variant="default"
                onClick={() => alert("Pago realizado con éxito")}
              >
                Pagar
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminCartView;
