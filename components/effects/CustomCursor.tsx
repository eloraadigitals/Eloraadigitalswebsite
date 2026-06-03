"use client";

// =============================================================================
// CustomCursor — Warm gold circle cursor + magnetic pull hook for CTAs
// =============================================================================

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

// ---------------------------------------------------------------------------
// useMagneticHover — Apply to CTA buttons for magnetic pull toward cursor
// ---------------------------------------------------------------------------

export function useMagneticHover(strength = 0.3) {
  const ref = useRef<HTMLElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring for snappy but organic feel
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      x.set(deltaX);
      y.set(deltaY);
    };

    const handleLeave = () => {
      x.set(0);
      y.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y, strength]);

  return {
    ref,
    style: { x: springX, y: springY } as { x: MotionValue<number>; y: MotionValue<number> },
  };
}

// ---------------------------------------------------------------------------
// CustomCursor Component
// ---------------------------------------------------------------------------

const CURSOR_SIZE = 16;
const CURSOR_HOVER_SIZE = 40;

/** Interactive element selectors — cursor enlarges on hover over these */
const INTERACTIVE_SELECTORS = "a, button, [role='button'], input, textarea, select, [data-cursor-hover]";

export default function CustomCursor() {
  const pathname = usePathname();
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // default hidden

  // Raw cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring-smoothed position for that "trailing" luxury feel
  const springConfig = { stiffness: 500, damping: 28 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  // Detect touch devices
  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isCoarse);
  }, []);

  const isAdminOrProfile = pathname.startsWith("/admin") || pathname.startsWith("/profile");

  // Track mouse position
  useEffect(() => {
    if (isTouchDevice || isAdminOrProfile) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isTouchDevice, isAdminOrProfile, cursorX, cursorY, isVisible]);

  // Detect hover over interactive elements
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTORS)) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(INTERACTIVE_SELECTORS)) {
      setIsHovering(false);
    }
  }, []);

  useEffect(() => {
    if (isTouchDevice || isAdminOrProfile) return;

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isTouchDevice, isAdminOrProfile, handleMouseOver, handleMouseOut]);

  // Hide the default cursor on the body, with cleanup for admin/profile
  useEffect(() => {
    if (isTouchDevice || isAdminOrProfile) {
      document.body.style.cursor = "";
      const existing = document.getElementById("custom-cursor-hide");
      if (existing) existing.remove();
      return;
    }

    document.body.style.cursor = "none";
    // Also hide cursor on all interactive elements
    const style = document.createElement("style");
    style.id = "custom-cursor-hide";
    style.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = "";
      const existing = document.getElementById("custom-cursor-hide");
      if (existing) existing.remove();
    };
  }, [isTouchDevice, isAdminOrProfile]);

  // Don't render on touch devices or admin/profile pages
  if (isTouchDevice || isAdminOrProfile) return null;

  const size = isHovering ? CURSOR_HOVER_SIZE : CURSOR_SIZE;

  return (
    <motion.div
      className="cursor-custom fixed top-0 left-0 pointer-events-none z-[99] rounded-full"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        backgroundColor: isHovering
          ? "rgba(198, 165, 107, 0.5)"
          : "rgba(198, 165, 107, 0.8)",
        mixBlendMode: isHovering ? "difference" : "normal",
      }}
      animate={{
        width: size,
        height: size,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        width: { type: "spring", stiffness: 400, damping: 25 },
        height: { type: "spring", stiffness: 400, damping: 25 },
        opacity: { duration: 0.15 },
      }}
    />
  );
}
