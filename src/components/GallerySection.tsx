import React, { useState, useEffect, useCallback } from "react";
import { Maximize2, X, ChevronLeft, ChevronRight, Award, Sparkles, Eye } from "lucide-react";

export interface GalleryItem {
  id: number;
  cat: string;
  img: string;
  title: string;
  desc: string;
}

export const GALLERY: GalleryItem[] = [
  // 1. Culinary Arts (All Ultra-HD 2400x1600 Raw/HDR)
  {
    id: 1,
    cat: "Culinary Arts",
    img: "/nchm/06_1726158849679.jpg",
    title: "Commercial Culinary Kitchen Practical",
    desc: "NcHM culinary trainees mastering commercial gas ranges, pan searing, food temperatures, and kitchen hygiene under executive chef guidance."
  },
  {
    id: 2,
    cat: "Culinary Arts",
    img: "/nchm/07_1726158849714.jpg",
    title: "Culinary Station & Gourmet Plating",
    desc: "Hands-on preparation of continental dishes, sauce calibration, and professional line-cook speed training in NcHM's industrial kitchen."
  },
  {
    id: 3,
    cat: "Culinary Arts",
    img: "/nchm/08_1726158850121.jpg",
    title: "NcHM Chef Brigade Line-Up",
    desc: "NcHM student chefs in immaculate white double-breasted jackets and toques lined up for commercial dining service operations."
  },
  {
    id: 4,
    cat: "Culinary Arts",
    img: "/nchm/50_IMG_20240926_090145006_HDR.jpg",
    title: "Culinary Cohort Campus Presentation",
    desc: "Hospitality culinary students gathered in full chef uniforms outside the NcHM campus showcasing professional discipline and team unity."
  },

  // 2. Bar & Beverage
  {
    id: 5,
    cat: "Bar & Beverage",
    img: "/nchm/05_1726158849260.jpg",
    title: "Mixology & Signature Mocktail Bar",
    desc: "Hands-on beverage mixing behind NcHM's fully stocked bar station, practicing shaker techniques, layered syrups, and creative garnishes."
  },
  {
    id: 6,
    cat: "Bar & Beverage",
    img: "/nchm/61_IMG_4588.JPG.jpg",
    title: "Formal Hospitality Service Ambassadors",
    desc: "NcHM trainees in tailored royal blue hospitality blazers and bow ties with official NcHM crest lapel badges."
  },
  {
    id: 7,
    cat: "Bar & Beverage",
    img: "/nchm/48_IMG20260809141153.jpg",
    title: "Fine Dining Lounge & Service Briefing",
    desc: "Faculty mentor conducting a pre-service briefing inside the luxury restaurant lounge on guest etiquette, table settings, and order sequence."
  },
  {
    id: 8,
    cat: "Bar & Beverage",
    img: "/nchm/02_1726158845435.jpg",
    title: "Beverage Counter & Service Setup",
    desc: "Hospitality bar setup, glassware selection, beverage temperature control, and lounge service simulations."
  },

  // 3. Housekeeping
  {
    id: 9,
    cat: "Housekeeping",
    img: "/nchm/40_Graphity_Digital_8.jpg",
    title: "5-Star Suite Operations & Room Inspection",
    desc: "Live supervisor walkthrough inside executive suites focusing on VIP room amenities, housekeeping audits, and hygiene checklists."
  },
  {
    id: 10,
    cat: "Housekeeping",
    img: "/nchm/52_IMG_20241220_092013093_HDR.jpg",
    title: "Executive Bed-Making & Linen Calibration",
    desc: "Students practicing 45-degree hospital miter corners, crisp linen alignment, and luxury duvet tucking in NcHM's mock hotel suite."
  },
  {
    id: 11,
    cat: "Housekeeping",
    img: "/nchm/53_IMG_20241220_092639138_HDR.jpg",
    title: "Housekeeping Operations Team Session",
    desc: "Hands-on instruction on guest supplies, linen inventory cycles, and hotel cleaning protocol management."
  },

  // 4. Front Office
  {
    id: 12,
    cat: "Front Office",
    img: "/nchm/38_Graphity_Digital_2.jpg",
    title: "Luxury Front Office & PMS Operations",
    desc: "Briefing on Property Management Systems (PMS), check-in / check-out workflows, phone etiquette, and front desk communications."
  },
  {
    id: 13,
    cat: "Front Office",
    img: "/nchm/39_Graphity_Digital_22_1.jpg",
    title: "Concierge & VIP Guest Reception Briefing",
    desc: "Live mock lobby simulations covering VIP guest handling, city guidance, baggage coordination, and five-star customer hospitality."
  },

  // 5. Campus Life & Galas
  {
    id: 14,
    cat: "Campus Life & Galas",
    img: "/nchm/66_Zenvixx_Labs_123.jpg",
    title: "Annual Welcome Gala Grand Celebration",
    desc: "Grand welcome ceremony bringing together students, faculty, and college founders with traditional khada and celebration fellowship."
  },
  {
    id: 15,
    cat: "Campus Life & Galas",
    img: "/nchm/65_Zenvixx_Labs_1.jpg",
    title: "Hospitality Gala Banquet Dinner",
    desc: "Grand annual banquet planned, prepared, and managed entirely by NcHM students for hospitality industry leaders and families."
  },
  {
    id: 16,
    cat: "Campus Life & Galas",
    img: "/nchm/69_Zenvixx_Labs_147.jpg",
    title: "Student Leadership & Cohort Fellowship",
    desc: "Female hotel management students in crisp NcHM uniforms and blue ties during the annual hospitality ceremony."
  },
  {
    id: 17,
    cat: "Campus Life & Galas",
    img: "/nchm/70_Zenvixx_Labs_49.jpg",
    title: "Token of Love Recognition on Stage",
    desc: "Presentation of ceremonial honors and tokens of appreciation recognizing student leadership and academic dedication."
  },
  {
    id: 18,
    cat: "Campus Life & Galas",
    img: "/nchm/73_Zenvixx_Labs_8.jpg",
    title: "Inaugural Diyo Lamp Lighting Ceremony",
    desc: "Inauguration of the academic session and placement symposium by NcHM leadership, faculties, and respected hospitality dignitaries."
  },
  {
    id: 19,
    cat: "Campus Life & Galas",
    img: "/nchm/63_IMG_5055.jpg",
    title: "Student Recreation & Team Excursions",
    desc: "Cohort 3D cinema outing and cultural recreation days organized by the NcHM student council for friendship and team bonding."
  },

  // 6. Student Achievements
  {
    id: 20,
    cat: "Student Achievements",
    img: "/nchm/44_IMG-20260717-WA0027.jpg",
    title: "Best Employee of the Month - Sarovar Portico",
    desc: "NcHM student Ronik Poudel recognized as Star Employee of the Month and 3-time Guest Service Champion during luxury hotel internship."
  },
  {
    id: 21,
    cat: "Student Achievements",
    img: "/nchm/49_IMG_1945.jpg",
    title: "SQA Scotland & LCCI GQ Global Accreditation",
    desc: "NcHM leadership at the official international symposium for vocational skills and Scottish Qualifications Authority standards."
  }
];

