import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// YEH PUBLIC LAYOUT HAI. YAHAN HEADER/FOOTER AAYENGA. HTML/BODY NAHI.
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Website ka header */}
      <Header />
      
      {/* Website ke pages (Home, About, etc.) */}
      <main className="min-h-screen">
        {children}
      </main>
      
      {/* Website ka footer */}
      <Footer />
    </>
  );
}