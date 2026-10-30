import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Plus, Minus, ShieldCheck } from "lucide-react";

export const REVIEWS = [
  {
    name: "Nishant Chaudhary",
    role: "DHM Graduate • Culinary Commis",
    badge: "NcHM Alumnus 2023",
    place: "Internship: 5★ Luxury Hotel, Dubai",
    review: "NcHM changed my life completely. The 70% practical kitchen labs in Birgunj gave me real hands-on confidence. Within 12 months, I secured a paid culinary placement in Dubai!",
    avatar: "/nchm/students/nishant-avatar.jpg"
  },
  {
    name: "Ajay Sah Kanu",
    role: "ADHM Graduate • Hospitality Ops",
    badge: "NcHM Alumnus 2023",
    place: "Placement: Luxury Hotel Network, USA",
    review: "NcHM's international transfer and placement pipeline opened doors for my career in the United States. The practical training prepared me to excel globally!",
    avatar: "/nchm/students/ajay-avatar.jpg"
  },
  {
    name: "Faruk Ansari",
    role: "DHM Graduate • Food & Beverage",
    badge: "NcHM Alumnus 2024",
    place: "Internship: 5★ Hotel, Muscat, Oman",
    review: "The hands-on hospitality labs and real industry simulation at NcHM Birgunj gave me the international edge. Proud to represent NcHM across luxury hotels in Oman!",
    avatar: "/nchm/students/faruk-avatar.jpg"
  },
  {
    name: "Raju Chaudhary",
    role: "DHM Graduate • Front Office & Ops",
    badge: "NcHM Alumnus 2024",
    place: "Placement: Luxury Resort, Dubai",
    review: "NcHM's guest relations lab and grooming standards gave me the confidence to handle international luxury guests. Moving from Birgunj to Dubai was a dream come true!",
    avatar: "/nchm/students/raju-avatar.jpg"
  }
];

export const FAQS = [
  { q: "What is the minimum qualification?", a: "SLC / SEE or equivalent with minimum 1.6 GPA. We welcome career-switchers passionate about hospitality." },
  { q: "Does NcHM provide hostel facilities?", a: "No hostel facility available. NcHM currently does not provide on-campus hostel. Students can independently arrange accommodation near the college in Birgunj." },
  { q: "Are international internships available?", a: "Yes. 6-month internships in China, Mauritius, Dubai, Kuwait, Nepal, India for Diploma & ADHM programs, subject to eligibility and visa." },
  { q: "Can ADHM students continue to a Bachelor degree?", a: "Yes. ADHM graduates can apply for credit / advanced entry assessment to Bachelor programs. Transfer is subject to receiving university policies, eligibility and academic assessment." },
  { q: "Which countries offer Bachelor pathway opportunities?", a: "Canada, USA, Switzerland, Dubai/UAE, Scotland, Australia, United Kingdom — via partner universities and credit transfer assessment." },
  { q: "Does NcHM provide job placement?", a: "Yes. 100% job placement support — Prepare, Connect, Interview, Place, Grow. Placements in Nepal and global markets." },
  { q: "Is there a scholarship for girls?", a: "Yes. 20% tuition discount for eligible female students. Terms and eligibility apply. Contact admissions for details." },
  { q: "What short-term courses are available?", a: "Professional Barista Course (1 month fast-track / 2 months intensive with latte art, espresso science & café ops) and Short-Term Kitchen Training (fast food, basic kitchen, hygiene, food safety)." },
];

export const TestimonialsSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-[#FFFCF6] border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

        {/* Testimonials Block */}
        <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#1B2A4A] p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-10 -mr-10 h-80 w-80 rounded-full bg-[#D4AF37]/15 blur-3xl" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Alumni Spotlight & Student Reviews</span>
            </div>

            <div className="mt-8 flex justify-center gap-1 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#D4AF37]" />
              ))}
            </div>

            <p className="mt-6 text-xl sm:text-2xl font-display font-medium leading-relaxed italic text-white/95">
              "{REVIEWS[currentIdx].review}"
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <img
                src={REVIEWS[currentIdx].avatar}
                alt={REVIEWS[currentIdx].name}
                className="h-14 w-14 rounded-full border-2 border-[#D4AF37] object-cover"
              />
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-base font-bold text-white">{REVIEWS[currentIdx].name}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2.5 py-0.5 text-[10px] font-bold text-[#D4AF37]">
                    <ShieldCheck className="h-3 w-3 text-emerald-400" />
                    <span>{REVIEWS[currentIdx].badge}</span>
                  </span>
                </div>
                <div className="text-xs text-[#D4AF37] mt-0.5">{REVIEWS[currentIdx].role}</div>
                <div className="text-[11px] text-white/60">{REVIEWS[currentIdx].place}</div>
              </div>
            </div>

            {/* Carousel Nav Controls */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentIdx((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))}
                aria-label="Previous review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-[#D4AF37] hover:text-black transition cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-1.5">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${i === currentIdx ? "w-6 bg-[#D4AF37]" : "w-2 bg-white/30"
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentIdx((prev) => (prev + 1) % REVIEWS.length)}
                aria-label="Next review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-[#D4AF37] hover:text-black transition cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Block */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1B2A4A]">
              Frequently Asked <span className="italic text-gradient-gold">Questions</span>
            </h2>
            <p className="mt-2 text-sm text-[#6B6560]">
              Everything you need to know about admissions, eligibility, hostels, and paid international placements.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#EDE7DB] bg-white overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-semibold text-[#1B2A4A] hover:bg-[#FBF6EC] transition cursor-pointer"
                  >
                    <span className="text-base font-display">{faq.q}</span>
                    {isOpen ? <Minus className="h-5 w-5 text-[#D4AF37] shrink-0" /> : <Plus className="h-5 w-5 text-[#1B2A4A] shrink-0" />}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-[#6B6560] leading-relaxed border-t border-[#EDE7DB] pt-3 bg-[#FBF6EC]/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
