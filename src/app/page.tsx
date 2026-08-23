"use client";

import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import BeforeAfterSlider from "./components/BeforeAfterSlider";
import SkinAnalysisQuiz from "./components/SkinAnalysisQuiz";
import TreatmentExplorer from "./components/TreatmentExplorer";
import PhysicianTeam from "./components/PhysicianTeam";
import ClinicalMetrics from "./components/ClinicalMetrics";
import FaqSection from "./components/FaqSection";
import ConsultationForm from "./components/ConsultationForm";
import FloatingBookingBtn from "./components/FloatingBookingBtn";
import Footer from "./components/Footer";
import { ArrowRight, Sparkles } from "lucide-react";

const DermalCanvas = dynamic(() => import("./components/3d/DermalCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0D0D0F] text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Certified Medical Dermatology
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight leading-tight">
            Architectural <br />
            <span className="text-[#C5A880]">Skin Science.</span>
          </h1>

          <p className="text-neutral-400 text-sm max-w-lg">
            FairDerma combines medical dermatology and aesthetic precision to create natural skin transformations.
          </p>

          <a
            href="#consultation"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A880] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#b39369] transition-all"
          >
            Book Consultation <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="lg:col-span-5 bg-white/[0.02] border border-white/10 p-2 min-h-[420px] flex items-center justify-center">
          <DermalCanvas />
        </div>
      </section>

      {/* Interactive Before/After Clinical Slider */}
      <BeforeAfterSlider />

      {/* Diagnostic Assessment Protocol Selector */}
      <SkinAnalysisQuiz />

      {/* Expandable Treatment Explorer */}
      <TreatmentExplorer />

      {/* Medical Faculty */}
      <PhysicianTeam />

      {/* Clinical Evidence, Metrics & Testimonials */}
      <ClinicalMetrics />

      {/* Patient FAQ Guidance */}
      <FaqSection />

      {/* Integrated Consultation Booking Module */}
      <ConsultationForm />

      {/* Floating Action Button */}
      <FloatingBookingBtn />

      {/* Footer */}
      <Footer />
    </main>
  );
}