"use client";
import { useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { podPoints, PodPoint } from "@/data/podPoints";
import { FaPhone, FaLocationDot, FaUserTie } from "react-icons/fa6";

// Custom SVG Icons
const createIcon = (color: string) => L.divIcon({
  className: "custom-pin",
  html: `<svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 0C6.71573 0 0 6.71573 0 15C0 26.25 15 42 15 42C15 42 30 26.25 30 15C30 6.71573 23.2843 0 15 0Z" fill="${color}"/><circle cx="15" cy="15" r="6" fill="white"/></svg>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -40]
});

const corporateIcon = createIcon("#f97316"); // Orange
const operationsIcon = createIcon("#268999"); // Teal

// Helper to handle map centering
function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default function PodMap() {
  const [activePoint, setActivePoint] = useState<PodPoint | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([22.5, 78.5]);
  const [mapZoom, setMapZoom] = useState(5);

  const handleBranchClick = (point: PodPoint) => {
    setActivePoint(point);
    setMapCenter([point.lat, point.lng]);
    setMapZoom(12);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[700px] rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-2xl bg-white">
      {/* Sidebar */}
      <div className="w-full lg:w-80 h-1/3 lg:h-full bg-zinc-50 overflow-y-auto border-r border-zinc-100 p-6 scrollbar-hide">
        <h3 className="font-black text-zinc-900 mb-6 uppercase text-xs tracking-widest text-[#268999]">Operational Hubs</h3>
        <div className="space-y-3">
          {podPoints.map((point) => (
            <button
              key={point.id}
              onClick={() => handleBranchClick(point)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                activePoint?.id === point.id 
                ? "bg-white border-[#268999] shadow-lg shadow-[#268999]/10" 
                : "bg-transparent border-transparent hover:bg-white hover:shadow-sm"
              }`}
            >
              <p className="font-black text-zinc-900">{point.branch}</p>
              <p className="text-[10px] font-bold text-zinc-400 mt-1 uppercase">{point.type} Center</p>
            </button>
          ))}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative z-0">
        <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true} className="w-full h-full">
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {podPoints.map((point) => (
            <Marker 
              key={point.id} 
              position={[point.lat, point.lng]} 
              icon={point.type === "Corporate" ? corporateIcon : operationsIcon}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h4 className="font-black text-[#268999] text-base mb-2 border-b pb-1">{point.branch}</h4>
                  <div className="space-y-2 text-xs font-medium text-zinc-600">
                    <p className="flex items-center gap-2"><FaUserTie className="text-[#268999]" /> {point.head}</p>
                    <p className="flex items-center gap-2"><FaPhone className="text-orange-500" /> {point.contact}</p>
                    <p className="flex items-start gap-2"><FaLocationDot className="text-zinc-400" /> {point.address}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-[10px] font-black text-zinc-600 uppercase">Corporate Headquarter</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#268999]" />
            <span className="text-[10px] font-black text-zinc-600 uppercase">Operations Hub</span>
          </div>
        </div>
      </div>
    </div>
  );
}