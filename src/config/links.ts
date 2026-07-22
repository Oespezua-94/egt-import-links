/**
 * ============================================================
 *  EGT IMPORT · CONFIGURACIÓN CENTRAL DE ENLACES
 * ============================================================
 *  Este es el ÚNICO archivo que necesitas tocar para
 *  administrar tu página. No hace falta saber React.
 *
 *  CÓMO USARLO:
 *  - Para EDITAR un enlace: cambia su "url", "title" o "subtitle".
 *  - Para OCULTAR un enlace: pon  active: false
 *  - Para DESTACAR un enlace: pon highlighted: true
 *  - Para AGREGAR uno nuevo: copia un bloque { ... } completo,
 *    pégalo dentro de la lista y cámbiale el "id" (debe ser único).
 *  - Para REORDENAR: simplemente mueve los bloques de arriba/abajo.
 *
 *  ICONOS DISPONIBLES: cualquier nombre de https://lucide.dev/icons
 *  (escríbelo en minúsculas-con-guiones, ej: "map-pin", "globe").
 * ============================================================
 */

// ---------- 1. DATOS DE MARCA ----------
export const brand = {
  name: "EGT Import",
  slogan: "Importaciones directas y tecnología al mejor precio",
  // Logo: coloca tu imagen en la carpeta /public y referénciala aquí.
  // Ej: si guardas /public/logo.png  →  logoUrl: "/logo.png"
  logoUrl: "/logo.jpg", // 👈 PENDIENTE: sube tu logo a /public
  verified: true, // muestra el ✓ azul de verificación junto al nombre

  // SEO / OpenGraph (previsualización al compartir en WhatsApp)
  seo: {
    title: "EGT Import · Todos nuestros canales",
    description:
      "Contáctanos por WhatsApp, síguenos en redes y explora nuestro catálogo.",
    ogImage: "/og-image.png", // 👈 PENDIENTE
    url: "https://egtimport.com", // 👈 PENDIENTE: tu dominio final
  },
};

// ---------- 2. CTA PRINCIPAL (Botón grande de WhatsApp) ----------
export const primaryCTA = {
  title: "Escríbenos por WhatsApp",
  subtitle: "Atención de ventas inmediata",
  url: "https://wa.me/51983151255?text=Hola%20EGT%20Import,%20quiero%20informaci%C3%B3n",
};

// ---------- 3. TIPO DE UN ENLACE ----------
export type LinkItem = {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  icon: string; // nombre de icono lucide (ver https://lucide.dev/icons)
  highlighted?: boolean; // true = borde/acento resaltado
  active?: boolean; // false = no se muestra
};

// ---------- 4. LISTA DE ENLACES ----------
export const links: LinkItem[] = [
  {
    id: "instagram",
    title: "Instagram",
    subtitle: "Novedades y catálogo visual",
    url: "https://www.instagram.com/egtimports?igsh=b3h3dDNiYTl5ZWxs&utm_source=qr",
    icon: "instagram",
    highlighted: false,
    active: true,
  },
  {
    id: "tiktok",
    title: "TikTok",
    subtitle: "Videos de productos y ofertas",
    url: "https://www.tiktok.com/@egtimports?_r=1&_t=ZS-98E9r3yYZEK",
    icon: "music-2", // lucide no tiene logo TikTok; music-2 es buen sustituto
    highlighted: false,
    active: true,
  },
  {
    id: "website",
    title: "Catálogo Virtual",
    subtitle: "Explora todos nuestros productos",
    url: "/catalogo", // 👈 PENDIENTE: pásame tu web cuando la tengas
    icon: "globe",
    highlighted: true,
    active: true, // 👈 oculto hasta que me pases la URL real
  },
  {
    id: "location",
    title: "Ubicación / Almacén",
    subtitle: "Visítanos · Ver en Google Maps",
    url: "https://maps.google.com/?q=tu+direccion", // 👈 PENDIENTE
    icon: "map-pin",
    highlighted: false,
    active: false, // 👈 oculto hasta que me pases la ubicación
  },
];