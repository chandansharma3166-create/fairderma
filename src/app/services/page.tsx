import Link from "next/link";
import { TREATMENTS } from "@/data/treatments";
import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";

export const dynamic = "force-static";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0d0f12] text-white py-12 px-6 lg:px-16">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            Clinical Catalog
          </div>
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight text-white">
            Targeted Dermatological Protocols
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Evidence-based medical aesthetics and precision skin therapies executed by certified physicians.
          </p>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TREATMENTS.map((item) => (
            <div
              key={item.slug}
              className="bg-[#16161A] border border-white/10 rounded-2xl p-8 flex flex-col justify-between hover:border-[#C5A880]/50 transition-all group"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono text-[#C5A880] uppercase tracking-wider block">
                  {item.category}
                </span>
                <h3 className="text-2xl font-light text-white group-hover:text-[#C5A880] transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  {item.tagline}
                </p>

                <div className="pt-4 border-t border-white/5 flex items-center gap-4 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    {item.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                    {item.downtime}
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href={`/services/${item.slug}`}
                  className="w-full inline-flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 hover:bg-[#C5A880] hover:text-black text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span>Explore Protocol</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}