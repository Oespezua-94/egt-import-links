"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CatalogTheme = {
  isDark: boolean;
  toggleTheme: () => void;
  accentBlue: string;
  accentAmber: string;
  pageBg: string;
  headerBg: string;
  cardBg: string;
  barBg: string;
  textPrimary: string;
  textSecondary: string;
  borderColor: string;
  pillBg: string;
  imgBg: string;
};

const CatalogThemeContext = createContext<CatalogTheme | null>(null);

export function CatalogThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("egt-catalog-theme");
    if (saved) setIsDark(saved === "dark");
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem("egt-catalog-theme", next ? "dark" : "light");
      return next;
    });
  };

  const accentBlue = isDark ? "#2997ff" : "#0071e3";
  const accentAmber = isDark ? "#ff9f0a" : "#ff9500";

  const value: CatalogTheme = {
    isDark,
    toggleTheme,
    accentBlue,
    accentAmber,
    pageBg: isDark ? "#000000" : "#f5f5f7",
    headerBg: isDark ? "rgba(0,0,0,0.7)" : "rgba(245,245,247,0.7)",
    cardBg: isDark ? "#1c1c1e" : "#ffffff",
    barBg: isDark ? "rgba(28,28,30,0.78)" : "rgba(255,255,255,0.78)",
    textPrimary: isDark ? "#f5f5f7" : "#1d1d1f",
    textSecondary: isDark ? "#98989d" : "#6e6e73",
    borderColor: isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)",
    pillBg: isDark ? "#1c1c1e" : "#e8e8ed",
    imgBg: isDark ? "#1c1c1e" : "#e8e8ed",
  };

  return (
    <CatalogThemeContext.Provider value={value}>
      <div style={{ backgroundColor: value.pageBg, minHeight: "100vh" }}>
        {children}
      </div>
    </CatalogThemeContext.Provider>
  );
}

export function useCatalogTheme() {
  const ctx = useContext(CatalogThemeContext);
  if (!ctx) throw new Error("useCatalogTheme debe usarse dentro de CatalogThemeProvider");
  return ctx;
}