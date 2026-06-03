"use client";

import { motion } from "framer-motion";
import { CASE_STUDIES } from "@/lib/utils/constants";
import {
  fadeUp,
  staggerContainer,
  viewportConfig,
} from "@/lib/utils/animations";

// =============================================================================
// CaseStudies — Homepage section showcasing client results
// =============================================================================

export default function CaseStudies() {
  return (
    <section className="py-24 md:py-32 bg-bg-main">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
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
            Results That Speak
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-h1 font-display text-text-primary">
            Case Studies
          </motion.h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {CASE_STUDIES.map((study) => (
            <motion.div
              key={study.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-bg-card rounded-2xl p-8 md:p-10 border border-border-brand/50 hover:shadow-luxury-lg transition-shadow duration-500"
            >
              {/* Placeholder Badge */}
              {study.isPlaceholder && (
                <span className="inline-block text-xs bg-accent-gold/10 text-accent-gold rounded-full px-3 py-1 mb-5">
                  📌 Placeholder — To be replaced with real case study
                </span>
              )}

              {/* Industry Tag */}
              <p className="text-xs uppercase tracking-wider text-accent-gold mb-3">
                {study.industry}
              </p>

              {/* Client Name */}
              <h3 className="text-h3 font-display text-text-primary mb-6">
                {study.client}
              </h3>

              {/* Challenge */}
              <div className="mb-4">
                <p className="font-body font-semibold text-sm text-text-primary mb-1">
                  Challenge
                </p>
                <p className="font-body text-text-secondary text-sm leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* Strategy */}
              <div className="mb-8">
                <p className="font-body font-semibold text-sm text-text-primary mb-1">
                  Strategy
                </p>
                <p className="font-body text-text-secondary text-sm leading-relaxed">
                  {study.strategy}
                </p>
              </div>

              {/* Results Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-8 pt-6 border-t border-border-brand/40">
                {study.results.map((result, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-2xl font-display text-accent-gold">
                      {result.metric}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {result.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Placeholder CTA */}
              <button
                disabled
                className="font-body text-sm text-accent-gold/50 cursor-not-allowed"
              >
                Read Full Case Study →
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
