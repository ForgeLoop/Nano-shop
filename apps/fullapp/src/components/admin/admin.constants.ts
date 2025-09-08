import type { Field } from "./ItemModal";

export type Category = { key: string; nombre: string; imagen: string };
export type Product = { key: string; nombre: string; categoria: string; precio: number; imagen: string };
export type ContactoItem = { key: string; label: string; value: string };
export type NosotrosItem = { key: string; label: string; value: string };

// No uses "as const" en los arrays principales, así son mutables
export const initialCategories: Category[] = [
  { key: "1", nombre: "Celulares", imagen: "" },
  { key: "2", nombre: "Auriculares", imagen: "" },
  { key: "3", nombre: "Accesorios", imagen: "" },
];

export const initialProducts: Product[] = [
  { key: "1", nombre: "iPhone 14 Pro", categoria: "Celulares", precio: 1200, imagen: "" },
  { key: "2", nombre: "AirPods Pro", categoria: "Auriculares", precio: 250, imagen: "" },
];

// Tipa los fields como Field[]
export const categoryFields: Field[] = [
  {
    type: "input",
    name: "nombre",
    label: "Nombre",
    rules: [{ required: true, message: "Ingrese el nombre" }],
  },
  { type: "input", name: "imagen", label: "Imagen" } 
];

export const productFields: Field[] = [
  {
    type: "input",
    name: "nombre",
    label: "Nombre",
    rules: [{ required: true, message: "Ingrese el nombre" }]
  },
  {
    type: "select",
    name: "categoria",
    label: "Categoría",
    placeholder: "Seleccione una categoría",
    rules: [{ required: true, message: "Seleccione la categoría" }]
  },
  {
    type: "input",
    name: "precio",
    label: "Precio",
    inputType: "number",
    rules: [{ required: true, message: "Ingrese el precio" }]
  },
  { type: "input", name: "imagen", label: "Imagen" }

];

export const contactoFields: Field[] = [
  {
    type: "input",
    name: "direccion",
    label: "Dirección",
    rules: [{ required: true, message: "Ingrese la dirección" }]
  },
  {
    type: "input",
    name: "ciudad",
    label: "Ciudad",
    rules: [{ required: true, message: "Ingrese la ciudad" }]
  },
  {
    type: "input",
    name: "horario",
    label: "Horario",
    rules: [{ required: true, message: "Ingrese el horario" }]
  },
  {
    type: "input",
    name: "email",
    label: "Email",
    rules: [{ required: true, message: "Ingrese el email" }]
  },
  {
    type: "input",
    name: "mapa",
    label: "URL Google Maps",
    rules: [{ required: true, message: "Ingrese la URL del mapa" }]
  }
];

export const initialContacto: ContactoItem[] = [
  { key: "direccion", label: "Dirección", value: "Roque Saenz Peña 157" },
  { key: "ciudad", label: "Ciudad", value: "Villa Carlos Paz, Córdoba, Argentina" },
  { key: "horario", label: "Horario", value: "Lunes a Sabado de: 9:00 - 13:00 y de 16:30 - 20:30" },
  { key: "email", label: "Email", value: "nanoshop.it@gmail.com" },
  { key: "mapa", label: "Mapa", value: "https://www.google.com/maps/embed?pb=..." }
];

export const initialNosotros: NosotrosItem[] = [
  { key: "parrafo1", label: "Párrafo 1", value: "Somos un equipo completamente distribuido de 3 personas apasionadas por la tecnología, trabajando desde Argentina. Nos dedicamos a construir los mejores productos para ayudar a nuestros clientes a hacer crecer sus negocios con tecnología de vanguardia." },
  { key: "parrafo2", label: "Párrafo 2", value: "Desde nuestros inicios, siempre hemos tenido el objetivo de hacer las cosas de manera diferente en TechStore. Nos enfocamos en crear una de las experiencias de compra más únicas y satisfactorias, repensando muchas de las prácticas tradicionales del retail." }
];

export const nosotrosFields: Field[] = [
  {
    type: "input",
    name: "parrafo1",
    label: "Párrafo 1",
    rules: [{ required: true, message: "Ingrese el primer párrafo" }]
  },
  {
    type: "input",
    name: "parrafo2",
    label: "Párrafo 2",
    rules: [{ required: false }]
  }
];