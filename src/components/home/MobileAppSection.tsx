"use client";
import Container from "@/components/layout/Container";
import Image from "next/image";
import Link from "next/link";
import { FaApple, FaGooglePlay, FaTruckFront, FaUserTie } from "react-icons/fa6";

export default function MobileAppSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-gradient-to-br from-[#f4fbfc] to-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 border border-teal-50 overflow-hidden relative shadow-sm">
          
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-400/5 rounded-full blur-[80px] -mr-32 -mt-32" />

          <div className="lg:col-span-7 relative z-10 text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#268999]/10 text-[#268999] text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-[#268999]/20">
              Mobile Ecosystem
            </span>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1a5d68] leading-[1.1] mb-6 tracking-tighter">
              Logistics Simplified. <br />
              <span className="text-orange-500">Dual Apps for Every Need.</span>
            </h2>

            <p className="text-[#268999] text-base md:text-lg font-semibold opacity-80 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Whether you are looking to move freight or managing a fleet, Apexcel Move provides dedicated 
              mobile solutions designed for maximum efficiency.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
              {/* App 1: Shippers */}
              <div className="space-y-4 p-6 bg-white/50 rounded-[2rem] border border-white lg:bg-transparent lg:p-0 lg:border-0">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-[#1a5d68]">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#268999] shrink-0">
                    <FaUserTie />
                  </div>
                  <h3 className="font-black text-base md:text-lg uppercase tracking-wider">For Shippers</h3>
                </div>
                <p className="text-sm text-zinc-500 font-medium text-center lg:text-left">Book trucks, track shipments, and manage PODs digitally.</p>
                <div className="flex justify-center lg:justify-start gap-3">
                  <Link href="#" className="w-12 h-12 rounded-xl bg-[#268999] flex items-center justify-center text-white hover:bg-[#1f6d7a] transition-all shadow-lg shadow-[#268999]/20 active:scale-90"><FaGooglePlay size={18}/></Link>
                  <Link href="#" className="w-12 h-12 rounded-xl bg-[#1a5d68] flex items-center justify-center text-white hover:opacity-90 transition-all shadow-lg active:scale-90"><FaApple size={20}/></Link>
                </div>
              </div>

              {/* App 2: Truckers */}
              <div className="space-y-4 p-6 bg-white/50 rounded-[2rem] border border-white lg:bg-transparent lg:p-0 lg:border-0">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-orange-500">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                    <FaTruckFront />
                  </div>
                  <h3 className="font-black text-base md:text-lg uppercase tracking-wider">For Truckers</h3>
                </div>
                <p className="text-sm text-zinc-500 font-medium text-center lg:text-left">Find loads, upload documents, and get instant payment alerts.</p>
                <div className="flex justify-center lg:justify-start gap-3">
                  <Link href="#" className="w-12 h-12 rounded-xl bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-90"><FaGooglePlay size={18}/></Link>
                  <Link href="#" className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-white hover:bg-black transition-all shadow-lg active:scale-90"><FaApple size={20}/></Link>
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full border border-zinc-100 mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available now on all platforms
            </div>
          </div>

          {/* Right Visual - Mobile Optimized Stack */}
          <div className="lg:col-span-5 relative h-[400px] md:h-[550px] mt-4 lg:mt-0 flex justify-center lg:block">
             <div className="relative w-full max-w-[320px] md:max-w-full h-full">
                {/* Background Phone (Skewed right) */}
                <div className="absolute top-12 right-0 lg:-right-4 w-[180px] md:w-[260px] h-[320px] md:h-[480px] opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Image src="/trukcerapp.png" alt="Trucker App" fill className="object-contain" />
                </div>
                {/* Foreground Phone (Skewed left) */}
                <div className="absolute top-0 left-0 lg:-left-4 w-[200px] md:w-[300px] h-[380px] md:h-[530px] drop-shadow-[0_30px_50px_rgba(38,137,153,0.2)]">
                  <Image src="/shipperapp.png" alt="Shipper App" fill className="object-contain" />
                </div>
             </div>
          </div>

        </div>
      </Container>
    </section>
  );
}