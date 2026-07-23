/**
 * ============================================================
 *  EGT IMPORT · CATÁLOGO DE PRODUCTOS
 * ============================================================
 *  CÓMO EDITAR UN PRODUCTO:
 *  - price: precio de etiqueta (se muestra tachado)
 *  - sale: precio de oferta real (el que se cobra). Si no hay
 *    oferta, pon sale: null y se cobra el "price" normal.
 *  - stock: unidades disponibles. Si llega a 0, el producto se
 *    muestra automáticamente como "AGOTADO" (sin ocultarse).
 *  - wholesale: tramos de precio por mayor (opcional). Cada tramo
 *    tiene una cantidad mínima y el precio unitario desde esa
 *    cantidad. El carrito aplica el tramo correcto automáticamente.
 * ============================================================
 */

export type WholesaleTier = { minQty: number; price: number };

export type Product = {
  id: string;
  name: string;
  price: number;
  sale: number | null;
  category: string;
  images: string[];
  bestSeller?: boolean;
  stock: number;
  wholesale?: WholesaleTier[];
};

// ---------- CATEGORÍAS ----------
export const categories = [
  { id: "todos", label: "Todos" },
  { id: "construccion", label: "Construcción" },
  { id: "acrobaticos", label: "Acrobáticos" },
  { id: "ofertas", label: "Ofertas" },
];

// ---------- PRODUCTOS ----------
export const products: Product[] = [
  {
    id: "excavadora",
    name: "Excavadora a Control Remoto",
    price: 180,
    sale: 130,
    category: "construccion",
    images: ["/productos/excavadora-rc.jpg"],
    stock: 100,
    wholesale: [
      { minQty: 6, price: 100 },
      { minQty: 12, price: 95 },
      { minQty: 25, price: 90 },
    ],
  },
  {
    id: "tractor",
    name: "Tractor Cargador a Control Remoto",
    price: 159,
    sale: null,
    category: "construccion",
    images: ["/productos/tractor-rc.png"],
    stock: 0, // 👈 agotado
  },
  {
    id: "volquete",
    name: "Volquete a Control Remoto",
    price: 169,
    sale: null,
    category: "construccion",
    images: ["/productos/volquete-rc.png"],
    stock: 0, // 👈 agotado
  },
  {
    id: "acrobatico",
    name: "Carro Acrobático a Control Remoto",
    price: 150,
    sale: 90,
    category: "acrobaticos",
    images: ["/productos/carro-acrobatico-rc-1.jpg"],
    bestSeller: true,
    stock: 100,
    wholesale: [
      { minQty: 12, price: 85 },
      { minQty: 25, price: 80 },
    ],
  },
];

// ---------- NÚMERO DE WHATSAPP PARA PEDIDOS ----------
export const catalogWhatsappNumber = "51983151255";