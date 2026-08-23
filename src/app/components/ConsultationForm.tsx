"use client";

import { useState } from "react";
import { Calendar, Clock, CheckCircle, Sparkles, User, Mail, Phone, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ConsultationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    physician: "Dr. Elena Rostova, MD (Aesthetic Chief)",
    treatment: "Facial Sculpting & Volumetrics",
    preferredDate: "",
    preferredTime: "Morning (09:00 - 13:00)",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.from("consultations").insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          physician: formData.physician,
          treatment: formData.treatment,
          preferred_date: formData.preferredDate,
          preferred_time: formData.preferredTime,
        },
      ]);

      if (error) {
        throw error;
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to submit consultation request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="consultation" className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Direct Clinical Triage
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-tight">
            Reserve Your <br />
            <span className="text-[#C5A880]">Consultation.</span>
          </h2>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Every clinical roadmap begins with a comprehensive 45-minute computerized skin topology assessment and direct physician diagnosis.
          </p>

          <div className="space-y-4 pt-4 border-t border-white/10 text-xs font-mono text-neutral-300">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span>Complimentary 3D Dermal Depth Scan</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span>Personalized Cellular Restructuring Plan</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span>Direct 1-on-1 MD Protocol Guidance</span>
            </div>
          </div>
        </div>

        {/* Right Column Form / Success Window */}
        <div className="lg:col-span-7 bg-[#16161A] border border-white/10 p-8 sm:p-10 relative">
          {submitted ? (
            <div className="py-12 text-center space-y-5">
              <div className="w-14 h-14 bg-[#0D0D0F] border border-[#C5A880] text-[#C5A880] rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide text-white">
                Request Dispatched
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="text-[#C5A880] font-bold">{formData.name}</span>. Our clinical concierge team has reserved your triage slot with <span className="text-white">{formData.physician}</span>. We will call you within 2 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-white/5 border border-white/10 text-xs uppercase font-mono text-[#C5A880] hover:bg-white/10 transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMsg && (
                <div className="p-3 bg-red-950/50 border border-red-500/50 text-red-300 text-xs font-mono">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono text-neutral-400 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C5A880]" /> Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0D0D0F] border border-white/10 px-4 py-3 text-xs text-white placeholder:text-neutral-600 focus:border-[#C5A880] outline-none"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono text-neutral-400 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#C5A880]" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0D0D0F] border border-white/10 px-4 py-3 text-xs text-white placeholder:text-neutral-600 focus:border-[#C5A880] outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase font-mono text-neutral-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#C5A880]" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="jane.doe@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0D0D0F] border border-white/10 px-4 py-3 text-xs text-white placeholder:text-neutral-600 focus:border-[#C5A880] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Physician Select */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono text-neutral-400">
                    Preferred Physician
                  </label>
                  <select
                    value={formData.physician}
                    onChange={(e) => setFormData({ ...formData, physician: e.target.value })}
                    className="w-full bg-[#0D0D0F] border border-white/10 px-4 py-3 text-xs text-white focus:border-[#C5A880] outline-none"
                  >
                    <option value="Dr. Elena Rostova, MD (Aesthetic Chief)">Dr. Elena Rostova, MD</option>
                    <option value="Dr. Marcus Vance, MD, PhD (Laser Lead)">Dr. Marcus Vance, MD, PhD</option>
                  </select>
                </div>

                {/* Treatment Focus */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono text-neutral-400">
                    Primary Concern
                  </label>
                  <select
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className="w-full bg-[#0D0D0F] border border-white/10 px-4 py-3 text-xs text-white focus:border-[#C5A880] outline-none"
                  >
                    <option value="Facial Sculpting & Volumetrics">Facial Sculpting & Volumetrics</option>
                    <option value="Pigmentation & Laser Clearance">Pigmentation & Laser Clearance</option>
                    <option value="Cellular Collagen Regeneration">Cellular Collagen Regeneration</option>
                    <option value="Complete Baseline Skin Analysis">Complete Baseline Skin Analysis</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Date */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono text-neutral-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-[#0D0D0F] border border-white/10 px-4 py-3 text-xs text-white focus:border-[#C5A880] outline-none"
                  />
                </div>

                {/* Time Slot */}
                <div className="space-y-1.5">
                  <label className="text-[11px] uppercase font-mono text-neutral-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880]" /> Preferred Time Window
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#0D0D0F] border border-white/10 px-4 py-3 text-xs text-white focus:border-[#C5A880] outline-none"
                  >
                    <option value="Morning (09:00 - 13:00)">Morning (09:00 - 13:00)</option>
                    <option value="Afternoon (13:00 - 16:30)">Afternoon (13:00 - 16:30)</option>
                    <option value="Evening (16:30 - 19:00)">Evening (16:30 - 19:00)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#C5A880] text-black font-bold text-xs uppercase tracking-widest hover:bg-[#b39369] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Reservation...</span>
                  </>
                ) : (
                  <span>Confirm Appointment Triage</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}