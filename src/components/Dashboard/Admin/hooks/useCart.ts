import { useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  type: "product" | "service";
  quantity: number;
}

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id && i.type === item.type);
      if (found) {
        return prev.map((i) =>
          i.id === item.id && i.type === item.type
            ? { ...i, quantity: (i.quantity || 0) + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, type: "product" | "service") => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.type === type)));
  };

  const updateQuantity = (id: string, type: "product" | "service", quantity: number) => {
    setCart((prev) =>
      prev.map((i) =>
        i.id === id && i.type === type ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCart([]);

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { cart, addToCart, removeFromCart, updateQuantity, clearCart, total };
}
