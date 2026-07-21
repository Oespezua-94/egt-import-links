"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import LinkCard from "@/components/LinkCard";
import SocialFooter from "@/components/SocialFooter";
import ThemeToggle from "@/components/ThemeToggle";
import { links, primaryCTA } from "@/config/links";

export default function Home() {
  const activeLinks = links.filter((l) => l.active !== false);

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-12">
      <ThemeToggle />

      <Header />

      <motion.a
        href={primaryCTA.url}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-8 flex items-center justify-center gap-2 rounded-2xl px-6 py-4 font-semibold text-white shadow-lg"
        style={{
          background: "linear-gradient(135deg, #16a34a, #22c55e)",
          boxShadow: "0 8px 24px -8px #16a34a",
        }}
      >
        <MessageCircle className="h-5 w-5" />
        <div className="flex flex-col items-start leading-tight">
          <span>{primaryCTA.title}</span>
          <span className="text-xs font-normal opacity-90">{primaryCTA.subtitle}</span>
        </div>
      </motion.a>

      <div className="mt-5 flex flex-col gap-3">
        {activeLinks.map((item, i) => (
          <LinkCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <SocialFooter />
    </main>
  );
}