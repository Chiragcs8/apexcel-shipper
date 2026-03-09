"use client";
import Container from "@/components/layout/Container";
import { 
  FaPhone, 
  FaEnvelope, 
  FaLocationDot, 
  FaClock, 
  FaUserTie, 
  FaBuilding, 
  FaPaperPlane, 
  FaArrowRight, 
  FaGlobe 
} from "react-icons/fa6";

const contactDetails = {
  headOffice: {
    name: "Apexcel Move Private Limited",
    address: "4th Floor, BIJAL BUSINESS CENTRE, C-425, Opp. Shyam Icon, Aslali, Ahmedabad, Gujarat – 382427",
    emails: ["contact@apexcelmove.com", "support@apexcelmove.com"],
    phones: ["+91 9974744047", "+91 7753911677"]
  },
  branches: [
    {
      city: "Ahmedabad Branch",
      head: "Sudheer Upadhyay",
      role: "Executive Director",
      phones: ["+91 8087185179", "+91 7753911677"],
      address: "C-425, 4th Floor Bijal Business Centre, Aslali, Ahmedabad – 382427"
    },
    {
      city: "Gurgaon Branch",
      head: "Vikash Tiwari",
      role: "Area Sales Manager",
      phones: ["+91 8511674047"],
      address: "402, 4th Floor Pal Tower, DLF City Sikanderpur, Gurgaon – 122002"
    },
    {
      city: "Lucknow Branch",
      head: "Amritesh Pandey",
      role: "Co-Founder",
      phones: ["+91 7355949281", "+91 9721814504"],
      address: "Shop No. 3, E-379, Sector O, Mansarovar Yojana, Lucknow – 226012"
    }
  ]
};

