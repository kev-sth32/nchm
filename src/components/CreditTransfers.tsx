import React, { useState, useRef, useEffect } from "react";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "./motion/MotionPrimitives";

export const BACHELOR = [
  { country: "Canada", flag: "🇨🇦", city: "Toronto, Vancouver", transferLabel: "2nd Year Bachelor Credit Transfer", desc: "Lateral entry into 2nd year Hospitality & Tourism Bachelor degree programs." },
  { country: "USA", flag: "🇺🇸", city: "Multiple States", transferLabel: "2nd Year Bachelor Credit Transfer", desc: "Full credit recognition for ADHM modules for 2nd year Bachelor entry." },
  { country: "Switzerland", flag: "🇨🇭", city: "Hospitality Capital", transferLabel: "2nd Year Bachelor Credit Transfer", desc: "Top European hospitality academy 2nd year Bachelor credit transfer." },
  { country: "Dubai / UAE", flag: "🇦🇪", city: "Dubai", transferLabel: "2nd Year Bachelor Credit Transfer", desc: "Direct pathway to 2nd year Bachelor degree completion in Dubai campuses." },
  { country: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", city: "Edinburgh, Glasgow", transferLabel: "2nd Year Bachelor Credit Transfer", desc: "SQA benchmarked SCQF 2nd year Bachelor credit transfer mapping." },
  { country: "Australia", flag: "🇦🇺", city: "Sydney, Melbourne", transferLabel: "2nd Year Bachelor Credit Transfer", desc: "2nd year Bachelor higher education advanced standing entry options." },
  { country: "United Kingdom", flag: "🇬🇧", city: "London & Beyond", transferLabel: "2nd Year Bachelor Credit Transfer", desc: "UK University 2nd year / top-up Bachelor degree entry." },
];

interface CreditTransfersProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

export const CreditTransfers: React.FC<CreditTransfersProps> = ({ onOpenApplyModal }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play sliding effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, activeIndex]);

  const scrollToCard = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 24 : 320;
    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cardWidth = container.firstElementChild ? (container.firstElementChild as HTMLElement).offsetWidth + 24 : 320;
    const calculatedIndex = Math.round(container.scrollLeft / cardWidth);
    if (calculatedIndex >= 0 && calculatedIndex < BACHELOR.length && calculatedIndex !== activeIndex) {
      setActiveIndex(calculatedIndex);
    }
  };

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? BACHELOR.length - 1 : activeIndex - 1;
    scrollToCard(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % BACHELOR.length;
    scrollToCard(nextIdx);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-[#FBF6EC]/50 border-b border-[#EDE7DB]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

        {/* Centered Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/30 bg-white px-4 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
            <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Bachelor Degree Pathways</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A]">
            Global <span className="italic text-gradient-gold">Bachelor Credit Transfers</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#6B6560]">
            ADHM (15+6) graduates qualify for 2nd Year Bachelor Credit Transfer and lateral entry into foreign university degree programs.
          </p>
        </Reveal>

        {/* Sliding Carousel Track Container */}
        <Reveal delay={0.05} className="mt-12 overflow-hidden">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 no-scrollbar scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {BACHELOR.map((b) => (
                <div
                  key={b.country}
                  className="snap-start shrink-0 w-[270px] sm:w-[320px] lg:w-[360px] group rounded-3xl border border-[#EDE7DB] bg-white p-5 sm:p-6 transition-all duration-300 hover:border-[#D4AF37] hover:shadow-2xl gold-glow-hover flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-4xl">{b.flag}</span>
                      <span className="rounded-full bg-[#FBF6EC] px-3 py-1 text-[10px] font-bold text-[#1B2A4A] border border-[#D4AF37]/20">{b.city}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-display font-bold text-[#1B2A4A] group-hover:text-[#D4AF37] transition">
                      {b.country}
                    </h3>
                    <div className="mt-2 inline-block rounded-lg bg-[#1B2A4A] px-2.5 py-1 text-[10px] font-bold text-[#D4AF37]">
                      🎓 {b.transferLabel}
                    </div>
                    <p className="mt-2 text-xs text-[#6B6560] leading-relaxed">
                      {b.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenApplyModal(`Credit Transfer - ${b.country}`)}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1B2A4A] hover:text-[#D4AF37] transition cursor-pointer"
                  >
                    <span>Check Credit Eligibility</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Centered Controls: Arrows + Indicator Dots */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EDE7DB] bg-white text-[#1B2A4A] transition hover:border-[#D4AF37] hover:bg-[#1B2A4A] hover:text-[#D4AF37] gold-glow-hover cursor-pointer shadow-sm shrink-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Carousel Indicator Dots */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {BACHELOR.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className="p-1.5 flex items-center justify-center cursor-pointer"
                >
                  <span
                    className={`h-2.5 rounded-full transition-all block ${idx === activeIndex ? "w-6 sm:w-8 bg-[#D4AF37]" : "w-2.5 bg-[#EDE7DB] hover:bg-[#D4AF37]/50"
                      }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#EDE7DB] bg-white text-[#1B2A4A] transition hover:border-[#D4AF37] hover:bg-[#1B2A4A] hover:text-[#D4AF37] gold-glow-hover cursor-pointer shadow-sm shrink-0"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Pathway Banner Notice */}
        <Reveal delay={0.08} className="mt-12 rounded-2xl border border-[#D4AF37]/30 bg-[#1B2A4A] p-6 text-white text-center sm:flex sm:items-center sm:justify-between sm:text-left shadow-xl">
          <div>
            <div className="text-sm font-bold text-[#D4AF37]">SQA Scotland & SCQF Framework Alignment</div>
            <div className="mt-1 text-xs text-white/80">Credit transfers are subject to individual receiving university admission requirements & credit evaluation.</div>
          </div>
          <button
            onClick={() => onOpenApplyModal("Degree Credit Transfer Advisory")}
            className="btn-gold-sheen mt-4 sm:mt-0 shrink-0 rounded-full bg-[#D4AF37] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:bg-[#E8C99A] gold-glow-hover cursor-pointer active:scale-[0.98]"
          >
            Schedule Advisory →
          </button>
        </Reveal>

      </div>
    </section>
  );
};
