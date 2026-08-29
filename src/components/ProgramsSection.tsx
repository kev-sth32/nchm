import React, { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";

interface ProgramsSectionProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

export const PROGRAMS = [
  {
    id: "dgca",
    tabLabel: "Global Culinary (DGCA)",
    title: "Diploma in Global Culinary Arts (DGCA)",
    duration: "12 Months Intensive Culinary Training + Internship",
    places: "China • Mauritius • Dubai • Kuwait • Nepal • India",
    points: ["Knife skills, butchery & food prep", "HACCP food safety & hygiene mastery", "International gastronomy & plating", "Paid 6-month culinary placement"],
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1200&auto=format&fit=crop",
    color: "from-[#1B2A4A] to-[#0F172A]",
    accent: "bg-[#D4AF37]",
    dark: true,
  },
  {
    id: "dhm",
    tabLabel: "Hospitality Mgmt (DHM)",
    title: "Diploma in Hospitality Management (DHM)",
    duration: "9 Months Theory + Practical + 6 Months Internship",
    places: "China • Mauritius • Dubai • Kuwait • Nepal • India",
    points: ["Hotel operations & guest relations", "F&B service & banquet management", "Front office & housekeeping mastery", "Internship stipend (eligible)"],
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    color: "from-[#FBF6EC] to-white",
    accent: "bg-[#D4AF37]",
  },
  {
    id: "adhm",
    tabLabel: "Advance Diploma (ADHM)",
    title: "Advance Diploma in Hospitality Management (ADHM)",
    duration: "15 Months Theory + Practical + 6 Months Internship",
    places: "China • Mauritius • Dubai • Kuwait • Nepal • India",
    points: ["Leadership & hospitality supervision", "Strategic revenue & resort management", "Bachelor credit transfer pathway", "100% career placement guarantee"],
    img: "https://images.unsplash.com/photo-1551882547-b79c5d7dca89?q=80&w=1200&auto=format&fit=crop",
    color: "from-[#1B2A4A] to-[#111827]",
    accent: "bg-[#D4AF37]",
    dark: true,
  },
  {
    id: "barista",
    tabLabel: "Professional Barista",
    title: "Professional Barista & Bartending Masterclass",
    duration: "3-Month Basic + Latte Art / 1-Month Fast-Track",
    places: "NcHM Birgunj Training Lab + Cafe Exposure",
    points: ["Espresso extraction science", "Milk texturing & latte art calibration", "Bartending, mocktails & mixology", "Barista job placement support"],
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop",
    color: "from-[#FBF6EC] to-[#F3E5AB]/30",
    accent: "bg-[#D4AF37]",
  },
  {
    id: "bakery",
    tabLabel: "Bakery & Patisserie",
    title: "Certificate in Bakery, Pastry & Patisserie",
    duration: "Professional Bakery & Pastry Module",
    places: "NcHM Pastry & Bakery Labs",
    points: ["European artisanal breads & yeast doughs", "Cakes, tortes & French patisserie", "Dessert decoration & chocolate work", "Commercial bakery operation skills"],
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
    color: "from-white to-[#FBF6EC]",
    accent: "bg-[#1B2A4A]",
  },
  {
    id: "chef",
    tabLabel: "Advanced Chef Course",
    title: "Professional Chef Course – Advanced",
    duration: "Advanced Culinary & Station Management",
    places: "Commercial Kitchen Labs",
    points: ["Advanced kitchen station management", "Menu engineering & cost control", "HACCP & food safety compliance", "Culinary leadership & banquet ops"],
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop",
    color: "from-[#FBF6EC] to-[#EDE7DB]",
    accent: "bg-[#1B2A4A]",
  },
];

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenApplyModal }) => {
  const [activeProgId, setActiveProgId] = useState(PROGRAMS[0].id);
  const activeProg = PROGRAMS.find(p => p.id === activeProgId) || PROGRAMS[0];

  return (
    <section id="programs" className="py-20 bg-[#FBF6EC]/50 border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Academic & Vocational Offerings</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A] leading-tight">
            World-Class <span className="italic text-gradient-gold inline-block">Programs &amp; Certifications</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560] leading-relaxed">
            From 1-year diplomas with guaranteed international placements to specialized barista and culinary masterclasses.
          </p>
        </div>

        {/* Program Tabs Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-5xl mx-auto">
          {PROGRAMS.map((p) => {
            const isActive = p.id === activeProgId;
            return (
              <button
                key={p.id}
                onClick={() => setActiveProgId(p.id)}
                className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1B2A4A] text-white shadow-lg gold-glow scale-105"
                    : "bg-white text-[#1B2A4A] border border-[#EDE7DB] hover:border-[#D4AF37] hover:bg-[#FBF6EC]"
                }`}
              >
                {p.tabLabel}
              </button>
            );
          })}
        </div>

        {/* Active Program Showcase Card */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-white shadow-2xl">
          <div className="grid lg:grid-cols-12 items-stretch">
            
            {/* Program Details Column */}
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
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
              <div className="mt-10 pt-6 border-t border-[#EDE7DB] flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenApplyModal(activeProg.title)}
                  className="rounded-full bg-[#1B2A4A] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#0B132B] gold-glow-hover cursor-pointer"
                >
                  Apply for {activeProg.tabLabel} →
                </button>
                <button
                  onClick={() => onOpenApplyModal(activeProg.title)}
                  className="rounded-full border border-[#1B2A4A]/20 px-6 py-3.5 text-sm font-semibold text-[#1B2A4A] hover:bg-[#FBF6EC] cursor-pointer"
                >
                  Download Syllabus
                </button>
              </div>
            </div>

            {/* Program Image Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
              <img
                src={activeProg.img}
                alt={activeProg.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#1B2A4A]/40 lg:to-transparent" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
