"use client";

// Inline Instagram SVG Icon to avoid missing brands in newer Lucide React versions
const Instagram = ({ size = 24, className = "", strokeWidth = 2 }: { size?: number; className?: string; strokeWidth?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

import { motion } from "framer-motion";
import { CONTACT } from "@/lib/utils/constants";
import Image from "next/image";
import {
  fadeUp,
  staggerContainer,
  staggerFast,
  viewportConfig,
} from "@/lib/utils/animations";

// =============================================================================
// InstagramShowcase — Grid of actual Instagram posts and CTA
// =============================================================================

const INSTAGRAM_POSTS = [
  { id: 1, image: "/instagram_1.jpg", likes: 245, comments: 18 },
  { id: 2, image: "/instagram_2.jpg", likes: 189, comments: 14 },
  { id: 3, image: "/instagram_3.jpg", likes: 312, comments: 27 },
  { id: 4, image: "/instagram_4.jpg", likes: 204, comments: 22 },
  { id: 5, image: "/instagram_5.jpg", likes: 415, comments: 39 },
] as const;

export default function InstagramShowcase() {
  return (
    <section className="py-24 md:py-32 bg-bg-main relative overflow-hidden">
      {/* Decorative light background gradient circles */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-accent-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="mb-16 md:mb-20 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="text-caption uppercase tracking-[0.2em] text-accent-gold mb-4"
          >
            Insights & Updates
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-h1 font-display text-text-primary">
            <a
              href={CONTACT.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-gold transition-colors duration-300 flex items-center justify-center gap-3"
            >
              <Instagram size={36} strokeWidth={1.5} className="text-accent-gold" />
              <span>{CONTACT.instagram.handle}</span>
            </a>
          </motion.h2>
        </motion.div>

        {/* 3-column grid for vertical posts */}
        <motion.div
          variants={staggerFast}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {INSTAGRAM_POSTS.map((post) => (
            <motion.a
              key={post.id}
              href={CONTACT.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-bg-card border border-border-brand/35 shadow-luxury group block"
            >
              {/* Actual Image */}
              <Image
                src={post.image}
                alt={`Eloraa Digitals Instagram Post ${post.id}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Glass-like Vignette/Border Overlay */}
              <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none z-10" />

              {/* Hover Overlay with engagement metrics */}
              <div className="absolute inset-0 bg-dark-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20">
                <Instagram className="text-bg-premium" size={28} strokeWidth={1.5} />
                <div className="flex items-center gap-4 text-bg-premium text-sm font-body font-medium">
                  <span>❤️ {post.likes}</span>
                  <span>💬 {post.comments}</span>
                </div>
              </div>
            </motion.a>
          ))}

          {/* 6th Card: Elegant Call to Action to Follow */}
          <motion.a
            href={CONTACT.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={fadeUp}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-accent-gold/45 bg-gradient-to-br from-bg-card via-bg-premium to-accent-gold/15 p-8 flex flex-col justify-between group shadow-luxury text-center lg:text-left"
          >
            {/* Top icon and badge */}
            <div className="flex justify-between items-start">
              <span className="font-body text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-accent-gold/30 bg-accent-gold/5 text-accent-gold font-semibold">
                Join Our Community
              </span>
              <Instagram className="text-accent-gold/80" size={28} strokeWidth={1.5} />
            </div>

            {/* Centered CTA content */}
            <div className="my-auto space-y-4">
              <h3 className="font-display text-2xl md:text-3xl text-text-primary leading-tight">
                Empowering Brands in Nashik & Beyond
              </h3>
              <p className="font-body text-xs text-text-secondary leading-relaxed max-w-xs mx-auto lg:mx-0">
                Get daily marketing audits, case studies, business growth frameworks, and digital strategy secrets directly on your feed.
              </p>
            </div>

            {/* Bottom Button */}
            <div className="inline-flex items-center justify-center gap-2 bg-dark-accent text-bg-premium font-body text-sm font-semibold rounded-full py-3.5 px-6 w-full hover:shadow-luxury-md transition-shadow">
              Follow @eloraadigitals
              <span>→</span>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
