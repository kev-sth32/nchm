import React, { useState } from "react";
import { BookOpen, ArrowRight, X } from "lucide-react";

export const GUIDES = [
  {
    id: 1,
    title: "Food Preparation & Kitchen Station Mastery Guide",
    category: "Culinary Arts",
    readTime: "5 min read",
    desc: "Essential knife skills, butchery prep, HACCP hygiene, and station coordination required for 5-star hotel kitchens.",
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
    fullArticle: "In professional 5-star hotel kitchens, station prep (Mise en Place) is the backbone of service. Culinary students at NcHM learn classical knife cuts (Julienne, Brunoise, Chiffonade), HACCP food safety standards, and temperature logging. Mastering food prep ensures seamless kitchen operations during high-volume banquet services."
  },
  {
    id: 2,
    title: "Commercial Barista Calibration & Latte Art Science",
    category: "Barista & Beverage",
    readTime: "4 min read",
    desc: "Understanding espresso extraction ratios, milk microfoam texturing, and latte art techniques for commercial cafes.",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=800&auto=format&fit=crop",
    fullArticle: "Barista science combines chemistry and art. Students learn grind size calibration, extraction timing (25-30 seconds), and milk steaming to 65°C for microfoam texture. With hands-on practice, students create hearts, rosettas, and tulips while mastering commercial espresso machines."
  },
  {
    id: 3,
    title: "International Cuisine Types Every Chef Should Master",
    category: "Global Gastronomy",
    readTime: "6 min read",
    desc: "From French sauces and Italian pasta craft to Pan-Asian woks and Middle Eastern mezze platters.",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
    fullArticle: "Global culinary arts requires versatile gastronomy knowledge. French mother sauces (Béchamel, Velouté, Espagnole, Tomato, Hollandaise) form the baseline of European dining, while wok hei techniques define Asian gastronomy. NcHM's DGCA program prepares chefs for international hotel menus."
  },
  {
    id: 4,
    title: "Navigating Foreign Bachelor Degree Credit Transfers",
    category: "Degree Pathways",
    readTime: "5 min read",
    desc: "How ADHM (15+6) graduates apply for credit transfer recognition in UK, Canada, USA & Australia universities.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
    fullArticle: "Credit transfer pathways allow ADHM graduates to enter lateral years of foreign Bachelor degrees. Aligned with Scottish SCQF frameworks, credit evaluations assess course hours and practical marks to grant advanced standing in hospitality management degrees."
  }
];

export const CareerGuidesSection: React.FC = () => {
  const [activeGuide, setActiveGuide] = useState<typeof GUIDES[0] | null>(null);

  return (
    <section className="py-20 bg-[#FFFCF6] border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-[#FBF6EC] px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <BookOpen className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Student Learning Resources</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A]">
            Hospitality Career <span className="italic text-gradient-gold">Guides & Insights</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560]">
            Practical culinary techniques, barista calibration science, and degree credit transfer advice from NcHM faculty.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {GUIDES.map((g) => (
            <div
              key={g.id}
              onClick={() => setActiveGuide(g)}
              className="group overflow-hidden rounded-3xl border border-[#EDE7DB] bg-white p-6 transition-all duration-300 hover:border-[#D4AF37] hover:shadow-xl gold-glow-hover flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                  <img
                    src={g.img}
                    alt={g.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-[#1B2A4A]/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-[#D4AF37]">
                    {g.category}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] text-[#6B6560] font-semibold">{g.readTime}</div>
                  <h3 className="mt-1 text-lg font-display font-bold text-[#1B2A4A] group-hover:text-[#D4AF37] transition leading-snug">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#6B6560] line-clamp-3 leading-relaxed">
                    {g.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EDE7DB] flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1B2A4A] group-hover:text-[#D4AF37] transition">Read Guide</span>
                <ArrowRight className="h-4 w-4 text-[#D4AF37] transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Guide Article Lightbox Modal */}
      {activeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative max-w-2xl w-full rounded-3xl bg-[#FFFCF6] border border-[#D4AF37]/40 overflow-hidden shadow-2xl">
            <div className="bg-[#1B2A4A] p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">{activeGuide.category} • {activeGuide.readTime}</span>
                <h3 className="text-xl font-display font-bold text-white mt-1">{activeGuide.title}</h3>
              </div>
              <button
                onClick={() => setActiveGuide(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
              <img
                src={activeGuide.img}
                alt={activeGuide.title}
                className="w-full h-56 object-cover rounded-2xl mb-6"
              />
              <p className="text-sm text-[#1B2A4A] leading-relaxed font-normal">
                {activeGuide.fullArticle}
              </p>
              <button
                onClick={() => setActiveGuide(null)}
                className="mt-6 w-full rounded-full bg-[#1B2A4A] py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#0B132B] gold-glow-hover cursor-pointer"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
