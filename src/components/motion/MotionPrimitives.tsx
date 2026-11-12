import React, { useEffect, useRef, useState } from "react";
import { m, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Editorial luxury cubic-bezier curve (swift start, silky deceleration). */
export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

/** Bidirectional viewport trigger so elements animate on both scroll-down and scroll-up. */
const VIEWPORT_BIDIRECTIONAL = { once: false, amount: 0.06 } as const;

type ScrollDirection = "down" | "up";

// Shared passive scroll-direction tracker (single window listener across all primitives)
let _currentDirection: ScrollDirection = "down";
let _lastScrollY = 0;
const _directionSubscribers = new Set<(dir: ScrollDirection) => void>();
let _scrollListenerAttached = false;

function handleGlobalScroll() {
  const y = window.scrollY;
  const delta = y - _lastScrollY;
  if (Math.abs(delta) < 2) return;
  const nextDir: ScrollDirection = delta > 0 ? "down" : "up";
  _lastScrollY = y;
  if (nextDir !== _currentDirection) {
    _currentDirection = nextDir;
    _directionSubscribers.forEach((cb) => cb(nextDir));
  }
}

/**
 * Subscribes to the shared page scroll direction ("down" | "up") using a single passive listener.
 */
function useScrollDirection(): ScrollDirection {
  const [dir, setDir] = useState<ScrollDirection>(_currentDirection);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!_scrollListenerAttached) {
      _lastScrollY = window.scrollY;
      window.addEventListener("scroll", handleGlobalScroll, { passive: true });
      _scrollListenerAttached = true;
    }

    _directionSubscribers.add(setDir);
    return () => {
      _directionSubscribers.delete(setDir);
      if (_directionSubscribers.size === 0 && _scrollListenerAttached) {
        window.removeEventListener("scroll", handleGlobalScroll);
        _scrollListenerAttached = false;
      }
    };
  }, []);

  return dir;
}

/**
 * Thin Champagne Gold scroll progress hairline fixed along the top edge.
 */
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-[#9C7D4A] via-[#D4AF37] to-[#F3E5AB]"
    />
  );
};

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
}

/**
 * Bidirectional editorial reveal container: glides up when scrolling down,
 * and glides down smoothly when scrolling back up.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 18,
  duration = 0.52,
}) => {
  const scrollDir = useScrollDirection();

  return (
    <m.div
      custom={scrollDir}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_BIDIRECTIONAL}
      variants={{
        hidden: (dir: ScrollDirection) => ({
          opacity: 0,
          y: dir === "up" ? -y : y,
          transition: { duration: 0.25, ease: LUXURY_EASE },
        }),
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: LUXURY_EASE },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
};

interface StaggerGridProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

/**
 * Coordinates directional staggered entrance animations across child StaggerItem cards
 * on both downward and upward scrolling.
 */
export const StaggerGrid: React.FC<StaggerGridProps> = ({
  children,
  className,
  staggerDelay = 0.06,
}) => {
  const scrollDir = useScrollDirection();

  return (
    <m.div
      custom={scrollDir}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_BIDIRECTIONAL}
      variants={{
        hidden: {},
        visible: (dir: ScrollDirection) => ({
          transition: {
            staggerChildren: staggerDelay,
            staggerDirection: dir === "up" ? -1 : 1,
          },
        }),
      }}
      className={className}
    >
      {children}
    </m.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Individual card wrapper used inside StaggerGrid.
 */
export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className }) => {
  const scrollDir = useScrollDirection();

  return (
    <m.div
      custom={scrollDir}
      variants={{
        hidden: (dir: ScrollDirection) => ({
          opacity: 0,
          y: dir === "up" ? -16 : 16,
          transition: { duration: 0.24, ease: LUXURY_EASE },
        }),
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.48, ease: LUXURY_EASE },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
};

interface AnimatedStatProps {
  value: string;
  className?: string;
}

/**
 * Smoothly counts up numeric stats (e.g. "2018", "12 Mo", "20%") whenever scrolled into view.
 * Compound tokens like "9+6" or "SQA" fade-scale in cleanly without numeric distortion.
 */
export const AnimatedStat: React.FC<AnimatedStatProps> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });
  const prefersReduced = useReducedMotion();

  const isCompound = /^\d+\+\d+/.test(value);
  const match = !isCompound ? value.match(/^(\d+)(.*)$/) : null;
  const targetNum = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  // Start near target for years like 2018 so count-up feels crisp, not frantic
  const startNum = targetNum && targetNum > 1900 ? targetNum - 28 : 0;
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!isInView || targetNum === null || prefersReduced) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const duration = 850;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startNum + (targetNum - startNum) * eased);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, targetNum, startNum, suffix, value, prefersReduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};
