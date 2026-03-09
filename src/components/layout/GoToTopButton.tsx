"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

export default function GoToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (documentHeight <= 0) {
        setShowButton(false);
        return;
      }

      const scrolledPercentage = (scrollTop / documentHeight) * 100;
      setShowButton(scrolledPercentage > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Go to top"
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#268999] text-white shadow-lg transition-all duration-300 hover:bg-[#1f7380] hover:scale-110 ${
        showButton
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <FaArrowUp size={16} />
    </button>
  );
}