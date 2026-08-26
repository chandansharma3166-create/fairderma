"use client";

import { useState } from "react";
import { Sparkles, CheckCircle2, ArrowRight, Activity } from "lucide-react";

interface ConcernOption {
  id: string;
  label: string;
  tag: string;
  protocol: string;
  duration: string;
  sessions: string;
  details: string;
}

const concerns: ConcernOption[] = [
  {
    id: "pigment",
    label: "Pigmentation & Sun Damage",
    tag: "Targeted Melanin Clearance",
    protocol: "Picosecond Laser + Glutathione Infusion",
    duration: "45 mins",
    sessions: "3–4 Sessions",
    details: "Breaks down stubborn epidermal deposits while suppressing intracellular tyrosinase activity.",
  },
  {
    id: "aging",
    label: "Volume Loss & Fine Lines",
    tag: "Dermal Restructuring",
    protocol: "Micro-Focused Ultrasound + HA Biostimulator",
    duration: "60 mins",
    sessions: "1–2 Sessions",
    details: "Induces deep SMAS layer tightening and stimulates type-I collagen synthesis.",
  },
  {
    id: "texture",
    label: "Acne Scars & Enlarged Pores",
    tag: "Fractional Resurfacing",
    protocol: "Radiofrequency Microneedling + Exosome Matrix",
    duration: "50 mins",
    sessions: "3 Sessions",
    details: "Rebuilds damaged cellular architecture and delivers bioactive signaling factors to scarred tissue.",
  },
  {
    id: "dullness",
    label: "Dehydration & Lack of Radiance",
    tag: "Cellular Hydration",
    protocol: "Hydra-Infusion + Cryo-Peptide Glow",
    duration: "40 mins",
    sessions: "Monthly Maintenance",
    details: "Deep dermal saturation of multi-molecular hyaluronic acid and cold-stabilized peptides.",
  },
];

export default function SkinAnalysisQuiz() {
  const [selectedId, setSelectedId] = useState<string>(concerns[0].id);

  const activeConcern = concerns.find((c) => c.id === selectedId) || concerns[0];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
            <Activity className="w-3.5 h-3.5" /> Diagnostic Assessment
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Tailored <span className="text-[#C5A880]">Clinical Protocols</span>
          </h2>
        </div>
        <p className="text-neutral-400 text-xs max-w-md">
          Select your primary dermal priority below to view the customized physician protocol designed for optimal biological recovery.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Concern Selector Buttons */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {concerns.map((item) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                className={`w-full text-left p-5 border transition-all flex items-center justify-between group ${
                  isSelected
                    ? "bg-[#16161A] border-[#C5A880] text-white"
                    : "bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider block text-neutral-400 group-hover:text-[#C5A880]">
                    {item.tag}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-wide mt-1 block">
                    {item.label}
                  </span>
                </div>
                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected
                      ? "border-[#C5A880] bg-[#C5A880] text-black"
                      : "border-white/20 text-transparent"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Protocol Card Output */}
        <div className="lg:col-span-7 bg-[#16161A] border border-white/10 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs uppercase font-mono tracking-widest text-[#C5A880]">
                Recommended Protocol
              </span>
              <span className="text-xs uppercase font-mono text-neutral-400">
                FD Clinical ID: #{activeConcern.id.toUpperCase()}
              </span>
            </div>

            <div>
              <h3 className="text-2xl font-bold uppercase tracking-wide text-white">
                {activeConcern.protocol}
              </h3>
              <p className="text-neutral-400 text-xs mt-3 leading-relaxed">
                {activeConcern.details}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="bg-[#0D0D0F] p-4 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                  Session Duration
                </span>
                <span className="text-sm font-bold uppercase text-[#C5A880] mt-1 block">
                  {activeConcern.duration}
                </span>
              </div>
              <div className="bg-[#0D0D0F] p-4 border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block">
                  Recommended Course
                </span>
                <span className="text-sm font-bold uppercase text-[#C5A880] mt-1 block">
                  {activeConcern.sessions}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <a
              href="#consultation"
              className="inline-flex items-center justify-center gap-3 w-full py-4 bg-[#C5A880] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#b39369] transition-all"
            >
              <span>Schedule Protocol Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}