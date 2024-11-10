"use client";
import Footer from "@/ui/footer";
import Header from "@/ui/header";
import React from "react";
// import styles from "@/src/app/styles/layout.module.css";

const LayoutBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutBody;
