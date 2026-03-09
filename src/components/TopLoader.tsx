"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function TopLoader() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // start
    bar.style.opacity = "1";
    bar.style.transform = "scaleX(0.15)";

    const t1 = window.setTimeout(() => {
      bar.style.transform = "scaleX(0.65)";
    }, 120);

    const t2 = window.setTimeout(() => {
      bar.style.transform = "scaleX(0.9)";
    }, 380);

    // finish shortly after route change completes
    const t3 = window.setTimeout(() => {
      bar.style.transform = "scaleX(1)";
      bar.style.opacity = "0";
    }, 650);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [pathname]);

  return (
<div className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px] w-full">      <div
        ref={barRef}
        className="h-full origin-left bg-orange-500 transition-[transform,opacity] duration-300 ease-out"
        style={{ transform: "scaleX(0)", opacity: 0 }}
      />
    </div>
  );
}