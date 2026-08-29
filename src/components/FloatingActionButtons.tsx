import React from "react";
import { MessageSquare } from "lucide-react";

export const WHATSAPP_NUMBER = "9779802819788";

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.119.553 4.11 1.519 5.84L0 24l6.337-1.492C8.016 23.473 9.96 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.817 0-3.522-.482-5.002-1.325l-.358-.204-3.722.876.897-3.629-.228-.367A9.956 9.956 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z"/>
  </svg>
);

interface FloatingActionButtonsProps {
  onOpenApplyModal: (programTitle?: string) => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({ onOpenApplyModal }) => {
  const openDirectWhatsApp = () => {
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello NcHM Admissions Team! I am interested in learning more about Hotel Management programs, admissions, and paid international placements.")}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Direct WhatsApp FAB */}
      <button
        onClick={openDirectWhatsApp}
        aria-label="Direct Chat on WhatsApp"
        title="Chat live with NcHM Admissions on WhatsApp"
        className="group relative flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-110 cursor-pointer"
      >
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none" />
        <WhatsAppIcon className="h-7 w-7 relative z-10" />
        <span className="absolute right-15 whitespace-nowrap rounded-lg bg-[#0B132B] px-3 py-1.5 text-[11px] font-bold text-white shadow-xl opacity-0 transition-opacity duration-200 group-hover:opacity-100 border border-[#D4AF37]/30 pointer-events-none hidden sm:block">
          Chat on WhatsApp 💬
        </span>
      </button>

      {/* Quick Apply / Inquire FAB */}
      <button
        onClick={() => onOpenApplyModal("General Admission Inquiry")}
        aria-label="Open admission inquiry form"
        className="group flex h-12 items-center gap-2.5 rounded-full bg-[#1B2A4A] px-5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_8px_25px_rgba(27,42,74,0.3)] border border-[#D4AF37]/40 transition-all duration-300 hover:bg-[#0B132B] hover:scale-105 gold-glow-hover cursor-pointer"
      >
        <MessageSquare className="h-4 w-4 text-[#D4AF37]" />
        <span>Apply / Inquire</span>
      </button>
    </div>
  );
};
