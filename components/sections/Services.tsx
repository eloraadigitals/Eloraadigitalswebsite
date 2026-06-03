"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SERVICES, CONTACT } from "@/lib/utils/constants";
import {
  fadeUp,
  staggerContainer,
  drawLine,
  viewportConfig,
} from "@/lib/utils/animations";

// =============================================================================
// Services — Editorial timeline with hover interactions
// =============================================================================

/** Card hover animation variant */
const cardHover = {
  rest: {
    y: 0,
    borderLeftWidth: 0,
    borderLeftColor: "transparent",
    boxShadow: "0 0 0 rgba(43, 33, 28, 0)",
  },
  hover: {
    y: -4,
    borderLeftWidth: 3,
    borderLeftColor: "#C6A56B",
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as any },
  },
};

/** Format service number with leading zero */
function formatNumber(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function Services() {
  return (
    <section className="py-24 md:py-32 bg-bg-premium">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16">
        {/* ── Section Header ── */}
        <motion.div
          className="mb-16 md:mb-20"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="text-caption uppercase tracking-[0.2em] text-accent-gold mb-4"
          >
            What We Do
          </motion.p>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-h1 font-display text-text-primary mb-6"
          >
            Services Built for Growth
          </motion.h2>

          {/* Gold accent line */}
          <motion.div
            variants={drawLine}
            className="w-16 h-[1px] bg-accent-gold origin-left"
          />
        </motion.div>

        {/* ── Service Cards ── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.article
                className="py-8 border-b border-border-brand pl-4 transition-colors"
                variants={cardHover}
              >
                {/* Number + Line header */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-h2 font-display text-accent-gold/30 select-none shrink-0">
                    {formatNumber(service.id)}
                  </span>
                  <div className="flex-1 h-[1px] bg-border-brand" />
                </div>

                {/* Card body — responsive grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  {/* Title */}
                  <h3 className="md:col-span-3 uppercase tracking-wider font-body font-semibold text-text-primary text-sm md:text-base">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="md:col-span-4 font-body text-text-secondary text-base leading-relaxed">
                    {service.description}
                  </p>

                  {/* Outcome */}
                  <div className="md:col-span-3 flex items-start gap-2">
                    <span className="font-body text-text-secondary text-sm shrink-0 mt-0.5">
                      Outcome →
                    </span>
                    <span className="font-body text-accent-gold text-sm">
                      {service.outcome}
                    </span>
                  </div>

                  {/* CTA */}
                  <div className="md:col-span-2 flex md:justify-end items-start">
                    <Link
                      href={CONTACT.whatsapp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body text-accent-gold text-sm hover:underline underline-offset-4 transition-all duration-300 hover:tracking-wider"
                    >
                      Enquire →
                    </Link>
                  </div>
                </div>
              </motion.article>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
