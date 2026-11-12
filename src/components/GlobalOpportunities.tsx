import React, { useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Globe, Building2, ChevronRight, Sparkles, MapPin } from "lucide-react";
import { Interactive3DScene } from "./Interactive3DScene";
import { LUXURY_EASE, Reveal } from "./motion/MotionPrimitives";

const DESTINATIONS = [
  { 
    name: "Dubai", 
    country: "United Arab Emirates (UAE)",
    cities: "Dubai City • Downtown • Palm Jumeirah", 
    flag: "🇦🇪", 
    hotels: "Luxury Hotel Networks",
    details: "6-Month Paid Hospitality Exposure & Practical Training in Modern Luxury Hotels (Subject to eligibility & visa).",
    roles: "Concierge • Front Office • Event Operations"
  },
  { 
    name: "China", 
    country: "People's Republic of China",
    cities: "Beijing • Shanghai • Guangzhou", 
    flag: "🇨🇳", 
    hotels: "4★ & 5★ Partner Hotels",
    details: "6-Month International Internship Exposure in Partner Hotels across major commercial culinary hubs.",
    roles: "Front Desk • F&B Service • Housekeeping Ops"
  },
  { 
    name: "Mauritius", 
    country: "Republic of Mauritius",
    cities: "Port Louis • Grand Baie • Belle Mare", 
    flag: "🇲🇺", 
    hotels: "Resort Exposure",
    details: "Hospitality Internship Opportunities in Partner Island Resorts with island guest relations training.",
    roles: "Resort Guest Relations • Island F&B • Hospitality Ops"
  },
  { 
    name: "Kuwait", 
    country: "State of Kuwait",
    cities: "Kuwait City • Salmiya", 
    flag: "🇰🇼", 
    hotels: "Commercial Hotels",
    details: "Corporate Hospitality Internship & Culinary Exposure in high-end Middle Eastern hotels.",
    roles: "Food Service • Culinary Labs • Guest Services"
  },
  { 
    name: "India", 
    country: "Republic of India",
    cities: "Delhi NCR • Mumbai • Bengaluru", 
    flag: "🇮🇳", 
    hotels: "National Hotel Chains",
    details: "Metro Hotel Operational & Practical Hospitality Exposure in 4★ and 5★ commercial chains.",
    roles: "Kitchen Commis • Banquet Ops • Housekeeping"
  },
  { 
    name: "Nepal", 
    country: "Federal Democratic Republic of Nepal",
    cities: "Birgunj • Pokhara • Kathmandu", 
    flag: "🇳🇵", 
    hotels: "Home Base Networks",
    details: "Practical Hospitality Training & Local Hotel Exposure with Siddhartha Diyalo, Clark Resort & Sarovar Portico.",
    roles: "Lobby Ops • Kitchen Operations • F&B Services"
  },
];

interface GlobalOpportunitiesProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

