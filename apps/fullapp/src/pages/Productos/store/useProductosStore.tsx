import { create } from "zustand";

interface Filtros {
  categoria?: string;
  marca?: string;
  min?: number;
  max?: number;
  sort?: string;
}

interface State {
  filtros: Filtros;
  setFiltro: (k: keyof Filtros, v?: any) => void;
  clearFiltro: (k: keyof Filtros) => void;
  setFromURL: (params: URLSearchParams) => void;
}

export const useProductosStore = create<State>((set) => ({
  filtros: {},

  setFiltro: (k, v) =>
    set((s) => ({
      filtros: { ...s.filtros, [k]: v },
    })),

  clearFiltro: (k) =>
    set((s) => {
      const f = { ...s.filtros };
      delete f[k];
      return { filtros: f };
    }),

  setFromURL: (params) =>
    set({
      filtros: {
        categoria: params.get("categoria") || undefined,
        marca: params.get("marca") || undefined,
        min: params.get("min") ? Number(params.get("min")) : undefined,
        max: params.get("max") ? Number(params.get("max")) : undefined,
        sort: params.get("sort") || undefined,
      },
    }),
}));
