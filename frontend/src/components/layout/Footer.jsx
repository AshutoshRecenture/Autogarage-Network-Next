import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative text-gray-300 font-sans">
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-[url('/images/slide-1.png')] bg-cover bg-center bg-no-repeat"
      />
      <div className="absolute inset-0 z-0 bg-black/85" />
      
      {/* Footer Content */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="max-w-[1400px] mx-auto px-6">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
            
            {/* Column 1: About */}
            <div className="lg:col-span-1">
              <h3 className="text-white text-[13px] font-bold tracking-widest uppercase mb-6 pb-2 border-b border-gray-600 inline-block w-full">
                Auto Garage Network
              </h3>
              <p className="text-[14px] leading-relaxed text-gray-400">
                Take full control of your garage operations with our system. Manage your customers, optimise pricing, oversee employee tasks, track inventory, and access real-time revenue reports-all seamlessly and hassle-free!
              </p>
            </div>

            {/* Column 2: Company */}
            <div>
              <h3 className="text-white text-[13px] font-bold tracking-widest uppercase mb-6 pb-2 border-b border-gray-600 inline-block w-full">
                Company
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  { name: "Home", href: "/" },
                  { name: "About Us", href: "/about-us" },
                  { name: "Contact Us", href: "/contact-us" },
                  { name: "Career", href: "/career" },
                  { name: "Sitemap", href: "/sitemap" },
                  { name: "Pricing", href: "/pricing" },
                  { name: "Latest Work", href: "/latest-work" },
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms & Conditions", href: "/terms" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-[14px] text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Industries */}
            <div>
              <h3 className="text-white text-[13px] font-bold tracking-widest uppercase mb-6 pb-2 border-b border-gray-600 inline-block w-full">
                Industries
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  { name: "Car Workshop", href: "#" },
                  { name: "Car Traders", href: "#" },
                  { name: "MOT Centres", href: "#" },
                  { name: "Automotive", href: "#" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-[14px] text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Products */}
            <div>
              <h3 className="text-white text-[13px] font-bold tracking-widest uppercase mb-6 pb-2 border-b border-gray-600 inline-block w-full">
                Products
              </h3>
              <ul className="flex flex-col gap-2">
                {[
                  { name: "MOT Diary", href: "#" },
                  { name: "SEO", href: "/seo" },
                  { name: "Website Register (WRF)", href: "/websiteregister" },
                  { name: "Website Register with Contract", href: "/websiteregister" },
                  { name: "Products & Services Price", href: "/pricing" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link href={link.href} className="text-[14px] text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Contact Info */}
            <div>
              <h3 className="text-white text-[13px] font-bold tracking-widest uppercase mb-6 pb-2 border-b border-gray-600 inline-block w-full">
                Contact Information
              </h3>
              
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-white text-[13px] font-semibold mb-1">Address:</p>
                  <p className="text-[14px] text-gray-400 leading-relaxed">
                    The Chestnuts, 46 Middle Lane,<br />
                    Nether Broughton, LE14 3HD
                  </p>
                </div>

                <div>
                  <p className="text-white text-[13px] font-semibold mb-1">Sales Inquiry:</p>
                  <a href="tel:07947906789" className="block text-[14px] text-gray-400 hover:text-white transition-colors mb-0.5">
                    07947 906789
                  </a>
                  <a href="mailto:info@autogaragenetwork.com" className="block text-[14px] text-gray-400 hover:text-[#1EA1F1] transition-colors break-words">
                    info@autogaragenetwork.com
                  </a>
                </div>

                <div>
                  <p className="text-white text-[13px] font-semibold mb-1">Customer Support:</p>
                  <a href="tel:01702655556" className="block text-[14px] text-gray-400 hover:text-white transition-colors mb-0.5">
                    01702 655556
                  </a>
                  <a href="mailto:jatindersingh@autogaragenetwork.com" className="block text-[14px] text-gray-400 hover:text-[#1EA1F1] transition-colors break-words">
                    jatindersingh@autogaragenetwork.com
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-center text-center">
            <p className="text-[13px] text-gray-500">
              Copyright © {new Date().getFullYear()} Auto Garage Network. All Right Reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
