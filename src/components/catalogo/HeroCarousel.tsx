"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/config/products";
import { useCatalogTheme } from "./CatalogTheme";

type Slide = { type: "image" } | { type: "placeholder"; label: string };

const SLIDES: Slide[] = [
  { type: "image" },
  { type: "placeholder", label: "VIDEO DEMO DEL PRODUCTO" },
  { type: "placeholder", label: "FOTOS EN OTROS ÁNGULOS" },
  { type: "placeholder", label: "FICHA TÉCNICA / ESPECIFICACIONES" },
];

export default function HeroCarousel({ product }: { product: Product }) {
  const theme = useCatalogTheme();
  const [slide, setSlide] = useState(0);
  const current = SLIDES[slide];
  const displayPrice = product.sale ?? product.price;

  const prev = () => setSlide((s) => (s - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setSlide((s) => (s + 1) % SLIDES.length);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-[20px] sm:aspect-[21/9]"
      style={{ backgroundColor: theme.imgBg }}
    >
      {current.type === "image" ? (
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" priority />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center p-4 text-center"
          style={{
            background: `repeating-linear-gradient(135deg, ${theme.imgBg}, ${theme.imgBg} 10px, ${theme.cardBg} 10px, ${theme.cardBg} 20px)`,
          }}
        >
          <span className="font-mono text-[11px] tracking-wide" style={{ color: theme.textSecondary }}>
            {current.label}
          </span>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)" }}
      />

      <button
        onClick={prev}
        aria-label="Anterior"
        className="absolute left-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={next}
        aria-label="Siguiente"
        className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white"
        style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>

      <div className="absolute left-3.5 right-3.5 bottom-3">
        <span
          className="mb-1.5 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold"
          style={{ backgroundColor: "rgba(255,255,255,0.92)", color: "#1d1d1f" }}
        >
          Más vendido
        </span>
        <div className="text-[17px] font-bold text-white">{product.name}</div>
        <div className="mt-0.5 text-sm font-semibold text-white/85">S/ {displayPrice}</div>
      </div>

      <div className="absolute left-1/2 top-3 flex -translate-x-1/2 gap-1.5">
        {SLIDES.map((_, i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full transition-colors"
            style={{ backgroundColor: i === slide ? "#ffffff" : "rgba(255,255,255,0.35)" }}
          />
        ))}
      </div>
    </div>
  );
}