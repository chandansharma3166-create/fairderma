"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#09090B] border-t border-white/10 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center font-bold text-[#C5A880] bg-[#16161A] text-xs">
              FD
            </div>
            <span className="text-base font-bold tracking-[0.2em] uppercase text-white">
              Fair<span className="text-[#C5A880]">Derma</span>
            </span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Medical aesthetic science delivering natural architectural balance and biological skin rejuvenation.
          </p>
        </div>

        {/* Hours */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">Clinical Hours</h4>
          <div className="text-xs text-neutral-400 space-y-1 font-mono">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>Mon – Fri: 09:00 – 19:00</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-neutral-500" />
              <span>Saturday: 10:00 – 17:00</span>
            </div>
            <div className="text-neutral-500 pt-1">Sunday: Closed for Sterilization</div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">Primary Center</h4>
          <div className="text-xs text-neutral-400 space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-neutral-500 shrink-0 mt-0.5" />
              <span>Suite 400, Dermatology Medical Pavilion, 742 Fifth Avenue, New York, NY</span>
            </div>
          </div>
        </div>

        {/* Direct Inquiries */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">Inquiries</h4>
          <div className="text-xs text-neutral-400 space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-neutral-500" />
              <span>+1 (800) 555-DERM</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-neutral-500" />
              <span>concierge@fairderma.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-mono">
        <span>© 2026 FairDerma Clinical Aesthetics. All rights reserved.</span>
        <span className="mt-2 sm:mt-0">Confidentiality & HIPAA Compliant</span>
      </div>
    </footer>
  );
}