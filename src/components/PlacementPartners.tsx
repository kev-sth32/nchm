import React from "react";
import { Briefcase } from "lucide-react";
import { Reveal, StaggerGrid, StaggerItem } from "./motion/MotionPrimitives";

const HOTELS = [
  { name: "Siddhartha Diyalo", loc: "Birgunj", stars: "★★★★", img: "https://hoteldiyalo.com.np/wp-content/uploads/2025/06/Hotel-Diyalo-Banner-Birgunj-image-1-scaled.webp" },
  { name: "Clark Resort", loc: "Birgunj", stars: "★★★★", img: "https://clarksresortnepal.com/wp-content/uploads/2023/07/IMG_7805-1-scaled.jpg" },
  { name: "Sarovar Portico", loc: "Birgunj", stars: "★★★★", img: "/sarovar-birgunj.png" },
];

const PLACEMENTS = ["Dubai", "Romania", "USA", "Canada", "Bangkok / Thailand", "Birgunj", "Pokhara", "Kathmandu"];

export const PlacementPartners: React.FC = () => {
  return (
    <section id="career" className="py-12 sm:py-16 lg:py-20 bg-[#FFFCF6] border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#FBF6EC] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <Briefcase className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Placement Pipelines</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A]">
            100% Guaranteed <span className="italic text-gradient-gold">Job Placement Support</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560]">
            Direct corporate relationships with top 4★ & 5★ hotel chains in Nepal and global hospitality hubs.
          </p>
        </Reveal>

        {/* Mobile Swipe Hint */}
        <div className="mt-8 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#9C7D4A] sm:hidden">
          <span>Partner Hotels</span>
          <span>Swipe →</span>
        </div>

        {/* Local Partner Hotel Cards (Horizontal snap-deck on mobile, 3-col grid on tablet/desktop) */}
        <StaggerGrid className="mt-3 sm:mt-14 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 no-scrollbar sm:grid sm:grid-cols-3 sm:gap-8 sm:overflow-visible sm:pb-0">
          {HOTELS.map((h) => (
            <StaggerItem
              key={h.name}
              className="snap-start shrink-0 w-[82vw] max-w-[320px] sm:w-auto sm:max-w-none group overflow-hidden rounded-3xl border border-[#EDE7DB] bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-2xl gold-glow-hover"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={h.img}
                  alt={`${h.name} Hotel ${h.loc} - Official Practical Training & Placement Partner of NcHM`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 rounded-full bg-[#0B132B]/80 px-3 py-1 text-xs font-bold text-[#D4AF37] backdrop-blur-md">
                  {h.stars}
                </div>
              </div>

              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">{h.loc}, Nepal</div>
                <h3 className="mt-1 text-xl font-display font-bold text-[#1B2A4A]">{h.name}</h3>
                <p className="mt-2 text-xs text-[#6B6560]">
                  Official practical exposure & placement partner for NcHM students.
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* Global Cities Marquee Ticker */}
        <Reveal delay={0.1} className="mt-16 rounded-3xl border border-[#D4AF37]/30 bg-[#1B2A4A] py-8 px-4 sm:px-8 text-white overflow-hidden">
          <div className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            Active Student Placement Destinations
          </div>
          <div
            className="marquee-container relative mt-6 overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div className="animate-marquee flex items-center gap-3 pr-3">
              {[...PLACEMENTS, ...PLACEMENTS].map((city, idx) => (
                <span
                  key={`${city}-${idx}`}
                  className="shrink-0 rounded-full border border-[#D4AF37]/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-[#D4AF37] hover:bg-white/20"
                >
                  📍 {city}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
};
