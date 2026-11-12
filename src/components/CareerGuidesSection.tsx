import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, m } from "motion/react";
import { LUXURY_EASE, Reveal, StaggerGrid, StaggerItem } from "./motion/MotionPrimitives";
import {
  BookOpen,
  ArrowRight,
  X,
  Search,
  Share2,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Award,
  HelpCircle,
  Check,
  Tag,
  MessageCircle
} from "lucide-react";
import { BLOG_POSTS, BlogPost } from "../data/blogsData";
import { buildWhatsAppUrl } from "../constants/site";

interface CareerGuidesSectionProps {
  onOpenApplyModal?: (programTitle?: string) => void;
}

const CATEGORIES = [
  "All Articles",
  "Career & Scope",
  "Paid Internships",
  "Degree Pathways",
  "College & Admissions"
] as const;

export const CareerGuidesSection: React.FC<CareerGuidesSectionProps> = ({ onOpenApplyModal }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Articles");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [expandedFaqs, setExpandedFaqs] = useState<Record<number, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const articleContentRef = useRef<HTMLDivElement>(null);

  // Check URL hash for direct blog link on mount and hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith("#blog/")) {
        const slug = hash.replace("#blog/", "");
        const matched = BLOG_POSTS.find((p) => p.slug === slug);
        if (matched) {
          setActiveArticle(matched);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Update hash when opening/closing article
  const openArticle = (post: BlogPost) => {
    setActiveArticle(post);
    setExpandedFaqs({ 0: true }); // Open first FAQ by default
    window.history.pushState(null, "", `#blog/${post.slug}`);
    // Scroll to top of modal
    if (articleContentRef.current) {
      articleContentRef.current.scrollTop = 0;
    }
  };

  const closeArticle = () => {
    setActiveArticle(null);
    if (window.location.hash.startsWith("#blog/")) {
      window.history.pushState(null, "", "#blogs");
    }
  };

  // Lock body scroll when full-screen article is open
  useEffect(() => {
    if (activeArticle) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [activeArticle]);

  // Keyboard escape key support
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeArticle) {
        closeArticle();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeArticle]);

  // Track reading progress inside modal
  const handleScroll = () => {
    if (!articleContentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = articleContentRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      setReadingProgress(Math.min(100, Math.round((scrollTop / total) * 100)));
    }
  };

  // Filter posts based on category and search query
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Articles" || post.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === "" ||
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.targetKeywords.some((k) => k.toLowerCase().includes(query)) ||
      post.sections.some(
        (s) =>
          s.heading.toLowerCase().includes(query) ||
          s.paragraphs.some((p) => p.toLowerCase().includes(query))
      );
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setExpandedFaqs((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleShare = () => {
    if (!activeArticle) return;
    const url = `${window.location.origin}/#blog/${activeArticle.slug}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <section id="blogs" className="py-12 sm:py-16 lg:py-24 bg-[#FFFCF6] border-b border-[#EDE7DB] relative">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">

        {/* Section Header */}
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/40 bg-[#FBF6EC] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1B2A4A] shadow-sm">
            <BookOpen className="h-3.5 w-3.5 text-[#D4AF37]" />
            <span>Authoritative Career Intelligence &amp; Guides</span>
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-display font-medium text-[#1B2A4A] leading-tight">
            Hospitality Insights, <span className="italic text-gradient-gold">Salaries &amp; Pathways</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#6B6560] leading-relaxed">
            In-depth guides on hospitality career scope, verified overseas internship earnings, foreign bachelor credit transfers, and admissions at NcHM Birgunj.
          </p>
        </Reveal>

        {/* Search & Filter Toolbar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${active
                      ? "bg-[#1B2A4A] text-[#D4AF37] shadow-md border border-[#D4AF37]/50"
                      : "bg-white text-[#6B6560] border border-[#EDE7DB] hover:border-[#D4AF37]/50 hover:text-[#1B2A4A]"
                    }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B6560]" />
            <input
              id="career-guides-search"
              name="search"
              aria-label="Search hospitality career guides"
              type="text"
              placeholder="Search topics, salaries, visa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-[#EDE7DB] bg-white pl-10 pr-4 py-2 text-base sm:text-sm text-[#1B2A4A] placeholder-[#6B6560]/60 focus:border-[#D4AF37] focus:outline-none transition shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#6B6560] hover:text-[#1B2A4A]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Articles Grid */}
        <StaggerGrid className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {filteredPosts.map((post) => {
            return (
              <StaggerItem key={post.id} className="flex">
                <article
                  onClick={() => openArticle(post)}
                  className="group relative flex w-full flex-col justify-between overflow-hidden rounded-3xl border border-[#EDE7DB] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-2xl gold-glow-hover cursor-pointer"
                >
                  <div>
                    {/* Article Hero Thumbnail */}
                    <div className="relative h-52 sm:h-72 w-full overflow-hidden bg-[#1B2A4A]">
                      <img
                        src={post.heroImage}
                        alt={post.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="rounded-full bg-[#1B2A4A]/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-bold text-[#D4AF37] border border-[#D4AF37]/30 shadow-md">
                          {post.category}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white/90 flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-[#D4AF37]" />
                        <span>{post.readTime}</span>
                      </div>

                      {/* Meta info at bottom of image */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2 text-xs text-white/80">
                          <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                          <span>{post.publishDate}</span>
                          <span>•</span>
                          <span className="truncate">{post.author}</span>
                        </div>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6 sm:p-7">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1B2A4A] group-hover:text-[#D4AF37] transition leading-snug">
                        {post.title}
                      </h3>

                      <p className="mt-3 text-sm text-[#6B6560] line-clamp-3 leading-relaxed">
                        {post.summary}
                      </p>

                      {/* Keywords pills */}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {post.targetKeywords.slice(0, 3).map((kw, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 rounded-md bg-[#FBF6EC] px-2.5 py-1 text-[10px] font-semibold text-[#1B2A4A] border border-[#EDE7DB]"
                          >
                            <Tag className="h-2.5 w-2.5 text-[#D4AF37]" />
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-[#EDE7DB]/70 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B2A4A] group-hover:text-[#D4AF37] transition">
                      <span>Read Full Article &amp; Insights</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                    <span className="text-xs text-[#D4AF37] font-bold">Interactive Guide →</span>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        {/* Empty Search Result Fallback */}
        {filteredPosts.length === 0 && (
          <div className="mt-12 text-center py-16 bg-white rounded-3xl border border-[#EDE7DB]">
            <BookOpen className="mx-auto h-12 w-12 text-[#6B6560]/40" />
            <h4 className="mt-4 text-lg font-bold text-[#1B2A4A]">No matching guides found</h4>
            <p className="mt-2 text-sm text-[#6B6560]">
              Try searching with another keyword like &quot;Dubai&quot;, &quot;salary&quot;, &quot;SEE 1.6 GPA&quot;, or reset your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All Articles");
                setSearchQuery("");
              }}
              className="mt-5 rounded-full bg-[#1B2A4A] px-5 py-2 text-xs font-bold text-[#D4AF37] hover:bg-[#0B132B]"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Full-Screen Reading Modal / Lightbox */}
      <AnimatePresence>
        {activeArticle && (
          <m.div
            key="article-reader-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: LUXURY_EASE }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 lg:p-6"
          >
            <m.div
              key="article-reader-card"
              initial={{ opacity: 0, scale: 0.96, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.26, ease: LUXURY_EASE }}
              className="relative flex flex-col max-w-4xl w-full h-[92dvh] sm:h-[94vh] rounded-3xl bg-[#FFFCF6] border border-[#D4AF37]/50 shadow-2xl overflow-hidden"
            >

              {/* Reading Progress Bar */}
              <div className="h-1.5 w-full bg-[#EDE7DB] relative z-20">
                <div
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E8C99A] transition-all duration-150"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>

              {/* Sticky Modal Top Bar */}
              <div className="bg-[#1B2A4A] px-4 sm:px-6 py-3.5 sm:py-4 text-white flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="rounded-full bg-[#D4AF37] px-2.5 sm:px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0B132B]">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-white/70 hidden sm:inline">•</span>
                  <span className="text-xs text-white/70 hidden sm:inline flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#D4AF37]" /> {activeArticle.readTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 transition cursor-pointer"
                    title="Copy direct link to this guide"
                  >
                    {copiedLink ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Share2 className="h-3.5 w-3.5 text-[#D4AF37]" />}
                    <span className="text-[11px] font-medium hidden sm:inline">{copiedLink ? "Copied!" : "Share Link"}</span>
                  </button>

                  <button
                    onClick={closeArticle}
                    aria-label="Close article"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#D4AF37] hover:text-[#0B132B] transition cursor-pointer shrink-0"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Scrollable Article Body */}
              <div
                ref={articleContentRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12 text-[#1B2A4A] space-y-6 sm:space-y-8 overscroll-contain"
              >
                {/* Breadcrumb Navigation */}
                <div className="flex items-center gap-2 text-xs text-[#6B6560] flex-wrap">
                  <a href="#blogs" onClick={closeArticle} className="hover:text-[#D4AF37] transition">
                    Guides Hub
                  </a>
                  <span>/</span>
                  <span className="text-[#D4AF37] font-semibold">{activeArticle.category}</span>
                  <span>/</span>
                  <span className="truncate max-w-[140px] sm:max-w-[260px] text-[#1B2A4A]">{activeArticle.title}</span>
                </div>

                {/* Header Title & Author Meta */}
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-[#1B2A4A] leading-tight">
                    {activeArticle.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#6B6560] pb-6 border-b border-[#EDE7DB]">
                    <div className="flex items-center gap-1.5 font-semibold text-[#1B2A4A]">
                      <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                      <span>{activeArticle.author}</span>
                    </div>
                    <span>•</span>
                    <span>{activeArticle.authorRole}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span>Published {activeArticle.publishDate}</span>
                    </div>
                  </div>
                </div>

                {/* Hero Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#EDE7DB]">
                  <img
                    src={activeArticle.heroImage}
                    alt={activeArticle.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                  />
                </div>

                {/* Key Takeaways Box (High Scannability) */}
                <div className="rounded-2xl border border-[#D4AF37]/40 bg-[#FBF6EC] p-6 sm:p-7 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1B2A4A]">
                    <Award className="h-4 w-4 text-[#D4AF37]" />
                    <span>Key Executive Takeaways</span>
                  </div>
                  <ul className="mt-4 space-y-2.5">
                    {activeArticle.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#1B2A4A] leading-relaxed">
                        <CheckCircle2 className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Introductory Paragraphs */}
                <div className="prose prose-stone max-w-none space-y-4 text-base sm:text-lg text-[#1B2A4A]/90 leading-relaxed">
                  {activeArticle.intro.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                {/* Main Content Sections */}
                <div className="space-y-10 pt-4">
                  {activeArticle.sections.map((section, idx) => (
                    <section key={idx} className="space-y-4">
                      <h2 className="text-xl sm:text-2xl font-display font-bold text-[#1B2A4A] flex items-center gap-2 border-b border-[#EDE7DB] pb-2">
                        <span className="text-[#D4AF37]">✦</span>
                        <span>{section.heading}</span>
                      </h2>

                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="text-sm sm:text-base text-[#1B2A4A] leading-relaxed">
                          {p}
                        </p>
                      ))}

                      {/* Bullet Points */}
                      {section.bulletPoints && section.bulletPoints.length > 0 && (
                        <ul className="space-y-2.5 pl-2">
                          {section.bulletPoints.map((bp, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-3 text-sm text-[#1B2A4A] leading-relaxed">
                              <span className="h-2 w-2 rounded-full bg-[#D4AF37] mt-2 shrink-0" />
                              <span>{bp}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Styled Comparison / Data Table */}
                      {section.table && (
                        <div className="my-6 overflow-hidden rounded-2xl border border-[#EDE7DB] shadow-md bg-white">
                          {section.table.caption && (
                            <div className="bg-[#1B2A4A] px-4 py-2.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                              {section.table.caption}
                            </div>
                          )}
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                              <thead className="bg-[#FBF6EC] border-b border-[#EDE7DB] text-[#1B2A4A] font-bold">
                                <tr>
                                  {section.table.headers.map((h, hIdx) => (
                                    <th key={hIdx} className="px-4 py-3 whitespace-nowrap">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-[#EDE7DB]">
                                {section.table.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-[#FFFCF6]"}>
                                    {row.map((cell, cIdx) => (
                                      <td
                                        key={cIdx}
                                        className={`px-4 py-3 ${cIdx === 0
                                            ? "font-semibold text-[#1B2A4A]"
                                            : cIdx === row.length - 1
                                              ? "font-bold text-[#D4AF37]"
                                              : "text-[#6B6560]"
                                          }`}
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Callout Box */}
                      {section.callout && (
                        <div className="rounded-2xl border-l-4 border-[#D4AF37] bg-[#FBF6EC] p-5 shadow-sm space-y-1.5">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1B2A4A]">
                            <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                            <span>{section.callout.title}</span>
                          </div>
                          <p className="text-sm text-[#1B2A4A] italic leading-relaxed">
                            &quot;{section.callout.text}&quot;
                          </p>
                        </div>
                      )}
                    </section>
                  ))}
                </div>

                {/* Frequently Asked Questions (Accordion) */}
                {activeArticle.faqs && activeArticle.faqs.length > 0 && (
                  <div className="pt-8 border-t border-[#EDE7DB]">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-[#D4AF37]" />
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-[#1B2A4A]">
                        Frequently Asked Questions
                      </h3>
                    </div>
                    <p className="mt-1 text-xs sm:text-sm text-[#6B6560]">
                      Direct answers based on Nepali hospitality standards and NcHM guidelines.
                    </p>

                    <div className="mt-6 space-y-3">
                      {activeArticle.faqs.map((faq, fIdx) => {
                        const isOpen = !!expandedFaqs[fIdx];
                        return (
                          <div
                            key={fIdx}
                            className="rounded-2xl border border-[#EDE7DB] bg-white overflow-hidden transition-all"
                          >
                            <button
                              onClick={() => toggleFaq(fIdx)}
                              className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#1B2A4A] hover:text-[#D4AF37] transition cursor-pointer"
                            >
                              <span>{faq.question}</span>
                              {isOpen ? (
                                <ChevronUp className="h-4 w-4 text-[#D4AF37] shrink-0" />
                              ) : (
                                <ChevronDown className="h-4 w-4 text-[#6B6560] shrink-0" />
                              )}
                            </button>
                            {isOpen && (
                              <div className="px-5 pb-5 pt-1 text-sm text-[#6B6560] leading-relaxed border-t border-[#EDE7DB]/50 bg-[#FBF6EC]/30">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Conversion Call-to-Action Banner */}
                <div className="rounded-3xl bg-gradient-to-br from-[#1B2A4A] via-[#0B132B] to-[#1B2A4A] p-7 sm:p-9 text-white border border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                        Next Step in Your Career
                      </span>
                      <h4 className="mt-1 text-xl sm:text-2xl font-display font-bold text-white">
                        Ready to Learn, Work &amp; Earn Globally?
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-xl">
                        {activeArticle.ctaSubtext}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                      {onOpenApplyModal && (
                        <button
                          onClick={() => {
                            closeArticle();
                            onOpenApplyModal(activeArticle.relatedProgram);
                          }}
                          className="w-full sm:w-auto rounded-full bg-[#D4AF37] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#0B132B] hover:bg-[#E8C99A] transition gold-glow-hover cursor-pointer"
                        >
                          {activeArticle.ctaText}
                        </button>
                      )}

                      <a
                        href={buildWhatsAppUrl("Hello NcHM, I read your article and want to know more about admissions.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition"
                      >
                        <MessageCircle className="h-4 w-4 text-green-400" />
                        <span>WhatsApp Counselor</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Related Articles Footer */}
                <div className="pt-8 border-t border-[#EDE7DB]">
                  <h4 className="text-lg font-display font-bold text-[#1B2A4A]">Read Other Career Guides</h4>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    {BLOG_POSTS.filter((p) => p.id !== activeArticle.id)
                      .slice(0, 3)
                      .map((other) => (
                        <div
                          key={other.id}
                          onClick={() => openArticle(other)}
                          className="rounded-2xl border border-[#EDE7DB] bg-white p-4 hover:border-[#D4AF37] transition cursor-pointer hover:shadow-md flex flex-col justify-between"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                              {other.category}
                            </span>
                            <h5 className="mt-1 text-sm font-bold text-[#1B2A4A] line-clamp-2">
                              {other.title}
                            </h5>
                          </div>
                          <div className="mt-3 flex items-center justify-between text-[11px] text-[#6B6560]">
                            <span>{other.readTime}</span>
                            <span className="text-[#D4AF37] font-bold flex items-center gap-1">
                              Read <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Close Button at very bottom */}
                <div className="text-center pt-4">
                  <button
                    onClick={closeArticle}
                    className="rounded-full bg-[#1B2A4A] px-8 py-3 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:bg-[#0B132B] transition"
                  >
                    Back to All Guides &amp; Articles
                  </button>
                </div>

              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </section>
  );
};
