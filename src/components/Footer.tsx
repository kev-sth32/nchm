import React from "react";
import { NcHMLogo } from "./NcHMLogo";
import { Phone, Mail, MapPin, Award } from "lucide-react";

interface FooterProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenApplyModal }) => {
  return (
    <footer id="contact" className="bg-[#0B132B] text-white border-t border-[#D4AF37]/30 pt-16 pb-12">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
          
          {/* Column 1: Logo & About */}
          <div>
            <div className="bg-white/10 p-3.5 rounded-2xl inline-block backdrop-blur-sm border border-[#D4AF37]/30">
              <NcHMLogo light={true} />
            </div>
            <p className="mt-4 text-xs text-white/70 leading-relaxed">
              Nepal College of Hotel Management (NcHM Birgunj) is quality assured under Scottish (SQA) & LCCI GQ frameworks, delivering 70% practical culinary & hospitality training with paid international placements.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
              <Award className="h-4 w-4" />
              <span>Est. 2018 AD • Birgunj, Nepal</span>
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
              <li><a href="#team" className="hover:text-[#D4AF37] transition">Faculty & Mentors</a></li>
              <li><a href="#admission" className="hover:text-[#D4AF37] transition">Admission Process & Scholarships</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">Campus Contact</h4>
            <ul className="mt-4 space-y-3 text-xs text-white/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>Birgunj, Parsa, Nepal (Near Hotel Gateway)</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span>+977 9802819788 / Admissions Cell</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                <span>info@nchm.edu.np / admissions@nchm.edu.np</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Admissions CTA */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4AF37]">Admissions 2026</h4>
            <p className="mt-4 text-xs text-white/70">
              Applications open for DHM (9+6), ADHM (15+6), and Kitchen Short-Term courses.
            </p>
            <button
              onClick={() => onOpenApplyModal()}
              className="mt-5 w-full rounded-full bg-[#D4AF37] py-3 text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:bg-[#E8C99A] gold-glow-hover cursor-pointer"
            >
              Apply Online Now →
            </button>
          </div>

        </div>

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
