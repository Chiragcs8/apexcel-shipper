"use client";

import React from "react";
import Link from "next/link";
import { Crown, ArrowLeft } from "lucide-react";

export default function MembershipPage() {
  return (
    // justify-center hata kar pt-20 ya pt-32 use kiya hai taaki content thoda upar rahe
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 md:pt-32 p-6 text-center">
      
      {/* Icon Section - Responsive size */}
      <div className="w-20 h-20 md:w-24 md:h-24 bg-teal-50 rounded-full flex items-center justify-center mb-6 md:mb-8 animate-bounce">
        <Crown className="w-10 h-10 md:w-12 md:h-12 text-[#268999]" />
      </div>

      {/* English Text Content - Responsive text sizes */}
      <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight mb-4 uppercase px-4">
        Membership <span className="text-orange-500">Coming Soon</span>
      </h1>
      
      <p className="max-w-xs md:max-w-md text-sm md:text-base text-gray-600 font-medium leading-relaxed mb-8 md:mb-10 px-2">
        We are currently working on our Membership features. Soon, you will be able to access exclusive rates and premium benefits right here.
      </p>

      {/* Status Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full mb-8 md:mb-12">
        <span className="relative flex h-2.5 w-2.5 md:h-3 md:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 md:h-3 md:w-3 bg-orange-500"></span>
        </span>
        <span className="text-orange-700 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
          Under Development
        </span>
      </div>

      {/* Back Button - Responsive width */}
      <Link 
        href="/admin" 
        className="flex items-center gap-2 px-6 py-3 bg-[#268999] text-white font-black rounded-xl hover:bg-[#1f6d7a] transition-all shadow-lg shadow-teal-900/20 uppercase text-xs md:text-sm tracking-wide w-full max-w-[240px] justify-center"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      {/* Footer Branding - Adjusted spacing for mobile */}
      <div className="mt-auto pb-10 md:mt-20 text-[10px] md:text-[11px] font-black uppercase tracking-widest">
        <span className="text-orange-500">Apexcel</span>{" "}
        <span className="text-[#268999]">Move</span>{" "}
        <span className="text-gray-400">©</span>{" "}
        <span className="text-black">2026</span>
      </div>
    </div>
  );
}