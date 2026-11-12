import React, { useState, useEffect } from "react";
import { AnimatePresence, m } from "motion/react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, Plus, Minus, ShieldCheck } from "lucide-react";
import { LUXURY_EASE, Reveal } from "./motion/MotionPrimitives";

export const REVIEWS = [
  {
    name: "Rahul Tamang",
    role: "NcHM Student • Birgunj",
    badge: "Verified Google Review • 5.0★",
    place: "Google Maps Reviewer • 10 Photos",
    review: "I'm glad that I'm studying at NCHM good educations and practical & support's new experience new journey help full teacher's and good environment's ❤️",
    avatar: "/nchm/reviews/rahul_tamang.jpg"
  },
  {
    name: "Aarya Shrestha",
    role: "NcHM Student • Birgunj",
    badge: "Verified Google Review • 5.0★",
    place: "Google Maps Reviewer • 3 Photos",
    review: "NCHM nepal college of hotel management it is a most reliable and best college .Here,you can get all type of facilities and supportive teachers with friendly environment which is why it make more interesting and fun to learn something new .",
    avatar: "/nchm/reviews/aarya_shrestha.jpg"
  },
  {
    name: "Suceela Magar",
    role: "NcHM Student • Birgunj",
    badge: "Verified Google Review • 5.0★",
    place: "Google Maps Reviewer",
    review: "Our (NCHM) isn’t a college…. It’s A #BRAND and our NCHM provides good education and support to get achievements our goals",
    avatar: "/nchm/reviews/suceela_magar.jpg"
  },
  {
    name: "Aamir Ansari",
    role: "Hospitality Industry Reviewer",
    badge: "Verified Google Review • 5.0★",
    place: "Birgunj, Murli Bagaicha",
    review: "The Nepal College of Hotel Management (NCHM) in Birgunj is a compact, career-focused institute that delivers highly practical hospitality training and globally recognized certifications right from its convenient Murli Bagaicha location.",
    avatar: "/nchm/reviews/aamir_ansari.jpg"
  },
  {
    name: "Chandan Yadav",
    role: "NcHM Student • Birgunj",
    badge: "Verified Google Review • 5.0★",
    place: "Google Maps Reviewer • 2 Photos",
    review: "The facilities at this college are so good that I cannot describe them in words.",
    avatar: "/nchm/reviews/chandan_yadav.jpg"
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
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FFFCF6] border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

        {/* Testimonials Block */}
        <Reveal className="rounded-3xl border border-[#D4AF37]/30 bg-[#1B2A4A] p-5 sm:p-10 lg:p-14 text-white shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute right-0 top-0 -mt-10 -mr-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.18)_0%,transparent_70%)]" />

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              <MessageSquare className="h-3.5 w-3.5" />
              <span>Verified Google Reviews • Nepal College of Hotel Management</span>
            </div>

            <div className="mt-8 flex justify-center gap-1 text-[#D4AF37]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#D4AF37]" />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <m.div
                key={currentIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: LUXURY_EASE }}
              >
                <p className="mt-6 text-xl sm:text-2xl font-display font-medium leading-relaxed italic text-white/95">
                  "{REVIEWS[currentIdx].review}"
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <img
                    src={REVIEWS[currentIdx].avatar}
                    alt={REVIEWS[currentIdx].name}
                    className="h-14 w-14 rounded-full border-2 border-[#D4AF37] object-cover bg-[#0B132B] shadow-md"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.onerror = null;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(REVIEWS[currentIdx].name)}&background=D4AF37&color=1B2A4A&bold=true`;
                    }}
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
              </m.div>
            </AnimatePresence>

            {/* Carousel Nav Controls */}
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => setCurrentIdx((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))}
                aria-label="Previous review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-[#D4AF37] hover:text-black transition cursor-pointer active:scale-95"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-1.5">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === currentIdx ? "w-6 bg-[#D4AF37]" : "w-2 bg-white/30"
                      }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentIdx((prev) => (prev + 1) % REVIEWS.length)}
                aria-label="Next review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 hover:bg-[#D4AF37] hover:text-black transition cursor-pointer active:scale-95"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Google Reviews Trust Badge & External Link */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://maps.app.goo.gl/smSzjGYD5JwTKDfm8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-center justify-center gap-2 rounded-full bg-white/10 px-4 sm:px-6 py-2.5 text-xs font-semibold text-white border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:text-[#0B132B] transition gold-glow-hover max-w-full"
              >
                <span>📍 Verified 5.0★ on Google Maps (9 Reviews) — Read Student Reviews →</span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* FAQ Accordion Block */}
        <Reveal delay={0.08} className="mt-20 max-w-4xl mx-auto">
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
                  className={`rounded-2xl border bg-white overflow-hidden transition-colors duration-300 shadow-sm ${
                    isOpen ? "border-[#D4AF37]/60" : "border-[#EDE7DB]"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-semibold text-[#1B2A4A] hover:bg-[#FBF6EC] transition cursor-pointer"
                  >
                    <span className="text-sm sm:text-base font-display pr-2">{faq.q}</span>
                    {isOpen ? <Minus className="h-5 w-5 text-[#D4AF37] shrink-0 transition-transform duration-200" /> : <Plus className="h-5 w-5 text-[#1B2A4A] shrink-0 transition-transform duration-200" />}
                  </button>

                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#6B6560] leading-relaxed border-t border-[#EDE7DB] pt-3 bg-[#FBF6EC]/30">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
  );
};
