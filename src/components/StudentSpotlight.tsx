import React from "react";
import { Award, Star, ShieldCheck } from "lucide-react";

export const STUDENT_SPOTLIGHTS = [
  {
    name: "Nishant Chaudhary",
    course: "Diploma in Hospitality Management (DHM)",
    placement: "Culinary Commis • 5★ Hotel, Dubai",
    flag: "🇦🇪",
    year: "Batch of 2023",
    quote: "The 70% practical kitchen training at NcHM Birgunj gave me real commercial kitchen confidence. Now working in Dubai!",
    img: "/nchm/students/nishant-chaudhary-dubai.jpg",
    avatar: "/nchm/students/nishant-avatar.jpg"
  },
  {
    name: "Ajay Sah Kanu",
    course: "Advance Diploma in Hospitality (ADHM)",
    placement: "Hospitality Ops • Luxury Hotel, USA",
    flag: "🇺🇸",
    year: "Batch of 2023",
    quote: "NcHM's international transfer and placement pipeline opened doors for my career in the United States. The practical training prepared me to excel globally.",
    img: "/nchm/students/ajay-sah-kanu-usa.jpg",
    avatar: "/nchm/students/ajay-avatar.jpg"
  },
  {
    name: "Faruk Ansari",
    course: "Diploma in Hospitality Management (DHM)",
    placement: "Food & Beverage • 5★ Hotel, Muscat, Oman",
    flag: "🇴🇲",
    year: "Batch of 2024",
    quote: "The hands-on hospitality labs and real industry simulation at NcHM Birgunj gave me the international edge. Proud to represent NcHM in Oman!",
    img: "/nchm/students/faruk-ansari-oman.jpg",
    avatar: "/nchm/students/faruk-avatar.jpg"
  },
  {
    name: "Raju Chaudhary",
    course: "Diploma in Hospitality Management (DHM)",
    placement: "Front Office & Ops • Luxury Resort, Dubai",
    flag: "🇦🇪",
    year: "Batch of 2024",
    quote: "NcHM's guest relations lab and grooming standards gave me the confidence to handle international luxury guests. Moving from Birgunj to Dubai was a dream come true.",
    img: "/nchm/students/raju-chaudhary-dubai.jpg",
    avatar: "/nchm/students/raju-avatar.jpg"
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
                <div className="relative h-72 w-full overflow-hidden rounded-2xl">
                  <img
                    src={s.img}
                    alt={s.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
                <img key={i} className="inline-block h-12 w-12 rounded-full ring-2 ring-[#D4AF37] object-cover" src={s.avatar || s.img} alt={s.name} />
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
