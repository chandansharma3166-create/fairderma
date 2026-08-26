"use client";

import Image from "next/image";
import { Award, ShieldCheck } from "lucide-react";

interface Doctor {
  name: string;
  role: string;
  image: string;
  credentials: string[];
  bio: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Elena Rostova, MD",
    role: "Chief of Aesthetic Dermatology",
    image: "/doctor1.png",
    credentials: ["Board Certified Dermatologist", "Harvard Dermal Fellow", "14+ Years Clinical Exp"],
    bio: "Specializing in micro-volumetric restoration and fractional laser synthesis with an architectural approach to facial balance.",
  },
  {
    name: "Dr. Marcus Vance, MD, PhD",
    role: "Director of Laser & Cellular Therapeutics",
    image: "/doctor2.png",
    credentials: ["Cellular Biology PhD", "European Board of Dermatology", "ASLMS Laser Fellow"],
    bio: "Pioneer in non-ablative dermal restructuring, scar revision protocols, and advanced regenerative exosome therapies.",
  },
];

export default function PhysicianTeam() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
            <ShieldCheck className="w-3.5 h-3.5" /> Medical Faculty
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Specialist <span className="text-[#C5A880]">Physicians</span>
          </h2>
        </div>
        <p className="text-neutral-400 text-xs max-w-md">
          All consultations and procedural protocols are directly formulated and overseen by board-certified medical doctors.
        </p>
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {doctors.map((doc) => (
          <div
            key={doc.name}
            className="bg-[#16161A] border border-white/10 flex flex-col justify-between group hover:border-[#C5A880]/50 transition-all duration-300"
          >
            {/* Fully Proportional Portrait Container */}
            <div className="relative w-full aspect-[4/5] sm:aspect-[3/3.5] overflow-hidden bg-[#0D0D0F]">
              <Image
                src={doc.image}
                alt={doc.name}
                fill
                priority
                className="object-cover object-center transition-all duration-500 group-hover:scale-105"
              />
            </div>

            {/* Details Section */}
            <div className="p-8 space-y-4 border-t border-white/10">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-wide text-white">{doc.name}</h3>
                <p className="text-xs uppercase font-mono tracking-widest text-[#C5A880] mt-1">{doc.role}</p>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">{doc.bio}</p>

              <div className="pt-4 border-t border-white/5 space-y-2">
                {doc.credentials.map((cred) => (
                  <div key={cred} className="flex items-center gap-2 text-[11px] font-mono text-neutral-300">
                    <Award className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}