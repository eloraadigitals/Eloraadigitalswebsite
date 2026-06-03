"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS_PLACEHOLDER } from "@/lib/utils/constants";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/utils/animations";

// =============================================================================
// Testimonials — Auto-scrolling horizontal carousel with glass cards
// =============================================================================

/** Extract initials from a full name (first + last letter) */
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/** Render star rating using Lucide Star icons */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={16}
          className={
            i < rating
              ? "text-accent-gold fill-accent-gold"
              : "text-warm-beige fill-warm-beige"
          }
        />
      ))}
    </div>
  );
}

/** Individual testimonial card */
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof TESTIMONIALS_PLACEHOLDER)[number];
}) {
  return (
    <div className="min-w-[350px] md:min-w-[400px] flex-shrink-0">
      <div className="glass border border-accent-gold/20 rounded-2xl p-6 h-full">
        {/* Profile + Rating */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-accent-gold/20 flex items-center justify-center">
            <span className="font-display text-accent-gold text-sm font-semibold">
              {getInitials(testimonial.name)}
            </span>
          </div>
          <div>
            <p className="font-body font-semibold text-text-primary text-sm">
              {testimonial.name}
            </p>
            <p className="text-caption text-text-secondary">
              {testimonial.businessName}
            </p>
          </div>
        </div>

        {/* Stars */}
        <StarRating rating={testimonial.rating} />

        {/* Review */}
        <p className="font-body text-text-secondary italic mt-4 text-sm leading-relaxed">
          &ldquo;{testimonial.review}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate cards for seamless infinite scroll
  const allCards = [...TESTIMONIALS_PLACEHOLDER, ...TESTIMONIALS_PLACEHOLDER];

  return (
    <section className="py-24 md:py-32 bg-bg-premium overflow-hidden">
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
            Client Voices
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-h1 font-display text-text-primary">
            What Our Clients Say
          </motion.h2>
        </motion.div>
      </div>

      {/* Scrolling Carousel */}
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Inline keyframes for the infinite scroll animation */}
        <style jsx>{`
          @keyframes testimonial-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .scroll-track {
            animation: testimonial-scroll 40s linear infinite;
          }
          .scroll-track.paused {
            animation-play-state: paused;
          }
        `}</style>

        <div
          className={`flex gap-6 scroll-track ${isPaused ? "paused" : ""}`}
          style={{ width: "max-content" }}
        >
          {allCards.map((testimonial, idx) => (
            <TestimonialCard key={`${testimonial.id}-${idx}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Share Your Experience Button */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-14 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={() => {
            // TODO: Wire up review modal (ReviewForm component)
            console.log("Open review modal");
          }}
          className="border border-accent-gold text-accent-gold rounded-full px-6 py-3 font-body text-sm hover:bg-accent-gold/10 transition-colors duration-300 cursor-pointer"
        >
          Share Your Experience
        </motion.button>
      </div>
    </section>
  );
}
