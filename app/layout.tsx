import React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/constants";

// Standard Next.js Metadata
export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  authors: [{ name: "aihunger-tech" }],
};

// Separate Viewport export for Next.js 14+ compatibility
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-brand-black text-white">
        {children}
      </body>
    </html>
  );
}
