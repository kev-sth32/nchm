import React from "react";
import { Award, Star, ShieldCheck } from "lucide-react";

export const STUDENT_SPOTLIGHTS = [
  {
    name: "Rohan Shrestha",
    course: "Diploma in Hospitality Management (DHM)",
    placement: "Culinary Commis • 5★ Hotel, Dubai",
    flag: "🇦🇪",
    year: "Batch of 2023",
    quote: "The 70% practical kitchen training at NcHM Birgunj gave me real commercial kitchen confidence. Now working in Dubai!",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Pooja Chaudhary",
    course: "Advance Diploma in Hospitality (ADHM)",
    placement: "Resort Ops • Grand Baie, Mauritius",
    flag: "🇲🇺",
    year: "Batch of 2024",
    quote: "The 20% Girls Scholarship gave me the opportunity to pursue hospitality. I spent 6 months in Mauritius on paid placement!",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Anish Gupta",
    course: "Kitchen Short-Term Course",
    placement: "Kitchen Commis • Birgunj Hotel Network",
    flag: "🇳🇵",
    year: "Batch of 2024",
    quote: "Fast-food processing and commercial kitchen training at NcHM prepared me to manage fast-paced food production labs.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Suman Thapa",
    course: "Diploma in Hospitality Management (DHM)",
    placement: "Front Office • Guangzhou, China",
    flag: "🇨🇳",
    year: "Batch of 2023",
    quote: "NcHM's international placement pipeline made my China internship smooth. The practical guest relations lab was crucial.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop"
  }
];

interface StudentSpotlightProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

export const StudentSpotlight: React.FC<StudentSpotlightProps> = ({ onOpenApplyModal }) => {
  return (
    <section className="py-20 bg-[#FBF6EC]/60 border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <Award className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Real Student Stories & Success</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A]">
            NcHM Students <span className="italic text-gradient-gold">Around the Globe</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560]">
            Meet our students and alumni currently interning and working across international 4★ & 5★ luxury hotel networks.
          </p>
        </div>

        {/* Student Cards Grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STUDENT_SPOTLIGHTS.map((s, idx) => (
            <div
              key={idx}
              className="group overflow-hidden rounded-3xl border border-[#EDE7DB] bg-white p-6 transition-all duration-300 hover:border-[#D4AF37] hover:shadow-2xl gold-glow-hover flex flex-col justify-between"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative h-64 w-full overflow-hidden rounded-2xl">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-[#1B2A4A]/85 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30">
                    {s.year}
                  </div>
                  <div className="absolute bottom-3 left-3 rounded-full bg-black/75 backdrop-blur-md px-3 py-1 text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{s.flag}</span>
                    <span className="text-[11px]">{s.placement.split("•")[1] || s.placement}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-display font-bold text-[#1B2A4A] group-hover:text-[#D4AF37] transition">{s.name}</h3>
                    <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  </div>
                  <div className="text-xs font-semibold text-[#D4AF37] mt-0.5">{s.course}</div>

                  <div className="mt-3 rounded-xl bg-[#FBF6EC] p-3 text-xs text-[#6B6560] italic leading-relaxed border border-[#D4AF37]/20">
                    "{s.quote}"
                  </div>
                </div>
              </div>

              {/* Placement tag */}
              <div className="mt-6 pt-4 border-t border-[#EDE7DB] flex items-center justify-between text-xs">
                <span className="font-semibold text-[#1B2A4A]">{s.placement.split("•")[0]}</span>
                <span className="text-[#D4AF37] font-bold">Verified ✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Community Trust Banner */}
        <div className="mt-14 rounded-3xl border border-[#D4AF37]/30 bg-[#1B2A4A] p-8 text-white text-center sm:flex sm:items-center sm:justify-between sm:text-left">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3 overflow-hidden">
              {STUDENT_SPOTLIGHTS.map((s, i) => (
                <img key={i} className="inline-block h-12 w-12 rounded-full ring-2 ring-[#D4AF37] object-cover" src={s.img} alt={s.name} />
              ))}
            </div>
            <div>
              <div className="text-base font-bold text-white font-display">Join 500+ NcHM Students & Alumni</div>
              <div className="text-xs text-[#D4AF37] flex items-center gap-1 mt-0.5">
                <Star className="h-3.5 w-3.5 fill-[#D4AF37]" />
                <span>4.9/5 Rating from Student Placement Surveys</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenApplyModal("General Student Admission")}
            className="mt-6 sm:mt-0 rounded-full bg-[#D4AF37] px-7 py-3 text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:bg-[#E8C99A] gold-glow-hover cursor-pointer"
          >
            Start Your Journey →
          </button>
        </div>

      </div>
    </section>
  );
};
