import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Layout({ children }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="relative pt-20">{children}</main>
      <Footer />
    </div>
  );
}

