import React from "react";
import { NcHMLogo } from "./NcHMLogo";
import { Phone, Mail, MapPin, Award } from "lucide-react";
import { Reveal } from "./motion/MotionPrimitives";
import { SITE_CONFIG, buildWhatsAppUrl } from "../constants/site";

interface FooterProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApplyModal }) => {
  return (
    <footer id="contact" className="bg-[#0B132B] text-white border-t border-[#D4AF37]/30 pt-12 sm:pt-16 pb-24 sm:pb-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <Reveal className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">

          {/* Column 1: Logo & About */}
          <div>
            <div className="bg-white/10 p-3.5 rounded-2xl inline-block backdrop-blur-sm border border-[#D4AF37]/30">
              <NcHMLogo light={true} />
            </div>
            <p className="mt-4 text-xs text-white/70 leading-relaxed">
              Nepal College of Hotel Management (NcHM Birgunj) is quality assured under Scottish (SQA) & LCCI GQ frameworks, delivering 70% practical culinary & hospitality training with paid international placements.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                <Award className="h-4 w-4" />
                <span>Est. 2018 AD • Birgunj, Nepal</span>
              </div>
              <a
                href={SITE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-white border border-[#D4AF37]/30 hover:bg-white/20 transition"
              >
                <span className="text-[#D4AF37]">★★★★★</span>
                <span>5.0 on Google Maps</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">Quick Navigation</h4>
            <ul className="mt-4 space-y-2 text-xs text-white/80">
              <li><a href="#about" className="hover:text-[#D4AF37] transition">About NcHM</a></li>
              <li><a href="#programs" className="hover:text-[#D4AF37] transition">Diplomas & Masterclasses</a></li>
              <li><a href="#global-opportunities" className="hover:text-[#D4AF37] transition">Paid International Placements</a></li>
              <li><a href="#career" className="hover:text-[#D4AF37] transition">Partner Hotels & Careers</a></li>
              <li><a href="#blogs" className="hover:text-[#D4AF37] transition font-semibold text-[#D4AF37]">Career Blogs &amp; Guides</a></li>
              <li><a href="#team" className="hover:text-[#D4AF37] transition">Faculty & Mentors</a></li>
              <li><a href="#gallery" className="hover:text-[#D4AF37] transition">Life at NcHM Campus Tour</a></li>
              <li><a href="#admission" className="hover:text-[#D4AF37] transition">Admission Process & Scholarships</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">Campus Contact</h4>
            <ul className="mt-4 space-y-3 text-xs text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <span>{SITE_CONFIG.address}</span>
                  <div className="mt-1">
                    <a
                      href={SITE_CONFIG.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] hover:underline"
                    >
                      <span>📍 View Directions on Google Maps →</span>
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <div className="flex flex-col">
                  <a href={SITE_CONFIG.phoneHref} className="hover:text-[#D4AF37] transition font-medium">{SITE_CONFIG.phoneDisplay} / Admissions Cell</a>
                  <a
                    href={buildWhatsAppUrl("Hello NcHM, I am contacting you from the website and would like to inquire about admissions.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:underline mt-0.5"
                  >
                    <span>💬 Chat on WhatsApp ({SITE_CONFIG.phoneDisplay})</span>
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <a href={SITE_CONFIG.emailHref} className="hover:text-[#D4AF37] transition">{SITE_CONFIG.email}</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Admissions CTA */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">Admissions 2026</h4>
            <p className="mt-4 text-xs text-white/70">
              Applications open for DHM (9+6), ADHM (15+6), Barista Course (1 & 2 Mo), and Kitchen Short-Term courses.
            </p>
            <button
              onClick={() => onOpenApplyModal("Direct Online Admission Application")}
              className="btn-gold-sheen mt-5 w-full rounded-full bg-[#D4AF37] py-3 text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:bg-[#E8C99A] gold-glow-hover cursor-pointer active:scale-[0.98]"
            >
              Apply Online Now →
            </button>
          </div>

        </Reveal>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <div>
            © {new Date().getFullYear()} Nepal College of Hotel Management (NcHM Birgunj). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>SQA Scotland Benchmarked</span>
            <span>•</span>
            <span>LCCI GQ Quality Assured</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
