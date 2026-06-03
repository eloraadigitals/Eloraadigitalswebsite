"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  fadeUp,
  staggerContainer,
  EASE_LUXURY,
} from "@/lib/utils/animations";

// =============================================================================
// Hero — Full-viewport hero with GSAP parallax layers
// =============================================================================

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Luxury silk-curve SVG — abstract decorative shape */
const SilkCurveSVG = () => (
  <svg
    viewBox="0 0 600 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
    aria-hidden="true"
  >
    <path
      d="M450 0C450 0 600 150 550 300C500 450 350 400 300 550C250 700 400 800 400 800"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      opacity="0.5"
    />
    <path
      d="M500 50C500 50 580 200 520 350C460 500 320 470 280 600C240 730 380 780 380 780"
      fill="currentColor"
      opacity="0.08"
    />
    <path
      d="M420 20C420 20 560 180 500 330C440 480 340 430 290 570C240 710 390 790 390 790"
      fill="currentColor"
      opacity="0.05"
    />
  </svg>
);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);
  const ampersandRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for parallax simplification
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // GSAP ScrollTrigger parallax
  useEffect(() => {
    if (isMobile || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const trigger = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      };

      // Layer 2: Radial gradient (0.25x speed)
      if (gradientRef.current) {
        gsap.to(gradientRef.current, {
          y: "-25%",
          ease: "none",
          scrollTrigger: trigger,
        });
      }

      // Layer 3: SVG shape (0.4x speed)
      if (svgRef.current) {
        gsap.to(svgRef.current, {
          y: "-40%",
          ease: "none",
          scrollTrigger: trigger,
        });
      }

      // Layer 4: Ampersand (0.6x speed)
      if (ampersandRef.current) {
        gsap.to(ampersandRef.current, {
          y: "-60%",
          ease: "none",
          scrollTrigger: trigger,
        });
      }

      // Layer 5: Content (1x speed — natural scroll)
      // Content scrolls naturally, no GSAP needed
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-bg-premium overflow-hidden noise-overlay flex items-center"
    >
      {/* ── Layer 1: Luxury Background Canvas Image ── */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-30 z-0">
        <Image
          src="/hero_bg.png"
          alt="Luxury Background Canvas"
          fill
          priority
          className="object-cover"
        />
      </div>
      {/* ── Layer 2: Radial gradient circle ── */}
      {!isMobile && (
        <div
          ref={gradientRef}
          className="absolute inset-0 pointer-events-none will-change-transform"
          style={{ zIndex: 2 }}
          aria-hidden="true"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
            style={{
              width: "60vw",
              height: "60vw",
              background:
                "radial-gradient(circle, rgba(198,165,107,0.15) 0%, rgba(250,247,242,0.3) 40%, transparent 70%)",
            }}
          />
        </div>
      )}

      {/* ── Layer 3: Abstract SVG shape ── */}
      {!isMobile && (
        <div
          ref={svgRef}
          className="absolute right-0 top-0 w-[40vw] h-full pointer-events-none will-change-transform text-warm-beige opacity-15"
          style={{ zIndex: 3 }}
          aria-hidden="true"
        >
          <SilkCurveSVG />
        </div>
      )}

      {/* ── Layer 4: Large faded "&" character ── */}
      {!isMobile && (
        <div
          ref={ampersandRef}
          className="absolute left-[-2rem] bottom-[-4rem] pointer-events-none will-change-transform select-none"
          style={{ zIndex: 4 }}
          aria-hidden="true"
        >
          <span className="font-display text-[20rem] leading-none text-warm-beige/10">
            &amp;
          </span>
        </div>
      )}

      {/* ── Layer 5: Main hero content ── */}
      <div
        ref={contentRef}
        className="relative w-full"
        style={{ zIndex: 10 }}
      >
        <motion.div
          className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-32 text-center lg:text-left"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Eyebrow */}
          <motion.p
            variants={fadeUp}
            className="font-body text-sm tracking-[0.2em] uppercase text-text-secondary mb-6"
          >
            Performance Marketing Agency · Nashik, India
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-display font-display text-text-primary mb-6 max-w-4xl lg:max-w-none"
          >
            Grow Your Business
            <br />
            <span className="text-gold-gradient">with Eloraa Digitals</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="font-body text-lg md:text-xl text-text-secondary max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
          >
            Turning Clicks into Customers — Smart digital and performance
            marketing strategies built for measurable, scalable growth.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link
              href="/contact"
              className="bg-dark-accent text-bg-premium px-8 py-4 rounded-full font-body font-semibold text-center transition-all duration-300 hover:shadow-luxury-lg hover:scale-[1.02] active:scale-[0.98]"
            >
              Get in Touch
            </Link>
            <Link
              href="/services"
              className="border border-accent-gold text-dark-accent px-8 py-4 rounded-full font-body text-center transition-all duration-300 hover:bg-accent-gold/10 hover:scale-[1.02] active:scale-[0.98]"
            >
              View Services →
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.5, duration: 0.6 } }}
      >
        <span className="font-body text-caption text-text-secondary tracking-wider uppercase text-xs">
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8 bg-accent-gold/50 origin-top"
          animate={{
            scaleY: [0, 1, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: EASE_LUXURY as any,
            },
          }}
        />
      </motion.div>
    </section>
  );
}
