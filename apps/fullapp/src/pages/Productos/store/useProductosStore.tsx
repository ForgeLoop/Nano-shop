import { create } from "zustand";

interface Filtros {
  categorias: string[];
  colores: string[];
  precio: [number, number];
  soloStock: boolean;
  ordenPrecio?: "asc" | "desc";
}

interface State {
  filtros: Filtros;
  page: number;
  pageSize: number;

  toggleCategoria: (c: string) => void;
  toggleColor: (c: string) => void;
  setPrecio: (r: [number, number]) => void;
  setStock: (v: boolean) => void;
  setOrden: (o?: "asc" | "desc") => void;
  setPage: (p: number) => void;
  clearFiltro: (k: keyof Filtros) => void;
}

export const useProductosStore = create<State>((set) => ({
  filtros: {
    categorias: [],
    colores: [],
    precio: [0, 999999],
    soloStock: false,
    ordenPrecio: undefined
  },

  page: 1,
  pageSize: 8,

  toggleCategoria: (c) =>
    set((s) => ({
      filtros: {
        ...s.filtros,
        categorias: s.filtros.categorias.includes(c)
          ? s.filtros.categorias.filter((x) => x !== c)
          : [...s.filtros.categorias, c]
      },
      page: 1
    })),

  toggleColor: (c) =>
    set((s) => ({
      filtros: {
        ...s.filtros,
        colores: s.filtros.colores.includes(c)
          ? s.filtros.colores.filter((x) => x !== c)
          : [...s.filtros.colores, c]
      },
      page: 1
    })),

  setPrecio: (r) =>
    set((s) => ({
      filtros: { ...s.filtros, precio: r },
      page: 1
    })),

  setStock: (v) =>
    set((s) => ({
      filtros: { ...s.filtros, soloStock: v },
      page: 1
    })),

  setOrden: (o) =>
    set((s) => ({
      filtros: { ...s.filtros, ordenPrecio: o },
      page: 1
    })),

  clearFiltro: (k) =>
    set((s) => ({
      filtros: {
        ...s.filtros,
        [k]:
          k === "precio"
            ? [0, 999999]
            : k === "soloStock"
            ? false
            : k === "ordenPrecio"
            ? undefined
            : []
      },
      page: 1
    })),

  setPage: (p) => set({ page: p })
}));
