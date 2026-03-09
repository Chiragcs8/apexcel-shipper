"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, MapPin, ChevronDown, Filter, ArrowRight, CalendarDays, 
  CheckCircle2, HelpCircle, Clock, CreditCard, Map, ShieldCheck, Smartphone 
} from "lucide-react";

export default function TruckRatePage() {
  // States for Filters
  const [sourceDirection, setSourceDirection] = useState("");
  const [sourceLocation, setSourceLocation] = useState("");
  
  const [destDirection, setDestDirection] = useState("");
  const [destLocation, setDestLocation] = useState("");
  
  const [truckType, setTruckType] = useState("Open");
  const [openSelectionType, setOpenSelectionType] = useState("Feet");

  // State for Load More functionality
  const [visibleCount, setVisibleCount] = useState(5);

  // Dummy Rates Data
  const dummyRates = [
    { id: 1, pickup: "Ahmedabad, Gujarat", drop: "Mumbai, Maharashtra", tonnage: "15 Ton", date: "08-Mar-26", truckDesc: "32 FT Multi Axle", rate: "₹30,000" },
    { id: 2, pickup: "Lucknow, UP", drop: "Delhi, NCR", tonnage: "9 Ton", date: "07-Mar-26", truckDesc: "20 FT Closed Body", rate: "₹18,500" },
    { id: 3, pickup: "Surat, Gujarat", drop: "Pune, Maharashtra", tonnage: "20 Ton", date: "08-Mar-26", truckDesc: "12 Wheeler Open", rate: "₹25,000" },
    { id: 4, pickup: "Chennai, TN", drop: "Bangalore, KA", tonnage: "25 Ton", date: "06-Mar-26", truckDesc: "40 FT Trailer", rate: "₹42,000" },
    { id: 5, pickup: "Kolkata, WB", drop: "Patna, Bihar", tonnage: "15 Ton", date: "05-Mar-26", truckDesc: "32 FT Single Axle", rate: "₹28,500" },
    { id: 6, pickup: "Jaipur, RJ", drop: "Indore, MP", tonnage: "10 Ton", date: "04-Mar-26", truckDesc: "19 FT Open", rate: "₹21,000" },
    { id: 7, pickup: "Hyderabad, TS", drop: "Pune, MH", tonnage: "20 Ton", date: "03-Mar-26", truckDesc: "32 FT Closed", rate: "₹35,000" },
    { id: 8, pickup: "Ludhiana, PB", drop: "Kolkata, WB", tonnage: "25 Ton", date: "02-Mar-26", truckDesc: "14 Wheeler Open", rate: "₹55,000" },
    { id: 9, pickup: "Ahmedabad, GJ", drop: "Delhi, NCR", tonnage: "15 Ton", date: "01-Mar-26", truckDesc: "24 FT Container", rate: "₹32,000" },
    { id: 10, pickup: "Nagpur, MH", drop: "Bhopal, MP", tonnage: "9 Ton", date: "28-Feb-26", truckDesc: "17 FT Open", rate: "₹14,500" },
  ];

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const faqs = [
    { icon: <Clock className="w-5 h-5" />, q: "Are the displayed truck rates live or average?", a: "The rates shown are recent market averages based on historical bookings. Live booking prices may slightly vary based on current demand and fuel prices." },
    { icon: <CreditCard className="w-5 h-5" />, q: "How are the transport rates calculated?", a: "Rates depend on the route distance, truck type, payload capacity (tonnage), vehicle availability, and regional tolls." },
    { icon: <ShieldCheck className="w-5 h-5" />, q: "Are there any hidden charges like toll or tax?", a: "Typically, the estimated cost shown is freight-only. GST, Toll, and Loading/Unloading charges may be separate unless specified otherwise." },
    { icon: <Map className="w-5 h-5" />, q: "Which locations do you cover across India?", a: "We cover pan-India routes across North, South, East, and West zones, supporting both major metropolitan corridors and regional towns." },
    { icon: <HelpCircle className="w-5 h-5" />, q: "Can I negotiate the freight charges shown here?", a: "The displayed rates act as a strong baseline reference. Final prices can often be optimized when confirming the booking with our support team." },
    { icon: <Smartphone className="w-5 h-5" />, q: "How do I book a truck after checking the rate?", a: "Simply click the 'Book Now' button next to your preferred rate. This will redirect you to our homepage booking engine where you can finalize the shipment details." },
  ];

  return (
    <div className="min-h-screen bg-[#F0F7F8] font-sans pb-16">
      
      {/* CSS for custom scrollbar embedded directly */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #F0F7F8; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c5e1e5; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #268999; }
      `}} />

      {/* 1. Hero / Page Intro */}
      <section className="pt-20 pb-8 px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-1 bg-orange-400 rounded-full"></span>
            <span className="text-[#268999] text-[10px] font-black uppercase tracking-[0.2em]">Logistics Pricing</span>
            <span className="w-8 h-1 bg-orange-400 rounded-full"></span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-[#1a5d68] mb-4 tracking-tight">
            Transport <span className="text-orange-500">Truck Rates.</span>
          </h1>
          <p className="text-sm md:text-base text-[#268999] font-medium opacity-80 max-w-2xl mx-auto px-4">
            Check route-based truck rates across India. Compare recent market entries, understand trends, and choose the right transport option.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[75rem] mx-auto px-4 py-4 grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* LEFT SIDEBAR: Filters (Fixed Height & Sticky on Desktop) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-teal-100 lg:sticky lg:top-24 lg:h-[82vh] overflow-y-auto custom-scrollbar flex flex-col z-20">
          <div className="flex items-center gap-3 mb-6 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#268999] shrink-0">
              <Search size={18} />
            </div>
            <div>
              <h2 className="text-lg font-black text-[#1a5d68]">Find Rates</h2>
              <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest">Route & Vehicle</p>
            </div>
          </div>

          <div className="flex-1 shrink-0">
            {/* Route Search */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-[10px] font-bold uppercase text-[#268999] ml-1 mb-1.5 block">Origin</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative w-full sm:w-1/3 shrink-0">
                      <select 
                          className="w-full px-3 py-3 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] appearance-none text-xs"
                          value={sourceDirection}
                          onChange={(e) => setSourceDirection(e.target.value)}
                      >
                          <option value="">Zone</option>
                          <option value="North">North</option><option value="South">South</option><option value="East">East</option><option value="West">West</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#268999] pointer-events-none" />
                  </div>
                  <div className="relative w-full sm:w-2/3 shrink-0">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#268999]" />
                      <input type="text" placeholder="City or PIN" className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] text-sm placeholder:font-medium placeholder:text-gray-400" value={sourceLocation} onChange={(e) => setSourceLocation(e.target.value)} />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#268999] ml-1 mb-1.5 block">Destination</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative w-full sm:w-1/3 shrink-0">
                      <select 
                          className="w-full px-3 py-3 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] appearance-none text-xs"
                          value={destDirection}
                          onChange={(e) => setDestDirection(e.target.value)}
                      >
                          <option value="">Zone</option>
                          <option value="North">North</option><option value="South">South</option><option value="East">East</option><option value="West">West</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#268999] pointer-events-none" />
                  </div>
                  <div className="relative w-full sm:w-2/3 shrink-0">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-500" />
                      <input type="text" placeholder="City or PIN" className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] text-sm placeholder:font-medium placeholder:text-gray-400" value={destLocation} onChange={(e) => setDestLocation(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            <hr className="mb-6 border-teal-100/50 shrink-0" />

            {/* Truck Type Selection */}
            <label className="text-[10px] font-bold uppercase text-[#268999] ml-1 mb-2 block shrink-0">Select Truck Type</label>
            <div className="grid grid-cols-2 gap-2 mb-6 shrink-0">
              {["Open", "Closed", "Container", "Trailer"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTruckType(type)}
                  className={`py-2.5 px-3 text-xs rounded-xl font-bold transition-all border ${
                    truckType === type
                      ? "bg-[#268999] border-[#268999] text-white shadow-md shadow-[#268999]/20"
                      : "bg-[#F0F7F8]/50 border-teal-100 text-[#1a5d68]/70 hover:bg-white hover:border-[#268999]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Vehicle Configuration */}
            <div className="space-y-4 shrink-0">
              {truckType === "Open" && (
                <>
                  <div className="flex bg-[#F0F7F8] p-1 rounded-xl border border-teal-50">
                    <button onClick={() => setOpenSelectionType("Feet")} className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${openSelectionType === "Feet" ? "bg-white text-[#268999] shadow-sm" : "text-[#1a5d68]/50"}`}>Feet</button>
                    <button onClick={() => setOpenSelectionType("Wheel")} className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all ${openSelectionType === "Wheel" ? "bg-white text-[#268999] shadow-sm" : "text-[#1a5d68]/50"}`}>Wheel</button>
                  </div>

                  <div className="relative">
                      <select className="w-full px-4 py-3 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] appearance-none text-sm">
                      {openSelectionType === "Feet" ? (
                          <>
                          <option>Select Feet</option><option>17 FT</option><option>19 FT</option><option>20 FT</option><option>24 FT</option><option>32 FT</option>
                          </>
                      ) : (
                          <>
                          <option>Select Wheel</option><option>10 Wheel</option><option>12 Wheel</option><option>16 Wheel</option>
                          </>
                      )}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#268999] pointer-events-none" />
                  </div>
                </>
              )}

              {(truckType === "Closed" || truckType === "Container") && (
                  <div className="relative">
                      <select className="w-full px-4 py-3 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] appearance-none text-sm">
                          <option>Select Feet</option><option>20 FT</option><option>24 FT</option><option>32 FT</option><option>40 FT</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#268999] pointer-events-none" />
                  </div>
              )}

              {truckType === "Trailer" && (
                <>
                  <div className="relative mb-2">
                      <select className="w-full px-4 py-3 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] appearance-none text-sm">
                          <option>Select Feet</option><option>20 FT</option><option>40 FT</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#268999] pointer-events-none" />
                  </div>
                  <div>
                      <label className="text-[10px] font-bold uppercase text-[#268999] ml-1 mb-1.5 block">Custom Dimensions (FT)</label>
                      <div className="grid grid-cols-3 gap-2">
                          <input type="number" placeholder="L" className="w-full px-3 py-2.5 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] text-center text-sm" />
                          <input type="number" placeholder="B" className="w-full px-3 py-2.5 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] text-center text-sm" />
                          <input type="number" placeholder="H" className="w-full px-3 py-2.5 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] text-center text-sm" />
                      </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="relative">
                      <select className="w-full px-3 py-3 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] appearance-none text-xs">
                          <option>Height</option><option>8 FT</option><option>10 FT</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#268999] pointer-events-none" />
                  </div>
                  <div className="relative">
                      <select className="w-full px-3 py-3 rounded-xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] outline-none font-bold text-[#1a5d68] appearance-none text-xs">
                          <option>Tonnage</option><option>9 MT</option><option>15 MT</option><option>20 MT</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#268999] pointer-events-none" />
                  </div>
              </div>

              <button className="w-full py-3.5 bg-[#268999] hover:bg-[#1f6d7a] text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-[#268999]/20 flex items-center justify-center gap-2 active:scale-95 group mt-4">
                Apply Filters <Filter size={14} className="group-hover:rotate-12 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Rate Results (Matches Left Side Height Exactly) */}
        <div className="lg:col-span-8 flex flex-col gap-6 lg:sticky lg:top-24 lg:h-[82vh] w-full z-10">
          
          {/* Summary & Average Rate */}
          <div className="bg-[#268999] p-5 md:p-6 rounded-2xl text-white relative overflow-hidden shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-400 opacity-20 rounded-full blur-2xl" />
            <div className="relative z-10">
              <h2 className="text-lg md:text-xl font-black mb-2">Market Average Rate</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white/10 border border-white/20 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">{truckType}</span>
                <span className="bg-white/10 border border-white/20 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">32 FT</span>
                <span className="bg-white/10 border border-white/20 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">15 MT</span>
              </div>
            </div>
            <div className="relative z-10 text-left sm:text-right bg-white p-3 md:p-4 rounded-xl shadow-inner w-full sm:w-auto">
              <p className="text-[9px] font-black uppercase text-orange-500 tracking-widest mb-0.5">Estimated Cost</p>
              <p className="text-2xl md:text-3xl font-black text-[#1a5d68]">₹24,500</p>
            </div>
          </div>

          {/* Results List Container (Fills remaining height and scrolls internally) */}
          <div className="bg-white rounded-2xl shadow-sm border border-teal-100 flex flex-col overflow-hidden relative w-full flex-1 min-h-0">
            
            <div className="flex items-center gap-2 px-4 py-4 border-b border-teal-50 bg-[#F0F7F8]/90 backdrop-blur-md shrink-0 w-full z-10">
                <CheckCircle2 className="text-orange-500 w-4 h-4 shrink-0" />
                <h3 className="text-sm font-black text-[#1a5d68]">Recent Entries ({dummyRates.length} Total)</h3>
            </div>

            <div className="divide-y divide-teal-50 overflow-y-auto flex-1 custom-scrollbar">
              {dummyRates.slice(0, visibleCount).map((rate) => (
                <div key={rate.id} className="p-4 md:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4 hover:bg-[#F0F7F8]/30 transition-colors">
                  
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mb-2.5">
                      <span className="font-bold text-[13px] md:text-sm text-[#1a5d68] break-words">{rate.pickup}</span>
                      <ArrowRight className="w-3 h-3 text-orange-400 shrink-0" />
                      <span className="font-bold text-[13px] md:text-sm text-[#1a5d68] break-words">{rate.drop}</span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                      <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-gray-400">
                          <CalendarDays size={10} /> {rate.date}
                      </div>
                      <span className="w-1 h-1 bg-gray-300 rounded-full mx-0.5"></span>
                      <span className="text-[9px] md:text-[10px] font-bold text-[#268999] bg-teal-50 px-2 py-0.5 rounded-md border border-teal-100">
                          {rate.truckDesc}
                      </span>
                      <span className="text-[9px] md:text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                          {rate.tonnage}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-row items-center justify-between w-full mt-3 pt-3 border-t border-teal-50 md:mt-0 md:pt-0 md:border-t-0 md:w-auto md:flex-col md:items-end gap-2 shrink-0">
                    <div className="text-lg md:text-xl font-black text-[#1a5d68]">{rate.rate}</div>
                    <Link href="/">
                        <button className="bg-white border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-3 md:px-4 py-1.5 rounded-lg font-bold text-[11px] md:text-xs transition-colors whitespace-nowrap shadow-sm">
                            Book Now
                        </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Load More Button */}
            {visibleCount < dummyRates.length && (
                <div className="bg-white border-t border-teal-50 shrink-0 w-full p-3 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] text-center">
                    <button 
                        onClick={handleLoadMore}
                        className="text-[10px] md:text-[11px] font-black text-orange-500 bg-orange-50 hover:bg-orange-100 border border-orange-100 uppercase tracking-widest px-6 py-2 rounded-lg transition-colors w-full sm:w-auto"
                    >
                        Load More Entries
                    </button>
                </div>
            )}
            {visibleCount >= dummyRates.length && (
                <div className="bg-[#F0F7F8]/50 text-center py-3 border-t border-teal-50 shrink-0 w-full">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                        End of Results
                    </span>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO / Content Blocks */}
      <section className="max-w-[75rem] mx-auto px-4 py-10 mt-10">
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-teal-50">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div>
                    <h3 className="text-lg md:text-xl font-black text-[#1a5d68] mb-3">Live Truck Rates Across India</h3>
                    <p className="text-sm text-[#268999] font-medium opacity-80 leading-relaxed">
                        Apexcel Move helps businesses and transport partners view route-based truck rates through a digital interface. Filter rates by pickup, destination, truck type, tonnage, and dimensions to find accurate pricing.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg md:text-xl font-black text-[#1a5d68] mb-3">Transparent Decision Support</h3>
                    <p className="text-sm text-[#268999] font-medium opacity-80 leading-relaxed">
                        Search rates by direction (North, South, East, West), state, or PIN. By showing recent market trends and average rates, we help users make informed booking decisions instantly.
                    </p>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-[75rem] mx-auto px-4 pb-12">
        <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[#1a5d68] mb-3">Frequently Asked Questions</h2>
            <p className="text-sm text-[#268999] font-medium opacity-80">Got questions about our logistics pricing? We've got answers.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-teal-50 hover:shadow-md hover:border-teal-100 transition-all flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 mt-1 border border-orange-100">
                        {faq.icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-[#1a5d68] mb-2 text-sm leading-snug">{faq.q}</h4>
                        <p className="text-[13px] text-[#268999] opacity-80 leading-relaxed">{faq.a}</p>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-[75rem] mx-auto px-4 pb-6">
        <div className="bg-[#1a5d68] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden shadow-lg">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500 opacity-20 rounded-full blur-3xl" />
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tight">Ready to move your freight?</h2>
                <p className="text-xs md:text-sm text-teal-100 font-medium mb-6 px-4">
                    Book the right vehicle for your shipment with clarity and confidence.
                </p>
                <Link href="/">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl text-xs md:text-sm transition-all shadow-md active:scale-95 inline-flex items-center gap-2">
                        Go to Home Page <ArrowRight size={16} />
                    </button>
                </Link>
            </div>
        </div>
      </section>

    </div>
  );
}