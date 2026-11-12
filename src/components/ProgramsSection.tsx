import React, { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { LUXURY_EASE, Reveal } from "./motion/MotionPrimitives";

interface ProgramsSectionProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

export const PROGRAMS = [
  {
    id: "dhm",
    tabLabel: "Hospitality Mgmt (DHM)",
    title: "Diploma in Hospitality Management (DHM)",
    duration: "9 Months Theory + Practical + 6 Months Internship",
    places: "China • Mauritius • Dubai • Kuwait • Nepal • India",
    points: ["Hotel operations & guest relations", "F&B service & banquet management", "Front office & housekeeping mastery", "Paid 6-month international internship"],
    img: "/nchm/06_1726158849679.jpg",
  },
  {
    id: "adhm",
    tabLabel: "Advance Diploma (ADHM)",
    title: "Advance Diploma in Hospitality Management (ADHM)",
    duration: "15 Months Theory + Practical + 6 Months Internship",
    places: "China • Mauritius • Dubai • Kuwait • Nepal • India",
    points: ["Leadership & hospitality supervision", "Strategic revenue & resort management", "2nd Year Bachelor credit transfer pathway", "100% career placement guarantee"],
    img: "/nchm/48_IMG20260809141153.jpg",
  },
  {
    id: "barista",
    tabLabel: "Barista Course (1 & 2 Mo)",
    title: "Professional Barista Course (1 Month Fast-Track / 2 Months Intensive)",
    duration: "1 Month / 2 Months Hands-On Practical Training",
    places: "NcHM Specialty Coffee Lab & Café Simulation Bar",
    points: [
      "Espresso science, grind calibration & dose extraction",
      "Milk steaming, micro-foam texturing & latte art",
      "Manual brewing methods (V60, French Press, Aeropress)",
      "Commercial café bar setup, customer service & billing",
      "Placement support in top cafés in Nepal, Dubai & Gulf"
    ],
    img: "/nchm/05_1726158849260.jpg",
  },
  {
    id: "kitchen-short",
    tabLabel: "Kitchen Short-Term Course",
    title: "Kitchen Short-Term Course (Fast-Food Processor / Basic Kitchen Training)",
    duration: "Short-Term Intensive Skill Module",
    places: "NcHM Commercial Kitchen Labs",
    points: ["Fast-food processing & prep techniques", "Basic kitchen safety & knife handling", "Short-order cooking & food hygiene", "Commercial kitchen operations"],
    img: "/nchm/07_1726158849714.jpg",
  },
];

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenApplyModal }) => {
  const [activeProgId, setActiveProgId] = useState(PROGRAMS[0].id);
  const activeProg = PROGRAMS.find(p => p.id === activeProgId) || PROGRAMS[0];

  return (
    <section id="programs" className="py-12 sm:py-16 lg:py-20 bg-[#FBF6EC]/50 border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Academic & Vocational Offerings</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A] leading-tight">
            World-Class <span className="italic text-gradient-gold inline-block">Programs &amp; Certifications</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560] leading-relaxed">
            From 9-month &amp; 15-month diplomas with guaranteed paid international placements to 1-month / 2-month Barista Course and Kitchen short-term training.
          </p>

          {/* Minimum Qualification Badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#1B2A4A] px-4 py-1.5 text-xs font-bold text-[#D4AF37] shadow-md">
            <span>🎓 Minimum Qualification: 1.6 GPA in SLC/SEE</span>
          </div>
        </Reveal>

        {/* Program Tabs Bar */}
        <div className="mt-8 sm:mt-12 flex items-center justify-start sm:justify-center gap-2 sm:gap-3 max-w-5xl mx-auto overflow-x-auto py-2 px-1 no-scrollbar">
          {PROGRAMS.map((p) => {
            const isActive = p.id === activeProgId;
            return (
              <button
                key={p.id}
                onClick={(e) => {
                  setActiveProgId(p.id);
                  e.currentTarget.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                }}
                className={`relative shrink-0 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "text-white"
                    : "bg-white text-[#1B2A4A] border border-[#EDE7DB] hover:border-[#D4AF37] hover:bg-[#FBF6EC]"
                }`}
              >
                {isActive && (
                  <m.span
                    layoutId="programs-active-tab"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-[#1B2A4A] shadow-lg gold-glow"
                  />
                )}
                <span className="relative z-10">{p.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Active Program Showcase Card */}
        <Reveal delay={0.08} className="mt-8 overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-white shadow-2xl">
          <AnimatePresence mode="wait">
            <m.div
              key={activeProg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: LUXURY_EASE }}
              className="grid lg:grid-cols-12 items-stretch"
            >

              {/* Program Details Column */}
              <div className="lg:col-span-7 p-5 sm:p-8 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#FBF6EC] px-4 py-1.5 text-xs font-bold text-[#1B2A4A] border border-[#D4AF37]/20">
                    <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>{activeProg.duration}</span>
                  </div>

                  <h3 className="mt-6 text-2xl sm:text-3xl font-display font-semibold text-[#1B2A4A] leading-snug">
                    {activeProg.title}
                  </h3>

                  <p className="mt-3 text-sm font-medium text-[#D4AF37]">
                    Paid Internship Locations: <span className="text-[#1B2A4A]">{activeProg.places}</span>
                  </p>

                  {/* Key Points */}
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {activeProg.points.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D4AF37] mt-0.5" />
                        <span className="text-sm text-[#6B6560] leading-snug">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Action */}
                <div className="mt-10 pt-6 border-t border-[#EDE7DB] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    onClick={() => onOpenApplyModal(activeProg.title)}
                    className="btn-gold-sheen w-full sm:w-auto text-center rounded-full bg-[#1B2A4A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0B132B] gold-glow-hover cursor-pointer active:scale-[0.98]"
                  >
                    Apply for {activeProg.tabLabel} →
                  </button>
                  <button
                    onClick={() => onOpenApplyModal(`Syllabus Request - ${activeProg.title}`)}
                    className="w-full sm:w-auto text-center rounded-full border border-[#1B2A4A]/20 px-6 py-3.5 text-sm font-semibold text-[#1B2A4A] hover:bg-[#FBF6EC] cursor-pointer active:scale-[0.98]"
                  >
                    Download Syllabus
                  </button>
                </div>
              </div>

              {/* Program Image Column */}
              <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[300px] lg:min-h-full overflow-hidden">
                <img
                  src={activeProg.img}
                  alt={`${activeProg.title} at Nepal College of Hotel Management (NcHM Birgunj)`}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#1B2A4A]/40 lg:to-transparent" />
              </div>

            </m.div>
          </AnimatePresence>
        </Reveal>

      </div>
    </section>
  );
};
