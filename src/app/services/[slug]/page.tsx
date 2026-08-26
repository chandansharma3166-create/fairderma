import { notFound } from "next/navigation";
import Link from "next/link";
import { TREATMENTS } from "@/data/treatments";
import { ArrowLeft, Clock, ShieldCheck, CheckCircle2, Calendar } from "lucide-react";

export async function generateStaticParams() {
  return TREATMENTS.map((treatment) => ({
    slug: treatment.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d0f12] text-white py-12 px-6 lg:px-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase text-neutral-400 hover:text-[#C5A880] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Clinical Menu
        </Link>

        {/* Hero Section */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <span className="text-xs font-mono text-[#C5A880] uppercase tracking-widest">
            {treatment.category}
          </span>
          <h1 className="text-3xl lg:text-5xl font-light text-white tracking-tight">
            {treatment.title}
          </h1>
          <p className="text-lg text-neutral-300 font-light leading-relaxed">
            {treatment.description}
          </p>

          <div className="flex flex-wrap gap-6 pt-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">
              <Clock className="w-4 h-4 text-[#C5A880]" />
              <span>Duration: {treatment.duration}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-md border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Downtime: {treatment.downtime}</span>
            </div>
          </div>
        </div>

        {/* Clinical Benefits & Indications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#16161A] p-6 rounded-xl border border-white/10 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#C5A880]">
              Clinical Benefits
            </h3>
            <ul className="space-y-3 text-xs text-neutral-300">
              {treatment.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#16161A] p-6 rounded-xl border border-white/10 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#C5A880]">
              Primary Indications
            </h3>
            <ul className="space-y-3 text-xs text-neutral-300">
              {treatment.idealFor.map((indication, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                  <span>{indication}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Workflow Protocol */}
        <div className="space-y-6">
          <h3 className="text-sm font-mono uppercase tracking-wider text-[#C5A880]">
            Clinical Workflow Protocol
          </h3>
          <div className="space-y-3">
            {treatment.protocol.map((protocolStep, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-2"
              >
                <div className="font-mono text-sm text-white">{protocolStep.step}</div>
                <div className="text-xs text-neutral-400 max-w-md">{protocolStep.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Callout */}
        <div className="p-8 rounded-2xl bg-[#C5A880] text-black flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Ready for a Clinical Consultation?</h3>
            <p className="text-xs text-black/80 mt-1">
              Schedule a personalized 3D diagnostic evaluation with our physicians.
            </p>
          </div>
          <Link
            href="/#consultation"
            className="px-6 py-3.5 bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-lg shrink-0 hover:bg-neutral-900 transition-colors flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" /> Book Appointment
          </Link>
        </div>
      </div>
    </main>
  );
}