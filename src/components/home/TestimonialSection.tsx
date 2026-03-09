"use client";
import Container from "@/components/layout/Container";
import Image from "next/image";
import { FaStar, FaPlay, FaLocationDot, FaQuoteLeft } from "react-icons/fa6";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Shipper",
    location: "Ahmedabad, Gujarat",
    image: "/user1.jpeg",
    stars: 5,
    text: "Apexcel Move made freight booking simple for our business. The process is smooth and pricing is transparent.",
    hasVideo: true,
  },
  {
    name: "Aman Verma",
    role: "Transporter",
    location: "Gurgaon, Haryana",
    image: "/user2.jpeg",
    stars: 4,
    text: "The platform gives us better visibility on loads and payments. It helps us manage trips professionally.",
    hasVideo: false,
  },
  {
    name: "Neha Singh",
    role: "Trucker",
    location: "Lucknow, UP",
    image: "/user3.jpeg",
    stars: 5,
    text: "Real-time tracking and digital coordination have reduced our manual follow-ups significantly.",
    hasVideo: true,
  },
  {
    name: "Vikash Tiwari",
    role: "Shipper",
    location: "Jaipur, Rajasthan",
    image: "/user1.jpeg",
    stars: 5,
    text: "Very reliable service for FTL. Their support team is always available to help with documentation.",
    hasVideo: false,
  },
];

// Double the list for infinite loop effect
const scrollList = [...testimonials, ...testimonials];

export default function TestimonialSection() {
  return (
    <section className="py-24 bg-[#F8FAFB] overflow-hidden">
      <Container>
        <div className="text-center mb-16 px-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#268999]/10 text-[#268999] text-[10px] font-black uppercase tracking-[0.3em] mb-4 border border-[#268999]/20">
            Success Stories
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-zinc-900 mb-6 tracking-tighter">
            Voices of Our <span className="text-[#268999]">Partners</span>
          </h2>
          <p className="text-zinc-500 font-bold text-base md:text-lg max-w-2xl mx-auto opacity-80">
            Trusted by shippers and fleet owners across India's most active logistics corridors.
          </p>
        </div>
      </Container>

      {/* Infinite Moving Slider Container */}
      <div className="relative flex overflow-hidden group">
        <motion.div 
          className="flex gap-6 py-4 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
        >
          {scrollList.map((item, i) => (
            <div
              key={i}
              className="w-[320px] md:w-[400px] shrink-0 bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm hover:shadow-2xl hover:border-[#268999]/30 transition-all duration-500 group/card relative"
            >
              {/* Quote Icon Background */}
              <FaQuoteLeft className="absolute top-8 right-8 text-zinc-50 text-5xl -z-0" />

              <div className="relative z-10">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(item.stars)].map((_, i) => (
                    <FaStar key={i} className="text-orange-400 text-sm" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-zinc-600 font-medium leading-relaxed mb-8 italic">
                  “{item.text}”
                </p>

                {/* User Profile Info */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                      {item.hasVideo && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover/card:bg-black/10 transition-colors">
                           <FaPlay className="text-white text-xs animate-pulse" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-black text-zinc-900 leading-none mb-1">{item.name}</h4>
                      <div className="flex flex-col gap-1">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md inline-block w-fit ${
                          item.role === 'Shipper' ? 'bg-[#268999]/10 text-[#268999]' : 'bg-orange-100 text-orange-600'
                        }`}>
                          {item.role}
                        </span>
                        <p className="text-[10px] font-bold text-zinc-400 flex items-center gap-1">
                          <FaLocationDot size={8} /> {item.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Gradient Overlays for Fade Effect */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F8FAFB] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F8FAFB] to-transparent z-10 pointer-events-none" />
      </div>

      {/* Video Review Notice */}
      <div className="mt-12 text-center">
         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">
           Tap on profile with <FaPlay className="inline-block mx-1 text-[#268999]" /> to watch video review
         </p>
      </div>
    </section>
  );
}