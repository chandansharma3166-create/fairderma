"use client";

import { useEffect, useState } from "react";
import { Calendar, ArrowUpRight } from "lucide-react";

export default function FloatingBookingBtn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <a
        href="#consultation"
        className="flex items-center gap-2.5 px-5 py-3 bg-[#C5A880] text-black font-bold text-xs uppercase tracking-widest shadow-2xl hover:bg-[#b39369] transition-all duration-300 border border-white/20 group"
      >
        <Calendar className="w-4 h-4 text-black" />
        <span>Book Visit</span>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
}