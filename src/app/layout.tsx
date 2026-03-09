import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import TopLoader from "@/components/TopLoader";
import GoToTopButton from "@/components/layout/GoToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apexcel Move — Book Trucks Online. Move Freight Faster.",
  description:
    "Apexcel Move is an online truck booking and freight platform connecting truckers, shippers, and businesses across India.",
};

// YEH ROOT LAYOUT HAI. ISME HTML AUR BODY HONE ZAROORI HAIN.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <GoogleAnalytics />
        <TopLoader />
        
        {/* Children yahan render honge (chahe (public) ho ya admin) */}
        {children}
        
        <GoToTopButton />
      </body>
    </html>
  );
}