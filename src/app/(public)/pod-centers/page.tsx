"use client";

import dynamic from "next/dynamic";
import Container from "@/components/layout/Container";

// Responsive Loading State
const PodMap = dynamic(() => import("@/components/pod/PodMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] md:h-[700px] w-full bg-zinc-50 rounded-[2rem] md:rounded-[2.5rem] animate-pulse flex flex-col items-center justify-center gap-4 border border-zinc-100">
      <div className="w-12 h-12 border-4 border-[#268999] border-t-transparent rounded-full animate-spin" />
      <p className="font-bold text-zinc-400 text-sm md:text-base">Loading Apexcel Network Map...</p>
    </div>
  ),
});

export default function PodCentersPage() {
  return (
    <main className="min-h-screen bg-white pt-24 pb-16 md:pt-32 md:pb-24">
      <Container>
        {/* Header Section - Mobile Responsive Alignment */}
        <div className="max-w-3xl mb-10 md:mb-14 text-center md:text-left px-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#268999]/10 text-[#268999] text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4">
            India Presence
          </span>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-6 tracking-tight leading-tight">
            Branch & <span className="text-orange-500 text-2xl md:text-5xl lg:text-6xl">POD</span> Centers
          </h1>
          
          <p className="text-sm md:text-lg text-zinc-600 font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
            Our branch offices across India serve as strategic Proof of Delivery (POD) points. 
            <span className="hidden md:inline"> Select a branch from the list to locate our operational hub on the map.</span>
            <span className="md:hidden block mt-2">Scroll down to explore locations on the interactive map.</span>
          </p>
        </div>

        {/* The Map Component handles its own internal responsive grid (sidebar vs map) */}
        <div className="w-full relative px-2 md:px-0">
          <PodMap />
        </div>

        {/* Mobile Info Tip - Only visible on small screens */}
        <div className="mt-8 md:hidden bg-orange-50 p-6 rounded-3xl border border-orange-100">
           <p className="text-xs font-bold text-orange-700 text-center">
             💡 Tip: Tap on markers to view Branch Head & Contact details.
           </p>
        </div>
      </Container>
    </main>
  );
}