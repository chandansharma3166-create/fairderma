"use client";

import { Star, ShieldCheck, Quote } from "lucide-react";

const stats = [
  { value: "14,000+", label: "Procedures Completed", sub: "100% Physician Led" },
  { value: "98.8%", label: "Clinical Satisfaction", sub: "Documented Outcomes" },
  { value: "0.02%", label: "Revision Rate", sub: "Precision Delivery" },
  { value: "15+", label: "Years Research", sub: "Cellular Longevity" },
];

const reviews = [
  {
    quote:
      "The picosecond laser protocol resolved stubborn hyperpigmentation that three previous clinics couldn't touch. The MD-led diagnosis made all the difference.",
    author: "Claire S.",
    role: "Verified Patient",
    treatment: "Picosecond Resurfacing",
  },
  {
    quote:
      "Subtle, architectural, and completely natural. Dr. Rostova’s approach to volume restoration didn't change my face—it just restored my natural youth.",
    author: "Jonathan K.",
    role: "Verified Patient",
    treatment: "Facial Sculpting",
  },
  {
    quote:
      "The computerized depth scanning gave me total confidence. You see the cellular improvement week after week on actual medical monitors.",
    author: "Sophia M.",
    role: "Verified Patient",
    treatment: "Exosome Matrix Therapy",
  },
];

export default function ClinicalMetrics() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 bg-[#16161A] p-8 border border-white/10">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left space-y-1">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#C5A880] block">
              {s.value}
            </span>
            <span className="text-xs uppercase font-bold text-white tracking-wider block">
              {s.label}
            </span>
            <span className="text-[10px] font-mono text-neutral-500 block">
              {s.sub}
            </span>
          </div>
        ))}
      </div>

      {/* Testimonials Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Clinical Feedback
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Patient <span className="text-[#C5A880]">Experiences</span>
          </h2>
        </div>
        <p className="text-neutral-400 text-xs max-w-md">
          Unfiltered feedback from patients who have completed multi-phase clinical rejuvenation roadmaps.
        </p>
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <div
            key={i}
            className="bg-[#16161A] border border-white/10 p-8 flex flex-col justify-between relative group hover:border-[#C5A880]/50 transition-all duration-300"
          >
            <Quote className="w-8 h-8 text-[#C5A880]/20 absolute top-6 right-6" />

            <div className="space-y-4">
              <div className="flex gap-1 text-[#C5A880]">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-3.5 h-3.5 fill-[#C5A880]" />
                ))}
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed italic">
                "{r.quote}"
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5">
              <div className="text-xs font-bold text-white uppercase tracking-wide">
                {r.author}
              </div>
              <div className="text-[10px] font-mono text-[#C5A880] tracking-wider mt-0.5">
                {r.treatment}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}