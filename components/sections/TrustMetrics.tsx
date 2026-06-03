"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { TRUST_METRICS } from "@/lib/utils/constants";
import {
  fadeUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/utils/animations";

// =============================================================================
// TrustMetrics — Animated counter stats section
// =============================================================================

/** Duration for the count-up animation in ms */
const COUNTER_DURATION = 2000;

/**
 * Parse a trust metric value string into numeric and text parts.
 * Examples: "150+" → { prefix: "", number: 150, suffix: "+" }
 *           "₹2Cr+" → { prefix: "₹", number: 2, suffix: "Cr+" }
 *           "95%" → { prefix: "", number: 95, suffix: "%" }
 *           "10,000+" → { prefix: "", number: 10000, suffix: "+" }
 */
function parseValue(value: string): {
  prefix: string;
  number: number;
  suffix: string;
  hasComma: boolean;
} {
  // Match optional prefix (non-digit, non-comma chars), digits (with commas), and suffix
  const match = value.match(/^([^\d,]*?)([\d,]+)(.*)$/);
  if (!match) return { prefix: "", number: 0, suffix: value, hasComma: false };

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];
  const hasComma = numStr.includes(",");
  const number = parseInt(numStr.replace(/,/g, ""), 10);

  return { prefix, number, suffix, hasComma };
}

/** Format a number with commas if the original value had them */
function formatNumber(num: number, hasComma: boolean): string {
  if (!hasComma) return num.toString();
  return num.toLocaleString("en-IN");
}

// ---------------------------------------------------------------------------
// Counter Component
// ---------------------------------------------------------------------------

interface CounterProps {
  value: string;
  isInView: boolean;
}

function Counter({ value, isInView }: CounterProps) {
  const { prefix, number: target, suffix, hasComma } = parseValue(value);
  const [displayNumber, setDisplayNumber] = useState(0);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / COUNTER_DURATION, 1);
      // Cubic ease-out for natural deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayNumber(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, [target]);

  useEffect(() => {
    if (isInView) animate();
  }, [isInView, animate]);

  return (
    <span className="tabular-nums">
      {prefix}
      {formatNumber(displayNumber, hasComma)}
      {suffix}
    </span>
  );
}

// ---------------------------------------------------------------------------
// TrustMetrics Section
// ---------------------------------------------------------------------------

export default function TrustMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.3,
  });

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-bg-main"
    >
      <motion.div
        className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportConfig}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
          {TRUST_METRICS.map((metric, index) => (
            <motion.div
              key={metric.label}
              variants={fadeUp}
              className={`
                flex flex-col items-center text-center py-6 md:py-0
                ${
                  index < TRUST_METRICS.length - 1
                    ? "md:border-r md:border-border-brand"
                    : ""
                }
              `}
            >
              {/* Animated value */}
              <span className="text-h1 font-display text-accent-gold mb-2">
                <Counter value={metric.value} isInView={isInView} />
              </span>

              {/* Label */}
              <span className="font-body text-text-secondary text-sm uppercase tracking-wider">
                {metric.label}
              </span>

              {/* Sublabel */}
              <span className="font-body text-text-secondary text-sm uppercase tracking-wider">
                {metric.sublabel}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
