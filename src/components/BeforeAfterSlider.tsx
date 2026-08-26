"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 text-[#C5A880] text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Clinical Evidence
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Documented <span className="text-[#C5A880]">Transformations</span>
          </h2>
        </div>
        <p className="text-neutral-400 text-xs max-w-md">
          Drag the interactive slider to compare baseline clinical condition against post-procedure recovery.
        </p>
      </div>

      {/* Comparison Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl mx-auto h-[420px] sm:h-[550px] select-none overflow-hidden border border-white/10 bg-[#16161A] cursor-ew-resize rounded-sm shadow-2xl"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
      >
        {/* "After" Image Layer (Base) */}
        <div className="absolute inset-0">
          <Image
            src="/after.png"
            alt="After Treatment"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute bottom-6 right-6 z-10">
            <span className="text-[11px] uppercase tracking-widest px-3 py-1.5 bg-[#0D0D0F]/80 backdrop-blur-md text-[#C5A880] border border-[#C5A880]/40 font-mono font-semibold">
              Post-Treatment (Week 4)
            </span>
          </div>
        </div>

        {/* "Before" Image Layer (Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src="/before.png"
            alt="Before Treatment"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute bottom-6 left-6 z-10">
            <span className="text-[11px] uppercase tracking-widest px-3 py-1.5 bg-[#0D0D0F]/80 backdrop-blur-md text-neutral-300 border border-white/20 font-mono font-semibold">
              Baseline (Pre-Treatment)
            </span>
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#C5A880] pointer-events-none shadow-[0_0_15px_rgba(197,168,128,0.9)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 bg-[#0D0D0F] border border-[#C5A880] rounded-full flex items-center justify-center text-[#C5A880] shadow-xl font-mono text-xs font-bold">
            ↔
          </div>
        </div>
      </div>
    </section>
  );
}