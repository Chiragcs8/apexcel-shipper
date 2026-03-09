"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { gaEvent } from "@/lib/ga";
import Container from "@/components/layout/Container";

const navLinks = [
  { label: "Home", href: "/", event: "nav_home_click" },
  { label: "About Us", href: "/about", event: "nav_about_click" },
  { label: "Services", href: "/services", event: "nav_services_click" },
  { label: "Contact Us", href: "/contact", event: "nav_contact_click" },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isTruckRateActive = useMemo(() => pathname === "/truck-rate", [pathname]);

  useEffect(() => setIsMobileMenuOpen(false), [pathname]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  const openMenu = useCallback(() => setIsMobileMenuOpen(true), []);
  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      {/* HEADER ONLY */}
      <header
        role="banner"
        className="
          sticky top-0 z-50
          border-b border-gray-100
          bg-white/90
          backdrop-blur-xl backdrop-saturate-150
          shadow-[0_2px_20px_rgba(0,0,0,0.04)]
        "
      >
        <Container>
          <div className="flex h-16 md:h-[72px] items-center justify-between gap-3">
            {/* LOGO */}
            <Link
              href="/"
              aria-label="Apexcel Move - Back to Home"
              onClick={() => gaEvent("logo_click", { from: pathname })}
              className="group flex items-center gap-2 shrink-0 z-50 relative min-w-0"
            >
              <div className="relative w-10 h-10 md:w-[56px] md:h-[56px] shrink-0">
                <Image
                  src="/logo.png"
                  alt="Apexcel Move Brand Logo"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 40px, 56px"
                  className="object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </div>

              <span className="truncate text-lg md:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent leading-none mt-1">
                Apexcel Move
              </span>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 ml-auto">
              <nav className="flex items-center gap-6 lg:gap-8" aria-label="Desktop Navigation">
                {navLinks.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => gaEvent(item.event, { from: pathname, to: item.href })}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "group relative py-2 text-base font-bold tracking-wide transition-colors duration-300 whitespace-nowrap",
                        active ? "text-orange-600" : "text-zinc-700 hover:text-orange-600",
                      ].join(" ")}
                    >
                      {item.label}
                      <span
                        className={`
                          absolute bottom-0 left-0 h-[2.5px] rounded-full bg-orange-500 transition-all duration-300 ease-out
                          ${active ? "w-full" : "w-0 group-hover:w-full opacity-50"}
                        `}
                      />
                    </Link>
                  );
                })}
              </nav>

              <Link
                href="/truck-rate"
                onClick={() => gaEvent("truck_rate_click", { from: pathname, to: "/truck-rate" })}
                className={`
                  flex items-center justify-center
                  relative overflow-hidden rounded-lg px-6 py-2.5 text-xs font-black tracking-widest uppercase transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#268999] focus-visible:ring-offset-2
                  border-2 whitespace-nowrap
                  ${
                    isTruckRateActive
                      ? "bg-[#268999] border-[#268999] text-white shadow-lg shadow-[#268999]/20"
                      : "bg-white border-[#268999] text-[#268999] hover:bg-[#268999]/5"
                  }
                `}
              >
                <span className="relative z-10">TRUCK RATES</span>
              </Link>
            </div>

            {/* MOBILE MENU TOGGLE */}
            <button
              className={`
                md:hidden p-2 -mr-2 text-zinc-800 hover:text-[#268999] focus:outline-none active:scale-95 transition-transform
                ${isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
              `}
              onClick={openMenu}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="6" width="18" height="2.5" rx="1.25" fill="currentColor" />
                <rect x="3" y="11" width="18" height="2.5" rx="1.25" fill="currentColor" />
                <rect x="3" y="16" width="18" height="2.5" rx="1.25" fill="currentColor" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* ✅ IMPORTANT: Backdrop + Sidebar OUTSIDE header (fixes fixed+backdrop-filter bug) */}
      <div
        className={`
          fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 md:hidden
          ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <div
        id="mobile-nav"
        className={`
          fixed inset-y-0 right-0 z-[70]
          h-[100dvh] w-screen max-w-none
          bg-white shadow-2xl
          transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1)
          md:hidden flex flex-col
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-9 h-9 shrink-0">
              <Image src="/logo.png" alt="Apexcel Move" fill sizes="36px" className="object-contain" />
            </div>
            <span className="truncate font-extrabold text-zinc-900">Apexcel Move</span>
          </div>

          <button
            onClick={closeMenu}
            className="
              group p-2 rounded-full bg-white text-zinc-500
              shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-gray-100
              hover:text-black hover:shadow-md transition-all
              active:scale-90 shrink-0
            "
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col p-5 sm:p-6 gap-6 overflow-y-auto">
          <nav className="flex flex-col gap-3" aria-label="Mobile Navigation">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "rounded-lg px-3 py-3 text-lg font-bold transition-colors",
                    active ? "text-[#268999] bg-[#268999]/10" : "text-zinc-800 hover:text-[#268999] hover:bg-zinc-50",
                  ].join(" ")}
                  onClick={() => {
                    gaEvent(item.event, { from: pathname, to: item.href });
                    closeMenu();
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="h-px bg-gray-100 my-1" role="separator" />

          <Link
            href="/truck-rate"
            onClick={() => {
              gaEvent("truck_rate_click", { from: pathname, to: "/truck-rate" });
              closeMenu();
            }}
            className={`
              w-full text-center rounded-lg px-6 py-4 text-sm font-black tracking-widest uppercase border-2 transition-all shadow-sm
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#268999] focus-visible:ring-offset-2
              ${isTruckRateActive ? "bg-[#268999] border-[#268999] text-white" : "bg-white border-[#268999] text-[#268999] hover:bg-[#268999]/5"}
            `}
          >
            TRUCK RATES
          </Link>

          <div className="h-6" aria-hidden="true" />
        </div>
      </div>
    </>
  );
}