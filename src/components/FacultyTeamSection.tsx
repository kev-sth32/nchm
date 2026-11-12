import React from "react";
import { User } from "lucide-react";
import { Reveal, StaggerGrid, StaggerItem } from "./motion/MotionPrimitives";

export const TEAM_MEMBERS = [
  {
    name: "Brij Sarraf",
    role: "Managing Director",
    category: "Leadership",
    img: "/images/team/brij-sarraf.png",
    experience: "13+ Yrs Exp",
    badge: "Director",
    desc: "An IHM Pusa alumni driving our institutional vision, backed by extensive experience in both the premium hotel industry and academic governance.",
    highlights: ["IHM Pusa Alumni", "Academic Leadership", "Industry Expert"]
  },
  {
    name: "Tej Prasad Pandey",
    role: "Food Production Instructor",
    category: "Faculty",
    img: "/images/team/Tej prasad Pandey final.png",
    experience: "22+ Yrs Exp",
    badge: "Executive Chef",
    desc: "Executive Chef at Hotel Siddhartha Diyalo with a global culinary footprint spanning Italy, Dubai, and Kuwait, bringing world-class kitchen expertise.",
    highlights: ["Global Experience", "Executive Chef", "Culinary Arts"]
  },
  {
    name: "Hariom Chaurasia",
    role: "Front Office Instructor",
    category: "Faculty",
    img: "/images/team/hariom-chaurasia.jpg",
    experience: "5+ Yrs Exp",
    badge: "Front Office Manager",
    desc: "Front Office Manager at Hotel Siddhartha Diyalo with a BHM from Bangalore, specializing in guest relations and modern hotel operations.",
    highlights: ["BHM Graduate", "Guest Relations", "Hotel Operations"]
  },
  {
    name: "Urusha Shrestha",
    role: "F&B Service Instructor",
    category: "Faculty",
    img: "/images/team/Urusha shrestha.png",
    experience: "5+ Yrs Exp",
    badge: "F&B Supervisor",
    desc: "F&B Supervisor at Sarovar Portico with international hospitality training, dedicated to instilling premium service standards and dining etiquette.",
    highlights: ["F&B Operations", "Service Etiquette", "Industry Active"]
  },
  {
    name: "Asmita Shrestha",
    role: "Academic Instructor",
    category: "Faculty",
    img: "/images/team/Asmita Shrestha FINAL.png",
    experience: "4+ Yrs Exp",
    badge: "Academic Lead",
    desc: "A dedicated academic professional with a strong educational foundation in Nepal, focusing on comprehensive student development and curriculum delivery.",
    highlights: ["Student Development", "Curriculum Expert", "Academic Focus"]
  },
  {
    name: "Umesh Kumar Kushwaha",
    role: "English & Communication Faculty",
    category: "Faculty",
    img: "/images/team/Umesh Kumar kushwaha final.png",
    experience: "6+ Yrs Exp",
    badge: "Language Expert",
    desc: "An experienced Government English Teacher bringing years of expertise in enhancing students' professional communication and language proficiency.",
    highlights: ["Business English", "Communication", "Language Training"]
  }
];

export const FacultyTeamSection: React.FC = () => {
  return (
    <section id="team" className="py-12 sm:py-16 lg:py-20 bg-[#FBF6EC]/50 border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
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
        </Reveal>

        {/* Mobile Swipe Hint */}
        <div className="mt-8 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#9C7D4A] sm:hidden">
          <span>Meet Our Mentors</span>
          <span>Swipe →</span>
        </div>

        {/* Team Grid (Horizontal snap-deck on mobile, grid on tablet/desktop) */}
        <StaggerGrid className="mt-3 sm:mt-14 flex overflow-x-auto snap-x snap-mandatory gap-4 pb-3 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 sm:overflow-visible sm:pb-0">
          {TEAM_MEMBERS.map((m) => (
            <StaggerItem
              key={m.name}
              className="snap-start shrink-0 w-[80vw] max-w-[310px] sm:w-auto sm:max-w-none group overflow-hidden rounded-3xl border border-[#EDE7DB] bg-white p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl gold-glow-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[4/4.2] sm:aspect-[4/5] w-full overflow-hidden rounded-2xl">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
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
            </StaggerItem>
          ))}
        </StaggerGrid>

      </div>
    </section>
  );
};
