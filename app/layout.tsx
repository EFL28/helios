"use client";

import { NextUIProvider } from "@nextui-org/react";
import type { Metadata } from "next";
import { useEffect, useState } from "react";
import "./globals.css";
import LayoutBody from "./layout-body";

const metadata: Metadata = {
  title: "Helios",
  description: "Project Helios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detectar la preferencia del sistema
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    // Escuchar cambios en la preferencia del sistema
    const handler = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    // Aplicar el tema al elemento html
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <body>
        <NextUIProvider>
          <LayoutBody>{children}</LayoutBody>
        </NextUIProvider>
      </body>
    </html>
  );
}
