"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How do I know which clinical treatment is right for my skin?",
    answer:
      "Every new patient begins with our comprehensive 45-minute Computerized Dermal Scan and direct physician consultation. Dr. Rostova and Dr. Vance evaluate your skin barrier integrity, pigment depth, and structural volume before formulating a customized roadmap.",
  },
  {
    question: "What is the typical downtime for picosecond laser and RF microneedling?",
    answer:
      "Picosecond toning involves almost zero downtime with mild redness lasting 2 to 4 hours. RF microneedling requires 24 to 48 hours of slight swelling and pinkness, after which clinical SPF and mineral makeup can be safely applied.",
  },
  {
    question: "Are your volumizing and contouring injectables reversible?",
    answer:
      "Yes. We exclusively use premium, biocompatible hyaluronic acid matrices that can be completely dissolved using targeted hyaluronidase enzymes if necessary. Our approach prioritizes structural restoration over exaggeration.",
  },
  {
    question: "How many sessions are typically required to see permanent results?",
    answer:
      "While hydration and instant radiance are visible immediately post-procedure, cellular collagen synthesis and pigment clearance peak after a series of 3 to 4 sessions spaced 4 weeks apart.",
  },
  {
    question: "What should I avoid before attending my initial appointment?",
    answer:
      "We recommend discontinuing prescription retinoids (tretinoin, adapalene), chemical AHA/BHA exfoliants, and active tanning beds at least 5 days prior to your laser or clinical peel procedures.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Patient Guidance
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Frequently <span className="text-[#C5A880]">Answered</span>
          </h2>
        </div>
        <p className="text-neutral-400 text-xs max-w-md">
          Key insights regarding our clinical standards, procedure preparation, and recovery timelines.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-4 max-w-4xl mx-auto">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`border transition-all bg-[#16161A] ${
                isOpen ? "border-[#C5A880]/60" : "border-white/10 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4"
              >
                <span className="text-sm font-bold uppercase tracking-wide text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#C5A880] shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 text-xs text-neutral-400 leading-relaxed border-t border-white/5 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}