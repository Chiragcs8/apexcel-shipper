"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import { FaArrowRight, FaShareNodes, FaArrowRightArrowLeft } from "react-icons/fa6";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

// --- Types ---
type TruckType = "Open" | "Closed" | "Container" | "Trailer";
type TimeRange = "1Y" | "6M" | "1M";

// --- Options Arrays ---
const tonOptionsOpen = [4, 6, 7, 8, 10, 15, 16, 20, 24, 25, 40, 45];
const heightOptions = [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12];
const feetOptionsOpen = [17, 19, 20, 22, 24, 27, 32];
const wheelOptions = [10, 12, 14, 16, 18];
const feetOptionsClosed = [14, 17, 20, 22, 24, 40, 42];
const feetOptionsContainer = [20, 40];
const feetOptionsTrailer = [20, 22, 24, 28, 30, 32, 40];
const variants32Ft = [
  "Single Axle",
  "Multi Axle",
  "Single Axle HC",
  "Multi Axle HC",
  "Triple Axle",
  "Triple Axle HC",
];

export default function TruckRateSection() {
  // --- Filter State ---
  const [truckType, setTruckType] = useState<TruckType>("Open");

  const [selectedTon, setSelectedTon] = useState<number | "Other">(10);
  const [customTon, setCustomTon] = useState<string>("");
  const [tonError, setTonError] = useState<string | null>(null);

  const [selectedHeight, setSelectedHeight] = useState<number | "Other">(10);
  const [customHeight, setCustomHeight] = useState<string>("");
  const [heightError, setHeightError] = useState<string | null>(null);

  const [selectedFeet, setSelectedFeet] = useState<number | "Other" | null>(17);
  const [customFeet, setCustomFeet] = useState<string>("");
  const [feetError, setFeetError] = useState<string | null>(null);

  const [selectedWheel, setSelectedWheel] = useState<number | "Other" | null>(null);
  const [customWheel, setCustomWheel] = useState<string>("");
  const [wheelError, setWheelError] = useState<string | null>(null);

  const [selectedVariant32, setSelectedVariant32] = useState<string>("");
  const [trailerLBH, setTrailerLBH] = useState<string>("");

  // --- Graph State ---
  const [timeRange, setTimeRange] = useState<TimeRange>("1Y");
  const [graphData, setGraphData] = useState<any[]>([]);

  // --- Logic: Generate Data ---
  useEffect(() => {
    const data = [];
    const today = new Date();

    if (timeRange === "1M") {
      // Daily Data (30 Days)
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        data.push({
          name: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
          fullDate: d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
          rate: Math.floor(Math.random() * (35000 - 26000 + 1) + 26000),
        });
      }
    } else {
      // Monthly Data
      const months = timeRange === "6M" ? 5 : 11;
      for (let i = months; i >= 0; i--) {
        const d = new Date();
        d.setMonth(today.getMonth() - i);
        data.push({
          name: d.toLocaleDateString("en-GB", { month: "short", year: "2-digit" }),
          fullDate: d.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
          rate: Math.floor(Math.random() * (35000 - 26000 + 1) + 26000),
        });
      }
    }
    setGraphData(data);
  }, [timeRange]);

  // --- Helpers ---
  const resetFieldsForType = (type: TruckType) => {
    setTruckType(type);
    setSelectedVariant32("");
    setCustomFeet("");
    setFeetError(null);
    setCustomWheel("");
    setWheelError(null);
    setCustomTon("");
    setTonError(null);
    setCustomHeight("");
    setHeightError(null);
    setTrailerLBH("");

    if (type === "Open") {
      setSelectedFeet(17);
      setSelectedWheel(null);
      setSelectedHeight(10);
      setSelectedTon(10);
    } else if (type === "Closed") {
      setSelectedFeet(14);
      setSelectedWheel(null);
      setSelectedHeight(10);
      setSelectedTon(10);
    } else if (type === "Container") {
      setSelectedFeet(20);
      setSelectedWheel(null);
      setSelectedHeight(10);
      setSelectedTon(10);
    } else {
      setSelectedFeet(20);
      setSelectedWheel(null);
      setSelectedHeight(10);
      setSelectedTon(90 as number);
    }
  };

  const handleOpenSelection = (type: "feet" | "wheel", value: number) => {
    if (type === "feet") {
      setSelectedFeet(value);
      setSelectedWheel(null);
      setCustomWheel("");
      setWheelError(null);
    } else {
      setSelectedWheel(value);
      setSelectedFeet(null);
      setCustomFeet("");
      setFeetError(null);
    }
  };

  const handleTonChange = (val: string, min: number, max: number) => {
    setCustomTon(val);
    const num = parseFloat(val);
    if (val !== "" && (num < min || num > max)) setTonError(`${min}-${max}`);
    else setTonError(null);
  };

  const handleHeightChange = (val: string) => {
    setCustomHeight(val);
    const num = parseFloat(val);
    if (val !== "" && (num < 8 || num > 15)) setHeightError("8-15");
    else setHeightError(null);
  };

  const handleFeetChange = (val: string, min: number, max: number) => {
    setCustomFeet(val);
    const num = parseFloat(val);
    if (val !== "" && (num < min || num > max)) setFeetError(`${min}-${max}`);
    else setFeetError(null);
  };

  const handleWheelChange = (val: string) => {
    setCustomWheel(val);
    const num = parseFloat(val);
    if (val !== "" && (num < 4 || num > 40)) setWheelError("4-40");
    else setWheelError(null);
  };

  const getSummaryString = () => {
    let summary = truckType === "Container" ? "IMP/EXP CONTAINER" : `${truckType.toUpperCase()}`;

    if (truckType === "Open") {
      if (selectedFeet) summary += ` • ${selectedFeet === "Other" ? customFeet : selectedFeet}FT`;
      if (selectedWheel) summary += ` • ${selectedWheel === "Other" ? customWheel : selectedWheel} WHEEL`;
      const heightDisplay = selectedHeight === "Other" ? customHeight : selectedHeight;
      const tonDisplay = selectedTon === "Other" ? customTon : selectedTon;
      summary += ` • H ${heightDisplay || "--"} FT`;
      summary += ` • ${tonDisplay || "--"} MT`;
    } else if (truckType === "Closed") {
      if (selectedFeet) summary += ` • ${selectedFeet === "Other" ? customFeet : selectedFeet}FT`;
      if (selectedVariant32) summary += ` • ${selectedVariant32.toUpperCase()}`;
      const heightDisplay = selectedHeight === "Other" ? customHeight : selectedHeight;
      const tonDisplay = selectedTon === "Other" ? customTon : selectedTon;
      summary += ` • H ${heightDisplay || "--"} FT`;
      summary += ` • ${tonDisplay || "--"} MT`;
    } else if (truckType === "Container") {
      if (selectedFeet) summary += ` • ${selectedFeet === "Other" ? customFeet : selectedFeet}FT`;
      const heightDisplay = selectedHeight === "Other" ? customHeight : selectedHeight;
      const tonDisplay = selectedTon === "Other" ? customTon : selectedTon;
      summary += ` • H ${heightDisplay || "--"} FT`;
      summary += ` • ${tonDisplay || "--"} MT`;
    } else if (truckType === "Trailer") {
      if (selectedFeet) summary += ` • ${selectedFeet === "Other" ? customFeet : selectedFeet}FT`;
      if (trailerLBH) summary += ` • LBH ${trailerLBH}`;
      const tonDisplay = selectedTon === "Other" ? customTon : selectedTon;
      summary += ` • ${tonDisplay || "--"} MT`;
    }

    return summary;
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const currentTon = selectedTon === "Other" ? (customTon || "0") : selectedTon;
      return (
        <div className="bg-zinc-900/95 backdrop-blur text-white p-3 rounded-lg text-xs shadow-xl border border-zinc-700/50 min-w-[130px]">
          <p className="font-bold text-zinc-300 mb-2 border-b border-zinc-600 pb-1">{payload[0].payload.fullDate}</p>
          <div className="space-y-1">
            <p className="flex justify-between gap-3"><span className="text-zinc-400">Load:</span><span className="font-bold text-orange-400">{currentTon} MT</span></p>
            <p className="flex justify-between gap-3"><span className="text-zinc-400">Rate:</span><span className="font-bold text-[#268999]">₹{payload[0].value.toLocaleString("en-IN")}</span></p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="py-12 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-zinc-900 mb-2">
            Check <span className="text-orange-600">Truck Rates</span>
          </h2>
          <p className="text-zinc-500 text-sm">
            Get real-time market trends for any route across India.
          </p>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* --- LEFT SIDE: Filters --- */}
          <div className="lg:col-span-5 flex flex-col gap-3 h-[500px]">
            
            {/* Tabs */}
            <div className="flex p-1 bg-zinc-100 rounded-xl shrink-0 border border-zinc-200">
              {(["Open", "Closed", "Container", "Trailer"] as TruckType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => resetFieldsForType(type)}
                  className={`flex-1 py-2 text-[11px] font-extrabold uppercase tracking-wide rounded-lg transition-all duration-300 ${
                    truckType === type
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-200/50"
                  }`}
                >
                  {type === "Container" ? "Imp/Exp" : type}
                </button>
              ))}
            </div>

            {/* Filter Box: Flex-col with standard gap (No justify-between, No mt-auto) */}
            <div className="flex-1 flex flex-col p-5 border border-zinc-100 rounded-xl shadow-sm bg-white overflow-y-auto">
              
              <div className="flex flex-col gap-5">
                
                {/* --- Dynamic Section --- */}

                {/* 1. FEET FIRST */}
                {truckType === "Open" && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Select Feet</label>
                      {feetError && <span className="text-[9px] font-bold text-red-500 animate-pulse">{feetError}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {feetOptionsOpen.map((ft) => (
                        <button
                          key={ft}
                          onClick={() => handleOpenSelection("feet", ft)}
                          className={`h-8 px-3 text-[11px] font-bold rounded-lg border transition-all ${
                            selectedFeet === ft ? "bg-[#268999] text-white border-[#268999]" : "bg-white text-zinc-600 border-zinc-200 hover:border-[#268999]"
                          }`}
                        >
                          {ft} ft
                        </button>
                      ))}
                      <button
                        onClick={() => {
                          setSelectedFeet("Other");
                          setSelectedWheel(null);
                        }}
                        className={`h-8 px-3 text-[11px] font-bold rounded-lg border transition-all ${
                          selectedFeet === "Other" ? "bg-[#268999] text-white border-[#268999]" : "bg-white text-zinc-600 border-zinc-200"
                        }`}
                      >
                        Other
                      </button>
                      {selectedFeet === "Other" && (
                        <input
                          type="number"
                          value={customFeet}
                          onChange={(e) => handleFeetChange(e.target.value, 14, 40)}
                          placeholder="14-40"
                          className={`w-16 h-8 text-[11px] px-2 border rounded-lg focus:outline-none ${
                            feetError ? "border-red-500 bg-red-50" : "border-zinc-300 focus:border-[#268999]"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                )}

                {(truckType === "Closed") && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Select Feet</label>
                      <div className="flex flex-wrap gap-2">
                        {feetOptionsClosed.map((ft) => (
                          <button
                            key={ft}
                            onClick={() => {
                              setSelectedFeet(ft);
                              if (ft !== 32) setSelectedVariant32("");
                            }}
                            className={`h-8 px-3 text-[11px] font-bold rounded-lg border transition-all ${
                              selectedFeet === ft ? "bg-[#268999] text-white border-[#268999]" : "bg-white text-zinc-600 border-zinc-200 hover:border-[#268999]"
                            }`}
                          >
                            {ft} ft
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">32 ft Options</label>
                      <div className="flex flex-wrap gap-2">
                        {variants32Ft.map((variant) => (
                          <button
                            key={variant}
                            onClick={() => {
                              setSelectedFeet(32);
                              setSelectedVariant32(variant);
                            }}
                            className={`h-8 px-3 text-[11px] font-bold rounded-lg border transition-all ${
                              selectedVariant32 === variant ? "bg-[#268999] text-white border-[#268999]" : "bg-white text-zinc-600 border-zinc-200 hover:border-[#268999]"
                            }`}
                          >
                            {variant}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {truckType === "Container" && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Select Feet</label>
                    <div className="flex flex-wrap gap-2">
                      {feetOptionsContainer.map((ft) => (
                        <button
                          key={ft}
                          onClick={() => setSelectedFeet(ft)}
                          className={`h-8 px-3 text-[11px] font-bold rounded-lg border transition-all ${
                            selectedFeet === ft ? "bg-[#268999] text-white border-[#268999]" : "bg-white text-zinc-600 border-zinc-200 hover:border-[#268999]"
                          }`}
                        >
                          {ft} ft
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {truckType === "Trailer" && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Select Feet</label>
                      <div className="flex flex-wrap gap-2">
                        {feetOptionsTrailer.map((ft) => (
                          <button
                            key={ft}
                            onClick={() => setSelectedFeet(ft)}
                            className={`h-8 px-3 text-[11px] font-bold rounded-lg border transition-all ${
                              selectedFeet === ft ? "bg-[#268999] text-white border-[#268999]" : "bg-white text-zinc-600 border-zinc-200 hover:border-[#268999]"
                            }`}
                          >
                            {ft} ft
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* 2. HEIGHT AFTER FEET */}
                {(truckType === "Open" || truckType === "Closed" || truckType === "Container") && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Height (ft)</label>
                      {heightError && <span className="text-[9px] font-bold text-red-500 animate-pulse">{heightError}</span>}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {heightOptions.map((ht) => (
                        <button
                          key={ht}
                          onClick={() => {
                            setSelectedHeight(ht);
                            setHeightError(null);
                          }}
                          className={`px-2 h-8 text-[10px] font-bold rounded-lg border transition-all ${
                            selectedHeight === ht ? "bg-orange-600 text-white border-orange-600" : "bg-white text-zinc-600 border-zinc-200 hover:border-orange-400"
                          }`}
                        >
                          {ht}
                        </button>
                      ))}
                      <button
                        onClick={() => setSelectedHeight("Other")}
                        className={`h-8 px-2 text-[10px] font-bold rounded-lg border transition-all ${
                          selectedHeight === "Other" ? "bg-orange-600 text-white border-orange-600" : "bg-white text-zinc-600 border-zinc-200"
                        }`}
                      >
                        Other
                      </button>
                      {selectedHeight === "Other" && (
                        <input
                          type="number"
                          value={customHeight}
                          onChange={(e) => handleHeightChange(e.target.value)}
                          placeholder="8-15"
                          className={`w-14 h-8 text-[11px] px-2 border rounded-lg focus:outline-none ${
                            heightError ? "border-red-500 bg-red-50" : "border-zinc-300 focus:border-orange-400"
                          }`}
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* 3. WHEEL AFTER HEIGHT FOR OPEN ONLY */}
                {truckType === "Open" && (
                  <>
                    <div className="relative flex items-center">
                      <div className="flex-grow border-t border-zinc-100"></div>
                      <span className="flex-shrink-0 mx-2 text-zinc-300 text-[9px] font-bold uppercase">OR</span>
                      <div className="flex-grow border-t border-zinc-100"></div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Select Fleet Wheel / Tyre</label>
                        {wheelError && <span className="text-[9px] font-bold text-red-500 animate-pulse">{wheelError}</span>}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {wheelOptions.map((whl) => (
                          <button
                            key={whl}
                            onClick={() => handleOpenSelection("wheel", whl)}
                            className={`h-8 px-3 text-[11px] font-bold rounded-lg border transition-all ${
                              selectedWheel === whl ? "bg-[#268999] text-white border-[#268999]" : "bg-white text-zinc-600 border-zinc-200 hover:border-[#268999]"
                            }`}
                          >
                            {whl} wheel
                          </button>
                        ))}
                        <button
                          onClick={() => {
                            setSelectedWheel("Other");
                            setSelectedFeet(null);
                          }}
                          className={`h-8 px-3 text-[11px] font-bold rounded-lg border transition-all ${
                            selectedWheel === "Other" ? "bg-[#268999] text-white border-[#268999]" : "bg-white text-zinc-600 border-zinc-200"
                          }`}
                        >
                          Other
                        </button>
                        {selectedWheel === "Other" && (
                          <input
                            type="number"
                            value={customWheel}
                            onChange={(e) => handleWheelChange(e.target.value)}
                            placeholder="4-40"
                            className={`w-16 h-8 text-[11px] px-2 border rounded-lg focus:outline-none ${
                              wheelError ? "border-red-500 bg-red-50" : "border-zinc-300 focus:border-[#268999]"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* 4. TON AFTER WHEEL */}
                <hr className="border-dashed border-zinc-200" />

                {truckType === "Trailer" && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">LBH (Manual Type)</label>
                    <input
                      type="text"
                      value={trailerLBH}
                      onChange={(e) => setTrailerLBH(e.target.value)}
                      placeholder="Enter LBH"
                      className="w-full h-10 text-sm px-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-[#268999]"
                    />
                  </div>
                )}

                {/* Ton Selection */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Ton (MT)</label>
                    {tonError && <span className="text-[9px] font-bold text-red-500 animate-pulse">{tonError}</span>}
                  </div>

                  {truckType !== "Trailer" ? (
                    <div className="flex flex-wrap items-center gap-2">
                      {tonOptionsOpen.map((ton) => (
                        <button
                          key={ton}
                          onClick={() => { setSelectedTon(ton); setTonError(null); }}
                          className={`w-8 h-8 text-[10px] font-bold rounded-lg border transition-all ${
                            selectedTon === ton ? "bg-orange-600 text-white border-orange-600" : "bg-white text-zinc-600 border-zinc-200 hover:border-orange-400"
                          }`}
                        >
                          {ton}
                        </button>
                      ))}
                      <button
                        onClick={() => setSelectedTon("Other")}
                        className={`h-8 px-2 text-[10px] font-bold rounded-lg border transition-all ${
                          selectedTon === "Other" ? "bg-orange-600 text-white border-orange-600" : "bg-white text-zinc-600 border-zinc-200"
                        }`}
                      >
                        Other
                      </button>
                      {selectedTon === "Other" && (
                        <input
                          type="number"
                          value={customTon}
                          onChange={(e) => handleTonChange(e.target.value, 4, 50)}
                          placeholder="4-50"
                          className={`w-14 h-8 text-[11px] px-2 border rounded-lg focus:outline-none ${
                            tonError ? "border-red-500 bg-red-50" : "border-zinc-300 focus:border-orange-400"
                          }`}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => { setSelectedTon(90); setTonError(null); }}
                        className={`h-8 px-3 text-[10px] font-bold rounded-lg border transition-all ${
                          selectedTon === 90 ? "bg-orange-600 text-white border-orange-600" : "bg-white text-zinc-600 border-zinc-200 hover:border-orange-400"
                        }`}
                      >
                        90
                      </button>
                      <button
                        onClick={() => setSelectedTon("Other")}
                        className={`h-8 px-2 text-[10px] font-bold rounded-lg border transition-all ${
                          selectedTon === "Other" ? "bg-orange-600 text-white border-orange-600" : "bg-white text-zinc-600 border-zinc-200"
                        }`}
                      >
                        Other
                      </button>
                      {selectedTon === "Other" && (
                        <input
                          type="number"
                          value={customTon}
                          onChange={(e) => handleTonChange(e.target.value, 6, 60)}
                          placeholder="6-60"
                          className={`w-14 h-8 text-[11px] px-2 border rounded-lg focus:outline-none ${
                            tonError ? "border-red-500 bg-red-50" : "border-zinc-300 focus:border-orange-400"
                          }`}
                        />
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: Graph Dashboard --- */}
          <div className="lg:col-span-7 h-[500px]">
            <div className="h-full bg-white border border-zinc-200 rounded-xl p-6 shadow-lg shadow-zinc-200/50 flex flex-col">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 shrink-0">
                <Link href="/truck-rate">
                  <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 rounded-lg p-2 px-4 hover:border-orange-300 transition-colors cursor-pointer group">
                    <span className="flex items-center gap-2 text-xs font-bold text-zinc-700"><span className="w-2 h-2 rounded-full bg-green-500"></span>Ahmedabad</span>
                    <FaArrowRightArrowLeft className="text-black text-sm group-hover:text-orange-600 transition-colors" />
                    <span className="flex items-center gap-2 text-xs font-bold text-zinc-700"><span className="w-2 h-2 rounded-full bg-red-500"></span>Mumbai</span>
                  </div>
                </Link>
                <div className="flex bg-zinc-100 p-1 rounded-lg">
                  {(["1Y", "6M", "1M"] as const).map((range) => (
                    <button key={range} onClick={() => setTimeRange(range)} className={`px-3 py-1 text-[11px] font-bold rounded-md transition-all ${timeRange === range ? "bg-orange-600 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-700"}`}>{range}</button>
                  ))}
                </div>
              </div>

              {/* Graph: Fills remaining space */}
              <div className="flex-1 w-full min-h-0 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={graphData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#268999" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#268999" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 10 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 10 }} ticks={[0, 10000, 20000, 30000, 40000, 50000]} domain={[0, 50000]} tickFormatter={(value) => value === 0 ? "0" : `${value / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="rate" stroke="#268999" strokeWidth={2} fillOpacity={1} fill="url(#colorRate)" activeDot={{ r: 6, strokeWidth: 0, stroke: "#fff", strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Footer */}
              <div className="shrink-0 flex flex-col gap-4 border-t border-zinc-100 pt-4">
                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                  <span className="px-3 py-1.5 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm">{getSummaryString()}</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-5 text-sm justify-center md:justify-start">
                    <div className="flex flex-col"><span className="text-[9px] uppercase text-zinc-400 font-bold tracking-wider">Min</span><span className="font-bold text-zinc-900">₹26,000</span></div>
                    <div className="flex flex-col"><span className="text-[9px] uppercase text-zinc-400 font-bold tracking-wider">Max</span><span className="font-bold text-zinc-900">₹35,000</span></div>
                    <div className="flex flex-col"><span className="text-[9px] uppercase text-zinc-400 font-bold tracking-wider">Avg</span><span className="font-bold text-orange-600">₹29,300</span></div>
                  </div>
                  <div className="flex items-center gap-2 justify-center md:justify-end">
                    <button onClick={() => { if (typeof window !== "undefined") navigator.clipboard.writeText(window.location.href); alert("Link copied!"); }} className="p-2.5 rounded-lg border border-zinc-200 text-zinc-500 hover:text-[#268999] hover:border-[#268999] transition-all"><FaShareNodes /></button>
                    <Link href="/truck-rate"><button className="flex items-center gap-2 bg-[#268999] hover:bg-[#1f7380] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">Check Details <FaArrowRight /></button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}