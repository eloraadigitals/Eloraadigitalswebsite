"use client";

import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Eagerly loaded sections (above the fold)
import Hero from "@/components/sections/Hero";

// Dynamically imported sections (below the fold — improves initial load)
const TrustMetrics = dynamic(() => import("@/components/sections/TrustMetrics"), {
  ssr: false,
});
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  ssr: false,
});
const InstagramShowcase = dynamic(
  () => import("@/components/sections/InstagramShowcase"),
  { ssr: false }
);
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA"), {
  ssr: false,
});
const FAQ = dynamic(() => import("@/components/sections/FAQ"), {
  ssr: false,
});

// Effects — client-only, heavy components
const Preloader = dynamic(() => import("@/components/effects/Preloader"), {
  ssr: false,
});

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  useEffect(() => {
    // Check if preloader has already been shown this session
    if (typeof window !== "undefined") {
      const shown = sessionStorage.getItem("preloaderShown");
      if (shown) {
        setShowPreloader(false);
        setPreloaderComplete(true);
      }
    }
  }, []);

  const handlePreloaderComplete = () => {
    setShowPreloader(false);
    setPreloaderComplete(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("preloaderShown", "true");
    }
  };

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {showPreloader && (
          <Preloader onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <Hero />
        <TrustMetrics />
        <CaseStudies />
        <Testimonials />
        <InstagramShowcase />
        <ContactCTA />
        <FAQ />
      </main>
    </>
  );
}
