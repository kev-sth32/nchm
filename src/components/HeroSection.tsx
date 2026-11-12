import React from "react";
import { Award, ChevronRight, GraduationCap, Globe, Briefcase, Star, ShieldCheck } from "lucide-react";
import { Interactive3DScene } from "./Interactive3DScene";

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
    <section className="relative overflow-x-clip bg-gradient-to-b from-[#FFFCF6] via-[#FBF6EC]/50 to-[#FFFCF6] py-12 lg:py-20 border-b border-[#EDE7DB]">
      {/* Subtle Gold Dot Pattern Layer */}
      <div className="pointer-events-none absolute inset-0 grain" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">

          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7">
            {/* Accreditation Badge */}
            <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl sm:rounded-full border border-[#D4AF37]/30 bg-[#FBF6EC] px-3.5 sm:px-4 py-2 sm:py-1.5 text-[12px] font-semibold text-[#1B2A4A] shadow-sm mb-6">
              <Award className="h-4 w-4 text-[#D4AF37] shrink-0" />
              <span>SQA Scotland & LCCI GQ Quality Assured</span>
              <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              <span className="text-[#6B6560]">Est. 2018 AD • Birgunj, Nepal</span>
            </div>

            {/* Main Headline with High-Impact Keyword Targeting */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#1B2A4A] leading-[1.08] tracking-tight">
              <span className="block text-xs sm:text-sm font-sans font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-2 sm:mb-3">
                Premier Hotel Management College in Birgunj &amp; Madhesh Province
              </span>
              Learn. Work. Intern. Earn. <br />
              <span className="italic font-normal text-gradient-gold">Go Global.</span>
            </h1>

            {/* Subheadline / Value Prop */}
            <p className="mt-6 text-lg sm:text-xl text-[#6B6560] font-normal leading-relaxed max-w-2xl">
              Premier Culinary Arts & Hospitality Management institution in Birgunj. Guaranteed 6-month paid international internships across <strong className="text-[#1B2A4A] font-semibold">China, Mauritius, Dubai, Kuwait, India & Nepal</strong> with foreign Bachelor credit transfer pathways.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenApplyModal("2026 Admissions Application")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1B2A4A] px-7 py-4 text-sm font-semibold text-white shadow-xl transition-all hover:bg-[#0B132B] gold-glow-hover cursor-pointer"
              >
                <span>Apply for 2026 Admissions</span>
                <ChevronRight className="h-4 w-4 text-[#D4AF37]" />
              </button>
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1B2A4A]/20 bg-white/95 px-6 py-4 text-sm font-semibold text-[#1B2A4A] transition hover:border-[#D4AF37] hover:bg-[#FBF6EC] cursor-pointer"
              >
                <span>Explore Programs</span>
              </a>
            </div>

            {/* Student Social Proof Avatar Stack & High-Trust Tag */}
            <div className="mt-8 flex flex-wrap items-center gap-4 pt-4 border-t border-[#EDE7DB]/60">
              <div className="flex -space-x-2.5 overflow-hidden">
                {HERO_AVATARS.map((src, i) => (
                  <img
                    key={i}
                    className="inline-block h-11 w-11 rounded-full ring-2 ring-[#D4AF37] object-cover shadow-md"
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
            </div>

            {/* Highlights Bar */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 border-t border-[#EDE7DB] pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBF6EC] border border-[#D4AF37]/30 text-[#1B2A4A]">
                  <GraduationCap className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1B2A4A]">70% Practical</div>
                  <div className="text-[11px] text-[#6B6560]">Commercial Labs</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBF6EC] border border-[#D4AF37]/30 text-[#1B2A4A]">
                  <Globe className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1B2A4A]">6 Countries</div>
                  <div className="text-[11px] text-[#6B6560]">Paid Internships</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FBF6EC] border border-[#D4AF37]/30 text-[#1B2A4A]">
                  <Briefcase className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1B2A4A]">100% Pipeline</div>
                  <div className="text-[11px] text-[#6B6560]">Job Placement</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Globe + Floating Student Photo Showcase Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Floating Top-Left Student Photo Badge */}
              <div className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-2.5 pr-4 border border-[#D4AF37]/40 shadow-xl gold-glow animate-bounce-slow">
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
              <div className="absolute -bottom-6 -right-6 z-20 hidden sm:flex items-center gap-3 rounded-2xl bg-[#0B132B]/95 backdrop-blur-md p-2.5 pr-4 border border-[#D4AF37]/40 text-white shadow-xl gold-glow">
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
              <div className="relative rounded-3xl border border-[#D4AF37]/30 bg-white/95 p-3 shadow-2xl">
                <div className="relative isolate transform-gpu h-[380px] sm:h-[420px] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#1B2A4A] to-[#0B132B]">
                  <Interactive3DScene />
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
          </div>

        </div>
      </div>
    </section>
  );
};
