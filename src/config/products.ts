/**
 * ============================================================
 *  EGT IMPORT · CATÁLOGO DE PRODUCTOS
 * ============================================================
 *  CÓMO AGREGAR UN PRODUCTO NUEVO:
 *  1. Copia un bloque { ... } de la lista "products".
 *  2. Cambia el "id" (único, ej: "prod-005").
 *  3. Cambia nombre, precio, categoría, fotos.
 *  4. Guarda y sube a GitHub — se publica solo.
 *
 *  OFERTAS:
 *  - Pon "sale" con el precio rebajado. Si no hay oferta: sale: null
 *
 *  PRODUCTO MÁS VENDIDO (aparece en el carrusel principal):
 *  - Marca  bestSeller: true  en un solo producto.
 *
 *  FOTOS:
 *  - Súbelas a /public/productos
 *  - Referéncialas como "/productos/nombre-archivo.jpg"
 *  - Puedes poner varias fotos por producto (array).
 * ============================================================
 */

export type Product = {
  id: string;
  name: string;
  price: number;
  sale: number | null;
  category: string;
  images: string[];
  bestSeller?: boolean;
  available?: boolean;
};

// ---------- CATEGORÍAS ----------
// El filtro del catálogo se arma automáticamente con esta lista.
export const categories = [
  { id: "todos", label: "Todos" },
  { id: "construccion", label: "Construcción" },
  { id: "acrobaticos", label: "Acrobáticos" },
  { id: "ofertas", label: "Ofertas" },
];

// ---------- PRODUCTOS ----------
// Datos de ejemplo de tu primera importación — edítalos cuando
// confirmes precios/fotos reales con tus socios.
export const products: Product[] = [
  {
    id: "excavadora",
    name: "Excavadora a Control Remoto",
    price: 149,
    sale: null,
    category: "construccion",
    images: ["/productos/excavadora-rc.jpg"], // 👈 EDITA: tu foto real
    available: true,
  },
  {
    id: "tractor",
    name: "Tractor Cargador a Control Remoto",
    price: 159,
    sale: null,
    category: "construccion",
    images: ["/productos/tractor-rc.png"], // 👈 EDITA: tu foto real
    available: true,
  },
  {
    id: "volquete",
    name: "Volquete a Control Remoto",
    price: 169,
    sale: null,
    category: "construccion",
    images: ["/productos/volquete-rc.png"], // 👈 EDITA: tu foto real
    available: true,
  },
  {
    id: "acrobatico",
    name: "Carro Acrobático a Control Remoto",
    price: 99,
    sale: 79,
    category: "acrobaticos",
    images: [
      "/productos/carro-acrobatico-rc-1.jpg",
    ], // 👈 EDITA: tus fotos reales
    bestSeller: true,
    available: true,
  },
];

// ---------- NÚMERO DE WHATSAPP PARA PEDIDOS ----------
export const catalogWhatsappNumber = "51983151255"; // 👈 tu número real