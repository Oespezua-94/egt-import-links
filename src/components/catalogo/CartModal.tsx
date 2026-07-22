"use client";

import Image from "next/image";
import { X, MessageCircle } from "lucide-react";
import { useCatalogTheme } from "./CatalogTheme";

type CartItem = {
  product: { id: string; name: string; images: string[] };
  qty: number;
  unit: number;
  subtotal: number;
};

type CartModalProps = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onSendWhatsapp: () => void;
};

export default function CartModal({
  open,
  onClose,
  items,
  total,
  onSendWhatsapp,
}: CartModalProps) {
  const theme = useCatalogTheme();
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[82%] w-full max-w-md overflow-y-auto rounded-3xl p-5"
        style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.borderColor}` }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-bold" style={{ color: theme.textPrimary }}>
            Tu pedido
          </h3>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: theme.pillBg }}
          >
            <X className="h-4 w-4" style={{ color: theme.textPrimary }} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="py-6 text-center text-[13px]" style={{ color: theme.textSecondary }}>
            Aún no agregaste productos.
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-3.5">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div
                    className="relative h-12 w-12 flex-none overflow-hidden rounded-xl"
                    style={{ backgroundColor: theme.imgBg }}
                  >
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] font-semibold leading-tight" style={{ color: theme.textPrimary }}>
                      {item.product.name}
                    </div>
                    <div className="mt-0.5 text-[11px]" style={{ color: theme.textSecondary }}>
                      {item.qty} × S/ {item.unit}
                    </div>
                  </div>
                  <div className="flex-none text-sm font-bold" style={{ color: theme.textPrimary }}>
                    S/ {item.subtotal}
                  </div>
                </div>
              ))}
            </div>

            <div className="my-4 h-px" style={{ backgroundColor: theme.borderColor }} />

            <div className="mb-4 flex items-center justify-between">
              <span className="text-[12.5px] font-semibold" style={{ color: theme.textSecondary }}>
                Total del pedido
              </span>
              <span className="text-xl font-bold" style={{ color: theme.textPrimary }}>
                S/ {total}
              </span>
            </div>

            <button
              onClick={onSendWhatsapp}
              className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-[13.5px] font-bold text-white"
              style={{ backgroundColor: "#22c55e" }}
            >
              <MessageCircle className="h-4 w-4" />
              Pedir por WhatsApp
            </button>
          </>
        )}
      </div>
    </div>
  );
}