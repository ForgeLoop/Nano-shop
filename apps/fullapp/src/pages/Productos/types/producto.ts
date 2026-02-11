export interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  subcategoria?: string;
  precio: number;
  imagen: string;
}
