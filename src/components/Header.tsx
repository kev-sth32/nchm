import React, { useState } from "react";
import { NcHMLogo } from "./NcHMLogo";
import { Menu, X, PhoneCall, Sparkles, ArrowRight } from "lucide-react";

interface HeaderProps {
  scrolled: boolean;
  onOpenApplyModal: (programTitle?: string) => void;
}

const NAV = [
  { name: "About", href: "#about" },
  { name: "Programs", href: "#programs" },
  { name: "Global Opportunities", href: "#global-opportunities" },
  { name: "Career", href: "#career" },
  { name: "Blogs & Guides", href: "#blogs" },
  { name: "Team", href: "#team" },
  { name: "Admission", href: "#admission" },
  { name: "Contact", href: "#contact" }
];

export const Header: React.FC<HeaderProps> = ({ scrolled, onOpenApplyModal }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Top Gold/Navy Announcement Bar */}
      <div className="relative z-50 w-full bg-[#0B132B] text-white border-b border-[#D4AF37]/20">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.16em] sm:px-6">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
            <span className="flex h-2 w-2 shrink-0 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[#D4AF37] font-bold whitespace-nowrap">Est. 2018 AD</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline text-white/90 whitespace-nowrap">Birgunj, Nepal</span>
            <span className="text-white/30">•</span>
            <span className="font-medium text-white/90 truncate max-w-[260px] sm:max-w-none">Learn. Work. Intern. Earn. Go Global.</span>
          </div>
          <div className="hidden items-center gap-3 md:flex shrink-0">
            <span className="text-white/70 text-[11px] tracking-widest">Admissions Open 2026</span>
            <button
              onClick={() => onOpenApplyModal()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37] px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0B132B] transition-all hover:bg-[#E8C99A] gold-glow-hover cursor-pointer whitespace-nowrap"
            >
              <span>Apply Now</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
          ? "border-b border-[#D4AF37]/25 bg-[#FFFCF6]/95 backdrop-blur-xl py-2.5 shadow-[0_10px_30px_rgba(27,42,74,0.08)]"
          : "border-b border-[#EDE7DB]/80 bg-[#FFFCF6] py-4"
        }`}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <NcHMLogo />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-3 xl:gap-6 lg:flex" aria-label="Main Navigation">
            {NAV.map(n => (
              <a
                key={n.name}
                href={n.href}
                className="group relative text-[12px] xl:text-[13px] font-semibold uppercase tracking-[0.08em] xl:tracking-[0.12em] text-[#1B2A4A]/80 transition-colors hover:text-[#1B2A4A] whitespace-nowrap py-1 cursor-pointer"
              >
                {n.name}
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#D4AF37] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden items-center gap-2.5 xl:gap-3 lg:flex shrink-0">
            <button
              onClick={() => onOpenApplyModal()}
              className="inline-flex items-center gap-2 rounded-full border border-[#1B2A4A]/25 bg-white/80 px-4 py-2 text-[12px] xl:text-[13px] font-semibold text-[#1B2A4A] transition-all hover:border-[#D4AF37] hover:bg-[#FBF6EC] hover:shadow-sm cursor-pointer whitespace-nowrap shrink-0"
            >
              <PhoneCall className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Talk to Counselor</span>
            </button>
            <button
              onClick={() => onOpenApplyModal()}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1B2A4A] px-5 py-2 text-[12px] xl:text-[13px] font-semibold text-white shadow-[0_4px_15px_rgba(27,42,74,0.2)] transition-all hover:bg-[#0B132B] hover:shadow-[0_8px_25px_rgba(212,175,55,0.3)] gold-glow-hover cursor-pointer whitespace-nowrap shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span>Apply Now</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B2A4A]/20 lg:hidden cursor-pointer hover:bg-[#FBF6EC] transition-colors"
          >
            {mobileOpen ? <X className="h-5 w-5 text-[#1B2A4A]" /> : <Menu className="h-5 w-5 text-[#1B2A4A]" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="border-t border-[#EDE7DB] bg-[#FFFCF6] px-4 py-6 lg:hidden shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <div className="grid gap-2">
              {NAV.map(n => (
                <a
                  key={n.name}
                  onClick={() => setMobileOpen(false)}
                  href={n.href}
                  className="rounded-xl bg-[#FBF6EC] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#1B2A4A] hover:bg-[#D4AF37]/20 transition flex items-center justify-between"
                >
                  <span>{n.name}</span>
                  <ArrowRight className="h-4 w-4 text-[#D4AF37]" />
                </a>
              ))}
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <button
                  onClick={() => { setMobileOpen(false); onOpenApplyModal(); }}
                  className="flex items-center justify-center gap-2 rounded-full border border-[#1B2A4A]/20 bg-white py-3 text-center text-xs font-bold uppercase tracking-wider text-[#1B2A4A] hover:border-[#D4AF37] cursor-pointer"
                >
                  <PhoneCall className="h-4 w-4 text-[#D4AF37]" />
                  Talk to Counselor
                </button>
                <button
                  onClick={() => { setMobileOpen(false); onOpenApplyModal(); }}
                  className="flex items-center justify-center gap-2 rounded-full bg-[#1B2A4A] py-3 text-center text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-[#0B132B] cursor-pointer"
                >
                  <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
