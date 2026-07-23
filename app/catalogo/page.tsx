"use client";

import { useState } from "react";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { products, categories } from "@/config/products";
import { useCart } from "@/components/catalogo/useCart";
import ProductCard from "@/components/catalogo/ProductCard";
import CategoryFilter from "@/components/catalogo/CategoryFilter";
import CartModal from "@/components/catalogo/CartModal";
import BottomBar from "@/components/catalogo/BottomBar";
import HeroCarousel from "@/components/catalogo/HeroCarousel";
import { CatalogThemeProvider, useCatalogTheme } from "@/components/catalogo/CatalogTheme";
import { brand } from "@/config/links";

function CatalogoContent() {
  const theme = useCatalogTheme();
  const [category, setCategory] = useState("todos");
  const [cartOpen, setCartOpen] = useState(false);

const {
  cart,
  cartCount,
  cartItems,
  cartTotal,
  increment,
  decrement,
  setQty,
  sendWhatsapp,
  wholesaleWhatsappUrl,
} = useCart();

  const bestSeller = products.find((p) => p.bestSeller) || products[0];

  const filtered = products.filter((p) => {
  if (category === "todos") return true;
  if (category === "ofertas") return !!p.sale;
  return p.category === category;
});

  return (
    <main
      className="relative z-10 mx-auto min-h-screen max-w-md pb-28 sm:max-w-2xl lg:max-w-5xl"
      style={{ color: theme.textPrimary, fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-20 flex items-center gap-2.5 border-b px-4 py-3.5 backdrop-blur-md sm:px-8 lg:px-12"
        style={{ backgroundColor: theme.headerBg, borderColor: theme.borderColor }}
      >
        <div className="relative h-9 w-9 flex-none overflow-hidden rounded-full">
          <Image src={brand.logoUrl} alt={brand.name} fill className="object-cover" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-[15px] font-bold">{brand.name}</span>
          <span className="text-[10.5px] font-medium" style={{ color: theme.textSecondary }}>
            Importaciones directas
          </span>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={theme.toggleTheme}
            aria-label="Cambiar tema"
            className="flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.pillBg, color: theme.textSecondary }}
          >
            {theme.isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Ver pedido"
            className="relative flex h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.pillBg, color: theme.textPrimary }}
          >
            <ShoppingCart className="h-4 w-4" />
            {cartCount > 0 && (
              <span
                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                style={{ backgroundColor: theme.accentBlue }}
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 pt-5 pb-4 sm:px-8 lg:px-12">
        <p className="mb-4 text-sm" style={{ color: theme.textSecondary }}>
          Importaciones directas y tecnología al mejor precio.
        </p>
        <HeroCarousel product={bestSeller} />
      </section>

      {/* Filtros */}
      <CategoryFilter selected={category} onSelect={setCategory} />

      {/* Nota de mayoreo */}
      <div className="px-4 pt-3 sm:px-8 lg:px-12">
        
          <a
          href={wholesaleWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium"
          style={{ backgroundColor: theme.pillBg, color: theme.textSecondary }}
        >
          🛒 ¿Compras al por mayor?{" "}
          <span style={{ color: theme.accentBlue, fontWeight: 600 }}>Escríbenos</span>
        </a>
      </div>

      {/* Grid de productos */}
      <section className="grid grid-cols-2 gap-3.5 px-4 pt-4 sm:grid-cols-3 sm:px-8 lg:grid-cols-4 lg:px-12">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            qty={cart[p.id] || 0}
            onIncrement={() => increment(p.id)}
            onDecrement={() => decrement(p.id)}
            onSetQty={(qty) => setQty(p.id, qty)}
          />
        ))}
      </section>

      <BottomBar
        total={cartTotal}
        cartEmpty={cartCount === 0}
        onOpenCart={() => setCartOpen(true)}
        onSendWhatsapp={sendWhatsapp}
      />

      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        total={cartTotal}
        onSendWhatsapp={sendWhatsapp}
      />
    </main>
  );
}

export default function CatalogoPage() {
  return (
    <CatalogThemeProvider>
      <CatalogoContent />
    </CatalogThemeProvider>
  );
}