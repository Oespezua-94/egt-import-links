"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import type { LinkItem } from "@/config/links";

// Convierte "map-pin" → "MapPin" para encontrar el icono en lucide
function toPascalCase(name: string) {
  return name
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

export default function LinkCard({ item, index }: { item: LinkItem; index: number }) {
  const IconComponent =
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>)[
      toPascalCase(item.icon)
    ] ?? Icons.Link;

  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-sm transition-colors"
      style={{
        backgroundColor: "var(--card)",
        borderColor: item.highlighted ? "var(--accent)" : "var(--card-border)",
        boxShadow: item.highlighted
          ? "0 0 20px -6px var(--accent)"
          : "0 2px 8px -4px rgba(0,0,0,0.3)",
      }}
    >
      {/* Icono */}
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor: item.highlighted ? "var(--accent)" : "var(--bg-to)",
          color: item.highlighted ? "#fff" : "var(--accent)",
        }}
      >
        <IconComponent className="h-5 w-5" />
      </div>

      {/* Texto */}
      <div className="flex flex-col text-left">
        <span className="font-semibold leading-tight">{item.title}</span>
        <span className="text-xs" style={{ color: "var(--text-muted)" }}>
          {item.subtitle}
        </span>
      </div>

      {/* Flecha (aparece en hover) */}
      <ArrowUpRight
        className="ml-auto h-5 w-5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
        style={{ color: "var(--text-muted)" }}
      />
    </motion.a>
  );
}