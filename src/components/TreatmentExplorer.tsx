"use client";

import { useState } from "react";
import { Sparkles, Plus, X, Clock, ShieldAlert, Check } from "lucide-react";

interface Treatment {
  id: string;
  category: "laser" | "injectables" | "regenerative";
  title: string;
  shortDesc: string;
  fullDesc: string;
  targetDepth: string;
  downtime: string;
  duration: string;
  suitableFor: string[];
}

const treatmentsData: Treatment[] = [
  {
    id: "01",
    category: "injectables",
    title: "Facial Sculpting & Volumetrics",
    shortDesc: "Structural volume restoration and precise jawline contouring.",
    fullDesc: "Utilizes biocompatible hyaluronic matrices to augment deficient subcutaneous structural fat compartments, restoring youthfulness without distortion.",
    targetDepth: "Deep Subcutaneous & Periosteal",
    downtime: "None (Mild redness < 24h)",
    duration: "45 Minutes",
    suitableFor: ["Hollow Cheeks", "Nasolabial Folds", "Recessed Chin", "Jawline Laxity"],
  },
  {
    id: "02",
    category: "laser",
    title: "Picosecond Laser Resurfacing",
    shortDesc: "Photo-acoustic clearance of hyperpigmentation and pore refinement.",
    fullDesc: "Delivers ultra-short picosecond pulses to fracture stubborn melanin clusters into microscopic dust, promoting rapid macrophage clearance without heat damage.",
    targetDepth: "Epidermal & Papillary Dermis",
    downtime: "1-2 Days mild erythema",
    duration: "40 Minutes",
    suitableFor: ["Melasma", "Sun Spots", "Enlarged Pores", "Post-Acne PIH"],
  },
  {
    id: "03",
    category: "regenerative",
    title: "Cellular Exosome Matrix Therapy",
    shortDesc: "Advanced cellular collagen synthesis and dermal healing.",
    fullDesc: "Harnesses isolated growth factor vesicles and signaling proteins to reactivate dormant fibroblasts and dramatically accelerate tissue regeneration.",
    targetDepth: "Reticular Dermis",
    downtime: "Minimal (3-6 Hours)",
    duration: "50 Minutes",
    suitableFor: ["Thinning Skin", "Loss of Elasticity", "Atrophic Scars", "Chronic Dryness"],
  },
  {
    id: "04",
    category: "laser",
    title: "Fractional RF Microneedling",
    shortDesc: "Dual thermal remodeling for skin tightening and scar correction.",
    fullDesc: "Gold-insulated micro-electrodes deliver radiofrequency thermal coagulation bands directly into the dermal matrix to trigger intensive collagen contracture.",
    targetDepth: "0.5mm - 3.5mm Adjustable",
    downtime: "2-3 Days",
    duration: "60 Minutes",
    suitableFor: ["Deep Acne Scars", "Neck Laxity", "Fine Periorbital Lines"],
  },
  {
    id: "05",
    category: "injectables",
    title: "Polynucleotide Biostimulation",
    shortDesc: "DNA fraction biorevitalization for extracellular matrix repair.",
    fullDesc: "Highly purified polymerized salmon DNA fragments stimulate microvascular circulation, boost endogenous hyaluronic acid, and scavenge free radicals.",
    targetDepth: "Mid-to-Deep Dermis",
    downtime: "12-24 Hours",
    duration: "35 Minutes",
    suitableFor: ["Dark Under-Eye Circles", "Dehydrated Skin", "Loss of Firmness"],
  },
  {
    id: "06",
    category: "regenerative",
    title: "Cryo-Peptide Photobiomodulation",
    shortDesc: "Cold-stabilized peptide perfusion with medical LED therapy.",
    fullDesc: "Combines cryogenic nutrient absorption with narrowband red/near-infrared photons to stimulate mitochondrial ATP production and cellular longevity.",
    targetDepth: "Cellular Mitochondria",
    downtime: "Zero Downtime",
    duration: "45 Minutes",
    suitableFor: ["Pre-Event Radiance", "Inflammatory Rosacea", "Compromised Skin Barrier"],
  },
];

export default function TreatmentExplorer() {
  const [filter, setFilter] = useState<"all" | "laser" | "injectables" | "regenerative">("all");
  const [activeModal, setActiveModal] = useState<Treatment | null>(null);

  const filteredItems = filter === "all" ? treatmentsData : treatmentsData.filter((t) => t.category === filter);

  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Procedural Directory
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Clinical <span className="text-[#C5A880]">Services</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {(["all", "laser", "injectables", "regenerative"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all ${
                filter === cat
                  ? "bg-[#C5A880] text-black font-bold"
                  : "bg-[#16161A] text-neutral-400 border border-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Treatments */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveModal(item)}
            className="p-8 bg-[#16161A] border border-white/10 flex flex-col justify-between hover:border-[#C5A880]/60 transition-all cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[#C5A880] font-mono text-lg font-bold">{item.id}</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-white/5 text-neutral-400 border border-white/10">
                  {item.category}
                </span>
              </div>
              <h3 className="text-lg font-bold uppercase mt-4 text-white group-hover:text-[#C5A880] transition-colors">
                {item.title}
              </h3>
              <p className="text-neutral-400 text-xs mt-2.5 leading-relaxed">{item.shortDesc}</p>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#C5A880]">
              <span>View Clinical Dossier</span>
              <div className="w-6 h-6 rounded-full bg-[#0D0D0F] border border-white/10 flex items-center justify-center group-hover:border-[#C5A880]">
                <Plus className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#16161A] border border-[#C5A880]/50 max-w-xl w-full p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="text-[10px] font-mono uppercase text-[#C5A880] tracking-widest">
                Clinical Dossier • {activeModal.category}
              </div>
              <h3 className="text-2xl font-bold uppercase text-white mt-1">{activeModal.title}</h3>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">{activeModal.fullDesc}</p>

            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="bg-[#0D0D0F] p-3 border border-white/10">
                <div className="text-[10px] font-mono text-neutral-500 uppercase flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3 text-[#C5A880]" /> Target Depth
                </div>
                <div className="text-xs font-bold text-white mt-1">{activeModal.targetDepth}</div>
              </div>
              <div className="bg-[#0D0D0F] p-3 border border-white/10">
                <div className="text-[10px] font-mono text-neutral-500 uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C5A880]" /> Est. Downtime
                </div>
                <div className="text-xs font-bold text-white mt-1">{activeModal.downtime}</div>
              </div>
            </div>

            <div>
              <div className="text-[11px] font-mono uppercase text-neutral-400 mb-2">Primary Indications</div>
              <div className="flex flex-wrap gap-2">
                {activeModal.suitableFor.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 bg-[#0D0D0F] border border-white/10 text-neutral-300"
                  >
                    <Check className="w-3 h-3 text-[#C5A880]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#consultation"
                onClick={() => setActiveModal(null)}
                className="w-full inline-flex items-center justify-center py-3.5 bg-[#C5A880] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#b39369] transition-all"
              >
                Inquire For This Protocol
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}