import React from "react";
import { Award, ShieldCheck, CheckCircle2 } from "lucide-react";

export const AccreditationBanner: React.FC = () => {
  return (
    <section className="bg-[#FBF6EC] text-[#1B2A4A] py-8 border-y border-[#D4AF37]/30 shadow-inner">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Badge 1: SQA Scotland */}
          <div className="flex items-center gap-4 bg-white border border-[#D4AF37]/30 rounded-2xl p-4 shadow-sm w-full md:w-auto">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1B2A4A] text-[#D4AF37]">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-display text-[#1B2A4A]">SQA Scotland Benchmarked</span>
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-xs text-[#6B6560]">Scottish Credit & Qualifications Framework (SCQF Level 5/6)</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-10 w-[1px] bg-[#D4AF37]/30" />

          {/* Badge 2: LCCI GQ */}
          <div className="flex items-center gap-4 bg-white border border-[#D4AF37]/30 rounded-2xl p-4 shadow-sm w-full md:w-auto">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1B2A4A] text-[#D4AF37]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold font-display text-[#1B2A4A]">LCCI GQ Quality Assured</span>
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <p className="text-xs text-[#6B6560]">Internationally Recognized Culinary & Management Qualifications</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block h-10 w-[1px] bg-[#D4AF37]/30" />

          {/* Badge 3: International Mobility */}
          <div className="flex items-center gap-4 bg-white border border-[#D4AF37]/30 rounded-2xl p-4 shadow-sm w-full md:w-auto">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1B2A4A] text-[#D4AF37]">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-bold font-display text-[#1B2A4A]">Global Credit Mobility</div>
              <p className="text-xs text-[#6B6560]">Bachelor Degree Pathways to UK, Canada, USA, Australia & Switzerland</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
