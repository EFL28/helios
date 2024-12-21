"use client";
import Footer from "@/ui/footer";
import Header from "@/ui/header";
import { usePathname } from "next/navigation";
import React from "react";

const LayoutBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // lista de rutas donde no aplicar el layout
  const excludedPaths = ["/login", "/signup"];

  // Si estamos en la página de login, solo renderizar el contenido sin layout
  if (excludedPaths.includes(pathname)) {
    return <>{children}</>;
  }

  // Para el resto de páginas, aplicar el layout completo
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutBody;
