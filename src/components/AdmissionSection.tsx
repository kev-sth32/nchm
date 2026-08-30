import React, { useState } from "react";
import { BookOpen, GraduationCap, Compass, Globe, Sparkles, Briefcase, Building2, Award } from "lucide-react";

export const JOURNEY_STEPS = [
  { n: "01", t: "Choose Your Program", d: "Select from Diploma (9+6), ADHM (15+6), or Kitchen Short-Term Training based on your career goals.", sub: "Personalized Counseling • Enrollment", icon: BookOpen },
  { n: "02", t: "Learn", d: "Master hospitality principles under expert faculty and industry-veteran GMs in our Birgunj campus.", sub: "70% Practical • Theory Foundations", icon: GraduationCap },
  { n: "03", t: "Practice", d: "Hands-on daily training in mock hotel rooms, front desk lobbies & commercial kitchens.", sub: "Real Equipment • Skill Calibration", icon: Compass },
  { n: "04", t: "Intern", d: "6-month paid/stipend international internship in luxury 4★ and 5★ partner hotels across China, Mauritius, Dubai, Kuwait & Nepal.", sub: "Global Hospitality Exposure", icon: Globe },
  { n: "05", t: "Earn", d: "Gain financial independence and earn stipends while getting invaluable professional work experience.", sub: "Professional Demeanor • Stipends", icon: Sparkles },
  { n: "06", t: "Get Placed", d: "Direct interview pipelines and 100% job placement support in Nepal, Middle East, Europe & Asia.", sub: "Placement Cell • 100% Guarantee", icon: Briefcase },
  { n: "07", t: "Go Global", d: "Transfer credit hours to top Bachelor programs in Canada, USA, UK, Switzerland, Australia & launch an international management career.", sub: "Credit Transfer • Degree Pathways", icon: Building2 },
];

interface AdmissionSectionProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({ onOpenApplyModal }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="admission" className="py-20 bg-[#FFFCF6] border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#FBF6EC] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <span>Your Hospitality Roadmap</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A]">
            The 7-Step <span className="italic text-gradient-gold">NcHM Student Journey</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560]">
            From enrollment in Birgunj to 6-month paid international internships and global Bachelor credit transfers.
          </p>

          {/* Minimum Qualification Badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#1B2A4A] px-4 py-1.5 text-xs font-bold text-[#D4AF37] shadow-md">
            <span>🎓 Minimum Qualification: 1.6 GPA in SLC/SEE</span>
          </div>
        </div>

        {/* Interactive Steps Grid */}
        <div className="mt-14 grid gap-4 lg:grid-cols-7">
          {JOURNEY_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStep;
            return (
              <button
                key={step.n}
                onClick={() => setActiveStep(idx)}
                className={`rounded-2xl p-5 text-left transition-all cursor-pointer border ${
                  isActive
                    ? "border-[#D4AF37] bg-[#1B2A4A] text-white shadow-xl gold-glow"
                    : "border-[#EDE7DB] bg-white text-[#1B2A4A] hover:border-[#D4AF37]/50 hover:bg-[#FBF6EC]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isActive ? "text-[#D4AF37]" : "text-[#6B6560]"}`}>Step {step.n}</span>
                  <Icon className={`h-4 w-4 ${isActive ? "text-[#D4AF37]" : "text-[#1B2A4A]"}`} />
                </div>
                <div className={`mt-3 text-sm font-bold font-display ${isActive ? "text-white" : "text-[#1B2A4A]"}`}>{step.t}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Active Details Card */}
        <div className="mt-6 rounded-3xl border border-[#D4AF37]/30 bg-[#FBF6EC] p-8 sm:p-10 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                Phase {JOURNEY_STEPS[activeStep].n} • {JOURNEY_STEPS[activeStep].sub}
              </div>
              <h3 className="mt-2 text-2xl font-display font-bold text-[#1B2A4A]">
                {JOURNEY_STEPS[activeStep].t}
              </h3>
              <p className="mt-2 text-sm text-[#6B6560] leading-relaxed max-w-2xl">
                {JOURNEY_STEPS[activeStep].d}
              </p>
            </div>

            <button
              onClick={() => onOpenApplyModal(JOURNEY_STEPS[activeStep].t)}
              className="shrink-0 rounded-full bg-[#1B2A4A] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#0B132B] gold-glow-hover cursor-pointer"
            >
              Start Admission Step {JOURNEY_STEPS[activeStep].n} →
            </button>
          </div>
        </div>

        {/* 20% Girls Scholarship Notice Banner */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-gradient-to-r from-[#1B2A4A] to-[#0B132B] p-8 text-white shadow-2xl relative">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-[#D4AF37]/15 blur-3xl" />
          
          <div className="relative z-10 sm:flex sm:items-center sm:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3.5 py-1 text-xs font-bold text-[#D4AF37]">
                <Award className="h-4 w-4" />
                <span>20% Tuition Support</span>
              </div>
              <h3 className="mt-3 text-2xl sm:text-3xl font-display font-bold text-white">
                Girls Scholarship Scheme (20% Discount)
              </h3>
              <p className="mt-2 text-sm text-white/80 max-w-xl">
                NcHM is committed to empowering women in hospitality leadership. Female applicants qualify for a 20% tuition fee scholarship upon eligibility verification.
              </p>
              <div className="mt-3 text-xs font-semibold text-[#D4AF37]">
                *(Note: Hostel facility not available)
              </div>
            </div>

            <button
              onClick={() => onOpenApplyModal("20% Girls Scholarship Inquiry")}
              className="mt-6 sm:mt-0 shrink-0 rounded-full bg-[#D4AF37] px-7 py-3.5 text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:bg-[#E8C99A] gold-glow-hover cursor-pointer"
            >
              Claim Scholarship →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
