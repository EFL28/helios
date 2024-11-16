"use client";
import Footer from "@/ui/footer";
import Header from "@/ui/header";
import React from "react";

const LayoutBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutBody;
