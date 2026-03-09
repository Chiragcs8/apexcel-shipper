"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { 
  FaTruck, 
  FaTrailer, 
  FaShip, 
  FaRobot, 
  FaBolt, 
  FaEye, 
  FaMapLocationDot, 
  FaFileContract, 
  FaHeadset, 
  FaCheck, 
  FaArrowRight,
  FaTruckMoving 
} from "react-icons/fa6";

export default function ServiceSection() {
  return (
    <section className="py-24 bg-zinc-50 relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-300 to-transparent opacity-50" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-1/2 -left-24 w-96 h-96 bg-[#268999]/5 rounded-full blur-[80px] -z-10" />

      <Container>
        
        {/* --- 1. Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-100 text-orange-700 font-bold uppercase tracking-wider text-[11px] mb-4 border border-orange-200">
            Services — Apexcel Move
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-6 leading-tight">
            Smart Freight Solutions for <br className="hidden md:block" />
            <span className="text-[#268999]">Every Load</span>
          </h2>
          <p className="text-zinc-600 font-medium text-lg max-w-2xl mx-auto">
            Open trucks, closed body, trailers, and container movement — powered by AI-based matching for maximum efficiency.
          </p>
        </div>

        {/* --- 2. Service Cards (Updated Grid of 4) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          
          {/* Card 1: Open Truck */}
          <div className="group bg-white rounded-[2rem] p-6 border border-zinc-200/60 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-200 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-[80px] -mr-4 -mt-4 transition-transform group-hover:scale-110 duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white border border-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-sm group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                <FaTruck />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Open Truck</h3>
              <p className="text-zinc-500 mb-6 text-sm font-medium leading-relaxed">
                Flexible for bulk & general cargo transportation.
              </p>
              <ul className="space-y-3">
                {[
                  "17 ft to 18 wheelers",
                  "4–50 MT capacity",
                  "Custom tonnage"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-zinc-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 shadow-sm" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 2: Closed Body */}
          <div className="group bg-white rounded-[2rem] p-6 border border-zinc-200/60 shadow-sm hover:shadow-2xl hover:shadow-[#268999]/15 hover:border-[#268999]/30 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-[80px] -mr-4 -mt-4 transition-transform group-hover:scale-110 duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white border border-teal-100 text-[#268999] rounded-2xl flex items-center justify-center text-xl mb-6 shadow-sm group-hover:bg-[#268999] group-hover:text-white transition-colors duration-300">
                <FaTrailer />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Closed Body</h3>
              <p className="text-zinc-500 mb-6 text-sm font-medium leading-relaxed">
                Secure transport for high-value & sensitive goods.
              </p>
              <ul className="space-y-3">
                {[
                  "14 ft to 42 ft options",
                  "Single / Multi Axle",
                  "Weather-protected"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-zinc-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#268999] shrink-0 shadow-sm" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 3: Trailer (NEWLY ADDED) */}
          <div className="group bg-white rounded-[2rem] p-6 border border-zinc-200/60 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-200 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[80px] -mr-4 -mt-4 transition-transform group-hover:scale-110 duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                <FaTruckMoving />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Trailer</h3>
              <p className="text-zinc-500 mb-6 text-sm font-medium leading-relaxed">
                Heavy-duty solutions for oversized & project cargo.
              </p>
              <ul className="space-y-3">
                {[
                  "Flatbed / Low-Bed",
                  "20 ft to 40 ft trailers",
                  "Heavy machinery logs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-zinc-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 shadow-sm" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Card 4: Import/Export */}
          <div className="group bg-white rounded-[2rem] p-6 border border-zinc-200/60 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-200 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[80px] -mr-4 -mt-4 transition-transform group-hover:scale-110 duration-500" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <FaShip />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3">Import–Export</h3>
              <p className="text-zinc-500 mb-6 text-sm font-medium leading-relaxed">
                Container-ready logistics for EXIM routes.
              </p>
              <ul className="space-y-3">
                {[
                  "Standard & High-Cube",
                  "Factory ↔ Port ↔ Whse",
                  "Full EXIM compliance"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] font-bold text-zinc-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 shadow-sm" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* --- 3. Platform Capabilities --- */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-zinc-900 inline-block relative px-4">
              Platform Capabilities
              <div className="absolute -bottom-3 left-0 w-full h-1.5 bg-[#268999]/20 rounded-full"></div>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FaRobot, title: "AI-Powered Matching", desc: "Load & truck mapping" },
              { icon: FaBolt, title: "Quick Discovery", desc: "No phone calls needed" },
              { icon: FaEye, title: "Transparent Booking", desc: "Clear price & selection" },
              { icon: FaMapLocationDot, title: "Live Updates", desc: "Real-time trip status" },
              { icon: FaFileContract, title: "POD Assistance", desc: "On-ground support" },
              { icon: FaHeadset, title: "24/7 Support", desc: "Active across India" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-5 p-6 rounded-2xl bg-white border border-zinc-100 hover:border-[#268999]/40 hover:shadow-lg hover:shadow-[#268999]/5 transition-all duration-300 group">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#268999] text-white text-xl shadow-md group-hover:bg-teal-50 group-hover:text-[#268999] transition-all duration-300 shrink-0">
                  <item.icon />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-zinc-900 mb-1">{item.title}</h4>
                  <p className="text-sm font-medium text-zinc-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 4. Why Apexcel Move --- */}
        <div className="mb-24 bg-white rounded-[3rem] border border-zinc-200/60 p-10 md:p-14 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-60" />
          
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-extrabold text-zinc-900 mb-4 leading-tight">
                Why Choose <br /> <span className="text-orange-600">Apexcel Move?</span>
              </h3>
              <p className="text-zinc-500 font-medium">Designed for modern logistics in India.</p>
            </div>

            <div className="md:w-2/3 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Built for Indian freight workflows",
                  "Designed for shippers & truckers",
                  "Clear configuration before booking",
                  "Scales from single trips to bulk ops",
                  "Pan-India operational support"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 hover:bg-orange-50 border border-zinc-100 hover:border-orange-200 transition-all duration-300">
                    <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px] shrink-0 shadow-sm">
                      <FaCheck />
                    </div>
                    <span className="text-sm font-bold text-zinc-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- 5. Bottom CTA Bar --- */}
        <div className="relative rounded-3xl overflow-hidden bg-[#268999] p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left shadow-2xl shadow-[#268999]/30">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-2xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
              Built for businesses that move fast.
            </h3>
            <p className="text-teal-50 font-medium text-lg opacity-90">
              Book the right truck for your load in minutes, not hours.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link href="/truck-rate">
              <button className="bg-orange-500 text-white hover:bg-white hover:text-[#268999] px-10 py-5 rounded-2xl font-extrabold text-lg transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-center gap-3 group transform hover:-translate-y-1 border border-transparent hover:border-[#268999]">
                Get Truck Rates
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>

      </Container>
    </section>
  );
}