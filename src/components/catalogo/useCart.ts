"use client";

import { useState } from "react";
import { products, catalogWhatsappNumber, type Product } from "@/config/products";

export function useCart() {
  const [cart, setCart] = useState<Record<string, number>>({});

  const increment = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id: string) => {
    setCart((prev) => {
      const next = { ...prev };
      const qty = (next[id] || 0) - 1;
      if (qty <= 0) {
        delete next[id];
      } else {
        next[id] = qty;
      }
      return next;
    });
  };

  const unitPrice = (product: Product) => {
    return product.sale ?? product.price;
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartItems = products
    .filter((p) => cart[p.id] > 0)
    .map((p) => {
      const qty = cart[p.id];
      const unit = unitPrice(p);
      return {
        product: p,
        qty,
        unit,
        subtotal: unit * qty,
      };
    });

  const cartTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const sendWhatsapp = () => {
    if (cartItems.length === 0) return;
    const lines = cartItems.map(
      (item) => `• ${item.product.name} x${item.qty} — S/ ${item.subtotal}`
    );
    const message = `Hola EGT Import, quiero hacer este pedido:\n\n${lines.join(
      "\n"
    )}\n\nTotal: S/ ${cartTotal}`;
    const url = `https://wa.me/${catalogWhatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  // Mensaje directo para consultas de compra al por mayor
  const wholesaleWhatsappUrl = `https://wa.me/${catalogWhatsappNumber}?text=${encodeURIComponent(
    "Hola EGT Import, quisiera información sobre precios al por mayor."
  )}`;

  return {
    cart,
    cartCount,
    cartItems,
    cartTotal,
    increment,
    decrement,
    unitPrice,
    sendWhatsapp,
    wholesaleWhatsappUrl,
  };
}