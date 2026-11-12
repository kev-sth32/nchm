import React, { useState, useEffect } from "react";
import { AnimatePresence, m } from "motion/react";
import { X, CheckCircle2, MessageSquare } from "lucide-react";
import { LUXURY_EASE } from "./motion/MotionPrimitives";
import { PROGRAMS } from "./ProgramsSection";

const WHATSAPP_NUMBER = "9779829232426";
const GENERAL_GUIDANCE_OPTION = "Not Sure Yet — Need Counselor Guidance";

function resolveCourseFromProgram(program: string): string {
  const matched = PROGRAMS.find(
    (p) => program === p.title || program.includes(p.title)
  );
  return matched ? matched.title : "";
}

interface InquiryModalProps {
  isOpen: boolean;
  selectedProgram: string;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, selectedProgram, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(() => resolveCourseFromProgram(selectedProgram));
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    qualification: "SEE / SLC (Minimum 1.6 GPA)",
    message: ""
  });

  const autoMatchedCourse = resolveCourseFromProgram(selectedProgram);
  const isAutoSelected = Boolean(autoMatchedCourse && selectedCourse === autoMatchedCourse);
  const isSyllabusRequest = selectedProgram.startsWith("Syllabus Request - ");

  useEffect(() => {
    if (isOpen) {
      setSelectedCourse(resolveCourseFromProgram(selectedProgram));
      setFormSubmitted(false);
      setWaUrl("");
    }
  }, [isOpen, selectedProgram]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, onClose]);

  const getWhatsAppMessage = () => {
    const courseDisplay = selectedCourse || selectedProgram;
    const inquiryContextLine =
      selectedProgram && selectedProgram !== courseDisplay
        ? `📌 *Inquiry Type:* ${selectedProgram}\n`
        : "";

    return `🎓 *NEW ADMISSION ENQUIRY - NcHM Nepal* 🎓\n\n` +
      `👤 *Full Name:* ${formData.fullName}\n` +
      `📱 *Phone / WhatsApp:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email || "Not provided"}\n` +
      `📚 *Course / Program:* ${courseDisplay}\n` +
      inquiryContextLine +
      `🎓 *Qualification:* ${formData.qualification}\n` +
      `💬 *Message / Questions:* ${formData.message || "None"}\n\n` +
      `_Sent via NcHM Official Website Admission Portal_`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const messageText = getWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    setWaUrl(url);
    setFormSubmitted(true);
    window.open(url, "_blank");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="inquiry-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: LUXURY_EASE }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <m.div
            key="inquiry-modal-card"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.26, ease: LUXURY_EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90dvh] sm:max-h-[calc(100dvh-2rem)] flex flex-col overflow-hidden rounded-t-3xl sm:rounded-3xl border border-[#D4AF37]/40 bg-[#FFFCF6] shadow-2xl"
          >
        
        {/* Modal Header */}
        <div className="bg-[#1B2A4A] px-5 pt-3 pb-4 sm:p-6 text-white border-b border-[#D4AF37]/30 shrink-0">
          <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#D4AF37]/50 sm:hidden" aria-hidden="true" />
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37]">Nepal College of Hotel Management</div>
              <h3 id="modal-title" className="text-lg sm:text-xl font-display font-bold text-white mt-0.5">Admissions &amp; Inquiry 2026</h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#D4AF37] hover:text-black transition cursor-pointer shrink-0 ml-2"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8 overflow-y-auto overscroll-contain flex-1">
          {formSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-2xl font-display font-bold text-[#1B2A4A]">Inquiry Dispatched to WhatsApp!</h4>
                <p className="mt-2 text-sm text-[#6B6560] max-w-sm mx-auto">
                  Your admission inquiry for <strong className="text-[#1B2A4A]">{selectedCourse || selectedProgram}</strong> has been routed directly to our admissions officer at <strong className="text-[#1B2A4A]">+977 9829232426</strong>.
                </p>
              </div>

              {/* High-visibility direct WhatsApp button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full rounded-full bg-[#25D366] py-3.5 text-sm font-bold text-white shadow-xl hover:bg-[#20ba59] transition-all duration-200 cursor-pointer"
              >
                <MessageSquare className="h-5 w-5" />
                <span>Open WhatsApp Chat Directly (Click Here)</span>
              </a>

              <div className="pt-1">
                <a
                  href="tel:+9779829232426"
                  className="text-xs font-semibold text-[#1B2A4A] hover:text-[#D4AF37] transition inline-flex items-center gap-1"
                >
                  <span>Prefer a direct phone call? Dial +977 9829232426</span>
                </a>
              </div>

              <button
                onClick={onClose}
                className="w-full rounded-full bg-[#EDE7DB]/60 py-2.5 text-xs font-bold text-[#1B2A4A] hover:bg-[#EDE7DB] cursor-pointer transition mt-2"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {(!autoMatchedCourse || isSyllabusRequest) && (
                <div className="rounded-xl bg-[#FBF6EC] p-3 text-xs text-[#1B2A4A] border border-[#D4AF37]/30">
                  {isSyllabusRequest ? "Request Type:" : "Inquiring About:"}{" "}
                  <strong className="text-[#D4AF37]">
                    {isSyllabusRequest ? "Syllabus & Fee Structure" : selectedProgram}
                  </strong>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <label htmlFor="inquiry-course" className="block text-xs font-bold uppercase text-[#1B2A4A]">
                    Course / Program *
                  </label>
                  {isAutoSelected && (
                    <span className="inline-flex items-center rounded-full bg-[#FBF6EC] border border-[#D4AF37]/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#9C7D4A]">
                      Auto-selected
                    </span>
                  )}
                </div>
                <select
                  id="inquiry-course"
                  name="course"
                  required
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className={`w-full rounded-xl border bg-white px-4 py-2.5 text-base sm:text-sm text-[#1B2A4A] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none ${
                    isAutoSelected ? "border-[#D4AF37]/60 bg-[#FBF6EC]/40 font-medium" : "border-[#EDE7DB]"
                  }`}
                >
                  <option value="" disabled>
                    -- Select a Course / Program --
                  </option>
                  {PROGRAMS.map((prog) => (
                    <option key={prog.id} value={prog.title}>
                      {prog.title}
                    </option>
                  ))}
                  <option value={GENERAL_GUIDANCE_OPTION}>{GENERAL_GUIDANCE_OPTION}</option>
                </select>
              </div>

              <div>
                <label htmlFor="inquiry-full-name" className="block text-xs font-bold uppercase text-[#1B2A4A] mb-1">Full Name *</label>
                <input
                  id="inquiry-full-name"
                  name="fullName"
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-[#EDE7DB] bg-white px-4 py-2.5 text-base sm:text-sm text-[#1B2A4A] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label htmlFor="inquiry-phone" className="block text-xs font-bold uppercase text-[#1B2A4A] mb-1">Mobile / WhatsApp Number *</label>
                <input
                  id="inquiry-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="e.g. +977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-[#EDE7DB] bg-white px-4 py-2.5 text-base sm:text-sm text-[#1B2A4A] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label htmlFor="inquiry-qualification" className="block text-xs font-bold uppercase text-[#1B2A4A] mb-1">Highest Academic Qualification</label>
                <select
                  id="inquiry-qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full rounded-xl border border-[#EDE7DB] bg-white px-4 py-2.5 text-base sm:text-sm text-[#1B2A4A] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
                >
                  <option value="SEE / SLC (Minimum 1.6 GPA)">SEE / SLC (Minimum 1.6 GPA)</option>
                  <option value="+2 Management / Science / Arts">+2 Management / Science / Arts</option>
                  <option value="Bachelor Degree (Any Stream)">Bachelor Degree (Any Stream)</option>
                  <option value="Working Professional / Other">Working Professional / Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="inquiry-message" className="block text-xs font-bold uppercase text-[#1B2A4A] mb-1">Questions / Message (Optional)</label>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={2}
                  placeholder="Any questions about fees, scholarships, or internship locations?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-[#EDE7DB] bg-white px-4 py-2.5 text-base sm:text-sm text-[#1B2A4A] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#1B2A4A] py-3.5 text-sm font-semibold text-white shadow-xl hover:bg-[#0B132B] gold-glow-hover cursor-pointer transition flex items-center justify-center gap-2"
              >
                <span>Submit &amp; Chat on WhatsApp</span>
                <MessageSquare className="h-4 w-4 text-[#D4AF37]" />
              </button>
            </form>
          )}
          </div>

          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
};
