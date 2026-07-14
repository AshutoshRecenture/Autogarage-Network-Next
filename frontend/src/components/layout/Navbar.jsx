"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const navLinks = [
  { name: "Home", href: "/", type: "normal" },
  { name: "About Us", href: "/about", type: "normal" },
  { name: "Pricing", href: "/pricing", type: "normal" },
  { name: "Products & Services", href: "/products", type: "dropdown" },
  { name: "SEO", href: "/seo", type: "normal" },
  { name: "Features", href: "/features", type: "normal" },
  { name: "Latest Work", href: "/latest-work", type: "normal" },
  { name: "Blog", href: "/blog", type: "normal" },
  { name: "Contact Us", href: "/contact-us", type: "normal" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  // Close mobile menu on page transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  }, [pathname]);

  // Disable scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-100">
      <div className="mx-auto flex h-16 sm:h-20 lg:h-24 max-w-[1400px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="cursor-pointer transition hover:opacity-80 inline-block"
        >
          <Image
            src="/images/logo-color.png"
            alt="Garage Services"
            width={165}
            height={75}
            priority
            className="cursor-pointer w-28 sm:w-32 md:w-36 lg:w-[165px] h-auto object-contain"
          />
        </Link>

        {/* Menu (Desktop) */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((item, index) => {
            if (item.type === "dropdown") {
              return (
                <div
                  key={index}
                  className="relative group h-24 flex items-center"
                >
                  <div className={`flex items-center gap-1.5 cursor-pointer text-[15px] font-bold transition ${pathname.startsWith(item.href) ? 'text-[#1EA1F1]' : 'text-black group-hover:text-[#1EA1F1]'}`}>
                    {item.name}
                    <FaChevronDown size={10} className="mt-0.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute top-[85px] left-0 w-[260px] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform group-hover:-translate-y-2 origin-top translate-y-0 flex flex-col py-2">
                    <Link href="/products/gms" className="px-6 py-3 text-[15px] text-black font-medium hover:text-[#1EA1F1] hover:bg-blue-50/50 transition">
                      Garage Management System
                    </Link>
                    <Link href="/products/website" className="px-6 py-3 text-[15px] text-black font-medium hover:text-[#1EA1F1] hover:bg-blue-50/50 transition">
                      Website for Garages
                    </Link>
                    <a href="https://www.autotechdata.co.uk/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 text-[15px] text-black font-medium hover:text-[#1EA1F1] hover:bg-blue-50/50 transition block">
                      Autotech Data
                    </a>
                    <Link href="/products/mot-diary" className="px-6 py-3 text-[15px] text-black font-medium hover:text-[#1EA1F1] hover:bg-blue-50/50 transition">
                      MOT Diary
                    </Link>
                  </div>
                </div>
              );
            }
            
            // Normal text
            return (
              <Link
                key={index}
                href={item.href}
                className={`text-[15px] font-bold transition hover:text-[#1EA1F1] ${pathname === item.href ? 'text-[#1EA1F1]' : 'text-black'}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Social (Desktop) */}
        <div className="hidden items-center gap-5 lg:flex">
          <a href="https://www.facebook.com/autogaragenetworkltd" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-800 hover:text-[#1EA1F1] transition">
            <FaFacebookF className="text-xl" />
          </a>
          <a href="https://www.linkedin.com/company/auto-garage-network-ltd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-800 hover:text-[#1EA1F1] transition">
            <FaLinkedinIn className="text-xl" />
          </a>
          <a href="https://www.instagram.com/autogaragenetworkltd.uk" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-800 hover:text-[#1EA1F1] transition">
            <FaInstagram className="text-xl" />
          </a>
          <a href="https://twitter.com/autogaragent" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-slate-800 hover:text-[#1EA1F1] transition">
            <FaTwitter className="text-xl" />
          </a>
          <a href="https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-slate-800 hover:text-[#1EA1F1] transition">
            <FaYoutube className="text-xl" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex lg:hidden p-2 text-slate-800 hover:text-[#1EA1F1] transition-colors focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed left-0 right-0 bottom-0 top-[64px] sm:top-[80px] bg-white z-40 flex flex-col transition-all duration-300 ease-in-out lg:hidden border-t border-gray-100 ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100 visible"
            : "translate-x-full opacity-0 invisible"
        }`}
      >
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 flex flex-col justify-between">
          <nav className="flex flex-col gap-4">
            {navLinks.map((item, index) => {
              if (item.type === "dropdown") {
                return (
                  <div key={index} className="flex flex-col">
                    <button
                      onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                      className={`flex items-center justify-between w-full py-2.5 text-base font-bold transition text-left ${
                        pathname.startsWith(item.href)
                          ? "text-[#1EA1F1]"
                          : "text-black hover:text-[#1EA1F1]"
                      }`}
                    >
                      <span>{item.name}</span>
                      <FaChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${
                          isProductsDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {/* Mobile Dropdown Sub-menu */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out pl-4 flex flex-col gap-2 ${
                        isProductsDropdownOpen
                          ? "max-h-[300px] opacity-100 mt-2 pb-2"
                          : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                    >
                      <Link
                        href="/products/gms"
                        className="py-2 text-[15px] text-gray-700 font-medium hover:text-[#1EA1F1] transition"
                      >
                        Garage Management System
                      </Link>
                      <Link
                        href="/products/website"
                        className="py-2 text-[15px] text-gray-700 font-medium hover:text-[#1EA1F1] transition"
                      >
                        Website for Garages
                      </Link>
                      <a
                        href="https://www.autotechdata.co.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 text-[15px] text-gray-700 font-medium hover:text-[#1EA1F1] transition block"
                      >
                        Autotech Data
                      </a>
                      <Link
                        href="/products/mot-diary"
                        className="py-2 text-[15px] text-gray-700 font-medium hover:text-[#1EA1F1] transition"
                      >
                        MOT Diary
                      </Link>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={index}
                  href={item.href}
                  className={`py-2.5 text-base font-bold transition hover:text-[#1EA1F1] ${
                    pathname === item.href ? "text-[#1EA1F1]" : "text-black"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Social Links at Bottom of Mobile Menu */}
          <div className="pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-4">
              Follow Us
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.facebook.com/autogaragenetworkltd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-slate-600 hover:text-[#1EA1F1] transition"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="https://www.linkedin.com/company/auto-garage-network-ltd"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-slate-600 hover:text-[#1EA1F1] transition"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
              <a
                href="https://www.instagram.com/autogaragenetworkltd.uk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-slate-600 hover:text-[#1EA1F1] transition"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a
                href="https://twitter.com/autogaragent"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-slate-600 hover:text-[#1EA1F1] transition"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCT8JroOu-4_KT74be6tGUoQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-slate-600 hover:text-[#1EA1F1] transition"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

