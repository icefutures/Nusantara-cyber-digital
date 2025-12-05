"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutShell({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
