"use client";
import { useState, useMemo } from "react";
import Container from "@/components/layout/Container";
import { glossaryData } from "@/data/glossaryData";
import { FaMagnifyingGlass, FaChevronDown } from "react-icons/fa6";

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  // Filter Logic
  const filteredTerms = useMemo(() => {
    const allTerms = Object.values(glossaryData).flat();
    return allTerms.filter(t => 
      t.term.toLowerCase().includes(search.toLowerCase()) &&
      (!activeLetter || t.term.toUpperCase().startsWith(activeLetter))
    );
  }, [search, activeLetter]);

  return (
    <main className="min-h-screen bg-white pt-24 md:pt-32 pb-20">
      <Container>
        {/* Header Section */}
        <div className="max-w-3xl mb-10 md:mb-14 text-center md:text-left px-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#268999]/10 text-[#268999] text-[10px] font-black uppercase tracking-widest mb-4">
            Knowledge Base
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-zinc-900 mb-6 tracking-tight leading-tight">
            Transportation <span className="text-orange-500">Glossary</span>
          </h1>
          <p className="text-sm md:text-lg text-zinc-600 font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
            Learn the industry language. We’ve simplified complex logistics terms to help you manage freight with confidence and clarity.
          </p>
        </div>

        {/* Filter & Search Bar - Responsive Sticky */}
        <div className="sticky top-16 md:top-20 z-40 bg-white/90 backdrop-blur-md py-4 md:py-6 border-y border-zinc-100 mb-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            
            {/* Alphabet Filter - Scrollable on mobile */}
            <div className="w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              <div className="flex justify-start lg:justify-center gap-1.5 min-w-max px-2">
                <button 
                  onClick={() => setActiveLetter(null)}
                  className={`px-3 h-8 md:h-10 rounded-xl text-[10px] md:text-xs font-black transition-all ${!activeLetter ? 'bg-[#268999] text-white shadow-lg' : 'bg-zinc-50 text-zinc-400 hover:bg-orange-50'}`}
                >
                  ALL
                </button>
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setActiveLetter(letter)}
                    className={`w-8 h-8 md:w-10 md:h-10 rounded-xl text-[10px] md:text-xs font-black transition-all ${activeLetter === letter ? 'bg-[#268999] text-white shadow-lg' : 'bg-zinc-50 text-zinc-400 hover:bg-orange-50'}`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-80 px-2 md:px-0">
              <FaMagnifyingGlass className="absolute left-6 md:left-4 top-1/2 -translate-y-1/2 text-zinc-400 size-4" />
              <input 
                type="text" 
                placeholder="Search terms..."
                className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#268999]/20 font-bold text-sm text-zinc-900 placeholder:text-zinc-400"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-0">
          {filteredTerms.length > 0 ? (
            filteredTerms.map((item) => (
              <details key={item.slug} className="group bg-white border border-zinc-100 rounded-[2rem] p-6 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300">
                <summary className="list-none cursor-pointer flex justify-between items-center select-none">
                  <h3 className="text-lg md:text-xl font-black text-zinc-900 group-hover:text-[#268999] transition-colors">
                    {item.term}
                  </h3>
                  <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-open:bg-orange-50 transition-colors">
                    <FaChevronDown className="text-zinc-400 group-open:rotate-180 group-open:text-orange-500 transition-transform size-3" />
                  </div>
                </summary>
                <div className="mt-5 pt-5 border-t border-zinc-50 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="mb-5">
                    <span className="text-[9px] font-black text-[#268999] uppercase tracking-[0.2em] block mb-2">Technical Definition</span>
                    <p className="text-zinc-600 text-sm leading-relaxed font-bold">{item.definition}</p>
                  </div>
                  <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                    <span className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] block mb-2">Practical Example</span>
                    <p className="text-zinc-500 text-sm italic font-bold leading-relaxed">"{item.example}"</p>
                  </div>
                </div>
              </details>
            ))
          ) : (
            <div className="col-span-full py-24 text-center bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                 <FaMagnifyingGlass className="text-zinc-300 text-xl" />
              </div>
              <p className="text-zinc-400 font-black text-lg">No matching terms found.</p>
              <button 
                onClick={() => {setSearch(""); setActiveLetter(null)}}
                className="mt-4 text-[#268999] font-black text-sm uppercase tracking-widest hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}