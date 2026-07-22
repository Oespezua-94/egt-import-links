"use client";

import { MessageCircle } from "lucide-react";
import { useCatalogTheme } from "./CatalogTheme";

type BottomBarProps = {
  total: number;
  cartEmpty: boolean;
  onOpenCart: () => void;
  onSendWhatsapp: () => void;
};

export default function BottomBar({
  total,
  cartEmpty,
  onOpenCart,
  onSendWhatsapp,
}: BottomBarProps) {
  const theme = useCatalogTheme();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 flex justify-center pointer-events-none">
      <div
        className="mb-3.5 flex w-[calc(100%-24px)] max-w-md items-center gap-3 rounded-full py-2 pl-4 pr-2 pointer-events-auto"
        style={{
          backgroundColor: theme.barBg,
          border: `1px solid ${theme.borderColor}`,
          boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
        }}
      >
        <div onClick={onOpenCart} className="cursor-pointer leading-tight">
          <div
            className="text-[9.5px] font-semibold uppercase tracking-wide"
            style={{ color: theme.textSecondary }}
          >
            Total
          </div>
          <div className="text-base font-bold" style={{ color: theme.textPrimary }}>
            S/ {total}
          </div>
        </div>

        <button
          onClick={onSendWhatsapp}
          disabled={cartEmpty}
          className="ml-auto flex items-center gap-2 rounded-full px-4 py-2.5 text-[12.5px] font-bold text-white transition-opacity"
          style={{
            backgroundColor: cartEmpty ? "#3a7a52" : "#22c55e",
            opacity: cartEmpty ? 0.5 : 1,
          }}
        >
          <MessageCircle className="h-4 w-4" />
          Pedir por WhatsApp
        </button>
      </div>
    </div>
  );
}