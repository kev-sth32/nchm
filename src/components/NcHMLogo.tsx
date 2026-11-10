export function NcHMLogo({ size = "default", light = false }: { size?: "small" | "default" | "large" | "hero"; light?: boolean }) {
  const dims = size === "small" ? "h-9 w-9 sm:h-10 sm:w-10" : size === "large" ? "h-12 w-12 sm:h-14 sm:w-14" : size === "hero" ? "h-16 w-16 sm:h-24 sm:w-24" : "h-10 w-10 sm:h-12 sm:w-12";

  return (
    <a href="#" className="flex items-center gap-2.5 sm:gap-3 group shrink-0" aria-label="Nepal College of Hotel Management (NcHM Birgunj) Home">
      <div className={`relative flex items-center justify-center rounded-2xl bg-white p-1 shadow-[0_10px_25px_rgba(27,42,74,0.15)] border border-[#D4AF37]/40 transition duration-300 group-hover:scale-105 shrink-0 ${dims}`}>
        <img
          src="/nchm-logo.png"
          alt="Nepal College of Hotel Management (NcHM Birgunj) Crest Logo"
          className="h-full w-full object-contain"
          loading="eager"
        />
        <span className="absolute -right-1 -top-1 h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
      </div>

      <div className="leading-tight">
        <div className={`font-display font-bold tracking-tight ${size === "small" ? "text-[13px] sm:text-[14px]" : size === "large" ? "text-[18px] sm:text-[20px]" : size === "hero" ? "text-[20px] sm:text-[26px]" : "text-[15px] sm:text-[17px]"}`}>
          <span className="text-[#D4AF37]">Nepal College</span>{" "}
          <span className={light ? "text-white" : "text-[#1B2A4A]"}>of Hotel</span>
        </div>
        <div className={`font-bold tracking-[0.12em] sm:tracking-[0.14em] uppercase ${light ? "text-white" : "text-[#1B2A4A]"} ${size === "small" ? "text-[8.5px] sm:text-[9px]" : "text-[9px] sm:text-[10px]"}`}>
          Management <span className={light ? "text-white/60" : "text-[#6B6560]"}>(NcHM) • Birgunj</span>
        </div>
      </div>
    </a>
  );
}
