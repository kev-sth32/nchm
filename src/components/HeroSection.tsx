import React from "react";
import { Award, ChevronRight, GraduationCap, Globe, Briefcase, Star, ShieldCheck } from "lucide-react";
import { Interactive3DScene } from "./Interactive3DScene";
import { Reveal } from "./motion/MotionPrimitives";

interface HeroSectionProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

const HERO_AVATARS = [
  "/nchm/students/nishant-avatar.jpg",
  "/nchm/students/ajay-avatar.jpg",
  "/nchm/students/faruk-avatar.jpg",
  "/nchm/students/raju-avatar.jpg",
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenApplyModal }) => {
  return (
    <section className="relative overflow-x-clip bg-gradient-to-b from-[#FFFCF6] via-[#FBF6EC]/50 to-[#FFFCF6] py-8 sm:py-12 lg:py-20 border-b border-[#EDE7DB]">
      {/* Subtle Gold Dot Pattern Layer */}
      <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-12 lg:items-center">

          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7">
            {/* Accreditation Badge */}
            <Reveal delay={0.04} y={12}>
              <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl sm:rounded-full border border-[#D4AF37]/30 bg-[#FBF6EC] px-3.5 sm:px-4 py-1.5 text-[11.5px] sm:text-[12px] font-semibold text-[#1B2A4A] shadow-sm mb-4 sm:mb-6">
                <Award className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span>SQA Scotland & LCCI GQ Quality Assured</span>
                <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                <span className="text-[#6B6560]">Est. 2018 AD • Birgunj, Nepal</span>
              </div>
            </Reveal>

            {/* Main Headline with High-Impact Keyword Targeting */}
            <Reveal delay={0.08} y={18}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#1B2A4A] leading-[1.08] tracking-tight">
                <span className="block text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 sm:mb-3">
                  Premier Hotel Management College in Birgunj &amp; Madhesh Province
                </span>
                Learn. Work. Intern. Earn. <br />
                <span className="italic font-normal text-gradient-gold">Go Global.</span>
              </h1>
            </Reveal>

            {/* Subheadline / Value Prop */}
            <Reveal delay={0.14} y={16}>
              <p className="mt-4 sm:mt-6 text-base sm:text-xl text-[#6B6560] font-normal leading-relaxed max-w-2xl">
                Premier Culinary Arts & Hospitality Management institution in Birgunj. Guaranteed 6-month paid international internships across <strong className="text-[#1B2A4A] font-semibold">China, Mauritius, Dubai, Kuwait, India & Nepal</strong> with foreign Bachelor credit transfer pathways.
              </p>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal delay={0.18} y={14} className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={() => onOpenApplyModal("2026 Admissions Application")}
                className="btn-gold-sheen inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2A4A] px-7 py-3.5 sm:py-4 text-sm font-semibold text-white shadow-xl transition-all hover:bg-[#0B132B] gold-glow-hover cursor-pointer active:scale-[0.98]"
              >
                <span>Apply for 2026 Admissions</span>
                <ChevronRight className="h-4 w-4 text-[#D4AF37]" />
              </button>
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1B2A4A]/20 bg-white/95 px-6 py-3.5 sm:py-4 text-sm font-semibold text-[#1B2A4A] transition hover:border-[#D4AF37] hover:bg-[#FBF6EC] cursor-pointer active:scale-[0.98]"
              >
                <span>Explore Programs</span>
              </a>
            </Reveal>

            {/* Student Social Proof Avatar Stack & High-Trust Tag */}
            <Reveal delay={0.22} y={12} className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5 sm:gap-4 pt-4 border-t border-[#EDE7DB]/60">
              <div className="flex -space-x-2.5 overflow-hidden">
                {HERO_AVATARS.map((src, i) => (
                  <img
                    key={i}
                    className="inline-block h-10 w-10 sm:h-11 sm:w-11 rounded-full ring-2 ring-[#D4AF37] object-cover shadow-md"
                    src={src}
                    alt={`NcHM Birgunj Hotel Management Student Alumnus ${i + 1}`}
                  />
                ))}
              </div>
              <div>
                <a
                  href="https://maps.app.goo.gl/smSzjGYD5JwTKDfm8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 text-[#D4AF37]"
                  title="View verified reviews on Google Maps"
                >
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#1B2A4A] ml-1 group-hover:underline">5.0/5 on Google Maps</span>
                </a>
                <div className="text-xs text-[#6B6560] font-semibold mt-0.5">
                  Over <strong className="text-[#1B2A4A]">500+ NcHM Students & Alumni</strong> Placed Globally
                </div>
              </div>
            </Reveal>

            {/* Highlights Bar (3-column compact strip on mobile) */}
            <Reveal delay={0.26} y={12} className="mt-6 sm:mt-8 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#EDE7DB] pt-5 sm:pt-6">
              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3 rounded-2xl sm:rounded-none bg-[#FBF6EC]/70 sm:bg-transparent p-2.5 sm:p-0 border border-[#EDE7DB]/80 sm:border-0">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white sm:bg-[#FBF6EC] border border-[#D4AF37]/30 text-[#1B2A4A]">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#1B2A4A] leading-tight">70% Practical</div>
                  <div className="text-[10px] sm:text-[11px] text-[#6B6560]">Commercial Labs</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3 rounded-2xl sm:rounded-none bg-[#FBF6EC]/70 sm:bg-transparent p-2.5 sm:p-0 border border-[#EDE7DB]/80 sm:border-0">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white sm:bg-[#FBF6EC] border border-[#D4AF37]/30 text-[#1B2A4A]">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#1B2A4A] leading-tight">6 Countries</div>
                  <div className="text-[10px] sm:text-[11px] text-[#6B6560]">Paid Internships</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-1.5 sm:gap-3 rounded-2xl sm:rounded-none bg-[#FBF6EC]/70 sm:bg-transparent p-2.5 sm:p-0 border border-[#EDE7DB]/80 sm:border-0">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-white sm:bg-[#FBF6EC] border border-[#D4AF37]/30 text-[#1B2A4A]">
                  <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#1B2A4A] leading-tight">100% Pipeline</div>
                  <div className="text-[10px] sm:text-[11px] text-[#6B6560]">Job Placement</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: 3D Globe + Floating Student Photo Showcase Cards */}
          <Reveal delay={0.12} y={18} className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Floating Top-Left Student Photo Badge */}
              <div className="animate-float-slow absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-2.5 pr-4 border border-[#D4AF37]/40 shadow-xl gold-glow">
                <img
                  src="/nchm/students/nishant-chaudhary-dubai.jpg"
                  alt="Nishant Chaudhary - NcHM Birgunj Graduate Placed in 5-Star Hotel Dubai"
                  className="h-11 w-11 rounded-xl object-cover object-top ring-2 ring-[#D4AF37]"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#1B2A4A]">Nishant Chaudhary</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  </div>
                  <div className="text-[10px] font-semibold text-[#D4AF37]">Culinary Commis • 🇦🇪 Dubai</div>
                </div>
              </div>

              {/* Floating Bottom-Right Student Photo Badge */}
              <div className="animate-float-slow-delayed absolute -bottom-6 -right-6 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-[#0B132B]/95 backdrop-blur-md p-2.5 pr-4 border border-[#D4AF37]/40 text-white shadow-xl gold-glow">
                <img
                  src="/nchm/students/ajay-sah-kanu-usa.jpg"
                  alt="Ajay Sah Kanu - NcHM Birgunj Alumnus in Luxury Hospitality USA"
                  className="h-11 w-11 rounded-xl object-cover object-top ring-2 ring-[#D4AF37]"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-white">Ajay Sah Kanu</span>
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[10px] font-semibold text-[#D4AF37]">Hospitality Ops • 🇺🇸 USA</div>
                </div>
              </div>

              {/* Ambient Glow (lightweight radial gradient avoids iOS WebKit blur layer issues) */}
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(circle,rgba(212,175,55,0.22)_0%,transparent_72%)]" />

              {/* Interactive 3D Canvas Box */}
              <div className="relative rounded-3xl border border-[#D4AF37]/30 bg-white/95 p-2.5 sm:p-3 shadow-2xl">
                <div className="relative isolate transform-gpu h-[310px] sm:h-[420px] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#1B2A4A] to-[#0B132B]">
                  <Interactive3DScene />
                  <div className="pointer-events-none absolute top-3 right-3 sm:hidden rounded-full bg-[#0B132B]/80 border border-[#D4AF37]/40 px-2.5 py-1 text-[10px] font-semibold text-[#E8C99A]">
                    Drag to Spin 3D ↻
                  </div>
                </div>

                {/* Overlay Badge */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 rounded-2xl bg-[#0B132B]/95 sm:bg-[#0B132B]/90 sm:backdrop-blur-md border border-[#D4AF37]/40 p-3 sm:p-4 text-white shadow-xl">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">Nepal College of Hotel Management</div>
                      <div className="text-xs sm:text-sm font-semibold text-white mt-0.5">Birgunj • Quality Assured Hospitality Education</div>
                    </div>
                    <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  </div>
                </div>
              </div>

            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
