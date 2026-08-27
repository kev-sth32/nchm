export function NcHMLogo({ size = "default", light = false }: { size?: "small" | "default" | "large" | "hero"; light?: boolean }) {
  const dims = size === "small" ? "h-9 w-9" : size === "large" ? "h-14 w-14" : size === "hero" ? "h-20 w-20 sm:h-24 sm:w-24" : "h-11 w-11";

  return (
    <div className="flex items-center gap-3 group shrink-0">
      <div className={`relative flex items-center justify-center rounded-2xl bg-[#1B2A4A] p-2 text-white shadow-[0_10px_25px_rgba(27,42,74,0.25)] border border-[#D4AF37]/40 transition duration-300 group-hover:scale-105 ${dims}`}>
        {/* SVG Recreation of the official NcHM crest */}
        <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield base */}
          <path d="M50 8C30 8 18 15 18 35C18 60 38 85 50 92C62 85 82 60 82 35C82 15 70 8 50 8Z" fill="#1B2A4A" stroke="#D4AF37" strokeWidth="3" />
          
          {/* 3 Gold Stars */}
          <g fill="#D4AF37">
            <path d="M50 14L52.5 19H58L53.5 22.5L55 28L50 24.5L45 28L46.5 22.5L42 19H47.5L50 14Z" transform="scale(0.5) translate(46, 12)" />
            <path d="M50 12L53 18H59L54 22L56 28L50 24L44 28L46 22L41 18H47L50 12Z" transform="scale(0.7) translate(22, 6)" />
            <path d="M50 14L52.5 19H58L53.5 22.5L55 28L50 24.5L45 28L46.5 22.5L42 19H47.5L50 14Z" transform="scale(0.5) translate(80, 12)" />
          </g>

          {/* White Chef Hat & Cloche */}
          <path d="M32 38C30 38 28 40 28 42C26 42 24 44 24 46C24 48 26 50 28 50H42C44 50 46 48 46 46C46 43 43 41 40 42C39 39 36 38 32 38Z" fill="white" />
          {/* Cloche Dome */}
          <path d="M58 40C54 40 52 43 52 46H72C72 43 70 40 66 40H58ZM60 48H64V50H60V48Z" fill="white" />
          
          {/* Crossed Spoon & Fork */}
          <path d="M42 55L54 67M54 55L42 67" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        </svg>

        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]" />
      </div>

      <div className="leading-tight">
        <div className={`font-display font-bold tracking-tight ${light ? "text-white" : "text-[#1B2A4A]"} ${size === "small" ? "text-[14px]" : size === "large" ? "text-[20px]" : size === "hero" ? "text-[22px] sm:text-[26px]" : "text-[17px]"}`}>
          Nepal College <span className="text-[#D4AF37]">of Hospitality</span>
        </div>
        <div className={`font-medium tracking-[0.16em] uppercase ${light ? "text-white/70" : "text-[#6B6560]"} ${size === "small" ? "text-[9px]" : "text-[10px]"}`}>
          Management (NcHM) • Birgunj
        </div>
      </div>
    </div>
  );
}
