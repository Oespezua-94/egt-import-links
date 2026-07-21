"use client";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { AtSign, Music2, Globe, MapPin } from "lucide-react";
import { brand, links } from "@/config/links";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
 instagram: AtSign,
  "music-2": Music2,
  globe: Globe,
  "map-pin": MapPin,
};

export default function SocialFooter() {
  const active = links.filter((l) => l.active !== false);

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-8 flex flex-col items-center gap-4"
    >
      <div className="flex items-center gap-5">
        {active.map((l) => {
          const Icon = iconMap[l.icon] ?? Globe;
          return (
            <a
            
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.title}
              className="transition-transform hover:scale-125"
              style={{ color: "var(--text-muted)" }}
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>

      <p className="text-xs" style={{ color: "var(--text-muted)" }}>
        © {new Date().getFullYear()} {brand.name}. Todos los derechos reservados.
      </p>
    </motion.footer>
  );
}