"use client";

import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Treatments", href: "#services" },
    { name: "Consultation", href: "#consultation" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0F]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* FairDerma Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 border border-[#C5A880] flex items-center justify-center font-bold text-[#C5A880] bg-[#16161A]">
            FD
          </div>
          <span className="text-lg font-bold tracking-[0.2em] uppercase text-white">
            Fair<span className="text-[#C5A880]">Derma</span>
          </span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-[#C5A880] transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Button */}
        <a
          href="#consultation"
          className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#C5A880] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#b39369] transition-colors"
        >
          <span>Book Visit</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-neutral-200"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#16161A] border-b border-white/10 px-6 py-6 flex flex-col gap-4">
          {links.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-sm uppercase tracking-widest text-neutral-300 hover:text-[#C5A880]"
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}