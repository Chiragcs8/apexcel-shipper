"use client";
import Container from "@/components/layout/Container";

export default function ServiceHero() {
  return (
    <section className="relative pt-32 pb-20 bg-orange-50/30 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10" />
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-bold uppercase tracking-wider mb-6">
            Our Services
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 leading-tight mb-8">
            Smart <span className="text-[#268999]">Freight Solutions</span> for <br />
            Every Load & Route
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 font-medium leading-relaxed">
            Open trucks, closed body, and container movement — powered by AI-based matching for maximum efficiency.
          </p>
        </div>
      </Container>
    </section>
  );
}