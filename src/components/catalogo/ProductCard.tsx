"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, Coins } from "lucide-react";
import type { Product } from "@/config/products";
import { useCatalogTheme } from "./CatalogTheme";

type ProductCardProps = {
  product: Product;
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onSetQty: (qty: number) => void;
};

export default function ProductCard({
  product,
  qty,
  onIncrement,
  onDecrement,
  onSetQty,
}: ProductCardProps) {
  const theme = useCatalogTheme();
  const [showTiers, setShowTiers] = useState(false);

  const displayPrice = product.sale ?? product.price;
  const soldOut = product.stock <= 0;
  const atStockLimit = qty >= product.stock;

  const bestTierPrice =
    product.wholesale && product.wholesale.length > 0
      ? Math.min(...product.wholesale.map((t) => t.price))
      : null;

  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: product.sale ? `${theme.accentAmber}55` : theme.borderColor,
        opacity: soldOut ? 0.6 : 1,
      }}
    >
      <div className="relative aspect-square w-full" style={{ backgroundColor: theme.imgBg }}>
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />

        {product.sale && !soldOut && (
          <span
            className="absolute left-2 top-2 rounded-full px-2 py-1 text-[9.5px] font-bold text-white"
            style={{ backgroundColor: theme.accentAmber }}
          >
            Oferta
          </span>
        )}

        {soldOut && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          >
            <span
              className="rounded-md px-3 py-1.5 text-[11px] font-bold tracking-wide text-white"
              style={{
                backgroundColor: "rgba(0,0,0,0.75)",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              AGOTADO
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h3
          className="min-h-[35px] text-[13px] font-semibold leading-tight"
          style={{ color: theme.textPrimary }}
        >
          {product.name}
        </h3>

        {/* Precio de oferta a la izquierda, tachado a la derecha */}
        <div className="flex items-baseline gap-1.5">
          <span
            className="text-base font-bold"
            style={{ color: product.sale ? theme.accentAmber : theme.textPrimary }}
          >
            S/ {displayPrice}
          </span>
          {product.sale && (
            <span className="text-[11.5px] line-through" style={{ color: theme.textSecondary }}>
              S/ {product.price}
            </span>
          )}
        </div>

        {/* Acordeón de precios al por mayor */}
        {bestTierPrice !== null && !soldOut && (
          <div
            className="overflow-hidden rounded-lg border"
            style={{ borderColor: theme.borderColor, backgroundColor: theme.pillBg }}
          >
            <button
              onClick={() => setShowTiers((v) => !v)}
              className="flex w-full items-center gap-1.5 px-2.5 py-2 text-left"
            >
              <Coins className="h-3.5 w-3.5 flex-none" style={{ color: theme.accentBlue }} />
              <span
                className="flex-1 whitespace-nowrap text-[10.5px] font-semibold"
                style={{ color: theme.accentBlue }}
              >
                Desde S/{bestTierPrice} x mayor
              </span>
              {showTiers ? (
                <ChevronUp className="h-3.5 w-3.5 flex-none" style={{ color: theme.textSecondary }} />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 flex-none" style={{ color: theme.textSecondary }} />
              )}
            </button>

            {showTiers && (
              <div style={{ borderTop: `1px solid ${theme.borderColor}` }}>
                {product.wholesale!.map((tier, i) => (
                  <button
                    key={tier.minQty}
                    onClick={() => onSetQty(tier.minQty)}
                    className="flex w-full items-center justify-between px-2.5 py-1.5 text-[11px] transition-colors"
                    style={{
                      borderTop: i === 0 ? "none" : `1px solid ${theme.borderColor}`,
                    }}
                  >
                    <span style={{ color: theme.textSecondary }}>{tier.minQty}+ unidades</span>
                    <span className="font-bold" style={{ color: theme.accentAmber }}>
                      S/ {tier.price} c/u
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {soldOut ? (
          <div
            className="mt-auto flex items-center justify-center rounded-lg p-2"
            style={{ backgroundColor: theme.pillBg }}
          >
            <span className="text-[11px] font-semibold" style={{ color: theme.textSecondary }}>
              Sin stock por ahora
            </span>
          </div>
        ) : (
          <div
            className="relative mt-auto flex items-center justify-between rounded-lg p-1.5"
            style={{ backgroundColor: theme.pillBg }}
          >
            <button
              onClick={onDecrement}
              disabled={qty === 0}
              className="flex h-[25px] w-[25px] items-center justify-center rounded-lg text-[15px] font-bold disabled:opacity-30"
              style={{ backgroundColor: theme.cardBg, color: theme.textPrimary }}
            >
              −
            </button>
            <span className="text-[13px] font-bold" style={{ color: theme.textPrimary }}>
              {qty}
            </span>
            <button
              onClick={onIncrement}
              disabled={atStockLimit}
              className="flex h-[25px] w-[25px] items-center justify-center rounded-lg text-sm font-bold text-white disabled:opacity-30"
              style={{ backgroundColor: theme.accentBlue }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </article>
  );
}