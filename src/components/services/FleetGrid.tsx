import Container from "@/components/layout/Container";

const fleets = [
  { id: "hire-truck", type: "Open Truck", capacity: "4–50 MT capacity", specs: "17 ft to 18 wheelers", use: "Flexible for bulk & general cargo transportation." },
  { type: "Closed Body", capacity: "Weather-protected", specs: "14 ft to 42 ft options", use: "Secure transport for high-value & sensitive goods." },
  { type: "Import–Export", capacity: "Standard & High-Cube", specs: "Factory ↔ Port ↔ Warehouse", use: "Container-ready logistics for EXIM routes." },
  { type: "Trailer", capacity: "Heavy Duty Loads", specs: "20 ft to 40 ft Flatbed", use: "Ideal for steel, machinery, and oversized cargo." },
];

export default function FleetGrid() {
  return (
    <Container>
      <div id="hire-truck" className="mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-zinc-900 mb-4">Our Versatile Fleet</h2>
        <p className="text-zinc-500 font-medium text-lg">Choose from a wide range of vehicles designed for Indian terrain.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {fleets.map((fleet, i) => (
          <div key={i} className="bg-zinc-50 rounded-[2rem] p-8 border border-transparent hover:border-[#268999]/30 hover:bg-white hover:shadow-xl transition-all group">
            <h4 className="text-2xl font-black text-zinc-900 mb-2">{fleet.type}</h4>
            <span className="text-orange-600 font-bold text-sm block mb-6">{fleet.specs}</span>
            <p className="text-zinc-600 mb-8 font-medium h-20">{fleet.use}</p>
            <div className="bg-[#268999]/5 rounded-2xl p-4">
              <span className="text-[10px] font-black text-[#268999] uppercase tracking-widest">Capability</span>
              <p className="text-zinc-900 font-bold mt-1">{fleet.capacity}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}