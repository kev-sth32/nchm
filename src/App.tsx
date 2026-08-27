import React, { useEffect, useState, useMemo, useRef } from "react";
import { NcHMLogo } from "./components/NcHMLogo";
import { Interactive3DScene } from "./components/Interactive3DScene";
import { 
  Award, Globe, Compass, 
  ChevronRight, ChevronLeft, ArrowRight, CheckCircle2, Sparkles, GraduationCap, 
  Briefcase, Star, Menu, X, Building2, MessageSquare, Phone, 
  Mail, User, BookOpen, Maximize2, ExternalLink
} from "lucide-react";

// Client WhatsApp Number (Replace with client's active phone number with country code, e.g., 97798XXXXXXXX)
const WHATSAPP_NUMBER = "9779800000000";

const NAV = ["About", "Programs", "Global Opportunities", "Career", "Team", "Admission", "Contact"];

const STATS = [
  { k: "2018", v: "Established AD", sub: "Premium since day one" },
  { k: "9+6", v: "Months Diploma + Internship", sub: "Theory + real hotels" },
  { k: "15+6", v: "Months ADHM + Internship", sub: "Advanced + global" },
  { k: "20%", v: "Girls Scholarship", sub: "Tuition support" },
  { k: "3-4★", v: "Hotel Partnerships", sub: "Industry MOUs" },
  { k: "GLOBAL", v: "Career Opportunities", sub: "Nepal to world" },
];

const WHY = [
  { n: "01", t: "Career-Focused Education", d: "Built with hotel GMs, not just textbooks. Every module maps to a real role.", icon: Award },
  { n: "02", t: "Practical Training", d: "70% hands-on. Service, housekeeping, F&B, barista labs daily.", icon: Compass },
  { n: "03", t: "International Internship", d: "6-month paid exposure in China, Mauritius, Dubai, Kuwait, India, Nepal.", icon: Globe },
  { n: "04", t: "100% Job Placement", d: "Prepare. Connect. Interview. Place. Grow. Our placement cell never sleeps.", icon: Briefcase },
  { n: "05", t: "Industry Connections", d: "Direct pipelines to Siddhartha Diyalo, Clark Resort, Sarovar Portico & more.", icon: Building2 },
  { n: "06", t: "Earn While You Learn", d: "Stipend-based internships where eligible. Professional discipline + income.", icon: Sparkles },
  { n: "07", t: "Global Career Pathways", d: "ADHM → Bachelor credit transfer to Canada, USA, Switzerland, UK, Australia & more.", icon: GraduationCap },
];

const PROGRAMS = [
  {
    id: "diploma",
    title: "Diploma in Hotel Management",
    duration: "9 Months Theory + Practical + 6 Months Internship",
    places: "China • Mauritius • Dubai • Kuwait • Nepal • India",
    points: ["Hotel operations core", "F&B service mastery", "Front office & housekeeping", "Internship stipend (eligible)"],
    img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
    color: "from-[#FBF6EC] to-white",
    accent: "bg-[#D4AF37]",
  },
  {
    id: "adhm",
    title: "Advance Diploma in Hotel Management",
    duration: "15 Months Theory + Practical + 6 Months Internship",
    places: "China • Mauritius • Dubai • Kuwait • Nepal • India",
    points: ["Advanced hospitality knowledge", "Leadership & supervision", "Bachelor pathway eligible", "Career support + placement"],
    img: "https://images.unsplash.com/photo-1551882547-b79c5d7dca89?q=80&w=1200&auto=format&fit=crop",
    color: "from-[#1B2A4A] to-[#111827]",
    accent: "bg-[#D4AF37]",
    dark: true,
  },
  {
    id: "barista",
    title: "Professional Barista",
    duration: "3-Month Basic + Latte Art / 1-Month Fast-Track",
    places: "Kathmandu Training Lab + Industry Exposure",
    points: ["Espresso science", "Milk texturing & latte art", "Cafe operations", "Barista placement support"],
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1200&auto=format&fit=crop",
    color: "from-[#FBF6EC] to-[#F3E5AB]/30",
    accent: "bg-[#D4AF37]",
  },
  {
    id: "kitchen",
    title: "Short-Term Kitchen Training",
    duration: "Fast Food • Basic Kitchen • Food Safety",
    places: "Professional Kitchen Labs",
    points: ["Knife skills & hygiene", "Station management", "Food safety & HACCP", "Basic cooking techniques"],
    img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop",
    color: "from-white to-[#FBF6EC]",
    accent: "bg-[#1B2A4A]",
  },
];

const DESTINATIONS = [
  { 
    name: "China", 
    country: "People's Republic of China",
    cities: "Beijing • Shanghai • Guangzhou", 
    lat: 35, 
    lng: 104, 
    flag: "🇨🇳", 
    hotels: "4★ & 5★ Partner Hotels",
    details: "6-Month International Internship Exposure in Partner Hotels (Subject to eligibility & visa)",
    roles: "Front Desk • F&B Service • Housekeeping Ops"
  },
  { 
    name: "Mauritius", 
    country: "Republic of Mauritius",
    cities: "Port Louis • Grand Baie • Belle Mare", 
    lat: -20.3, 
    lng: 57.6, 
    flag: "🇲🇺", 
    hotels: "Resort Exposure",
    details: "Hospitality Internship Opportunities in Partner Island Resorts (Subject to eligibility & visa)",
    roles: "Resort Guest Relations • Island F&B • Hospitality Ops"
  },
  { 
    name: "Dubai", 
    country: "United Arab Emirates (UAE)",
    cities: "Dubai City • Downtown • Palm Jumeirah", 
    lat: 25.2, 
    lng: 55.3, 
    flag: "🇦🇪", 
    hotels: "Luxury Hotel Networks",
    details: "Hospitality Practical Exposure & Training in Modern Luxury Hotels (Subject to eligibility & visa)",
    roles: "Concierge • Front Office • Event Operations"
  },
  { 
    name: "Kuwait", 
    country: "State of Kuwait",
    cities: "Kuwait City • Salmiya", 
    lat: 29.3, 
    lng: 47.5, 
    flag: "🇰🇼", 
    hotels: "Commercial Hotels",
    details: "Corporate Hospitality Internship Opportunities (Subject to eligibility & visa)",
    roles: "Food Service • Culinary Labs • Guest Services"
  },
  { 
    name: "India", 
    country: "Republic of India",
    cities: "Delhi NCR • Mumbai • Bengaluru", 
    lat: 20.6, 
    lng: 78.9, 
    flag: "🇮🇳", 
    hotels: "National Hotel Chains",
    details: "Metro Hotel Operational & Practical Hospitality Exposure",
    roles: "Kitchen Commis • Banquet Ops • Housekeeping"
  },
  { 
    name: "Nepal", 
    country: "Federal Democratic Republic of Nepal",
    cities: "Birgunj • Pokhara • Kathmandu", 
    lat: 27.7, 
    lng: 85.3, 
    flag: "🇳🇵", 
    hotels: "Home Base Networks",
    details: "Practical Hospitality Training & Local Hotel Exposure (Siddhartha Diyalo, Clark Resort & Sarovar Portico)",
    roles: "Lobby Ops • Professional Barista • F&B Operations"
  },
];

