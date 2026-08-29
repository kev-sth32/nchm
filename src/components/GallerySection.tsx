import React, { useState } from "react";
import { Maximize2, X } from "lucide-react";

export const GALLERY = [
  { 
    cat: "Internship", 
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop", 
    title: "5-Star Resort Exposure & International Internship",
    desc: "6-month paid exposure in partner luxury resorts across Dubai, China, Mauritius & Nepal."
  },
  { 
    cat: "Barista Lab", 
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop", 
    title: "Professional Barista & Latte Art Calibration",
    desc: "Espresso Extraction, Milk Texturing & Cafe Operations Lab."
  },
  { 
    cat: "Culinary Lab", 
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop", 
    title: "Commercial Culinary Kitchen Training",
    desc: "Knife skills, station management, food safety & international cuisine."
  },
  { 
    cat: "F&B Practical", 
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop", 
    title: "Fine Dining Service & Table Setup",
    desc: "70% hands-on training in real-world hospitality service standards."
  },
  { 
    cat: "Front Office", 
    img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1200&auto=format&fit=crop", 
    title: "Hotel Mock Lobby & Reception Ops",
    desc: "Guest handling, PMS software training & concierge excellence."
  },
  { 
    cat: "Beverage Lab", 
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=1200&auto=format&fit=crop", 
    title: "Mixology & Beverage Service Masterclass",
    desc: "Mocktail crafting, bar management & beverage service protocols."
  },
  { 
    cat: "Events & Gala", 
    img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop", 
    title: "Hospitality Career & Graduation Gala",
    desc: "Industry networking dinners, graduation celebrations & GM interactions."
  },
  { 
    cat: "Student Life", 
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop", 
    title: "NcHM Student Leadership & Teamwork",
    desc: "Collaborative learning, group projects & student community."
  },
];

const CATEGORIES = ["All", "Internship", "Barista Lab", "Culinary Lab", "F&B Practical", "Front Office"];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxItem, setLightboxItem] = useState<{ img: string; title: string; desc: string; cat: string } | null>(null);

  const filteredGallery = activeCategory === "All"
    ? GALLERY
    : GALLERY.filter(g => g.cat === activeCategory);

  return (
    <section className="py-20 bg-[#FBF6EC]/50 border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <span>Campus & Practical Labs</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A]">
            Life at <span className="italic text-gradient-gold">NcHM Birgunj</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560]">
            Experience commercial kitchen labs, professional barista bars, mock reception desks & international internships.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#1B2A4A] text-white shadow-md gold-glow"
                    : "bg-white text-[#1B2A4A] border border-[#EDE7DB] hover:border-[#D4AF37]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredGallery.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setLightboxItem(item)}
              className="group relative overflow-hidden rounded-3xl border border-[#EDE7DB] bg-white shadow-md transition-all duration-300 hover:border-[#D4AF37] hover:shadow-2xl cursor-pointer"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B]/90 via-[#0B132B]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                
                <div className="absolute top-3 left-3 rounded-full bg-[#1B2A4A]/80 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-[#D4AF37]">
                  {item.cat}
                </div>

                <button 
                  aria-label="Expand image"
                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition group-hover:bg-[#D4AF37] group-hover:text-[#0B132B]"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-sm font-bold font-display leading-tight">{item.title}</h3>
                  <p className="mt-1 text-[11px] text-white/70 line-clamp-2">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full rounded-3xl bg-[#0B132B] border border-[#D4AF37]/40 overflow-hidden shadow-2xl">
            <button
              onClick={() => setLightboxItem(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#D4AF37] hover:text-black transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black">
              <img
                src={lightboxItem.img}
                alt={lightboxItem.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            <div className="p-6 text-white bg-[#0B132B]">
              <span className="rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-3 py-1 text-[10px] font-bold text-[#D4AF37]">
                {lightboxItem.cat}
              </span>
              <h3 className="mt-2 text-xl font-display font-bold text-white">{lightboxItem.title}</h3>
              <p className="mt-1 text-xs text-white/70">{lightboxItem.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
