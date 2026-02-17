import React, { createContext, useContext, useState, ReactNode } from "react";
import type { CartItem } from "@/components/cart/CartModal/CartModal";

interface CartContextType {
  cart: CartItem[];
  addToCart: (
    item: Omit<CartItem, "cantidad">,
    cantidad?: number
  ) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    item: Omit<CartItem, "cantidad">,
    cantidad: number = 1
  ) => {
    const safeCantidad = cantidad > 0 ? cantidad : 1;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];

        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          cantidad:
            updatedCart[existingItemIndex].cantidad + safeCantidad,
        };

        return updatedCart;
      }

      return [...prevCart, { ...item, cantidad: safeCantidad }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const getTotalItems = () =>
    cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};
