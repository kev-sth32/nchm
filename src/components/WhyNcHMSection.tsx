import React from "react";
import { 
  Award, 
  UserCheck, 
  Users, 
  ChefHat, 
  Globe2, 
  Briefcase, 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2
} from "lucide-react";

interface WhyNcHMSectionProps {
  onOpenApplyModal?: (programTitle?: string) => void;
}

const PILLARS_GRID = [
  { 
    n: "01", 
    t: "SQA Scotland & LCCI GQ Standards", 
    d: "Quality-assured curriculum benchmarked against Scottish (SCQF) & European (EQF) frameworks for international academic and professional mobility.", 
    icon: Award,
    tag: "UK & EU Accredited",
    highlight: "SCQF & EQF Framework Benchmarks"
  },
  { 
    n: "02", 
    t: "1-on-1 Monthly Mentoring System", 
    d: "Each student is paired with a dedicated faculty mentor for monthly progress audits, personal guidance, and customized career coaching.", 
    icon: UserCheck,
    tag: "Personalized Growth",
    highlight: "Dedicated Faculty Mentorship"
  },
  { 
    n: "03", 
    t: "Small Class Sizes & Personal Focus", 
    d: "Strict low teacher-to-student ratio ensuring intensive practical supervision, active participation, and direct instructor feedback.", 
    icon: Users,
    tag: "Low Student Ratio",
    highlight: "Intensive Practical Supervision"
  },
  { 
    n: "04", 
    t: "70% Practical Training Labs", 
    d: "Hands-on mastery from day one in modern commercial kitchens, front desk simulations, and housekeeping suites.", 
    icon: ChefHat,
    tag: "70% Practical Mastery",
    highlight: "Commercial Kitchens & Practical Labs"
  },
  { 
    n: "05", 
    t: "Paid International Internships", 
    d: "Guaranteed 6-month paid exposure in 4★ & 5★ partner hotel chains across China, Mauritius, Dubai, Kuwait, India, and Nepal.", 
    icon: Globe2,
    tag: "Global Placement",
    highlight: "4★ & 5★ Star Luxury Hotel Exposure"
  },
  { 
    n: "06", 
    t: "100% Job Placement Cell", 
    d: "Direct employment pipelines to Siddhartha Diyalo, Clark Resort, Sarovar Portico, and leading international hotel management groups.", 
    icon: Briefcase,
    tag: "Career Guarantee",
    highlight: "Lifetime Placement Support"
  },
];

const DESTINATIONS = [
  { country: "United Kingdom", flag: "🇬🇧" },
  { country: "Canada", flag: "🇨🇦" },
  { country: "United States", flag: "🇺🇸" },
  { country: "Switzerland", flag: "🇨🇭" },
  { country: "Australia", flag: "🇦🇺" },
];

export const WhyNcHMSection: React.FC<WhyNcHMSectionProps> = ({ onOpenApplyModal }) => {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#FFFCF6] border-b border-[#EDE7DB] overflow-hidden">
      {/* Decorative Subtle Background Gradients */}
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-full -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.06),transparent_70%)] pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#FBF6EC] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Why Choose NcHM</span>
          </div>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-display font-normal text-[#1B2A4A] tracking-tight">
            7 Core Pillars of <span className="italic text-gradient-gold font-serif">Academic Excellence</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#524E4A] leading-relaxed">
            Combining Scottish quality benchmarks, 70% practical training labs, and direct international placement pipelines for high-earning hospitality leadership careers.
          </p>

          {/* Quick Stats/Trust Badges Bar */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-semibold text-[#1B2A4A]">
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FBF6EC] px-3 py-1.5 border border-[#EDE7DB]">
              <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
              SQA & LCCI Quality Assured
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FBF6EC] px-3 py-1.5 border border-[#EDE7DB]">
              <ChefHat className="h-4 w-4 text-[#D4AF37]" />
              70% Hands-On Practical Labs
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#FBF6EC] px-3 py-1.5 border border-[#EDE7DB]">
              <Globe2 className="h-4 w-4 text-[#D4AF37]" />
              Paid Global Internships
            </span>
          </div>
        </div>

        {/* 6 Grid Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS_GRID.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.n}
                className="group relative flex flex-col justify-between rounded-3xl border border-[#EDE7DB] bg-white p-5 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-[0_15px_35px_rgba(212,175,55,0.14)]"
              >
                <div>
                  {/* Card Header: Number + Icon + Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-2xl font-bold text-[#D4AF37]">{item.n}</span>
                      <span className="rounded-full bg-[#FBF6EC] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1B2A4A] border border-[#D4AF37]/20">
                        {item.tag}
                      </span>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FBF6EC] text-[#1B2A4A] transition-colors duration-300 group-hover:bg-[#1B2A4A] group-hover:text-[#D4AF37] shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Card Title (Clean Sans-Serif font) */}
                  <h3 className="mt-6 text-xl font-bold text-[#1B2A4A] tracking-tight leading-snug font-sans group-hover:text-[#0B132B]">
                    {item.t}
                  </h3>

                  {/* Card Description */}
                  <p className="mt-3 text-sm text-[#524E4A] leading-relaxed">
                    {item.d}
                  </p>
                </div>

                {/* Highlight Badge */}
                <div className="mt-6 border-t border-[#EDE7DB]/80 pt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#1B2A4A]/90">
                    <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                    <span>{item.highlight}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured 7th Pillar Banner Card: Bachelor Credit Transfer Pathways */}
        <div className="mt-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#1B2A4A] to-[#0B132B] text-white p-6 sm:p-10 lg:p-12 border border-[#D4AF37]/40 shadow-2xl">
          {/* Subtle Background Glow */}
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-[#D4AF37]/5 blur-2xl pointer-events-none" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="font-display text-3xl font-bold text-[#D4AF37]">07</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[#E8C99A] border border-[#D4AF37]/40">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Featured Pathway Pillar
                </span>
              </div>

              <h3 className="mt-4 text-2xl sm:text-3xl font-display font-medium text-white tracking-tight leading-tight">
                Bachelor Credit Transfer Pathways
              </h3>

              <p className="mt-3 text-sm sm:text-base text-white/80 leading-relaxed max-w-2xl">
                NcHM ADHM (Advanced Diploma in Hotel Management) graduates qualify for lateral entry directly into 2nd or 3rd year Bachelor degree programs at prestigious foreign partner universities.
              </p>

              {/* Destination Countries */}
              <div className="mt-6">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37] mb-2.5">
                  Direct Credit Recognition Destinations:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {DESTINATIONS.map((d) => (
                    <span 
                      key={d.country} 
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3 py-1.5 text-xs font-semibold text-white border border-white/15 backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                      <span className="text-base">{d.flag}</span>
                      <span>{d.country}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Action & Benefits Column */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-md">
              <div className="space-y-3 text-xs sm:text-sm text-white/90">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Save Up to $40,000</strong> in foreign tuition by starting in Nepal</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>100% Credit Transferability</strong> verified through SQA Scotland standards</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span><strong>Post-Study Work Visa</strong> eligibility upon foreign graduation</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  onClick={() => onOpenApplyModal?.("Bachelor Credit Transfer Pathways")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0B132B] transition-all hover:bg-[#E8C99A] gold-glow-hover cursor-pointer shadow-lg"
                >
                  <span>Explore Pathway Details</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onOpenApplyModal?.("Bachelor Credit Transfer Pathways")}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-transparent px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white/10 cursor-pointer"
                >
                  <Building2 className="h-4 w-4 text-[#D4AF37]" />
                  <span>View Universities</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
