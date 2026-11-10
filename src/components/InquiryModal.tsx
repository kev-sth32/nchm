import React, { useState, useEffect } from "react";
import { X, CheckCircle2, MessageSquare } from "lucide-react";

const WHATSAPP_NUMBER = "9779829232426";

interface InquiryModalProps {
  isOpen: boolean;
  selectedProgram: string;
  onClose: () => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, selectedProgram, onClose }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [waUrl, setWaUrl] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    qualification: "SEE / SLC (Minimum 1.6 GPA)",
    message: ""
  });

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

  if (!isOpen) return null;

  const getWhatsAppMessage = () => {
    return `🎓 *NEW ADMISSION ENQUIRY - NcHM Nepal* 🎓\n\n` +
      `👤 *Full Name:* ${formData.fullName}\n` +
      `📱 *Phone / WhatsApp:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email || "Not provided"}\n` +
      `📚 *Program Interested:* ${selectedProgram}\n` +
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
    <div 
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-lg max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] flex flex-col overflow-hidden rounded-3xl border border-[#D4AF37]/40 bg-[#FFFCF6] shadow-2xl">
        
        {/* Modal Header */}
        <div className="bg-[#1B2A4A] p-5 sm:p-6 text-white flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
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

        {/* Modal Body */}
        <div className="p-5 sm:p-8 overflow-y-auto overscroll-contain flex-1">
          {formSubmitted ? (
            <div className="text-center py-4 space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div>
                <h4 className="text-2xl font-display font-bold text-[#1B2A4A]">Inquiry Dispatched to WhatsApp!</h4>
                <p className="mt-2 text-sm text-[#6B6560] max-w-sm mx-auto">
                  Your admission inquiry for <strong className="text-[#1B2A4A]">{selectedProgram}</strong> has been routed directly to our admissions officer at <strong className="text-[#1B2A4A]">+977 9829232426</strong>.
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
              <div className="rounded-xl bg-[#FBF6EC] p-3 text-xs text-[#1B2A4A] border border-[#D4AF37]/30">
                Inquiring Program: <strong className="text-[#D4AF37]">{selectedProgram}</strong>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1B2A4A] mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-[#EDE7DB] bg-white px-4 py-2.5 text-base sm:text-sm text-[#1B2A4A] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1B2A4A] mb-1">Mobile / WhatsApp Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-[#EDE7DB] bg-white px-4 py-2.5 text-base sm:text-sm text-[#1B2A4A] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#1B2A4A] mb-1">Highest Academic Qualification</label>
                <select
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
                <label className="block text-xs font-bold uppercase text-[#1B2A4A] mb-1">Questions / Message (Optional)</label>
                <textarea
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

      </div>
    </div>
  );
};
