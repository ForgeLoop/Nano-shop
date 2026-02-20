import { create } from "zustand";

export interface CartItem {
  id: string;
  nombre: string;
  cantidad: number;
  precio: number;
  imagen: string;
  descuento: number;
}

interface CartState {
  cart: CartItem[];

  addToCart: (
    item: Omit<CartItem, "cantidad">,
    cantidad?: number
  ) => void;

  removeFromCart: (id: string) => void;

  updateQuantity: (id: string, cantidad: number) => void;

  clearCart: () => void;

  getTotalItems: () => number;
}

const STORAGE_KEY = "nanoShopCart";

export const useCartStore = create<CartState>((set, get) => ({
  cart: JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"),

  addToCart: (item, cantidad = 1) => {
    const safeCantidad = cantidad > 0 ? cantidad : 1;

    set((state) => {
      const existing = state.cart.find(
        (i) => i.id === item.id
      );

      let updatedCart;

      if (existing) {
        updatedCart = state.cart.map((i) =>
          i.id === item.id
            ? { ...i, cantidad: i.cantidad + safeCantidad }
            : i
        );
      } else {
        updatedCart = [
          ...state.cart,
          { ...item, cantidad: safeCantidad },
        ];
      }

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCart)
      );

      return { cart: updatedCart };
    });
  },

  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter(
        (item) => item.id !== id
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCart)
      );

      return { cart: updatedCart };
    }),

  updateQuantity: (id, cantidad) =>
    set((state) => {
      if (cantidad < 1) return state;

      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      );

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedCart)
      );

      return { cart: updatedCart };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem(STORAGE_KEY);
      return { cart: [] };
    }),

  getTotalItems: () =>
    get().cart.reduce(
      (acc, item) => acc + item.cantidad,
      0
    ),
}));