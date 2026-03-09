import Container from "@/components/layout/Container";
import Link from "next/link";
import { FaTruck, FaUserPlus, FaLocationDot, FaWallet } from "react-icons/fa6";

const features = [
  { id: "hire-truck", title: "Hire Truck", desc: "Book the right truck in minutes. Enter load details and get AI-matched vehicles instantly.", icon: FaTruck, color: "bg-orange-500" },
  { id: "become-vendor", title: "Become Vendor", desc: "Register your fleet, verify documents, and start receiving high-value loads across India.", icon: FaUserPlus, color: "bg-[#268999]" },
  { id: "trip-tracking", title: "Trip Tracking", desc: "Real-time visibility from pickup to delivery with digital POD management.", icon: FaLocationDot, color: "bg-orange-500" },
  { id: "payment-workflow", title: "Payment Workflow", desc: "Secure wallet system with instant advances and transparent settlement history.", icon: FaWallet, color: "bg-[#268999]" },
];

export default function FeatureCards() {
  return (
    <Container>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {features.map((f, i) => (
          <Link href={`#${f.id}`} key={i} className="group p-8 rounded-[2.5rem] border border-zinc-100 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-12px_rgba(38,137,153,0.15)] transition-all duration-500 transform hover:-translate-y-2">
            <div className={`w-16 h-16 ${f.color} rounded-2xl flex items-center justify-center text-white text-3xl mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
              <f.icon />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 mb-4">{f.title}</h3>
            <p className="text-zinc-500 font-medium leading-relaxed">{f.desc}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}