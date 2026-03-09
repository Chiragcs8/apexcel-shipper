"use client";
import Container from "@/components/layout/Container";
import Link from "next/link";
import { FaBullseye, FaLightbulb, FaShield, FaGlobe, FaChartLine, FaArrowRight } from "react-icons/fa6";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section - Optimized Spacing & Sizing */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-24 overflow-hidden bg-white">
        {/* Advanced Background: Mesh Gradient + Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-orange-100/30 rounded-full blur-[100px] -z-20 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[#268999]/10 rounded-full blur-[80px] -z-20 translate-y-1/2 -translate-x-1/4" />

        <Container>
          <div className="max-w-4xl mx-auto text-center px-4">
            {/* Tagline - Reduced size */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                Apexcel Move Identity
              </span>
            </div>

            {/* Headline - Balanced from 8xl to 6xl */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 leading-[1.1] mb-6 tracking-tight">
              Transforming <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#268999] via-[#268999] to-orange-500">
                Logistics
              </span> <br />
              Through Innovation
            </h1>

            {/* Sub-headline - Smaller font for readability */}
            <p className="text-base md:text-lg text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
              Apexcel Move Private Limited is a technology-driven logistics startup focused on transforming freight transportation in India through smart digital solutions.
            </p>

            {/* CTA Buttons - Proportional Sizing */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/services" 
                className="w-full sm:w-auto group relative px-8 py-3.5 bg-[#268999] text-white rounded-xl font-bold text-base overflow-hidden shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Our Platform <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </Link>
              
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-8 py-3.5 bg-white text-zinc-900 border-2 border-zinc-100 rounded-xl font-bold text-base hover:border-orange-500 transition-all shadow-sm"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Core Philosophy - Responsive Grid */}
      <section className="py-16 md:py-24 bg-zinc-50/50 border-y border-zinc-100">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            <div className="group p-8 md:p-10 rounded-[2.5rem] bg-zinc-900 text-white relative overflow-hidden transition-all duration-500 hover:shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500 opacity-10 rounded-full blur-2xl -mr-12 -mt-12" />
              <FaBullseye className="text-4xl text-orange-500 mb-6 transition-transform group-hover:scale-110" />
              <h3 className="text-2xl md:text-3xl font-black mb-4">Our Vision</h3>
              <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
                To build a smart, technology-driven logistics network across India that makes freight transportation faster, more transparent, and more efficient.
              </p>
            </div>
            <div className="group p-8 md:p-10 rounded-[2.5rem] bg-[#268999] text-white relative overflow-hidden transition-all duration-500 hover:shadow-xl">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl -mr-12 -mt-12" />
              <FaLightbulb className="text-4xl text-orange-200 mb-6 transition-transform group-hover:scale-110" />
              <h3 className="text-2xl md:text-3xl font-black mb-4">Our Mission</h3>
              <p className="text-teal-50 text-sm md:text-base font-medium leading-relaxed opacity-90">
                Modernizing the industry by digitizing booking, connecting verified partners, and providing real-time visibility through automation.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Leadership Team - Refined Sizing */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">Leadership Team</h2>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto rounded-full mb-6" />
            <p className="text-zinc-500 font-bold text-base max-w-xl mx-auto italic opacity-80 px-4">
              "Building the technology that powers the future of Indian freight."
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto px-4">
            <div className="relative group bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 transition-all duration-500 hover:shadow-md hover:border-[#268999]/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-orange-500 flex items-center justify-center text-white text-xl font-black shadow-lg">
                  SN
                </div>
                <div>
                  <h4 className="text-xl font-black text-zinc-900">Shri Narayan</h4>
                  <p className="text-[#268999] font-bold text-[10px] uppercase tracking-widest">Founder</p>
                </div>
              </div>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                A visionary leader dedicated to transforming traditional logistics through scalable digital ecosystems and technological innovation.
              </p>
            </div>
            <div className="relative group bg-white p-8 rounded-[2rem] shadow-sm border border-zinc-100 transition-all duration-500 hover:shadow-md hover:border-orange-500/20">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-[#268999] flex items-center justify-center text-white text-xl font-black shadow-lg">
                  AP
                </div>
                <div>
                  <h4 className="text-xl font-black text-zinc-900">Amritesh Pandey</h4>
                  <p className="text-orange-500 font-bold text-[10px] uppercase tracking-widest">Co-Founder</p>
                </div>
              </div>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed font-medium">
                Focusing on building resilient operational frameworks and the robust technology infrastructure that powers our logistics network.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Corporate Presence - Full Mobile Optimization */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="bg-zinc-900 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl mx-2 md:mx-0">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#268999] opacity-10 rounded-full blur-[100px] -mr-40 -mt-40" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
              <div className="lg:col-span-7 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-black mb-10 leading-[1.1]">
                  Strategic Presence in <br /> 
                  <span className="text-orange-500 text-2xl md:text-4xl">Ahmedabad, Gujarat</span>
                </h2>
                <div className="space-y-6 text-left max-w-md mx-auto lg:mx-0">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <FaShield className="text-[#268999] text-base" />
                    </div>
                    <div>
                      <strong className="text-zinc-400 uppercase tracking-widest text-[9px] font-black block mb-1">Registered Address</strong>
                      <p className="text-white text-sm md:text-base font-medium leading-relaxed">
                        4th Floor, BIJAL BUSINESS CENTRE, C-425, Opp. Shyam Icon, Aslali, Ahmedabad, 382427
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                      <FaGlobe className="text-[#268999] text-base" />
                    </div>
                    <div>
                      <strong className="text-zinc-400 uppercase tracking-widest text-[9px] font-black block mb-1">Inquiries</strong>
                      <p className="text-white text-sm md:text-base font-medium">contact@apexcelmove.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-5">
                <div className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-white/10 h-full flex flex-col justify-center text-center lg:text-left">
                  <FaChartLine className="text-3xl text-orange-500 mb-6 mx-auto lg:mx-0" />
                  <h4 className="text-xl font-black mb-4 tracking-tight">Pan-India Impact</h4>
                  <p className="text-zinc-300 text-sm md:text-base font-medium leading-relaxed mb-8">
                    As a fast-growing logistics startup, we are committed to building a modern, scalable platform that helps businesses move goods efficiently across the nation.
                  </p>
                  <Link href="/services" className="group inline-flex items-center justify-center lg:justify-start gap-3 text-white font-black text-base">
                    <span>Explore Solutions</span>
                    <FaArrowRight className="text-orange-500 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}