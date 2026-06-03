"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/utils/constants";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/utils/animations";

// =============================================================================
// FAQ — Accordion section with smooth height animations
// =============================================================================

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-24 md:py-32 bg-bg-premium">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mb-16 md:mb-20"
        >
          <motion.p
            variants={fadeUp}
            className="text-caption uppercase tracking-[0.2em] text-accent-gold mb-4"
          >
            Common Questions
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-h1 font-display text-text-primary">
            Frequently Asked Questions
          </motion.h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
        >
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                variants={fadeUp}
                className="border-b border-border-brand py-6"
              >
                {/* Question Row */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex justify-between items-center cursor-pointer text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="font-body text-lg text-text-primary">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex-shrink-0 text-accent-gold"
                  >
                    {isOpen ? (
                      <Minus size={20} strokeWidth={2} />
                    ) : (
                      <Plus size={20} strokeWidth={2} />
                    )}
                  </motion.span>
                </button>

                {/* Answer (animated) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                        opacity: { duration: 0.3, delay: 0.05 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="font-body text-text-secondary mt-4 leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
