"use client";

import Image from "next/image";
import type { Product } from "@/config/products";
import { useCatalogTheme } from "./CatalogTheme";

type ProductCardProps = {
  product: Product;
  qty: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

export default function ProductCard({
  product,
  qty,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  const theme = useCatalogTheme();
  const displayPrice = product.sale ?? product.price;

  return (
    <article
      className="flex flex-col overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: theme.cardBg,
        borderColor: product.sale ? `${theme.accentAmber}55` : theme.borderColor,
      }}
    >
      <div className="relative aspect-square w-full" style={{ backgroundColor: theme.imgBg }}>
        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        {product.sale && (
          <span
            className="absolute left-2 top-2 rounded-full px-2 py-1 text-[9.5px] font-bold text-white"
            style={{ backgroundColor: theme.accentAmber }}
          >
            Oferta
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <h3 className="min-h-[35px] text-[13px] font-semibold leading-tight" style={{ color: theme.textPrimary }}>
          {product.name}
        </h3>

        <div className="flex items-baseline gap-1.5">
          {product.sale && (
            <span className="text-[11.5px] line-through" style={{ color: theme.textSecondary }}>
              S/ {product.price}
            </span>
          )}
          <span
            className="text-base font-bold"
            style={{ color: product.sale ? theme.accentAmber : theme.textPrimary }}
          >
            S/ {displayPrice}
          </span>
        </div>

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
            className="flex h-[25px] w-[25px] items-center justify-center rounded-lg text-sm font-bold text-white"
            style={{ backgroundColor: theme.accentBlue }}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}