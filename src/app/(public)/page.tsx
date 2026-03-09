import HeroSection from "@/components/home/HeroSection";
import TruckRateSection from "@/components/home/TruckRateSection";
import ServiceSection from "@/components/home/ServiceSection";
import HowItWorksSection from "@/components/home/HowItWorkSection";
import MobileAppSection from "@/components/home/MobileAppSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ContactHomeSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TruckRateSection />
      <ServiceSection />
      <HowItWorksSection />
      <MobileAppSection />
      <TestimonialSection />
      <ContactHomeSection />
    </>
  );
}