const CATEGORIES = [
  "All",
  "Culinary Arts",
  "Bar & Beverage",
  "Housekeeping",
  "Front Office",
  "Campus Life & Galas",
  "Student Achievements"
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredGallery = activeCategory === "All"
    ? GALLERY
    : GALLERY.filter(g => g.cat === activeCategory);

  const handlePrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return (prev - 1 + filteredGallery.length) % filteredGallery.length;
    });
  }, [lightboxIndex, filteredGallery.length]);

  const handleNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => {
      if (prev === null) return null;
      return (prev + 1) % filteredGallery.length;
    });
  }, [lightboxIndex, filteredGallery.length]);

  // Handle keyboard events (Escape, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  const currentItem = lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 bg-[#FBF6EC]/50 border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A] shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>High-Definition Campus Gallery</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A]">
            Life at <span className="italic text-gradient-gold">NcHM Birgunj</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560] leading-relaxed">
            Explore authentic, high-resolution moments from our commercial culinary kitchens, mixology cocktail counters, executive guest suites, galas, and award ceremonies.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            const count = cat === "All" ? GALLERY.length : GALLERY.filter(g => g.cat === cat).length;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setLightboxIndex(null);
                }}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${isActive
                    ? "bg-[#1B2A4A] text-white shadow-md gold-glow"
                    : "bg-white text-[#1B2A4A] border border-[#EDE7DB] hover:border-[#D4AF37] hover:bg-[#FBF6EC]"
                  }`}
              >
                <span>{cat}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${isActive ? "bg-[#D4AF37] text-[#0B132B]" : "bg-[#1B2A4A]/10 text-[#1B2A4A]"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Gallery Grid - Clean, spacious 3-column layout where photos are 100% bright and clear */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group bg-white rounded-2xl border border-[#EDE7DB] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all duration-300 flex flex-col cursor-pointer"
            >
              {/* Photo Container: Pristine, natural brightness, zero dark gradient overlay */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0B132B]/5">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3 rounded-full bg-[#1B2A4A]/90 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-[#D4AF37] border border-[#D4AF37]/30 shadow-md">
                  {item.cat}
                </div>

                {/* Floating Expand Icon */}
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#1B2A4A] shadow-md backdrop-blur-md transition-all group-hover:bg-[#D4AF37] group-hover:text-[#0B132B] group-hover:scale-110">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>

              {/* Card Body: Clean typography underneath image */}
              <div className="p-5 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="text-base font-bold font-display text-[#1B2A4A] group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#6B6560] leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EDE7DB]/80 flex items-center justify-between text-[11px] font-semibold text-[#1B2A4A]">
                  <span className="text-[#D4AF37] flex items-center gap-1 group-hover:underline">
                    <Eye className="h-3.5 w-3.5" />
                    <span>View Full Size</span>
                  </span>
                  <span className="text-[#8C827A] text-[10px]">NcHM Birgunj</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-14 rounded-2xl border border-[#D4AF37]/30 bg-gradient-to-r from-[#1B2A4A] to-[#0B132B] p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold font-display text-white">Experience NcHM Birgunj In Person</h4>
              <p className="text-xs text-white/70">Visit our campus on Bypass Road, Birgunj to tour the commercial kitchens, mixology bar, and student labs.</p>
            </div>
          </div>
          <a
            href="https://wa.me/9779802819788?text=Hello%20NcHM%2C%20I%20would%20like%20to%20schedule%20a%20campus%20tour%20and%20see%20the%20practical%20labs."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-[#D4AF37] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:bg-[#E8C99A] transition gold-glow-hover"
          >
            Schedule Campus Visit
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {currentItem && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl sm:rounded-3xl bg-[#0B132B] border border-[#D4AF37]/40 overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with counter & close */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#070D1E] border-b border-[#D4AF37]/20 text-white">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2.5 py-0.5 text-[10px] font-bold text-[#D4AF37]">
                  {currentItem.cat}
                </span>
                <span className="text-xs text-white/50">
                  {lightboxIndex + 1} of {filteredGallery.length}
                </span>
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close modal"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Image Preview with Next/Prev Controls */}
            <div className="relative max-h-[65vh] sm:max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={currentItem.img}
                alt={currentItem.title}
                className="w-full h-auto max-h-[65vh] sm:max-h-[70vh] object-contain transition-all duration-300"
              />

              {/* Prev Button */}
              {filteredGallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#D4AF37] hover:text-[#0B132B] transition cursor-pointer shadow-lg"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* Next Button */}
              {filteredGallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#D4AF37] hover:text-[#0B132B] transition cursor-pointer shadow-lg"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            <div className="p-4 sm:p-6 text-white bg-[#0B132B] border-t border-[#D4AF37]/20">
              <h3 className="text-base sm:text-xl font-display font-bold text-white leading-snug">
                {currentItem.title}
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm text-white/80 leading-relaxed">
                {currentItem.desc}
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-white/50">
                <span>Use ← and → arrow keys to navigate</span>
                <span className="text-[#D4AF37] font-semibold">Nepal College of Hotel Management • Birgunj</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


