import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { 
  FaInstagram, 
  FaLinkedin, 
  FaFacebook, 
  FaXTwitter, 
  FaYoutube,
  FaWhatsapp
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-orange-50 border-t border-orange-200 mt-0">
      <Container>
        {/* Main Grid Layout */}
        <div className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-5 items-center md:items-start text-center md:text-left">
            
            <Link 
              href="/" 
              className="flex items-center gap-3 group transition-opacity hover:opacity-80"
              aria-label="Go to Home"
            >
              <div className="relative w-14 h-14 md:w-16 md:h-16 shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="Apexcel Move Logo" 
                  fill 
                  className="object-contain" 
                />
              </div>
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-orange-600">
                Apexcel Move 
              </span> 
            </Link>
            
            <p className="text-sm text-gray-700 leading-relaxed max-w-sm font-medium">
              Smart logistics platform for Shippers & Truckers across India. 
              Book trucks, track trips, and simplify operations.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { 
                  Icon: FaWhatsapp, 
                  label: "WhatsApp", 
                  href: "https://wa.me/917874444047", 
                  color: "hover:text-[#25D366] hover:border-[#25D366]" 
                },
                { 
                  Icon: FaFacebook, 
                  label: "Facebook", 
                  href: "https://www.facebook.com/share/1DGMJEBNzH/", 
                  color: "hover:text-[#1877F2] hover:border-[#1877F2]" 
                },
                { 
                  Icon: FaInstagram, 
                  label: "Instagram", 
                  href: "https://www.instagram.com/apexcelmovepvtltd?igsh=dDNyejJsa3JmYTBk", 
                  color: "hover:text-[#E4405F] hover:border-[#E4405F]" 
                },
                { 
                  Icon: FaYoutube, 
                  label: "YouTube", 
                  href: "http://youtube.com/post/UgkxRGmUpWXzeibyC-P1t7-IJns-k-rs82f1?si=wQyauhMMTJVbvhtE", 
                  color: "hover:text-[#FF0000] hover:border-[#FF0000]" 
                },
                { 
                  Icon: FaLinkedin, 
                  label: "LinkedIn", 
                  href: "https://www.linkedin.com/company/apexcel-move-pvt-ltd/", 
                  color: "hover:text-[#0A66C2] hover:border-[#0A66C2]" 
                },
                
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    w-10 h-10 rounded-xl bg-white border border-orange-200 shadow-sm 
                    flex items-center justify-center text-orange-600 
                    transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1
                    ${social.color}
                  `}
                  aria-label={social.label}
                >
                  <social.Icon size={18} />
                </a>
              ))}
            </div>

            {/* ✅ App Store Images - justify-center on mobile, justify-start on desktop */}
            <div className="flex flex-wrap items-center gap-3 mt-1 justify-center md:justify-start">
              <Link href="#" className="relative w-36 h-11 hover:opacity-80 transition-opacity">
                <Image 
                  src="/playstore.png" 
                  alt="Get it on Google Play" 
                  fill 
                  className="object-contain object-left" 
                  sizes="(max-width: 768px) 144px, 144px"
                />
              </Link>
              <Link href="#" className="relative w-36 h-11 hover:opacity-80 transition-opacity">
                <Image 
                  src="/appstore.png" 
                  alt="Download on the App Store" 
                  fill 
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 144px, 144px" 
                />
              </Link>
            </div>
          </div>

          {/* Links Section Starts */}
          
          {/* Company */}
          <div className="lg:pl-8 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold text-lg text-orange-600 mb-4">Company</h3>
            <ul className="flex flex-col gap-3 w-full">
              {[
                { name: "About", href: "/about" },
                { name: "Branches", href: "/branches" },
                { name: "POD Centers", href: "/pod-centers" },
                { name: "Glossary", href: "/glossary" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-gray-700 hover:text-[#268999] transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold text-lg text-orange-600 mb-4">Services</h3>
            <ul className="flex flex-col gap-3 w-full">
              {[
                { name: "Hire Truck", href: "/services#hire-truck" },
                { name: "Become Vendor", href: "/services#become-vendor" },
                { name: "Trip Tracking", href: "/services#trip-tracking" },
                { name: "Payment Workflow", href: "/services#payment-workflow" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-gray-700 hover:text-[#268999] transition-colors font-medium">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          {/* Legal */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-bold text-lg text-orange-600 mb-4">Legal</h3>
            <ul className="flex flex-col gap-3 w-full">
              {[
                { name: "Terms & Conditions", href: "/terms-conditions" },
                { name: "Refund Policy", href: "/refund-policy" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Cookies Policy", href: "/cookies-policy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-gray-700 hover:text-[#268999] transition-colors font-medium"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Center Aligned everywhere */}
        <div className="border-t border-orange-200 py-6 flex flex-wrap justify-center items-center gap-x-1 gap-y-2 text-center text-sm text-gray-600 font-medium">
          
          <span>
            © {currentYear} <span className="text-orange-600 font-bold">Apexcel Move</span> — All rights reserved.
          </span>
          
          <span className="hidden sm:inline text-orange-300 mx-2">|</span>

          <div className="flex items-center gap-1">
            <span>Designed & Developed by</span>
            <a 
              href="https://www.kalpitevolution.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold text-orange-600 hover:text-[#268999] hover:underline transition-all"
            >
              Kalpit Evolution
            </a>
          </div>
          
        </div>
      </Container>
    </footer>
  );
}