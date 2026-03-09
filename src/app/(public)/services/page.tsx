import ServiceHero from "@/components/services/ServiceHero";
import FeatureCards from "@/components/services/FeatureCards";
import FleetGrid from "@/components/services/FleetGrid";
import ProcessFlow from "@/components/services/ProcessFlow";
import Container from "@/components/layout/Container";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <ServiceHero />
      
      <div className="py-20 space-y-32">
        {/* Section for Feature Overview */}
        <section id="features">
          <FeatureCards />
        </section>

        {/* Relevant Section for Hire Truck & Fleet Details */}
        <section id="hire-truck" className="scroll-mt-24">
          <FleetGrid />
        </section>

        {/* Section for How it Works / Process */}
        <section id="how-it-works" className="scroll-mt-24">
          <ProcessFlow />
        </section>

        {/* Additional IDs mapped to FeatureCards context for Footer Links */}
        <div id="become-vendor" className="scroll-mt-24" />
        <div id="trip-tracking" className="scroll-mt-24" />
        <div id="payment-workflow" className="scroll-mt-24" />
      </div>
      
      {/* Final CTA Section */}
      <section className="pb-16">
        <Container>
          <div className="bg-[#268999] rounded-[2.5rem] py-12 md:py-16 px-6 text-center text-white relative overflow-hidden shadow-2xl">
            
            {/* Decorative Blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 opacity-20 rounded-full blur-[80px] -mr-32 -mt-32" />
            
            <h2 className="text-3xl md:text-5xl font-black mb-4 relative z-10 leading-tight">
              Ready to Optimize <br className="hidden sm:block" /> Your Logistics?
            </h2>
            
            <p className="text-lg md:text-xl text-teal-50 mb-8 max-w-xl mx-auto relative z-10 font-medium opacity-90">
              Join thousands of businesses moving freight faster with India's smartest platform.
            </p>
            
            <Link 
              href="/" 
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-xl font-black text-lg transition-all transform hover:scale-105 shadow-xl relative z-10 active:scale-95"
            >
              Get Started Now
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}