import React from "react";
import { AnimatedStat, StaggerGrid, StaggerItem } from "./motion/MotionPrimitives";

const STATS = [
  { k: "2018", v: "Established AD", sub: "Premium since day one" },
  { k: "12 Mo", v: "Global Culinary Diploma", sub: "DGCA Practical Labs" },
  { k: "9+6", v: "Months DHM + Internship", sub: "Theory + real hotels" },
  { k: "15+6", v: "Months ADHM + Internship", sub: "Advanced + global" },
  { k: "20%", v: "Girls Scholarship", sub: "Tuition support" },
  { k: "SQA", v: "Scotland Benchmarked", sub: "SCQF & EQF aligned" },
];

export const StatsBar: React.FC = () => {
  return (
    <section className="bg-[#1B2A4A] text-white py-9 sm:py-12 border-b border-[#D4AF37]/30">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <StaggerGrid className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-6" staggerDelay={0.05}>
          {STATS.map((s, idx) => (
            <StaggerItem
              key={idx}
              className="rounded-2xl border border-[#D4AF37]/20 bg-[#0B132B]/60 backdrop-blur-md p-4 sm:p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#0B132B]"
            >
              <div className="text-2xl sm:text-3xl font-display font-bold text-[#D4AF37]">
                <AnimatedStat value={s.k} />
              </div>
              <div className="mt-1 text-xs font-semibold text-white tracking-tight">{s.v}</div>
              <div className="mt-1 text-[11px] text-white/60">{s.sub}</div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
};
