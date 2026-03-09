import Container from "@/components/layout/Container";

const steps = [
  { id: "01", title: "Enter Load Details", desc: "Pickup location, load type & size." },
  { id: "02", title: "AI Matches Truck", desc: "Best-fit vehicle based on route." },
  { id: "03", title: "View Rates & Book", desc: "See transparent rates & confirm." },
  { id: "04", title: "Track the Trip", desc: "Live updates from pickup to drop." },
  { id: "05", title: "Delivery & Closure", desc: "Delivery confirmed & POD handled." },
];

export default function ProcessFlow() {
  return (
    <section id="how-it-works" className="relative py-24 mx-4 overflow-hidden">
      {/* High-End Background Styling */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50/30 to-white -z-20" />
      
      {/* Digital Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      <Container>
        <div className="text-center mb-24">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#268999]/10 text-[#268999] text-xs font-black uppercase tracking-[0.2em] mb-4">
            Workflow
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-6 tracking-tight">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#268999] to-orange-500">Apexcel Move</span> Works
          </h2>
          <p className="text-zinc-500 font-bold text-lg max-w-xl mx-auto opacity-80">
            Smart logistics process designed for speed and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              
              {/* Card Container with Glassmorphism */}
              <div className="relative z-10 p-8 rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white hover:border-[#268999]/30 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(38,137,153,0.1)] hover:-translate-y-2 text-center lg:text-left h-full">
                
                {/* Highlighted Gradient Number */}
                <div className="relative mb-6 inline-block">
                  <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#268999] via-[#268999] to-orange-400 opacity-90 group-hover:opacity-100 transition-all">
                    {step.id}
                  </span>
                  <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-[#268999] to-transparent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                </div>

                <h4 className="text-zinc-900 text-xl font-black mb-4 tracking-tight">
                  {step.title}
                </h4>
                <p className="text-zinc-500 text-sm font-bold leading-relaxed group-hover:text-zinc-700 transition-colors">
                  {step.desc}
                </p>
              </div>

              {/* Animated Connector Line (Visible on LG screens) */}
              {i !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-[2px] z-0">
                   <div className="w-full h-full border-t-2 border-dashed border-orange-200/60 relative">
                      <div className="absolute top-[-4px] right-0 w-2 h-2 rounded-full bg-orange-300 shadow-[0_0_10px_orange]" />
                   </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}