export default function ContactPage() {
  const formatDial = (num: string) => num.replace(/\s+/g, '');

  return (
    <main className="min-h-screen bg-[#F0F7F8] pt-28 md:pt-40 pb-0 flex flex-col relative">
      <div className="flex-grow">
        <Container>
          {/* 1. Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 px-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-10 h-1 bg-orange-400 rounded-full"></span>
              <span className="text-[#268999] text-[11px] font-black uppercase tracking-[0.3em]">Corporate Support Hub</span>
              <span className="w-10 h-1 bg-orange-400 rounded-full"></span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-[#1a5d68] mb-8 tracking-tighter leading-tight">
              Let’s Drive Your <br />
              <span className="text-orange-500">Logistics Future.</span>
            </h1>
            <p className="text-base md:text-xl text-[#268999] font-semibold opacity-80 max-w-2xl mx-auto leading-relaxed">
              Connect with our 24/7 support team and regional hub heads to optimize your freight movement across India.
            </p>
          </div>

          {/* 2. Form & Info Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-24 relative z-10">
            <div className="lg:col-span-7 bg-white rounded-[3.5rem] p-8 md:p-14 shadow-[0_40px_80px_-20px_rgba(38,137,153,0.1)] border border-teal-50">
              <div className="flex items-center gap-4 mb-12">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-[#268999] shadow-inner">
                  <FaPaperPlane size={20} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1a5d68] tracking-tight">Send an Inquiry</h2>
                  <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mt-1">Response within 2 hours</p>
                </div>
              </div>
              
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-[#268999] tracking-widest ml-1">Full Name</label>
                    <input type="text" placeholder="Your Name" className="w-full px-6 py-4.5 rounded-2xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] focus:outline-none font-bold text-[#1a5d68] transition-all shadow-sm" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-[#268999] tracking-widest ml-1">Work Email</label>
                    <input type="email" placeholder="contact@company.com" className="w-full px-6 py-4.5 rounded-2xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] focus:outline-none font-bold text-[#1a5d68] transition-all shadow-sm" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-[#268999] tracking-widest ml-1">Your Message</label>
                  <textarea rows={5} placeholder="Describe your requirements..." className="w-full px-6 py-4.5 rounded-2xl bg-[#F0F7F8]/50 border border-teal-100 focus:bg-white focus:border-[#268999] focus:outline-none font-bold text-[#1a5d68] transition-all resize-none shadow-sm"></textarea>
                </div>
                <button className="w-full py-5 bg-[#268999] hover:bg-[#1f6d7a] text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-[#268999]/30 flex items-center justify-center gap-3 active:scale-95 group">
                  Submit Request <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="bg-[#268999] p-10 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl shadow-[#268999]/30 group flex-1 flex flex-col justify-center">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-400 opacity-20 rounded-full blur-3xl group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-10">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                          <FaClock className="text-orange-300 text-2xl" />
                      </div>
                      <h3 className="text-2xl font-black tracking-tight leading-none">Working Hours</h3>
                  </div>
                  <div className="space-y-6">
                      <div className="flex justify-between items-center py-4 border-b border-white/10">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-teal-100">Monday – Saturday</span>
                          <span className="text-sm font-black bg-white/10 px-4 py-1.5 rounded-xl border border-white/5">09:00 AM – 07:00 PM</span>
                      </div>
                      <div className="flex justify-between items-center py-2 text-orange-200">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Sunday</span>
                          <span className="text-[10px] font-black tracking-[0.2em] px-4 py-1.5 bg-orange-400/20 rounded-xl border border-orange-400/30 uppercase">CLOSED</span>
                      </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[3.5rem] border border-teal-100 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-center">
                <div className="w-1.5 h-16 bg-orange-400 absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full" />
                <h3 className="text-xl font-black text-[#1a5d68] mb-8 flex items-center gap-3">
                  <FaBuilding className="text-[#268999]" /> Head Office
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#F0F7F8] flex items-center justify-center text-[#268999] shrink-0 border border-teal-50">
                      <FaLocationDot size={20} />
                    </div>
                    <p className="text-[14px] font-bold text-[#1a5d68]/70 leading-relaxed pt-1">{contactDetails.headOffice.address}</p>
                  </div>
                  <div className="flex items-center gap-5">
                     <div className="flex -space-x-3">
                        {contactDetails.headOffice.phones.map((p, idx) => (
                          <a key={idx} href={`tel:${formatDial(p)}`} className={`w-12 h-12 rounded-full border-4 border-white flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform ${idx === 0 ? 'bg-[#268999]' : 'bg-orange-400'}`}>
                             <FaPhone size={14} />
                          </a>
                        ))}
                     </div>
                     <div className="flex flex-col">
                        <span className="text-[9px] font-black text-[#268999] uppercase tracking-widest leading-tight">Connect Directly</span>
                        <span className="text-sm font-black text-[#1a5d68]">Voice Support Lines</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Branches Section */}
          <section className="mt-24 mb-16">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-[#1a5d68] mb-4 tracking-tighter">Strategic Regional Hubs</h2>
              <p className="text-orange-500 font-black uppercase text-[10px] tracking-[0.4em]">Presence Across Major Corridors</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contactDetails.branches.map((b, i) => (
                <div key={i} className="group bg-white p-10 rounded-[3rem] border border-teal-50 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
                  <div className="flex justify-between items-center mb-8 pb-6 border-b border-teal-50">
                      <h4 className="text-2xl font-black text-[#1a5d68]">{b.city}</h4>
                      <FaGlobe className="text-[#268999]/20 group-hover:text-orange-400 transition-colors animate-spin-slow" />
                  </div>
                  <div className="space-y-6 flex-grow">
                    <div className="flex items-center gap-4 bg-[#F0F7F8] p-4 rounded-2xl">
                      <div className="w-10 h-10 rounded-xl bg-[#268999] flex items-center justify-center text-white">
                        <FaUserTie size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-black text-[#1a5d68] mb-0.5">{b.head}</p>
                        <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest">{b.role}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 px-1">
                      <FaLocationDot className="mt-1 text-[#268999] shrink-0" size={16} />
                      <p className="text-[13px] font-bold text-[#1a5d68]/60 leading-relaxed italic">{b.address}</p>
                    </div>
                  </div>
                  <div className="pt-6 mt-8 border-t border-teal-50 space-y-3">
                    {b.phones.map((p, idx) => (
                      <a key={idx} href={`tel:${formatDial(p)}`} className="flex items-center justify-center gap-3 py-3 rounded-xl bg-[#F0F7F8] hover:bg-[#268999] hover:text-white text-[#1a5d68] font-black text-sm transition-all">
                          <FaPhone size={12} className="opacity-50" /> {p}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Container>
      </div>

      {/* Safety Layer: Matches Footer bg precisely to eliminate visual gap */}
      <div className="w-full h-12 bg-[#F0F7F8]" />
    </main>
  );
}