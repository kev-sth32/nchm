import React from "react";
import { User } from "lucide-react";

export const TEAM_MEMBERS = [
  {
    name: "Er. Executive Director",
    role: "Executive Director",
    category: "Leadership",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    experience: "18+ Yrs Exp",
    badge: "Director",
    desc: "Oversees institutional vision, international MOUs, and strategic hotel partnerships across Asia and the Middle East.",
    highlights: ["Global Hotel MOUs", "Academic Governance", "Placement Supervision"]
  },
  {
    name: "Chef Culinary Director",
    role: "Executive Chef & Culinary Head",
    category: "Faculty",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
    experience: "15+ Yrs 5★ Exp",
    badge: "Executive Chef",
    desc: "Former 5-Star Executive Chef directing commercial kitchen labs, hygiene standards, and international cuisine practicals.",
    highlights: ["Kitchen Lab Ops", "HACCP & Safety", "Gourmet Culinary"]
  },
  {
    name: "Master Barista Trainer",
    role: "Head Barista & Mixology Specialist",
    category: "Faculty",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    experience: "SCA Certified",
    badge: "Barista Master",
    desc: "Leads latte art calibration, espresso extraction science, and beverage management in our professional barista lab.",
    highlights: ["Latte Art Mastery", "Cafe Management", "Espresso Science"]
  },
  {
    name: "Front Office Lead",
    role: "Front Desk & Guest Relations Head",
    category: "Faculty",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    experience: "12+ Yrs Resort Exp",
    badge: "Operations Lead",
    desc: "Trains students in mock lobby guest handling, property management software (PMS), and luxury service etiquette.",
    highlights: ["PMS Systems", "Concierge Ops", "Guest Etiquette"]
  },
  {
    name: "Global Placement Director",
    role: "Head of International Placement",
    category: "Placement",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    experience: "100% Placement",
    badge: "Placement Head",
    desc: "Connects Diploma and ADHM students with 6-month paid internships in China, Dubai, Mauritius, Kuwait, and Nepal.",
    highlights: ["Dubai & China Pipeline", "Stipend Coordination", "Visa Support"]
  },
  {
    name: "Senior Academic Counselor",
    role: "Admissions & Student Advisory Lead",
    category: "Advisory",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    experience: "Student Mentor",
    badge: "Admissions Lead",
    desc: "Provides career counseling, female scholarship guidance (20% discount), and Bachelor degree credit transfer options.",
    highlights: ["Girls Scholarship", "Career Counseling", "Degree Pathways"]
  }
];

export const FacultyTeamSection: React.FC = () => {
  return (
    <section id="team" className="py-20 bg-[#FBF6EC]/50 border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <User className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Faculty & Leadership</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A]">
            Guided by <span className="italic text-gradient-gold">5-Star Industry Veterans</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560]">
            Every student receives 1-on-1 monthly mentoring from experienced GMs, Executive Chefs, and international placement heads.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM_MEMBERS.map((m) => (
            <div
              key={m.name}
              className="group overflow-hidden rounded-3xl border border-[#EDE7DB] bg-white p-6 transition-all duration-300 hover:border-[#D4AF37] hover:shadow-xl gold-glow-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 w-full overflow-hidden rounded-2xl">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-[#1B2A4A]/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-[#D4AF37]">
                    {m.experience}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">{m.role}</div>
                  <h3 className="mt-1 text-xl font-display font-bold text-[#1B2A4A]">{m.name}</h3>
                  <p className="mt-3 text-xs text-[#6B6560] leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EDE7DB]">
                <div className="flex flex-wrap gap-1.5">
                  {m.highlights.map((h, idx) => (
                    <span key={idx} className="rounded-full bg-[#FBF6EC] px-2.5 py-1 text-[10px] font-semibold text-[#1B2A4A]">
                      ✓ {h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
