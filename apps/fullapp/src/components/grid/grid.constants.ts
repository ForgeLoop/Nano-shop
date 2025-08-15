export interface ProductCategory {
  id: number
  name: string
  image: string
  description?: string
}

export const productCategories: ProductCategory[] = [
  {
    id: 1,
    name: "iPhone",
    image: "/grid/iphone.jpeg",
    description: "Nuevos y usados, con garantía y variedad de modelos.",
  },
  {
    id: 2,
    name: "iPad",
    image: "/grid/ipad.jpeg",
    description: "Tabletas de alto rendimiento",
  },
  {
    id: 3,
    name: "Apple Watch",
    image: "/grid/applewatch.jpeg",
    description: "Relojes inteligentes de última generación",
  },
  {
    id: 4,
    name: "AirPods",
    image: "/grid/airpods.jpeg",
    description: "Auriculares inalámbricos de alta calidad",
  },
  {
    id: 5,
    name: "MacBook",
    image: "/grid/macbook.jpeg",
    description: "Computadoras portátiles de Apple",
  },
  {
    id: 6,
    name: "Accesorios",
    image: "/grid/accesorios.jpeg",
    description: "Todos los accesorios para tus dipositivos.",
  },
  {
    id: 7,
    name: "JBL",
    image: "/grid/jbl.jpeg",
    description: "Altavoces y auriculares JBL",
  },
  {
    id: 8,
    name: "PS5",
    image: "/grid/ps5.jpeg",
    description: "Consola de videojuegos PlayStation 5",
  },
  {
    id: 9,
    name: "Xiaomi",
    image: "/grid/xiaomi.jpeg",
    description: "Productos electrónicos de Xiaomi",
  },
  {
    id: 10,
    name: "Samsung",
    image: "/grid/samsung.jpeg",
    description: "Dispositivos y accesorios Samsung",
  },
  {
    id: 11,
    name: "Perfumes",
    image: "/grid/perfumes.jpeg",
    description: "Fragancias de las mejores marcas",
  },
  {
    id: 12,
    name: "Stanley",
    image: "/grid/stanley.jpeg",
    description: "Termos y botellas Stanley",
  },
]