export const GlobalOpportunities: React.FC<GlobalOpportunitiesProps> = ({ onOpenApplyModal }) => {
  const [activeDestName, setActiveDestName] = useState("Dubai");
  const activeDest = DESTINATIONS.find(d => d.name === activeDestName) || DESTINATIONS[0];

  return (
    <section id="global-opportunities" className="py-12 sm:py-16 lg:py-20 bg-[#FFFCF6] border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        
        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#FBF6EC] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <Globe className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Paid International Internships</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A]">
            Your Gateway to <span className="italic text-gradient-gold">6 International Markets</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560]">
            Tap any country below to automatically pinpoint and rotate the 3D map globe directly to that destination!
          </p>
        </Reveal>

        {/* Master Unified 2-Column Glass Showcase Card */}
        <Reveal delay={0.08} className="mt-8 sm:mt-12 overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-[#0B132B] text-white shadow-2xl relative">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 -mt-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 right-0 -mb-20 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(27,42,74,0.45)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 items-stretch lg:min-h-[580px]">
            
            {/* Left Column: Interactive 3D Globe Canvas (50% desktop width) */}
            <div className="lg:col-span-6 relative flex flex-col justify-between p-4 sm:p-6 lg:border-r lg:border-white/10 bg-gradient-to-b from-black/40 to-transparent">
              
              {/* Mobile-First Country Selector Above Globe (visible < lg) */}
              <div className="mb-3 lg:hidden">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#D4AF37] flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3 text-[#D4AF37]" />
                  <span>Tap Destination to Pinpoint 3D Globe</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-6">
                  {DESTINATIONS.map((d) => {
                    const isActive = d.name === activeDestName;
                    return (
                      <button
                        key={d.name}
                        onClick={() => setActiveDestName(d.name)}
                        className={`relative flex items-center justify-center gap-1.5 rounded-xl px-2 py-2 text-[11px] font-bold transition-colors cursor-pointer ${
                          isActive
                            ? "text-[#0B132B]"
                            : "bg-white/10 text-white border border-white/10"
                        }`}
                      >
                        {isActive && (
                          <m.span
                            layoutId="global-dest-pill-mobile"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            className="absolute inset-0 rounded-xl bg-[#D4AF37] shadow-md"
                          />
                        )}
                        <span className="relative z-10 text-sm">{d.flag}</span>
                        <span className="relative z-10 truncate">{d.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Globe Header Badge */}
              <div className="flex items-center justify-between gap-2 z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#1B2A4A]/90 sm:bg-white/10 sm:backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-[#D4AF37] border border-[#D4AF37]/30">
                  <span className="relative flex h-2.5 w-2.5 items-center justify-center shrink-0">
                    <span className="absolute inline-flex h-2 w-2 rounded-full bg-[#D4AF37] opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  </span>
                  <span>3D Map Pinpoint: <strong className="text-white ml-1">{activeDest.flag} {activeDest.name}</strong></span>
                </div>
                <div className="text-[11px] text-white/50 hidden sm:block">
                  Click buttons to pinpoint map
                </div>
              </div>

              {/* 3D Canvas Container passing activeDestName */}
              <div className="relative isolate transform-gpu my-3 sm:my-4 h-[290px] sm:h-[400px] lg:h-[460px] w-full rounded-2xl overflow-hidden">
                <Interactive3DScene activeDestName={activeDestName} />
              </div>

              {/* Globe Footer Interactive Hub Indicators */}
              <div className="hidden sm:flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 text-[11px] text-white/70">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-[#D4AF37]" />
                  <span>Base Hub: <strong>Birgunj, Nepal</strong></span>
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[#E8C99A]">
                  {DESTINATIONS.map((d) => (
                    <button
                      key={d.name}
                      onClick={() => setActiveDestName(d.name)}
                      className={`hover:text-[#D4AF37] transition cursor-pointer px-1 py-0.5 rounded ${
                        d.name === activeDestName ? "text-[#D4AF37] font-bold underline bg-white/10" : ""
                      }`}
                    >
                      {d.flag} {d.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Country Selection & Active Details Panel (50% desktop width) */}
            <div className="lg:col-span-6 p-4 sm:p-8 lg:p-10 flex flex-col justify-between">
              
              <div>
                {/* Desktop Section Subtitle & Pills */}
                <div className="hidden lg:block">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>Select Destination Hub (Pinpoint on Map)</span>
                  </div>

                  {/* Country Pill Selector */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {DESTINATIONS.map((d) => {
                      const isActive = d.name === activeDestName;
                      return (
                        <button
                          key={d.name}
                          onClick={() => setActiveDestName(d.name)}
                          className={`relative flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
                            isActive
                              ? "text-[#0B132B]"
                              : "bg-white/10 text-white border border-white/10 hover:border-[#D4AF37]/50 hover:bg-white/20"
                          }`}
                        >
                          {isActive && (
                            <m.span
                              layoutId="global-dest-pill"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                              className="absolute inset-0 rounded-full bg-[#D4AF37] shadow-lg gold-glow"
                            />
                          )}
                          <span className="relative z-10 text-base">{d.flag}</span>
                          <span className="relative z-10">{d.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Country Detail Box */}
                <div className="lg:mt-6 rounded-2xl border border-[#D4AF37]/30 bg-white/5 p-4 sm:p-6 backdrop-blur-md">
                  <AnimatePresence mode="wait">
                    <m.div
                      key={activeDest.name}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: LUXURY_EASE }}
                    >
                      {/* Country Title */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl sm:text-4xl shrink-0">{activeDest.flag}</span>
                          <div>
                            <h3 className="text-xl sm:text-2xl font-display font-bold text-white">{activeDest.name}</h3>
                            <div className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37]">{activeDest.country}</div>
                          </div>
                        </div>
                        <span className="self-start sm:self-auto rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-bold text-[#D4AF37] shrink-0">
                          Pinpointed on 3D Map ✓
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-4 text-xs sm:text-sm text-white/80 leading-relaxed">
                        {activeDest.details}
                      </p>

                      {/* Metadata Specs Grid */}
                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border border-white/10 bg-black/30 p-3.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Key Cities & Hubs</div>
                          <div className="mt-1 text-xs font-semibold text-white">{activeDest.cities}</div>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/30 p-3.5">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">Target Hotel Networks</div>
                          <div className="mt-1 text-xs font-semibold text-white">{activeDest.hotels}</div>
                        </div>
                      </div>

                      {/* Roles */}
                      <div className="mt-4 flex items-center gap-2 text-xs text-[#E8C99A]">
                        <Building2 className="h-3.5 w-3.5 text-[#D4AF37] shrink-0" />
                        <span>Typical Roles: <strong>{activeDest.roles}</strong></span>
                      </div>
                    </m.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* CTA Action Bar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="text-xs text-white/70">
                  ⚡ Stipend & visa assistance provided by NcHM Placement Cell.
                </div>
                <button
                  onClick={() => onOpenApplyModal(`Internship in ${activeDest.name}`)}
                  className="btn-gold-sheen rounded-full bg-[#D4AF37] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:bg-[#E8C99A] gold-glow-hover cursor-pointer transition flex items-center justify-center gap-2 shrink-0 active:scale-[0.98]"
                >
                  <span>Inquire for {activeDest.name}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>

        </Reveal>

      </div>
    </section>
  );
};
