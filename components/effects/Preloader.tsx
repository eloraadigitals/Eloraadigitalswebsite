"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_LUXURY } from "@/lib/utils/animations";

// =============================================================================
// Preloader — Luxury entrance sequence (max 2.8s)
// =============================================================================

const BRAND_NAME = "Eloraa Digitals";
const TOTAL_DURATION = 2800; // ms
const CHAR_STAGGER = 0.04; // seconds per character
const LINE_DRAW_DELAY = BRAND_NAME.length * CHAR_STAGGER * 1000 + 200; // after text reveals
const COUNTER_DURATION = 2200; // ms for 0→100%

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [drawLine, setDrawLine] = useState(false);


  // Check sessionStorage and initialize
  useEffect(() => {
    if (typeof window === "undefined") return;

    const alreadyShown = sessionStorage.getItem("preloaderShown");
    if (alreadyShown) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);
    setShowContent(true);

    // Start line draw after text reveals
    const lineTimer = setTimeout(() => setDrawLine(true), LINE_DRAW_DELAY);

    // Auto-dismiss after total duration
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("preloaderShown", "true");
      // Call parent complete callback after exit animation completes (500ms transition)
      setTimeout(onComplete, 550);
    }, TOTAL_DURATION);


    return () => {
      clearTimeout(lineTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  // Animate percentage counter using requestAnimationFrame
  const animateCounter = useCallback(() => {
    if (!showContent) return;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / COUNTER_DURATION, 1);
      // Ease-out curve for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setPercentage(Math.round(eased * 100));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [showContent]);

  useEffect(() => {
    if (showContent) {
      // Start counter slightly after text begins
      const counterDelay = setTimeout(animateCounter, 300);
      return () => clearTimeout(counterDelay);
    }
  }, [showContent, animateCounter]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "#2B211C" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.5, ease: EASE_LUXURY as any },
          }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Brand name — character-by-character reveal */}
            <div className="overflow-hidden" aria-label={BRAND_NAME}>
              <div className="flex flex-wrap justify-center">
                {BRAND_NAME.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="font-display text-3xl md:text-5xl text-bg-premium inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * CHAR_STAGGER,
                        duration: 0.4,
                        ease: EASE_LUXURY as any,
                      },
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Gold line — draws left to right */}
            <motion.div
              className="h-[1px] w-48 md:w-64 bg-accent-gold origin-left"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: drawLine ? 1 : 0,
                transition: { duration: 1.0, ease: EASE_LUXURY as any },
              }}
            />

            {/* Percentage counter */}
            <motion.span
              className="font-body text-sm text-text-secondary tabular-nums"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5, duration: 0.4 },
              }}
            >
              {percentage}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
