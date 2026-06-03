// =============================================================================
// Eloraa Digitals — Shared Animation Variants & Utilities
// =============================================================================
import type { Variants } from "framer-motion";

/** Luxury easing — smooth, refined exit curve */
export const EASE_LUXURY = [0.25, 0.46, 0.45, 0.94] as const;

/** Standard entrance easing */
export const EASE_ENTRANCE = [0.33, 1, 0.68, 1] as const;

// ---------------------------------------------------------------------------
// Framer Motion Variants
// ---------------------------------------------------------------------------

/** Fade up — primary entrance animation for most elements */
export const fadeUp: Variants = {
  initial: { opacity: 0, y: 32 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
};

/** Fade in — subtle opacity entrance */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_LUXURY },
  },
};

/** Slide in from left */
export const slideInLeft: Variants = {
  initial: { opacity: 0, x: -48 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
};

/** Slide in from right */
export const slideInRight: Variants = {
  initial: { opacity: 0, x: 48 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE_LUXURY },
  },
};

/** Scale up — for cards and interactive elements */
export const scaleUp: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_LUXURY },
  },
};

/** Stagger container — wraps children with staggered entrance */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Stagger container — faster variant for smaller groups */
export const staggerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

/** Draw line — for decorative line animations */
export const drawLine: Variants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 1.2, ease: EASE_LUXURY },
  },
};

/** Counter reveal — for trust metrics numbers */
export const counterReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_LUXURY },
  },
};

// ---------------------------------------------------------------------------
// Page Transition Variants
// ---------------------------------------------------------------------------

export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_LUXURY },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: EASE_LUXURY },
  },
};

// ---------------------------------------------------------------------------
// GSAP Defaults
// ---------------------------------------------------------------------------

export const GSAP_DEFAULTS = {
  scrollTrigger: {
    start: "top 85%",
    end: "bottom 15%",
    toggleActions: "play none none reverse",
  },
  duration: 0.8,
  ease: "power2.out",
} as const;

// ---------------------------------------------------------------------------
// Viewport Animation Props (for use with whileInView)
// ---------------------------------------------------------------------------

export const viewportConfig = {
  once: true,
  amount: 0.2,
  margin: "-50px",
} as const;
