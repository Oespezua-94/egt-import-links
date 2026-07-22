"use client";

import { categories } from "@/config/products";
import { useCatalogTheme } from "./CatalogTheme";

type CategoryFilterProps = {
  selected: string;
  onSelect: (id: string) => void;
};

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const theme = useCatalogTheme();

  return (
    <nav className="flex gap-2 overflow-x-auto px-4 pb-1 pt-1 sm:px-8 lg:px-12">
      {categories.map((cat) => {
        const active = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="flex-none whitespace-nowrap rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors"
            style={{
              backgroundColor: active ? theme.accentBlue : "transparent",
              color: active ? "#fff" : theme.textPrimary,
              borderColor: active ? theme.accentBlue : theme.borderColor,
            }}
          >
            {cat.label}
          </button>
        );
      })}
    </nav>
  );
}