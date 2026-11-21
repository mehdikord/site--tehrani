import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource/vazirmatn/200.css";
import "@fontsource/vazirmatn/300.css";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import "@fontsource/vazirmatn/900.css";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/data";

export const metadata: Metadata = {
  title: { default: `${site.brand.name} | ${site.brand.title}`, template: `%s | ${site.brand.name}` },
  description: site.brand.footerAbout,
  keywords: ["آموزش خیاطی", "الگوسازی", "پک الگوهای آماده", "طراحی لباس", "شراره طهرانی"],
};

export const viewport: Viewport = {
  themeColor: "#061711",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Marks JS as available before first paint so reveal states never flash. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body id="top" className="grain">
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
