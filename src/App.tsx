import { useEffect, useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { AccreditationBanner } from "./components/AccreditationBanner";
import { StatsBar } from "./components/StatsBar";
import { WhyNcHMSection } from "./components/WhyNcHMSection";
import { ProgramsSection } from "./components/ProgramsSection";
import { GlobalOpportunities } from "./components/GlobalOpportunities";
import { StudentSpotlight } from "./components/StudentSpotlight";
import { CreditTransfers } from "./components/CreditTransfers";
import { PlacementPartners } from "./components/PlacementPartners";
import { FacultyTeamSection } from "./components/FacultyTeamSection";
import { AdmissionSection } from "./components/AdmissionSection";
import { CareerGuidesSection } from "./components/CareerGuidesSection";
import { GallerySection } from "./components/GallerySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { InquiryModal } from "./components/InquiryModal";
import { FloatingActionButtons } from "./components/FloatingActionButtons";
import { Footer } from "./components/Footer";
import { NcHMLogo } from "./components/NcHMLogo";
import { LUXURY_EASE, ScrollProgressBar } from "./components/motion/MotionPrimitives";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgramForModal, setSelectedProgramForModal] = useState("General Admission 2026");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleOpenApplyModal = (programTitle?: string) => {
    setSelectedProgramForModal(programTitle || "General Admission 2026");
    setModalOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          {loading ? (
            <m.div
              key="splash-screen"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: LUXURY_EASE }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFFCF6] px-4 text-center"
            >
              <div className="relative flex flex-col items-center">
                <div className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22)_0%,transparent_70%)] animate-pulse" />
                <div className="animate-[float_2s_ease-in-out_infinite]">
                  <NcHMLogo size="hero" />
                </div>
                <p className="mt-6 text-[11px] sm:text-[12px] uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#1B2A4A] font-semibold">
                  Initializing 3D Hospitality World...
                </p>
              </div>
              <div className="mt-6 h-[2px] w-32 overflow-hidden rounded-full bg-[#EDE7DB]">
                <div className="h-full w-full origin-left animate-[shimmer_1s_ease-in-out_infinite] bg-[#D4AF37]" />
              </div>
            </m.div>
          ) : (
            <m.div
              key="main-app"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="min-h-screen bg-[#FFFCF6] text-[#1B2A4A] relative overflow-x-clip"
            >
              <ScrollProgressBar />

              {/* Header & Sticky Navbar */}
              <Header scrolled={scrolled} onOpenApplyModal={handleOpenApplyModal} />

              {/* Main Content Sections */}
              <main>
                <HeroSection onOpenApplyModal={handleOpenApplyModal} />
                <AccreditationBanner />
                <StatsBar />
                <WhyNcHMSection onOpenApplyModal={handleOpenApplyModal} />
                <ProgramsSection onOpenApplyModal={handleOpenApplyModal} />
                <GlobalOpportunities onOpenApplyModal={handleOpenApplyModal} />
                <StudentSpotlight onOpenApplyModal={handleOpenApplyModal} />
                <CreditTransfers onOpenApplyModal={handleOpenApplyModal} />
                <PlacementPartners />
                <FacultyTeamSection />
                <AdmissionSection onOpenApplyModal={handleOpenApplyModal} />
                <CareerGuidesSection onOpenApplyModal={handleOpenApplyModal} />
                <GallerySection />
                <TestimonialsSection />
              </main>

              {/* Footer */}
              <Footer onOpenApplyModal={handleOpenApplyModal} />

              {/* Floating Action Buttons */}
              <FloatingActionButtons onOpenApplyModal={handleOpenApplyModal} />

              {/* Inquiry & Application Modal */}
              <InquiryModal
                isOpen={modalOpen}
                selectedProgram={selectedProgramForModal}
                onClose={() => setModalOpen(false)}
              />
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </MotionConfig>
  );
}
