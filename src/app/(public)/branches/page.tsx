"use client";
import Container from "@/components/layout/Container";
import { FaPhone, FaLocationDot, FaUserTie, FaHeadset, FaEnvelope } from "react-icons/fa6";

const branches = [
  {
    city: "Gurgaon",
    head: "Vikash Tiwari",
    contact: "+91 8511674047",
    office: "+91 7753911677",
    support: "+91 9974744047",
    address: "402, 4th Floor Pal Tower, Gurgaon, Haryana – 122002"
  },
  {
    city: "Ahmedabad",
    head: "Sudheer Upadhyay",
    contact: "+91 8087185179",
    office: "+91 7753911677",
    support: "+91 9974744047",
    address: "C-425, 4th Floor Bijal Business Centre, Aslali, Ahmedabad – 382427"
  },
  {
    city: "Lucknow",
    head: "Amritesh Pandey",
    contact: "+91 7355949281",
    office: "+91 7753911677",
    support: "+91 9974744047",
    address: "Sector O, Mansarovar Yojana, Lucknow, Uttar Pradesh – 226012"
  },
  {
    city: "Lucknow (Fleet Ops)",
    head: "Ajay Kumar Mishra",
    contact: "+91 8490084047",
    office: "+91 7753911677",
    support: "+91 9974744047",
    address: "Sector O, Mansarovar Yojana, Lucknow, Uttar Pradesh – 226012"
  }
];

export default function BranchesPage() {
  const formatDial = (num: string) => num.replace(/\s+/g, '');

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="pt-24 pb-16 bg-orange-50/50">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">
              Our <span className="text-[#268999]">Branch</span> Network
            </h1>
            <p className="text-base md:text-lg text-zinc-600 font-medium leading-relaxed">
              Apexcel Move is building a Pan-India smart logistics network[cite: 72]. 
              Connect with our verified branch heads for seamless freight movement.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Responsive Table Section */}
      <section className="py-12">
        <Container>
          <div className="overflow-hidden rounded-2xl border border-zinc-100 shadow-xl shadow-[#268999]/5 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="bg-[#268999] text-white">
                  <tr>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-[0.2em]">S.No</th>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-[0.2em]">Branch</th>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-[0.2em]">Incharge</th>
                    <th className="p-5 font-bold uppercase text-[10px] tracking-[0.2em] text-right">Contact No</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {branches.map((b, i) => (
                    <tr key={i} className="hover:bg-orange-50/30 transition-colors">
                      <td className="p-5 text-zinc-400 font-bold">{i + 1}</td>
                      <td className="p-5 font-black text-zinc-800">{b.city}</td>
                      <td className="p-5 text-zinc-600 font-bold">{b.head}</td>
                      <td className="p-5 text-right">
                        <a href={`tel:${formatDial(b.contact)}`} className="font-black text-[#268999] hover:text-orange-600 transition-colors">
                          {b.contact}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Detailed Branch Cards */}
      <section className="py-12 bg-zinc-50/50">
        <Container>
          <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mb-8 px-2">Office Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {branches.map((b, i) => (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-transparent hover:border-orange-200 transition-all shadow-sm hover:shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-black text-zinc-900">{b.city}</h3>
                  <span className="px-3 py-1 bg-[#268999]/10 text-[#268999] rounded-full text-[9px] font-black uppercase tracking-widest">Active</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaUserTie className="text-[#268999]" />
                    <p className="font-bold text-zinc-800 text-sm">{b.head}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhone className="mt-1 text-orange-500" />
                    <div>
                      <a href={`tel:${formatDial(b.contact)}`} className="font-black text-zinc-900 hover:text-[#268999] text-sm">
                        {b.contact}
                      </a>
                      <p className="text-[10px] text-zinc-400 font-bold uppercase mt-0.5">Office: {b.office}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaLocationDot className="mt-1 text-zinc-400" />
                    <p className="text-xs text-zinc-500 font-bold leading-relaxed">{b.address}</p>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-zinc-50">
                  <a href={`tel:${formatDial(b.support)}`} className="flex items-center gap-2 text-[10px] font-black text-zinc-400 hover:text-orange-500 uppercase tracking-widest transition-colors">
                    <FaHeadset className="text-[#268999] text-sm" />
                    Support: {b.support}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Optimized Support Section - Medium Range Sizing */}
      <section className="py-16 bg-white overflow-hidden">
        <Container>
          <div className="relative bg-[#268999] rounded-[2.5rem] py-12 px-6 md:px-12 text-center text-white shadow-xl">
            {/* Soft decorative glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-20 rounded-full blur-[80px] -mr-32 -mt-32" />

            <div className="relative z-10 max-w-xl mx-auto">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mb-6">
                <FaHeadset className="text-2xl text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight leading-tight">
                Need <span className="text-orange-400">Transport Support?</span>
              </h2>
              
              <p className="text-teal-50 text-sm md:text-base mb-8 font-medium leading-relaxed opacity-90">
                If you cannot find a branch near your location, our 24/7 dedicated support team is ready to assist you anywhere in India. [cite: 12]
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a 
                  href="tel:+919974744047"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-orange-500 hover:bg-orange-600 rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-lg active:scale-95"
                >
                  <FaPhone /> +91 9974744047
                </a>
                
                <a 
                  href="mailto:contact@apexcelmove.com"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-[#268999] rounded-xl font-bold text-base transition-all transform hover:scale-105 shadow-lg active:scale-95"
                >
                  <FaEnvelope /> Email Support
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}