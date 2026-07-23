"use client";

import { useState } from "react";
import { products, catalogWhatsappNumber, type Product } from "@/config/products";

export function useCart() {
  const [cart, setCart] = useState<Record<string, number>>({});

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const increment = (id: string) => {
    const product = getProduct(id);
    if (!product) return;
    setCart((prev) => {
      const current = prev[id] || 0;
      if (current >= product.stock) return prev;
      return { ...prev, [id]: current + 1 };
    });
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

  // Fija una cantidad exacta (usado al hacer clic en un tramo de mayoreo),
  // sin pasarse nunca del stock disponible.
  const setQty = (id: string, qty: number) => {
    const product = getProduct(id);
    if (!product) return;
    const clamped = Math.min(qty, product.stock);
    setCart((prev) => {
      if (clamped <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: clamped };
    });
  };

  const unitPrice = (product: Product, qty: number) => {
    if (product.wholesale && product.wholesale.length > 0) {
      const applicable = [...product.wholesale]
        .sort((a, b) => a.minQty - b.minQty)
        .filter((tier) => qty >= tier.minQty)
        .pop();
      if (applicable) return applicable.price;
    }
    return product.sale ?? product.price;
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  const cartItems = products
    .filter((p) => cart[p.id] > 0)
    .map((p) => {
      const qty = cart[p.id];
      const unit = unitPrice(p, qty);
      const isWholesale = !!(p.wholesale && p.wholesale.some((t) => qty >= t.minQty));
      return { product: p, qty, unit, subtotal: unit * qty, isWholesale };
    });

  const cartTotal = cartItems.reduce((sum, item) => sum + item.subtotal, 0);

  const sendWhatsapp = () => {
    if (cartItems.length === 0) return;
    const lines = cartItems.map((item) => {
      const tag = item.isWholesale ? " (precio por mayor)" : "";
      return `• ${item.product.name} x${item.qty}${tag} — S/ ${item.subtotal}`;
    });
    const message = `Hola EGT Import, quiero hacer este pedido:\n\n${lines.join(
      "\n"
    )}\n\nTotal: S/ ${cartTotal}`;
    const url = `https://wa.me/${catalogWhatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

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
    setQty,
    unitPrice,
    sendWhatsapp,
    wholesaleWhatsappUrl,
  };
}