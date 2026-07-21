"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { brand } from "@/config/links";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center text-center gap-3"
    >
      {/* Logo con borde animado */}
      <div className="relative">
        <div
          className="absolute -inset-1 rounded-full blur-md opacity-60 animate-pulse"
          style={{
            background: `linear-gradient(135deg, var(--accent), var(--accent-soft))`,
          }}
        />
        <div
          className="relative h-24 w-24 rounded-full overflow-hidden ring-2"
          style={{ borderColor: "var(--accent)", ["--tw-ring-color" as string]: "var(--accent)" }}
        >
          <Image
            src={brand.logoUrl}
            alt={`${brand.name} logo`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Nombre + verificación */}
      <div className="flex items-center gap-1.5">
        <h1 className="text-2xl font-bold tracking-tight">{brand.name}</h1>
        {brand.verified && (
          <BadgeCheck className="h-5 w-5" style={{ color: "var(--accent)" }} />
        )}
      </div>

      {/* Eslogan */}
      <p className="max-w-xs text-sm" style={{ color: "var(--text-muted)" }}>
        {brand.slogan}
      </p>
    </motion.header>
  );
}