"use client";

// =============================================================================
// ParallaxLayer — GSAP ScrollTrigger Y-translate based on scroll
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxLayerProps {
  /** Parallax speed — 0.1 (slow) to 1 (full scroll speed) */
  speed: number;
  children: React.ReactNode;
  className?: string;
}

export default function ParallaxLayer({
  speed,
  children,
  className = "",
}: ParallaxLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const el = containerRef.current;

    // Calculate Y offset based on speed: higher speed = more movement
    const yOffset = 100 * speed;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -yOffset },
        {
          y: yOffset,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed, isMobile]);

  // On mobile, render children directly without parallax
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
