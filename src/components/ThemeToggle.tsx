"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("egt-theme");
    const isDark = saved ? saved === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("egt-theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      aria-label="Cambiar tema"
      className="fixed right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition-transform hover:scale-110"
      style={{ backgroundColor: "var(--card)", borderColor: "var(--card-border)" }}
    >
      {dark ? (
        <Sun className="h-5 w-5" style={{ color: "var(--accent)" }} />
      ) : (
        <Moon className="h-5 w-5" style={{ color: "var(--accent)" }} />
      )}
    </button>
  );
}