const BACHELOR = [
  { country: "Canada", flag: "🇨🇦", city: "Toronto, Vancouver" },
  { country: "USA", flag: "🇺🇸", city: "Multiple States" },
  { country: "Switzerland", flag: "🇨🇭", city: "Hospitality Capital" },
  { country: "Dubai / UAE", flag: "🇦🇪", city: "Dubai" },
  { country: "Scotland", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", city: "Edinburgh, Glasgow" },
  { country: "Australia", flag: "🇦🇺", city: "Sydney, Melbourne" },
  { country: "United Kingdom", flag: "🇬🇧", city: "London & Beyond" },
];

const HOTELS = [
  { name: "Siddhartha Diyalo", loc: "Birgunj", stars: "★★★★", img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=800&auto=format&fit=crop" },
  { name: "Clark Resort", loc: "Birgunj", stars: "★★★★", img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop" },
  { name: "Sarovar Portico", loc: "Birgunj", stars: "★★★★", img: "https://images.unsplash.com/photo-1551882547-b79c5d7dca89?q=80&w=800&auto=format&fit=crop" },
];

const PLACEMENTS = ["Dubai", "Romania", "USA", "Canada", "Bangkok / Thailand", "Birgunj", "Pokhara", "Kathmandu"];

const GALLERY = [
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

const TEAM_MEMBERS = [
  {
    name: "Er. Executive Director",
    role: "Executive Director",
    category: "Leadership",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    experience: "18+ Yrs Exp",
    badge: "Director",
    desc: "Oversees institutional vision, international MOUs, and strategic hotel partnerships across Asia and the Middle East.",
    highlights: ["Global Hotel MOUs", "Academic Governance", "Placement Supervision"]
  },
  {
    name: "Chef Culinary Director",
    role: "Executive Chef & Culinary Head",
    category: "Faculty",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
    experience: "15+ Yrs 5★ Exp",
    badge: "Executive Chef",
    desc: "Former 5-Star Executive Chef directing commercial kitchen labs, hygiene standards, and international cuisine practicals.",
    highlights: ["Kitchen Lab Ops", "HACCP & Safety", "Gourmet Culinary"]
  },
  {
    name: "Master Barista Trainer",
    role: "Head Barista & Mixology Specialist",
    category: "Faculty",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    experience: "SCA Certified",
    badge: "Barista Master",
    desc: "Leads latte art calibration, espresso extraction science, and beverage management in our professional barista lab.",
    highlights: ["Latte Art Mastery", "Cafe Management", "Espresso Science"]
  },
  {
    name: "Front Office Lead",
    role: "Front Desk & Guest Relations Head",
    category: "Faculty",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    experience: "12+ Yrs Resort Exp",
    badge: "Operations Lead",
    desc: "Trains students in mock lobby guest handling, property management software (PMS), and luxury service etiquette.",
    highlights: ["PMS Systems", "Concierge Ops", "Guest Etiquette"]
  },
  {
    name: "Global Placement Director",
    role: "Head of International Placement",
    category: "Placement",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    experience: "100% Placement",
    badge: "Placement Head",
    desc: "Connects Diploma and ADHM students with 6-month paid internships in China, Dubai, Mauritius, Kuwait, and Nepal.",
    highlights: ["Dubai & China Pipeline", "Stipend Coordination", "Visa Support"]
  },
  {
    name: "Senior Academic Counselor",
    role: "Admissions & Student Advisory Lead",
    category: "Advisory",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    experience: "Student Mentor",
    badge: "Admissions Lead",
    desc: "Provides career counseling, female scholarship guidance (20% discount), and Bachelor degree credit transfer options.",
    highlights: ["Girls Scholarship", "Career Counseling", "Degree Pathways"]
  }
];

const FAQS = [
  { q: "What is the minimum qualification?", a: "SLC / SEE or equivalent with minimum 1.6 GPA. We welcome career-switchers passionate about hospitality." },
  { q: "Does NcHM provide hostel facilities?", a: "No hostel facility available. NcHM currently does not provide on-campus hostel. Students can independently arrange accommodation near the college in Birgunj." },
  { q: "Are international internships available?", a: "Yes. 6-month internships in China, Mauritius, Dubai, Kuwait, Nepal, India for Diploma & ADHM programs, subject to eligibility and visa." },
  { q: "Can ADHM students continue to a Bachelor degree?", a: "Yes. ADHM graduates can apply for credit / advanced entry assessment to Bachelor programs. Transfer is subject to receiving university policies, eligibility and academic assessment." },
  { q: "Which countries offer Bachelor pathway opportunities?", a: "Canada, USA, Switzerland, Dubai/UAE, Scotland, Australia, United Kingdom — via partner universities and credit transfer assessment." },
  { q: "Does NcHM provide job placement?", a: "Yes. 100% job placement support — Prepare, Connect, Interview, Place, Grow. Placements in Nepal and global markets." },
  { q: "Is there a scholarship for girls?", a: "Yes. 20% tuition discount for eligible female students. Terms and eligibility apply. Contact admissions for details." },
  { q: "What short-term courses are available?", a: "Professional Barista (3-month with latte art & 1-month fast-track) and Short-Term Kitchen Training (fast food, basic kitchen, hygiene, food safety)." },
];

const JOURNEY_STEPS = [
  { n: "01", t: "Choose Your Program", d: "Select from Diploma (9+6), ADHM (15+6), Professional Barista, or Kitchen Training based on your career goals.", sub: "Personalized Counseling • Enrollment", icon: BookOpen },
  { n: "02", t: "Learn", d: "Master hospitality principles under expert faculty and industry-veteran GMs in our Birgunj campus.", sub: "70% Practical • Theory Foundations", icon: GraduationCap },
  { n: "03", t: "Practice", d: "Hands-on daily training in mock hotel rooms, front desk lobbies, commercial kitchens & barista labs.", sub: "Real Equipment • Skill Calibration", icon: Compass },
  { n: "04", t: "Intern", d: "6-month paid/stipend international internship in luxury 4★ and 5★ partner hotels across China, Mauritius, Dubai, Kuwait & Nepal.", sub: "Global Hospitality Exposure", icon: Globe },
  { n: "05", t: "Earn", d: "Gain financial independence and earn stipends while getting invaluable professional work experience.", sub: "Professional Demeanor • Stipends", icon: Sparkles },
  { n: "06", t: "Get Placed", d: "Direct interview pipelines and 100% job placement support in Nepal, Middle East, Europe & Asia.", sub: "Placement Cell • 100% Guarantee", icon: Briefcase },
  { n: "07", t: "Go Global", d: "Transfer credit hours to top Bachelor programs in Canada, USA, UK, Switzerland, Australia & launch an international management career.", sub: "Credit Transfer • Degree Pathways", icon: Building2 },
];

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCountUp(to: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0, start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / 1200, 1);
      setVal(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, active]);
  return val;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeProg, setActiveProg] = useState(PROGRAMS[0].id);
  const [activeDest, setActiveDest] = useState("Dubai");
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  // Active Journey Step State
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

  // Application Modal & Form states
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgramForModal, setSelectedProgramForModal] = useState("Diploma in Hotel Management");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    qualification: "SEE / SLC (Minimum 1.6 GPA)",
    message: ""
  });

  // Lightbox Modal state
  const [lightboxImg, setLightboxImg] = useState<{ img: string; cat: string; title: string } | null>(null);

  const activeProgram = useMemo(() => PROGRAMS.find(p => p.id === activeProg)!, [activeProg]);
  const activeDestinationObj = useMemo(() => DESTINATIONS.find(d => d.name === activeDest) || DESTINATIONS[0], [activeDest]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const statsInView = useInView(0.3);
  const c20 = useCountUp(20, statsInView.inView);

  useEffect(() => {
    const id = setInterval(() => setTestimonialIdx(i => (i + 1) % 3), 4500);
    return () => clearInterval(id);
  }, []);

  const openApplyModal = (progTitle?: string) => {
    if (progTitle) {
      setSelectedProgramForModal(progTitle);
    }
    setFormSubmitted(false);
    setModalOpen(true);
  };

  const getWhatsAppMessage = () => {
    return `🎓 *NEW ADMISSION ENQUIRY - NcHM Nepal* 🎓\n\n` +
      `👤 *Full Name:* ${formData.fullName}\n` +
      `📱 *Phone / WhatsApp:* ${formData.phone}\n` +
      `✉️ *Email:* ${formData.email || "Not provided"}\n` +
      `📚 *Program Interested:* ${selectedProgramForModal}\n` +
      `🎓 *Qualification:* ${formData.qualification}\n` +
      `💬 *Message / Questions:* ${formData.message || "None"}\n\n` +
      `_Sent via NcHM Official Website Admission Portal_`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Open WhatsApp directly with formatted content
    const messageText = getWhatsAppMessage();
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    window.open(waUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFFCF6]">
        <div className="relative flex flex-col items-center">
          <div className="absolute -inset-16 rounded-full bg-[#D4AF37]/15 blur-2xl animate-pulse" />
          <div className="animate-[float_2s_ease-in-out_infinite]">
            <NcHMLogo size="hero" />
          </div>
          <p className="mt-6 text-[12px] uppercase tracking-[0.25em] text-[#1B2A4A] font-semibold">Initializing 3D Hospitality World...</p>
        </div>
        <div className="mt-6 h-[2px] w-32 overflow-hidden rounded-full bg-[#EDE7DB]">
          <div className="h-full w-full origin-left animate-[shimmer_1s_ease-in-out_infinite] bg-[#D4AF37]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFCF6] text-[#1B2A4A] relative">
      {/* Gold/Navy Top Bar */}
      <div className="relative z-50 w-full bg-[#1B2A4A] text-white">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 py-2 text-[11px] uppercase tracking-[0.16em] sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-2 w-2 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="text-[#D4AF37] font-bold">Est. 2018 AD</span>
            <span className="hidden sm:inline text-white/50">•</span>
            <span className="hidden sm:inline">Birgunj, Nepal</span>
            <span className="text-white/50">•</span>
            <span className="font-semibold">Learn. Work. Intern. Earn. Go Global.</span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
            <span className="text-white/70">Admissions Open 2026</span>
            <button onClick={() => openApplyModal()} className="rounded-full bg-[#D4AF37] px-3.5 py-1 text-[10px] font-bold text-black transition hover:brightness-110">Apply Now →</button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? "border-[#EDE7DB] bg-[#FFFCF6]/95 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(27,42,74,0.06)]" : "border-transparent bg-[#FFFCF6] py-5"}`}>
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 sm:px-6">
          <NcHMLogo />
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map(n => (
              <a key={n} href={`#${n.toLowerCase().replace(/\s+/g, "-")}`} className="group relative text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1B2A4A]/70 transition hover:text-[#1B2A4A]">
                {n}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#D4AF37] transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <button onClick={() => openApplyModal()} className="rounded-full border border-[#1B2A4A]/20 px-4 py-2 text-[13px] font-semibold transition hover:border-[#1B2A4A] hover:bg-[#1B2A4A]/5">Talk to Counselor</button>
            <button onClick={() => openApplyModal()} className="rounded-full bg-[#1B2A4A] px-5 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_20px_rgba(27,42,74,0.2)] transition hover:bg-black">Apply Now</button>
          </div>
          <button onClick={() => setMobileOpen(v => !v)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1B2A4A]/20 lg:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-[#EDE7DB] bg-[#FFFCF6] px-4 py-6 lg:hidden shadow-xl">
            <div className="grid gap-3">
              {NAV.map(n => (
                <a key={n} onClick={() => setMobileOpen(false)} href={`#${n.toLowerCase().replace(/\s+/g, "-")}`} className="rounded-xl bg-[#FBF6EC] px-4 py-3 text-sm font-semibold text-[#1B2A4A]">{n}</a>
              ))}
              <button onClick={() => { setMobileOpen(false); openApplyModal(); }} className="mt-2 rounded-full bg-[#1B2A4A] py-3 text-center text-sm font-semibold text-white">Apply Now</button>
            </div>
          </div>
        )}
      </header>

      {/* HERO WITH THREE.JS 3D SCENE */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-[-10%] h-[80%] w-[120%] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FBF6EC] via-[#F3E5AB]/10 to-transparent blur-[50px]" />
          <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[65%]">
            <Interactive3DScene mode="hero" />
          </div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7 lg:pr-6 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#1B2A4A] shadow-sm">
              <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
              Nepal College of Hospitality Management • Est. 2018
            </div>

            <h1 className="mt-6 font-display text-[46px] font-[400] leading-[0.92] tracking-[-0.03em] sm:text-[68px] lg:text-[80px] text-[#1B2A4A]">
              Learn. Work.<br />
              <span className="relative inline-block text-[#D4AF37]">
                Intern.
                <span className="absolute bottom-1 left-0 h-[8px] w-full bg-[#D4AF37]/20 -rotate-1" />
              </span>{" "}
              Earn.<br />
              <span className="font-[400] italic text-[#1B2A4A]">Go Global.</span>
            </h1>

            <p className="mt-6 max-w-[48ch] text-[18px] leading-relaxed text-[#6B6560]">
              Industry-focused hospitality education with practical training, international internship opportunities in China, Mauritius, Dubai, Kuwait, career support and global Bachelor pathways.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={() => openApplyModal()} className="group relative overflow-hidden rounded-full bg-[#1B2A4A] px-8 py-4 text-[14px] font-semibold text-white shadow-[0_10px_25px_rgba(27,42,74,0.3)]">
                <span className="relative z-10 flex items-center gap-2">Start Your Journey <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
                <span className="absolute inset-0 -translate-x-full bg-[#D4AF37] transition group-hover:translate-x-0" />
              </button>
              <a href="#programs" className="rounded-full border border-[#1B2A4A]/30 px-8 py-4 text-[14px] font-semibold transition hover:border-[#1B2A4A] hover:bg-[#1B2A4A]/5">Explore Programs</a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-[#EDE7DB] pt-6 sm:max-w-[480px]">
              {[
                { k: "9+6 / 15+6", l: "Months Diploma / ADHM" },
                { k: "6 Countries", l: "Global Internships" },
                { k: "100%", l: "Job Placement Support" },
              ].map(s => (
                <div key={s.k}>
                  <div className="font-display text-[22px] font-bold text-[#1B2A4A]">{s.k}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-[#6B6560]">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[440px] rounded-[32px] border border-[#D4AF37]/40 bg-white/80 p-8 shadow-[0_30px_90px_rgba(27,42,74,0.15)] backdrop-blur-xl">
              <div className="absolute -top-6 -right-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#1B2A4A] text-[#D4AF37] shadow-xl border-2 border-[#D4AF37]">
                <Award className="h-10 w-10" />
              </div>
              <NcHMLogo size="large" />
              <div className="mt-6 space-y-4 border-t border-[#EDE7DB] pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FBF6EC] text-[#D4AF37]">🏨</div>
                  <div>
                    <div className="font-semibold text-[14px]">Luxury Hotel Training</div>
                    <div className="text-[12px] text-[#6B6560]">Mock lobby, F&B and housekeeping labs</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FBF6EC] text-[#D4AF37]">☕</div>
                  <div>
                    <div className="font-semibold text-[14px]">Professional Barista Lab</div>
                    <div className="text-[12px] text-[#6B6560]">3-month & 1-month fast track courses</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FBF6EC] text-[#D4AF37]">🌍</div>
                  <div>
                    <div className="font-semibold text-[14px]">Global Career Pathways</div>
                    <div className="text-[12px] text-[#6B6560]">China, Mauritius, Dubai, Kuwait, Canada & more</div>
                  </div>
                </div>
              </div>
              <div className="mt-8 rounded-2xl bg-[#1B2A4A] p-4 text-center text-white">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#D4AF37]">Official Motto</div>
                <div className="mt-1 font-display text-[18px]">Learn. Work. Intern. Earn. Go Global.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsInView.ref} className="relative bg-[#1B2A4A] py-16 text-white">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-[1px] bg-white/10 px-4 sm:px-6 lg:grid-cols-6">
          {STATS.map(s => (
            <div key={s.k} className="bg-[#1B2A4A] p-6 transition hover:bg-[#142038]">
              <div className="font-display text-[38px] leading-none text-[#D4AF37]">{s.k === "20%" ? `${c20}%` : s.k}</div>
              <div className="mt-3 text-[13px] font-bold leading-tight">{s.v}</div>
              <div className="mt-1 text-[11px] text-white/60">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY NCHM */}
      <section id="about" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Why NcHM?</div>
            <h2 className="mt-3 font-display text-[40px] leading-[0.95] sm:text-[56px] text-[#1B2A4A]">More Than Education.<br />A Career Journey.</h2>
          </div>
          <p className="max-w-[42ch] text-[15px] leading-relaxed text-[#6B6560]">Hospitality education designed with hotel GMs and industry leaders. 70% practical training from day one.</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY.map(card => {
            const IconComponent = card.icon;
            return (
              <div key={card.n} className="group relative rounded-[24px] border border-[#EDE7DB] bg-white p-8 transition duration-300 hover:-translate-y-1.5 hover:border-[#D4AF37] hover:shadow-[0_20px_40px_rgba(27,42,74,0.08)]">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1B2A4A] text-[#D4AF37] shadow-md transition group-hover:scale-110">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="font-display text-[16px] font-bold text-[#D4AF37]">{card.n}</div>
                </div>
                <h3 className="mt-6 font-display text-[24px] leading-tight text-[#1B2A4A]">{card.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-[#6B6560]">{card.d}</p>
                <div className="mt-6 h-[2px] w-0 bg-[#D4AF37] transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </section>

      {/* PROGRAMS */}
      <section id="programs" className="border-y border-[#EDE7DB] bg-[#FBF6EC]/50 py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Academic Programs</div>
              <h2 className="mt-3 font-display text-[40px] leading-[0.95] sm:text-[56px] text-[#1B2A4A]">Choose Your Hospitality Career</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {PROGRAMS.map(p => (
                <button key={p.id} onClick={() => setActiveProg(p.id)} className={`rounded-full px-5 py-2.5 text-[13px] font-bold transition ${activeProg === p.id ? "bg-[#1B2A4A] text-white shadow-md" : "border border-[#EDE7DB] bg-white text-[#1B2A4A] hover:border-[#1B2A4A]"}`}>{p.title.split(" ")[0]}</button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className={`relative overflow-hidden rounded-[32px] border border-[#EDE7DB] bg-gradient-to-br ${activeProgram.color} p-[1px] shadow-xl`}>
                <div className={`rounded-[30px] p-8 ${activeProgram.dark ? "bg-[#1B2A4A] text-white" : "bg-white text-[#1B2A4A]"}`}>
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />
                    <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${activeProgram.dark ? "text-white/70" : "text-[#6B6560]"}`}>Featured Curriculum</span>
                  </div>
                  <h3 className="mt-4 font-display text-[34px] leading-[0.95]">{activeProgram.title}</h3>
                  <div className={`mt-3 inline-flex rounded-full px-3.5 py-1.5 text-[12px] font-medium ${activeProgram.dark ? "bg-white/10 text-white" : "bg-[#FBF6EC] text-[#1B2A4A]"}`}>{activeProgram.duration}</div>
                  <div className={`mt-3 text-[13px] font-medium ${activeProgram.dark ? "text-white/70" : "text-[#6B6560]"}`}>Internship Destinations: {activeProgram.places}</div>
                  <ul className="mt-6 space-y-3">
                    {activeProgram.points.map(pt => (
                      <li key={pt} className="flex items-center gap-3 text-[14px]">
                        <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex gap-4">
                    <button onClick={() => openApplyModal(activeProgram.title)} className={`rounded-full px-6 py-3 text-[13px] font-bold transition ${activeProgram.dark ? "bg-[#D4AF37] text-black hover:brightness-110" : "bg-[#1B2A4A] text-white hover:bg-black"}`}>Apply For {activeProgram.id.toUpperCase()} →</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid gap-4 sm:grid-cols-2">
              {PROGRAMS.map(p => (
                <button key={p.id} onClick={() => setActiveProg(p.id)} className={`group relative overflow-hidden rounded-[24px] border text-left transition duration-300 ${activeProg === p.id ? "border-[#1B2A4A] shadow-[0_20px_40px_rgba(27,42,74,0.15)] ring-2 ring-[#D4AF37]" : "border-[#EDE7DB] hover:border-[#D4AF37]"}`}>
                  <img src={p.img} alt={p.title} className="h-[240px] w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/80 via-[#1B2A4A]/20 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#D4AF37]">{p.duration.split(" ")[0]} Program</div>
                    <div className="mt-1 font-display text-[22px] leading-tight">{p.title}</div>
                  </div>
                  {activeProg === p.id && <div className="absolute right-4 top-4 rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-bold text-black shadow-md">Active</div>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL INTERNSHIP & GLOBE */}
      <section id="global-opportunities" className="relative overflow-hidden bg-[#1B2A4A] py-20 text-white lg:py-28">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `radial-gradient(#D4AF37 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex rounded-full bg-[#D4AF37]/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Global Opportunities</div>
              <h2 className="mt-4 font-display text-[42px] leading-[0.95] sm:text-[58px]">Take Your Classroom to the World</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70">From Nepal to the world — 6-month paid/stipend internships in luxury 4★ and 5★ partner hotels across China, Mauritius, Dubai, Kuwait, India, and Nepal.</p>

              <div className="mt-8 grid gap-3">
                {DESTINATIONS.map(d => (
                  <button key={d.name} onClick={() => setActiveDest(d.name)} className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition ${activeDest === d.name ? "border-[#D4AF37] bg-white/10 shadow-lg ring-1 ring-[#D4AF37]" : "border-white/10 hover:border-white/30"}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-[24px]">{d.flag}</span>
                      <div>
                        <div className="text-[15px] font-bold flex flex-wrap items-center gap-2">
                          <span>{d.name}</span>
                          <span className="text-[12px] font-normal text-[#D4AF37]">({d.cities})</span>
                        </div>
                        <div className="text-[12px] text-white/60 mt-0.5">{d.hotels}</div>
                      </div>
                    </div>
                    <span className={`h-3 w-3 rounded-full ${activeDest === d.name ? "bg-[#D4AF37] shadow-[0_0_12px_#D4AF37]" : "bg-white/20"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-[32px] border border-[#D4AF37]/30 bg-[#121A2D] shadow-2xl">
                <div className="relative aspect-[4/3] w-full">
                  <Interactive3DScene activeDestName={activeDest} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-6 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                        <span>Destination Pathway</span> • <span>{activeDestinationObj.country}</span>
                      </div>
                      <div className="mt-1 font-display text-[26px] sm:text-[32px] leading-tight text-white flex flex-wrap items-center gap-3">
                        <span>{activeDestinationObj.flag}</span>
                        <span>{activeDestinationObj.name}</span>
                        <span className="text-[15px] font-sans font-normal text-[#F3E5AB]">({activeDestinationObj.cities})</span>
                      </div>
                      <p className="mt-2 text-[13px] text-white/80 max-w-[50ch] leading-relaxed">
                        {activeDestinationObj.details}
                      </p>
                      <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-[11px] text-[#D4AF37]">
                        <span className="text-white/60">Training Areas:</span> <strong>{activeDestinationObj.roles}</strong>
                      </div>
                    </div>
                    <div className="hidden rounded-full bg-[#D4AF37] px-4 py-2 text-[12px] font-bold text-black sm:block shrink-0 shadow-md">
                      International Pathway
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BACHELOR CREDIT TRANSFER */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Global Pathways</div>
              <h2 className="mt-3 font-display text-[40px] leading-[0.95] sm:text-[52px] text-[#1B2A4A]">Your Diploma Can Be the Beginning</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#6B6560]">Continue your hospitality education globally. ADHM at NcHM → Credit Assessment → Bachelor → International Study → Global Hospitality Career.</p>
              <div className="mt-6 rounded-2xl border border-amber-200 bg-[#FBF6EC] p-5 text-[12px] leading-relaxed text-[#7A5A2A]">
                ⚠️ <strong>Important Notice:</strong> Credit transfer / advanced entry is subject to receiving university policies, eligibility, academic assessment and institutional requirements.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative pl-6 sm:pl-8">
              <div className="absolute left-[23px] sm:left-[31px] top-0 h-full w-[2px] bg-[#EDE7DB]" />
              <div className="absolute left-[23px] sm:left-[31px] top-0 h-[35%] w-[2px] bg-[#D4AF37]" />
              
              <div className="space-y-8">
                {[
                  { t: "ADHM at NcHM", d: "15 months theory + practical + 6 months internship. Strong academic + practical foundation." },
                  { t: "Credit / Advanced Entry Assessment", d: "Transcripts, internship proof, practical hours evaluated by receiving university." },
                  { t: "Bachelor Program", d: "Hospitality / Hotel Management bachelor — advanced standing where approved." },
                  { t: "International Study", d: "Study in Canada, USA, Switzerland, Dubai/UAE, Scotland, Australia, UK." },
                  { t: "Global Hospitality Career", d: "Management roles in luxury hotels, resorts, cruise, aviation hospitality." },
                ].map((s, i) => (
                  <div key={s.t} className="relative flex gap-6 items-start">
                    <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 font-display text-[16px] font-bold ${i === 0 ? "border-[#1B2A4A] bg-[#1B2A4A] text-white shadow-md" : "border-[#EDE7DB] bg-white text-[#1B2A4A]"}`}>{i + 1}</div>
                    <div className="flex-1 rounded-[24px] border border-[#EDE7DB] bg-white p-6 shadow-[0_10px_30px_rgba(27,42,74,0.04)]">
                      <div className="font-display text-[22px] text-[#1B2A4A]">{s.t}</div>
                      <div className="mt-2 text-[14px] text-[#6B6560] leading-relaxed">{s.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {BACHELOR.map(b => (
                <div key={b.country} className="rounded-2xl border border-[#EDE7DB] bg-[#FBF6EC]/50 p-5 transition hover:border-[#D4AF37]">
                  <div className="text-[24px]">{b.flag}</div>
                  <div className="mt-2 font-bold text-[15px] text-[#1B2A4A]">{b.country}</div>
                  <div className="text-[12px] text-[#6B6560]">{b.city}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOTEL PARTNERSHIPS */}
      <section className="border-y border-[#EDE7DB] bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Industry Partnerships</div>
              <h2 className="mt-3 font-display text-[40px] leading-[0.95] sm:text-[48px] text-[#1B2A4A]">Connected With the Hospitality Industry</h2>
              <p className="mt-3 text-[15px] text-[#6B6560]">Industry exposure starts before graduation. MOUs and relationships with multiple 3–4 star hotels.</p>
            </div>
            <div className="rounded-full border border-[#D4AF37]/40 bg-[#FBF6EC] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-[#1B2A4A]">NcHM ↔ Partner Hotels</div>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {HOTELS.map(h => (
              <div key={h.name} className="group overflow-hidden rounded-[28px] border border-[#EDE7DB] bg-[#FFFCF6] shadow-sm transition hover:shadow-xl">
                <div className="relative h-[240px] overflow-hidden">
                  <img src={h.img} alt={h.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 rounded-full bg-white px-3.5 py-1 text-[12px] font-bold shadow-md text-[#1B2A4A]">{h.stars}</div>
                </div>
                <div className="p-6">
                  <div className="font-display text-[24px] text-[#1B2A4A]">{h.name}</div>
                  <div className="mt-1 text-[13px] font-medium text-[#6B6560]">{h.loc} • MOU Partner Hotel</div>
                  <div className="mt-6 h-[2px] w-full bg-[#EDE7DB] relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-1/2 bg-[#D4AF37] animate-[shimmer_2s_ease-in-out_infinite]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 100% JOB PLACEMENT */}
      <section id="career" className="relative overflow-hidden bg-[#1B2A4A] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6">
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Career Guarantee</div>
              <h2 className="mt-4 font-display text-[56px] leading-[0.85] sm:text-[84px]">100%<br /><span className="text-[#D4AF37]">Job Placement</span></h2>
              <p className="mt-4 text-[16px] text-white/70">Prepare. Connect. Interview. Place. Grow.</p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { s: "Student", d: "Enroll & orient" },
                  { s: "Training", d: "Practical labs" },
                  { s: "Internship", d: "6 months industry" },
                  { s: "Interview", d: "Placement cell" },
                  { s: "Placement", d: "Hotel / resort / cafe" },
                  { s: "Career Growth", d: "Supervisor → Manager" },
                ].map((step, i) => (
                  <div key={step.s} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D4AF37] text-[13px] font-bold text-black">{i + 1}</div>
                      <div className="font-bold text-[15px]">{step.s}</div>
                    </div>
                    <div className="mt-2 text-[12px] text-white/60">{step.d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-[32px] border border-white/10 bg-[#121A2D] p-8 shadow-2xl">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Active Placements</div>
                  <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-bold text-black">Live Cell</span>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    { role: "Front Office Associate", hotel: "4★ Hotel, Dubai", status: "Placed" },
                    { role: "Barista Lead", hotel: "Specialty Cafe, Kathmandu", status: "Placed" },
                    { role: "Commis Chef", hotel: "Clark Resort, Birgunj", status: "Placed" },
                    { role: "F&B Service", hotel: "Mauritius Resort", status: "Intern → Job" },
                  ].map(r => (
                    <div key={r.role} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-[18px]">🎖️</div>
                        <div>
                          <div className="text-[14px] font-bold">{r.role}</div>
                          <div className="text-[12px] text-white/60">{r.hotel}</div>
                        </div>
                      </div>
                      <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300">{r.status}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-2xl bg-[#D4AF37]/10 p-5 text-[13px] leading-relaxed text-[#F3E5AB] border border-[#D4AF37]/30">
                  NcHM guarantees comprehensive career support — combining rigorous training, verified international internships, and direct interview pipelines until placement.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL PLACEMENT + EARN WHILE YOU LEARN */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Global Locations</div>
            <h2 className="mt-3 font-display text-[40px] leading-[0.95] sm:text-[48px] text-[#1B2A4A]">Your Career Can Go Global</h2>
            <p className="mt-3 text-[15px] text-[#6B6560]">Graduates placed across Dubai, Romania, USA, Canada, Bangkok, Birgunj, Pokhara and Kathmandu.</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PLACEMENTS.map(p => (
                <div key={p} className="rounded-full border border-[#EDE7DB] bg-white px-4 py-3 text-center text-[13px] font-bold text-[#1B2A4A] shadow-sm">{p}</div>
              ))}
            </div>
            <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[28px] border border-[#EDE7DB] bg-[#121A2D]">
              <Interactive3DScene />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-[32px] border border-[#EDE7DB] bg-[#1B2A4A] p-8 text-white sm:p-10 shadow-xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Financial Independence</div>
              <h3 className="mt-3 font-display text-[36px] leading-[0.95] sm:text-[44px]">Earn While You Learn</h3>
              <p className="mt-3 text-[14px] text-white/70">Study + Practice + Experience + Earn</p>

              <div className="mt-8 space-y-3">
                {[
                  "Real-world experience in operational hotels",
                  "Workplace discipline and professional demeanor",
                  "Confidence in guest handling and international service",
                  "Communication and leadership fluency",
                  "Income-generating opportunities where eligible during internships",
                ].map(b => (
                  <div key={b} className="flex items-start gap-3 text-[14px]">
                    <CheckCircle2 className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3">
                {[
                  { k: "Classroom", v: "Learn" },
                  { k: "Hotel Lab", v: "Practice" },
                  { k: "Internship", v: "Earn" },
                ].map(s => (
                  <div key={s.k} className="rounded-2xl bg-white/5 p-4 text-center border border-white/10">
                    <div className="text-[11px] uppercase tracking-[0.15em] text-white/50">{s.k}</div>
                    <div className="mt-1 font-display text-[18px] text-[#D4AF37]">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIP + ADMISSION */}
      <section id="admission" className="border-y border-[#EDE7DB] bg-[#FBF6EC] py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-[32px] bg-[#1B2A4A] p-10 text-white shadow-2xl relative overflow-hidden border border-[#D4AF37]/40 h-full flex flex-col justify-between">
                <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Empowering Women</div>
                  <div className="mt-4 font-display text-[84px] leading-[0.8] text-[#D4AF37]">20%</div>
                  <div className="mt-3 font-display text-[32px] leading-tight">Scholarship for Girls</div>
                  <p className="mt-4 text-[14px] leading-relaxed text-white/80">Special tuition discount for eligible female students. Championing diversity and leadership in international hospitality.</p>
                </div>
                <div className="mt-8 inline-flex rounded-full bg-[#D4AF37] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-black self-start">Terms & eligibility apply</div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-[32px] border border-[#EDE7DB] bg-white p-8 sm:p-10 shadow-xl">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Admissions 2026</div>
                <h3 className="mt-3 font-display text-[40px] leading-[0.95] text-[#1B2A4A]">Start Your Hospitality Journey</h3>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#FBF6EC] p-6 border border-[#EDE7DB]">
                    <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6B6560]">Minimum Qualification</div>
                    <div className="mt-2 font-display text-[22px] text-[#1B2A4A]">SLC / SEE or Equivalent</div>
                  </div>
                  <div className="rounded-2xl bg-[#1B2A4A] p-6 text-white">
                    <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">Academic Requirement</div>
                    <div className="mt-2 font-display text-[22px] text-[#D4AF37]">Minimum 1.6 GPA</div>
                  </div>
                </div>

                <div className="mt-10">
                  <div className="text-[13px] font-bold uppercase tracking-[0.15em] text-[#1B2A4A]">Admission Workflow</div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {["Enquiry", "Counseling", "Eligibility Check", "Application", "Admission", "Orientation", "Begin Journey"].map((step, i) => (
                      <div key={step} className="flex items-center gap-2">
                        <div className="rounded-full border border-[#EDE7DB] bg-white px-3.5 py-2 text-[12px] font-semibold text-[#1B2A4A] shadow-sm">{step}</div>
                        {i < 6 && <ChevronRight className="h-4 w-4 text-[#D4AF37]" />}
                      </div>
                    ))}
                  </div>
                </div>

                {/* NO HOSTEL NOTICE */}
                <div className="mt-8 rounded-2xl border border-amber-300 bg-[#FFFDF9] p-5 shadow-sm">
                  <div className="flex gap-4 items-start">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white font-bold">!</div>
                    <div>
                      <div className="font-bold text-[15px] text-[#1B2A4A]">No Hostel Facility Available</div>
                      <div className="mt-1 text-[13px] leading-relaxed text-[#6B6560]">
                        NcHM currently does not provide an on-campus hostel facility. Students requiring accommodation can independently arrange suitable accommodation near the college in Birgunj.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button onClick={() => openApplyModal()} className="rounded-full bg-[#1B2A4A] px-8 py-3.5 text-[14px] font-bold text-white shadow-md hover:bg-black transition">Apply Now</button>
                  <button onClick={() => openApplyModal()} className="rounded-full border border-[#1B2A4A]/30 px-8 py-3.5 text-[14px] font-semibold hover:border-[#1B2A4A] transition">Talk to Counselor</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT JOURNEY INTERACTIVE PIPELINE */}
      <section id="journey" className="relative overflow-hidden bg-[#1B2A4A] py-20 text-white lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                Step-by-Step Story
              </div>
              <h2 className="mt-4 font-display text-[40px] leading-[0.95] sm:text-[56px]">
                Your Journey With NcHM
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setActiveJourneyStep(s => Math.max(0, s - 1))}
                disabled={activeJourneyStep === 0}
                aria-label="Previous step"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={() => setActiveJourneyStep(s => Math.min(JOURNEY_STEPS.length - 1, s + 1))}
                disabled={activeJourneyStep === JOURNEY_STEPS.length - 1}
                aria-label="Next step"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* STEPPER PROGRESS TRACK */}
          <div className="relative mt-12 mb-8 hidden md:block">
            <div className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-white/15" />
            <div 
              className="absolute left-0 top-1/2 h-[2px] -translate-y-1/2 bg-[#D4AF37] transition-all duration-500" 
              style={{ width: `${(activeJourneyStep / (JOURNEY_STEPS.length - 1)) * 100}%` }}
            />

            <div className="relative flex justify-between">
              {JOURNEY_STEPS.map((step, idx) => {
                const isActive = idx === activeJourneyStep;
                const isPassed = idx < activeJourneyStep;
                return (
                  <button
                    key={step.n}
                    onClick={() => setActiveJourneyStep(idx)}
                    className="group flex flex-col items-center gap-2 focus:outline-none"
                  >
                    <div 
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-bold transition-all duration-300 ${
                        isActive 
                          ? "bg-[#D4AF37] text-black shadow-[0_0_15px_#D4AF37] scale-110" 
                          : isPassed 
                          ? "bg-white text-[#1B2A4A]" 
                          : "border border-white/20 bg-[#121A2D] text-white/60 hover:border-white/50"
                      }`}
                    >
                      {step.n}
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.1em] transition ${isActive ? "text-[#D4AF37]" : "text-white/50 group-hover:text-white"}`}>
                      {step.t.split(" ")[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ACTIVE STEP FEATURED CARD & DECK CAROUSEL */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 items-stretch">
            {/* Featured Highlight Card */}
            <div className="lg:col-span-5 flex">
              <div className="w-full rounded-[32px] border border-[#D4AF37]/40 bg-gradient-to-br from-[#121A2D] to-[#0D1322] p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#D4AF37]/10 blur-2xl" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37] text-[18px] font-bold text-black shadow-lg">
                      {JOURNEY_STEPS[activeJourneyStep].n}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#D4AF37]">
                      Stage {activeJourneyStep + 1} of 7
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[36px] leading-[0.95]">
                    {JOURNEY_STEPS[activeJourneyStep].t}
                  </h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                    {JOURNEY_STEPS[activeJourneyStep].d}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-white/60">
                    {JOURNEY_STEPS[activeJourneyStep].sub}
                  </span>
                  <button 
                    onClick={() => openApplyModal(JOURNEY_STEPS[activeJourneyStep].t)}
                    className="rounded-full bg-[#D4AF37] px-4 py-2 text-[12px] font-bold text-black transition hover:brightness-110 flex items-center gap-1.5"
                  >
                    Start Step →
                  </button>
                </div>
              </div>
            </div>

            {/* Horizontal Deck Grid / Scrollable Cards */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {JOURNEY_STEPS.map((step, idx) => {
                  const isActive = idx === activeJourneyStep;
                  const IconComp = step.icon;
                  return (
                    <button
                      key={step.n}
                      onClick={() => setActiveJourneyStep(idx)}
                      className={`group text-left rounded-[24px] border p-5 transition duration-300 ${
                        isActive 
                          ? "border-[#D4AF37] bg-white/10 shadow-[0_10px_30px_rgba(212,175,55,0.15)] ring-1 ring-[#D4AF37]" 
                          : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition ${isActive ? "bg-[#D4AF37] text-black" : "bg-white/10 text-[#D4AF37]"}`}>
                            <IconComp className="h-4 w-4" />
                          </div>
                          <span className="font-display text-[16px] font-bold text-[#D4AF37]">{step.n}</span>
                        </div>
                        {isActive && <span className="h-2 w-2 rounded-full bg-[#D4AF37] shadow-[0_0_8px_#D4AF37]" />}
                      </div>
                      <div className="mt-4 font-display text-[20px] leading-tight">{step.t}</div>
                      <div className="mt-1 line-clamp-2 text-[12px] text-white/60">{step.d}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM & FACILITIES */}
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Career Pathways</div>
            <h2 className="mt-3 font-display text-[36px] leading-[0.95] sm:text-[48px] text-[#1B2A4A]">Three Ways to Grow. One Global Future.</h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { title: "Diploma Track", steps: ["Diploma", "Internship", "Entry-Level Job", "Experience", "Career Growth"] },
                { title: "Advance Diploma Track", steps: ["ADHM", "Internship", "Job / Career", "Bachelor Pathway", "International Career"] },
                { title: "Short-Term Track", steps: ["Barista / Kitchen", "Practical Skills", "Industry Experience", "Employment Opportunities"] },
              ].map(path => (
                <div key={path.title} className="rounded-[24px] border border-[#EDE7DB] bg-white p-6 shadow-sm">
                  <div className="font-bold text-[16px] text-[#1B2A4A]">{path.title}</div>
                  <div className="mt-6 space-y-3">
                    {path.steps.map((s, i) => (
                      <div key={s} className="flex items-center gap-3 text-[13px] font-medium text-[#6B6560]">
                        <div className="h-6 w-6 rounded-full bg-[#FBF6EC] flex items-center justify-center text-[11px] font-bold text-[#1B2A4A] border border-[#EDE7DB]">{i + 1}</div>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-[28px] border border-[#EDE7DB] bg-[#FBF6EC] p-8">
              <div className="font-display text-[26px] text-[#1B2A4A]">Campus & Facilities</div>
              <div className="mt-6 grid grid-cols-2 gap-2 text-[12px] font-medium">
                {["Training Rooms", "Practical Areas", "Kitchen Labs", "Barista Area", "Classrooms", "Demo Areas", "Counseling", "Industry Interaction"].map(f => (
                  <div key={f} className="rounded-xl bg-white px-4 py-3 text-center border border-[#EDE7DB] text-[#1B2A4A] shadow-sm">{f}</div>
                ))}
              </div>
              <div className="mt-6 aspect-[16/10] overflow-hidden rounded-2xl shadow-md">
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop" alt="Facilities" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* DEDICATED LEADERSHIP & FACULTY TEAM SECTION */}
      <section id="team" className="border-t border-[#EDE7DB] bg-[#FBF6EC]/70 py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
                Leadership & Faculty
              </div>
              <h2 className="mt-3 font-display text-[40px] leading-[0.95] sm:text-[56px] text-[#1B2A4A]">
                Meet Our Expert Team
              </h2>
              <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-[#6B6560]">
                Guided by 5-star hotel GMs, international executive chefs, certified barista masters, and dedicated global placement directors.
              </p>
            </div>
          </div>

          {/* TEAM MEMBERS GRID */}
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-[#EDE7DB] bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37] hover:shadow-[0_25px_50px_rgba(27,42,74,0.12)]"
              >
                <div>
                  {/* Portrait & Floating Badges */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#1B2A4A]">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 inline-flex items-center rounded-full bg-[#1B2A4A]/90 backdrop-blur-md border border-[#D4AF37]/50 px-3 py-1 text-[11px] font-bold text-[#D4AF37]">
                      {member.badge}
                    </div>

                    <div className="absolute top-3 right-3 inline-flex items-center rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-bold text-black shadow-md">
                      {member.experience}
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="mt-6">
                    <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
                      {member.role}
                    </div>
                    <h3 className="mt-1 font-display text-[24px] text-[#1B2A4A]">
                      {member.name}
                    </h3>
                    <p className="mt-2.5 text-[14px] leading-relaxed text-[#6B6560]">
                      {member.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-6 pt-4 border-t border-[#EDE7DB] flex items-center justify-between">
                  <span className="text-[12px] font-medium text-[#6B6560]">NcHM Faculty</span>
                  <button
                    onClick={() => openApplyModal(`Counseling with ${member.name}`)}
                    className="group/btn inline-flex items-center gap-1.5 text-[13px] font-bold text-[#1B2A4A] hover:text-[#D4AF37] transition"
                  >
                    Connect <ArrowRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* FACULTY COMMITMENT CALLOUT BANNER */}
          <div className="mt-16 rounded-[32px] border border-[#D4AF37]/30 bg-[#1B2A4A] p-8 sm:p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-[65ch]">
                <div className="inline-flex rounded-full bg-[#D4AF37]/20 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#D4AF37]">
                  70% Practical Mentorship
                </div>
                <h3 className="mt-3 font-display text-[28px] sm:text-[34px] leading-tight">
                  Learn Directly From Active Hotel General Managers & Executive Chefs
                </h3>
                <p className="mt-2 text-[14px] text-white/75 leading-relaxed">
                  Our faculty members hold active MOUs and career connections across premier 4★ and 5★ hotels in Nepal and abroad, ensuring every student gets direct mentorship and interview opportunities.
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-4">
                <button
                  onClick={() => openApplyModal("Campus Tour & Faculty Interaction")}
                  className="rounded-full bg-[#D4AF37] px-7 py-3.5 text-[13px] font-bold text-black transition hover:brightness-110 shadow-lg"
                >
                  Schedule Campus Visit →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO GALLERY */}
      <section className="border-y border-[#EDE7DB] bg-[#FFFCF6] py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A]">
                Visual Gallery
              </div>
              <h2 className="mt-3 font-display text-[40px] leading-[0.95] sm:text-[56px] text-[#1B2A4A]">
                Life at NcHM
              </h2>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[#6B6560]">
                Explore hands-on practical sessions, commercial kitchen labs, barista calibration, 5-star resort internships, and vibrant campus life.
              </p>
            </div>
            
            <div className="hidden sm:flex items-center gap-6 border-l-2 border-[#D4AF37] pl-6 py-1">
              <div>
                <div className="font-display text-[26px] font-bold text-[#1B2A4A]">70%</div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#6B6560]">Practical Labs</div>
              </div>
              <div className="h-8 w-[1px] bg-[#EDE7DB]" />
              <div>
                <div className="font-display text-[26px] font-bold text-[#1B2A4A]">6</div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#6B6560]">Global Destinations</div>
              </div>
              <div className="h-8 w-[1px] bg-[#EDE7DB]" />
              <div>
                <div className="font-display text-[26px] font-bold text-[#1B2A4A]">100%</div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-[#6B6560]">Placement Support</div>
              </div>
            </div>
          </div>

          {/* BENTO GALLERY SHOWCASE GRID */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12">
            {GALLERY.map((g, i) => {
              // Asymmetric Bento Grid Layout
              let colSpan = "lg:col-span-4";
              let rowSpan = "h-[320px]";
              
              if (i === 0) {
                // Featured Large Hero Card
                colSpan = "lg:col-span-8";
                rowSpan = "h-[400px] sm:h-[460px]";
              } else if (i === 1) {
                colSpan = "lg:col-span-4";
                rowSpan = "h-[400px] sm:h-[460px]";
              } else if (i === 2 || i === 5) {
                colSpan = "lg:col-span-6";
                rowSpan = "h-[350px]";
              } else if (i === 3 || i === 4) {
                colSpan = "lg:col-span-3";
                rowSpan = "h-[350px]";
              }

              return (
                <div
                  key={i}
                  onClick={() => setLightboxImg(g)}
                  className={`group relative overflow-hidden rounded-[28px] border border-[#EDE7DB] bg-[#1B2A4A] shadow-md transition duration-500 hover:-translate-y-1.5 hover:border-[#D4AF37] hover:shadow-[0_25px_50px_rgba(27,42,74,0.18)] cursor-pointer ${colSpan} ${rowSpan}`}
                >
                  <img
                    src={g.img}
                    alt={g.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-95"
                  />
                  {/* Subtle Gradient & Glassmorphism Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/90 via-[#1B2A4A]/25 to-transparent transition-all duration-300 group-hover:from-[#1B2A4A]/95 group-hover:via-[#1B2A4A]/40" />

                  {/* Content Title & Expand Button */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 flex items-end justify-between gap-4">
                    <h3 className="font-display text-[20px] sm:text-[25px] leading-tight text-white drop-shadow-sm transition group-hover:text-[#F3E5AB]">
                      {g.title}
                    </h3>
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black">
                      <Maximize2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#FBF6EC] py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Success Stories</div>
              <h2 className="font-display text-[40px] sm:text-[48px] text-[#1B2A4A]">What Our Students Say</h2>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2].map(i => (
                <button key={i} onClick={() => setTestimonialIdx(i)} className={`h-2 rounded-full transition-all ${i === testimonialIdx ? "w-10 bg-[#D4AF37]" : "w-4 bg-[#EDE7DB]"}`} />
              ))}
            </div>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-[32px] border border-[#EDE7DB] bg-white p-8 sm:p-12 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#FBF6EC] border border-[#EDE7DB]">
                  <img src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop`} alt="Student" className="h-full w-full object-cover" />
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="text-[72px] leading-none text-[#D4AF37]/30 font-display">“</div>
                <p className="mt-2 font-display text-[26px] leading-[1.25] sm:text-[32px] text-[#1B2A4A]">
                  {[
                    "NcHM gave me real hotel exposure from month one. My 6-month internship in Dubai turned into my first management role.",
                    "The barista course was 70% practical. I learned latte art, cafe operations, and got placed in a specialty cafe in Kathmandu.",
                    "From Birgunj to Mauritius — NcHM made hospitality feel global. The faculty treated us like future hotel GMs.",
                  ][testimonialIdx]}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1B2A4A] text-white font-bold">{["S", "R", "A"][testimonialIdx]}</div>
                  <div>
                    <div className="font-bold text-[16px] text-[#1B2A4A]">Graduate Student {testimonialIdx + 1}</div>
                    <div className="text-[12px] text-[#6B6560]">Diploma / ADHM Batch • Placed in {["Dubai", "Kathmandu", "Mauritius"][testimonialIdx]}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ & DIRECT CONTACT */}
      <section id="contact" className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Support & Questions</div>
              <h2 className="mt-3 font-display text-[40px] leading-[0.95] text-[#1B2A4A]">Frequently Asked Questions</h2>
              <div className="mt-8 rounded-[28px] bg-[#1B2A4A] p-8 text-white shadow-xl border border-[#D4AF37]/30">
                <div className="font-display text-[24px]">Talk to Admission Counselor</div>
                <p className="mt-2 text-[13px] text-white/70">Get instant answers on eligibility, international internships, and scholarship criteria via WhatsApp.</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={() => openApplyModal()} className="rounded-full bg-[#D4AF37] px-5 py-2.5 text-[13px] font-bold text-black hover:brightness-110 transition flex items-center gap-2">
                    <Phone className="h-4 w-4" /> Apply Online
                  </button>
                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="rounded-full border border-white/20 px-5 py-2.5 text-[13px] font-semibold hover:bg-white hover:text-black transition flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="divide-y divide-[#EDE7DB] rounded-[32px] border border-[#EDE7DB] bg-white shadow-sm overflow-hidden">
              {FAQS.map((f, i) => (
                <div key={f.q}>
                  <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="flex w-full items-center justify-between gap-6 px-8 py-6 text-left transition hover:bg-[#FBF6EC]/50">
                    <span className="font-bold text-[16px] text-[#1B2A4A]">{f.q}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition font-bold ${faqOpen === i ? "border-[#D4AF37] bg-[#D4AF37] text-black rotate-45" : "border-[#EDE7DB] text-[#6B6560]"}`}>+</span>
                  </button>
                  {faqOpen === i && (
                    <div className="px-8 pb-8 text-[14px] leading-relaxed text-[#6B6560]">{f.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#1B2A4A] py-24 text-white lg:py-32">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-[90px]" />
        </div>
        <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Start Your Career</div>
              <h2 className="mt-6 font-display text-[44px] leading-[0.9] sm:text-[72px]">Your Global Hospitality Career Starts Here.</h2>
              <p className="mt-4 text-[18px] text-white/70">Learn Today. Work Tomorrow. Go Global.</p>
              <div className="mt-10 flex flex-wrap gap-4">
                <button onClick={() => openApplyModal()} className="rounded-full bg-[#D4AF37] px-8 py-4 text-[14px] font-bold text-black shadow-lg hover:brightness-110 transition flex items-center gap-2">
                  Apply Now <ArrowRight className="h-4 w-4" />
                </button>
                <button onClick={() => openApplyModal()} className="rounded-full border border-white/30 px-8 py-4 text-[14px] font-semibold hover:bg-white hover:text-black transition">
                  Talk to an Admission Counselor
                </button>
              </div>
              <div className="mt-10 flex items-center gap-4 text-[12px] uppercase tracking-[0.16em] text-white/50">
                <span>Est. 2018 AD</span><span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /><span>Birgunj, Nepal</span><span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /><span>No Hostel Available</span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative aspect-square overflow-hidden rounded-[32px] border border-[#D4AF37]/40 bg-[#121A2D] shadow-2xl">
                <Interactive3DScene />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white p-6 text-black shadow-xl">
                  <NcHMLogo size="small" />
                  <div className="mt-3 text-[13px] leading-relaxed text-[#6B6560]">From Nepal to the World — Diploma, ADHM, Barista & Kitchen Training with guaranteed placement pathways.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0D1322] text-white border-t border-white/10">
        <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <NcHMLogo light size="large" />
              <div className="mt-6 text-[13px] leading-relaxed text-white/60">
                Nepal College of Hospitality Management (NcHM)<br />
                Established 2018 AD • Birgunj, Nepal<br />
                Learn. Work. Intern. Earn. Go Global.
              </div>
              <div className="mt-6 flex gap-3">
                {["FB", "IG", "TT", "YT"].map(s => (
                  <a key={s} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-[11px] font-bold hover:border-[#D4AF37] hover:text-[#D4AF37] transition">{s}</a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Programs</div>
                <ul className="mt-4 space-y-2.5 text-[13px] text-white/70">
                  <li>Diploma in Hotel Management (9+6)</li>
                  <li>Advance Diploma (ADHM 15+6)</li>
                  <li>Professional Barista</li>
                  <li>Short-Term Kitchen Training</li>
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Global Pathways</div>
                <ul className="mt-4 space-y-2.5 text-[13px] text-white/70">
                  <li>China, Mauritius, Dubai, Kuwait</li>
                  <li>Canada, USA, Switzerland</li>
                  <li>Australia, UK, Scotland</li>
                  <li>100% Placement Support</li>
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Quick Links</div>
                <ul className="mt-4 space-y-2.5 text-[13px] text-white/70">
                  <li>About NcHM</li>
                  <li>Programs & Internships</li>
                  <li>Bachelor Credit Transfer</li>
                  <li>Scholarships for Girls</li>
                  <li>Admission Guidelines</li>
                </ul>
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">Contact</div>
                <ul className="mt-4 space-y-2.5 text-[13px] text-white/70">
                  <li>Birgunj, Nepal</li>
                  <li>Phone: +{WHATSAPP_NUMBER}</li>
                  <li><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="hover:text-[#D4AF37] transition">WhatsApp Direct Chat</a></li>
                  <li>Email: info@nchm.edu.np</li>
                  <li className="pt-2 text-[11px] text-amber-300">⚠️ No Hostel Facility Available. Students arrange accommodation near college.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[12px] text-white/50">
            <span>© {new Date().getFullYear()} Nepal College of Hospitality Management (NcHM). All rights reserved.</span>
            <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" /> Official NcHM Brand Identity • White + Champagne Gold + Royal Navy Blue</span>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a 
          href={`https://wa.me/${WHATSAPP_NUMBER}`} 
          target="_blank" 
          rel="noreferrer"
          title="WhatsApp Us Direct"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xl transition hover:scale-110 hover:bg-emerald-500"
        >
          <MessageSquare className="h-6 w-6" />
        </a>
        <button
          onClick={() => openApplyModal()}
          title="Apply Now via WhatsApp"
          className="flex items-center gap-2 rounded-full bg-[#1B2A4A] px-4 py-3 text-[13px] font-bold text-white shadow-2xl border border-[#D4AF37]/50 transition hover:scale-105 hover:bg-black"
        >
          <Sparkles className="h-4 w-4 text-[#D4AF37]" />
          <span>Apply 2026</span>
        </button>
      </div>

      {/* INTERACTIVE ADMISSION MODAL WITH WHATSAPP ROUTING */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-[560px] overflow-hidden rounded-[32px] border border-[#D4AF37]/40 bg-white p-8 shadow-2xl">
            <button 
              onClick={() => setModalOpen(false)}
              className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#EDE7DB] bg-[#FBF6EC] text-[#1B2A4A] transition hover:bg-[#1B2A4A] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
                  <MessageSquare className="h-8 w-8" />
                </div>
                <h3 className="font-display text-[32px] text-[#1B2A4A]">Redirecting to WhatsApp...</h3>
                <p className="mt-3 text-[14px] text-[#6B6560] leading-relaxed max-w-[42ch] mx-auto">
                  Your application details have been formatted into a WhatsApp message. If WhatsApp did not open automatically, click below to send.
                </p>
                <div className="mt-6 rounded-2xl bg-[#FBF6EC] p-4 text-[12px] text-[#1B2A4A] border border-[#EDE7DB] text-left space-y-1">
                  <div><strong>Applicant:</strong> {formData.fullName}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Program:</strong> {selectedProgramForModal}</div>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => {
                      const messageText = getWhatsAppMessage();
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`, "_blank");
                    }}
                    className="rounded-full bg-emerald-600 px-6 py-3.5 text-[13px] font-bold text-white shadow-md hover:bg-emerald-500 transition flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" /> Open WhatsApp Chat Again <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="rounded-full border border-[#1B2A4A]/20 px-6 py-3.5 text-[13px] font-bold text-[#1B2A4A] hover:bg-[#1B2A4A]/5 transition"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  <Sparkles className="h-4 w-4" /> Direct WhatsApp Admission
                </div>
                <h3 className="mt-2 font-display text-[32px] text-[#1B2A4A]">Join NcHM Nepal</h3>
                <p className="mt-1 text-[13px] text-[#6B6560]">Fill in your details. Submitting will send your application directly to our Admissions WhatsApp team.</p>

                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#1B2A4A] mb-1">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 h-4 w-4 text-[#6B6560]" />
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Aarav Sharma"
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full rounded-xl border border-[#EDE7DB] bg-[#FBF6EC]/50 pl-10 pr-4 py-2.5 text-[14px] outline-none focus:border-[#D4AF37] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#1B2A4A] mb-1">Phone / WhatsApp *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 h-4 w-4 text-[#6B6560]" />
                        <input 
                          type="tel" 
                          required 
                          placeholder="+977 98XXXXXXXX"
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-xl border border-[#EDE7DB] bg-[#FBF6EC]/50 pl-10 pr-4 py-2.5 text-[14px] outline-none focus:border-[#D4AF37] focus:bg-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#1B2A4A] mb-1">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#6B6560]" />
                        <input 
                          type="email" 
                          placeholder="aarav@example.com"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full rounded-xl border border-[#EDE7DB] bg-[#FBF6EC]/50 pl-10 pr-4 py-2.5 text-[14px] outline-none focus:border-[#D4AF37] focus:bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#1B2A4A] mb-1">Program Choice *</label>
                    <div className="relative">
                      <BookOpen className="absolute left-3.5 top-3 h-4 w-4 text-[#6B6560]" />
                      <select 
                        value={selectedProgramForModal}
                        onChange={e => setSelectedProgramForModal(e.target.value)}
                        className="w-full rounded-xl border border-[#EDE7DB] bg-[#FBF6EC]/50 pl-10 pr-4 py-2.5 text-[14px] outline-none focus:border-[#D4AF37] focus:bg-white appearance-none cursor-pointer"
                      >
                        <option value="Diploma in Hotel Management">Diploma in Hotel Management (9+6 Months)</option>
                        <option value="Advance Diploma in Hotel Management">Advance Diploma in Hotel Management (15+6 Months)</option>
                        <option value="Professional Barista">Professional Barista (3-Month / 1-Month)</option>
                        <option value="Short-Term Kitchen Training">Short-Term Kitchen Training</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-bold uppercase tracking-[0.1em] text-[#1B2A4A] mb-1">Message / Questions (Optional)</label>
                    <textarea 
                      rows={3} 
                      placeholder="Ask any question about intake dates, fees, or girls scholarship..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border border-[#EDE7DB] bg-[#FBF6EC]/50 px-4 py-2.5 text-[14px] outline-none focus:border-[#D4AF37] focus:bg-white"
                    />
                  </div>

                  <div className="rounded-xl border border-amber-300 bg-[#FFFDF9] p-3 text-[11px] text-[#7A5A2A] flex items-center gap-2">
                    <span>⚠️ Note: NcHM currently has no on-campus hostel facility in Birgunj.</span>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full rounded-full bg-emerald-600 py-3.5 text-[14px] font-bold text-white shadow-lg hover:bg-emerald-500 transition flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" /> Send Application via WhatsApp
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxImg && (
        <div 
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={e => e.stopPropagation()}
            className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-[24px] bg-[#121A2D] p-3 shadow-2xl border border-white/20"
          >
            <button 
              onClick={() => setLightboxImg(null)}
              className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition"
            >
              <X className="h-6 w-6" />
            </button>
            <img src={lightboxImg.img} alt={lightboxImg.title} className="max-h-[75vh] w-auto rounded-xl object-contain" />
            <div className="p-4 flex items-center justify-between text-white">
              <div>
                <span className="rounded-full bg-[#D4AF37] px-3 py-1 text-[11px] font-bold text-black">{lightboxImg.cat}</span>
                <h4 className="mt-2 font-display text-[20px]">{lightboxImg.title}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
