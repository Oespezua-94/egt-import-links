import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/config/links";

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,
  metadataBase: new URL(brand.seo.url),
  openGraph: {
    title: brand.seo.title,
    description: brand.seo.description,
    url: brand.seo.url,
    siteName: brand.name,
    images: [{ url: brand.seo.ogImage, width: 1200, height: 630 }],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.title,
    description: brand.seo.description,
    images: [brand.seo.ogImage],
  },
};
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}