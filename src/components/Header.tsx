import React, { useState, useEffect } from "react";
import { AnimatePresence, m } from "motion/react";
import { NcHMLogo } from "./NcHMLogo";
import { Menu, X, PhoneCall, Sparkles, ArrowRight, MapPin } from "lucide-react";
import { LUXURY_EASE } from "./motion/MotionPrimitives";

interface HeaderProps {
  scrolled: boolean;
  onOpenApplyModal: (programTitle?: string) => void;
}

const DESKTOP_NAV = [
  { name: "About", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Global", href: "#global-opportunities" },
  { name: "Careers", href: "#career" },
  { name: "Guides", href: "#blogs" },
  { name: "Faculty", href: "#team" },
  { name: "Admission", href: "#admission" },
];

const MOBILE_NAV = [
  { num: "01", name: "About NcHM", sub: "7 Pillars & Quality Benchmarks", href: "#about" },
  { num: "02", name: "Programs & Certifications", sub: "DHM • ADHM • Barista • Kitchen", href: "#programs" },
  { num: "03", name: "Global Internships", sub: "Dubai • China • Mauritius • Kuwait", href: "#global-opportunities" },
  { num: "04", name: "Placements & Partners", sub: "5-Star Hotel Career Pipelines", href: "#career" },
  { num: "05", name: "Career Blogs & Guides", sub: "Salaries, Visas & Credit Transfer", href: "#blogs" },
  { num: "06", name: "Faculty & Leadership", sub: "5-Star Industry Veterans", href: "#team" },
  { num: "07", name: "Admission Roadmap", sub: "7-Step Journey & 20% Scholarship", href: "#admission" },
  { num: "08", name: "Contact & Campus", sub: "Murli Bagaicha-12, Birgunj", href: "#contact" },
];

export const Header: React.FC<HeaderProps> = ({ scrolled, onOpenApplyModal }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string>("#about");

  // Lock body scroll when mobile concierge drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  // Subtle scroll-spy to highlight the active section in the desktop pill bar
  useEffect(() => {
    const sectionIds = DESKTOP_NAV.map((item) => item.href.replace("#", ""));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.1, 0.35] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top Royal Navy Concierge Ribbon */}
      <div className="relative z-50 w-full bg-gradient-to-r from-[#0B132B] via-[#152342] to-[#0B132B] text-white border-b border-[#D4AF37]/25">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-3.5 sm:px-6 py-2 text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.16em]">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3 flex-nowrap">
            <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
              <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-[#D4AF37] opacity-75 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            </span>
            <span className="text-[#D4AF37] font-bold whitespace-nowrap shrink-0">Est. 2018 AD</span>
            <span className="text-white/25 shrink-0">•</span>
            <span className="hidden sm:inline text-white/90 whitespace-nowrap">Birgunj, Nepal</span>
            <span className="hidden sm:inline text-white/25">•</span>
            <span className="font-medium text-white/90 truncate sm:hidden">SQA &amp; LCCI Quality Assured</span>
            <span className="hidden sm:inline font-medium text-white/85 truncate">Learn. Work. Intern. Earn. Go Global.</span>
          </div>

          <div className="hidden items-center gap-4 md:flex shrink-0">
            <a
              href="tel:+9779829232426"
              className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold tracking-wider text-white/80 hover:text-[#D4AF37] transition-colors"
            >
              <PhoneCall className="h-3 w-3 text-[#D4AF37]" />
              <span>+977 9829232426</span>
            </a>
            <span className="h-3 w-[1px] bg-white/15" />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 px-3 py-0.5 text-[10px] font-bold tracking-wider text-[#E8C99A]">
              <Sparkles className="h-2.5 w-2.5 text-[#D4AF37]" />
              <span>2026 Intake Open</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Sticky Luxury Header */}
      <header
        className={`sticky top-0 transform-gpu transition-all duration-300 ${
          mobileOpen ? "z-50" : "z-40"
        } ${
          scrolled
            ? "border-b border-[#D4AF37]/30 bg-[#FFFCF6]/98 sm:bg-[#FFFCF6]/92 sm:backdrop-blur-xl py-2.5 shadow-[0_12px_35px_-10px_rgba(27,42,74,0.14)]"
            : "border-b border-[#D4AF37]/20 bg-[#FFFCF6] py-3 sm:py-3.5"
        }`}
      >
        <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-3.5 sm:px-6">
          <div className="min-w-0 shrink-0">
            <NcHMLogo />
          </div>

          {/* Desktop Editorial Pill Navigation */}
          <nav
            className="hidden lg:flex items-center gap-0.5 xl:gap-1 rounded-full border border-[#D4AF37]/25 bg-[#FBF6EC]/85 px-1.5 py-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]"
            aria-label="Main Navigation"
          >
            {DESKTOP_NAV.map((n) => {
              const isActive = activeHref === n.href;
              return (
                <a
                  key={n.name}
                  href={n.href}
                  onClick={() => setActiveHref(n.href)}
                  className={`relative rounded-full px-3 xl:px-3.5 py-1.5 text-[12px] xl:text-[12.5px] font-semibold tracking-[0.03em] transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-[#0B132B]"
                      : "text-[#1B2A4A]/75 hover:text-[#1B2A4A]"
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="header-active-nav"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-white border border-[#D4AF37]/40 shadow-[0_2px_10px_rgba(212,175,55,0.18)]"
                    />
                  )}
                  <span className="relative z-10">{n.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden items-center gap-2 xl:gap-2.5 lg:flex shrink-0">
            <button
              onClick={() => onOpenApplyModal("Admissions Counselor Consultation")}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-white px-3.5 xl:px-4 py-2 text-[12px] font-semibold text-[#1B2A4A] shadow-xs transition-all hover:border-[#D4AF37] hover:bg-[#FBF6EC] cursor-pointer whitespace-nowrap active:scale-[0.97]"
            >
              <PhoneCall className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Counselor</span>
            </button>
            <button
              onClick={() => onOpenApplyModal("General Admission 2026")}
              className="btn-gold-sheen inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#1B2A4A] px-4 xl:px-5 py-2 text-[12px] font-semibold text-white shadow-[0_6px_18px_rgba(27,42,74,0.22)] transition-all hover:bg-[#0B132B] hover:shadow-[0_10px_25px_rgba(212,175,55,0.28)] gold-glow-hover cursor-pointer whitespace-nowrap active:scale-[0.97]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* Mobile Quick Apply + Concierge Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button
              onClick={() => onOpenApplyModal("General Admission 2026")}
              className="btn-gold-sheen inline-flex items-center gap-1 rounded-full bg-[#1B2A4A] border border-[#D4AF37]/40 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm active:scale-95 cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-[#D4AF37]" />
              <span>Apply</span>
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#FBF6EC]/80 text-[#1B2A4A] cursor-pointer hover:bg-[#FBF6EC] transition-colors shrink-0 active:scale-95"
            >
              {mobileOpen ? <X className="h-5 w-5 text-[#1B2A4A]" /> : <Menu className="h-5 w-5 text-[#1B2A4A]" />}
            </button>
          </div>
        </div>

        {/* Mobile Luxury Concierge Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <m.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: LUXURY_EASE }}
              className="border-t border-[#D4AF37]/25 bg-[#FFFCF6] px-4 py-5 lg:hidden shadow-2xl max-h-[calc(100dvh-75px)] overflow-y-auto overscroll-contain"
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9C7D4A]">
                  Concierge Directory
                </span>
                <span className="text-[10px] font-semibold text-[#6B6560]">
                  SQA &amp; LCCI Assured
                </span>
              </div>

              <div className="grid gap-2">
                {MOBILE_NAV.map((n, idx) => (
                  <m.a
                    key={n.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.24, delay: idx * 0.025, ease: LUXURY_EASE }}
                    onClick={() => setMobileOpen(false)}
                    href={n.href}
                    className="group rounded-2xl border border-[#EDE7DB] bg-[#FBF6EC]/70 px-3.5 py-2.5 hover:border-[#D4AF37]/60 hover:bg-[#FBF6EC] transition flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-display text-lg font-bold text-[#D4AF37] shrink-0">
                        {n.num}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-bold uppercase tracking-wider text-[#1B2A4A] truncate">
                          {n.name}
                        </div>
                        <div className="text-[11px] text-[#6B6560] truncate">
                          {n.sub}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-[#D4AF37] shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </m.a>
                ))}
              </div>

              {/* Drawer Contact & CTA Footer */}
              <div className="mt-4 rounded-2xl border border-[#D4AF37]/30 bg-[#0B132B] p-4 text-white">
                <div className="flex items-center gap-2 text-[11px] text-[#E8C99A]">
                  <MapPin className="h-3.5 w-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate">Murli Bagaicha-12, Birgunj, Nepal</span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenApplyModal("Admissions Counselor Consultation");
                    }}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/10 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 cursor-pointer"
                  >
                    <PhoneCall className="h-3.5 w-3.5 text-[#D4AF37]" />
                    <span>Talk to Counselor</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onOpenApplyModal("General Admission 2026");
                    }}
                    className="btn-gold-sheen flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] py-2.5 text-xs font-bold uppercase tracking-wider text-[#0B132B] shadow-md hover:bg-[#E8C99A] cursor-pointer"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Apply for 2026</span>
                  </button>
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
