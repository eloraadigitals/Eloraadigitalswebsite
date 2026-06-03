"use client";

// =============================================================================
// ButterflyEffect — Refined slow-motion organic butterfly
// Translucent ivory, slow waving physics, elegant non-distracting wing flaps
// =============================================================================

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/** Lerp factor — lower = slower/more graceful trailing */
const LERP_FACTOR = 0.028;
/** Idle threshold in ms before figure-8 starts */
const IDLE_THRESHOLD = 2000;
/** Figure-8 amplitude in px */
const FIG8_AMP_X = 35;
const FIG8_AMP_Y = 15;
/** Figure-8 speed (radians per frame at 60fps) */
const FIG8_SPEED = 0.01;

export default function ButterflyEffect() {
  const pathname = usePathname();
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Refs for animation loop state — avoids re-renders
  const posRef = useRef({ x: -100, y: -100 }); // current position
  const lastPosRef = useRef({ x: -100, y: -100 }); // position in previous frame
  const targetRef = useRef({ x: -100, y: -100 }); // mouse target
  const lastMoveRef = useRef(Date.now());
  const angleRef = useRef(0); // Lissajous figure-8 angle
  const wingAngleRef = useRef(0); // Wing flap angle
  const flutterTimeRef = useRef(0); // High-frequency flutter noise timer
  const lastAngleRef = useRef(0); // Smoothed rotation angle
  
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const isAdminOrProfile = pathname.startsWith("/admin") || pathname.startsWith("/profile");

  // Track mouse position
  useEffect(() => {
    if (isTouchDevice || isAdminOrProfile) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Snap position on first move to prevent rapid fly-in from offscreen
      if (targetRef.current.x === -100) {
        posRef.current = { x: e.clientX, y: e.clientY };
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }
      targetRef.current = { x: e.clientX, y: e.clientY };
      lastMoveRef.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isTouchDevice, isAdminOrProfile]);

  // Animation loop
  useEffect(() => {
    if (isTouchDevice || isAdminOrProfile) return;

    const animate = () => {
      const svg = svgRef.current;
      if (!svg) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      const pos = posRef.current;
      const target = targetRef.current;
      const now = Date.now();
      const idleTime = now - lastMoveRef.current;

      let goalX = target.x;
      let goalY = target.y;

      // ── Figure-8 idle flight if cursor is inactive ──
      if (idleTime > IDLE_THRESHOLD) {
        angleRef.current += FIG8_SPEED;
        const t = angleRef.current;
        // Lissajous figure-8: x = sin(t), y = sin(2t)
        goalX = target.x + Math.sin(t) * FIG8_AMP_X;
        goalY = target.y + Math.sin(t * 2) * FIG8_AMP_Y;
      } else {
        angleRef.current = 0; // reset
      }

      // ── Lerp tracking (slowed down for elegant glide) ──
      pos.x += (goalX - pos.x) * LERP_FACTOR;
      pos.y += (goalY - pos.y) * LERP_FACTOR;

      // ── Organic low-frequency waves (smooth waving instead of jittery noise) ──
      flutterTimeRef.current += 0.025;
      const tFlutter = flutterTimeRef.current;
      const wiggleX = Math.sin(tFlutter) * 10 + Math.cos(tFlutter * 0.4) * 4;
      const wiggleY = Math.cos(tFlutter * 0.7) * 10 + Math.sin(tFlutter * 0.3) * 4;

      const renderX = pos.x + wiggleX;
      const renderY = pos.y + wiggleY;

      // ── Smooth heading calculation (pointing along velocity vector) ──
      const vx = pos.x - lastPosRef.current.x;
      const vy = pos.y - lastPosRef.current.y;
      
      // Save current position for next frame velocity check
      lastPosRef.current = { x: pos.x, y: pos.y };

      const speed = Math.sqrt(vx * vx + vy * vy);
      let headingAngle = lastAngleRef.current;

      if (speed > 0.3) {
        // Point along movement vector. Adding Math.PI / 2 because SVG faces straight up
        const targetAngle = Math.atan2(vy, vx) + Math.PI / 2;
        
        // Wrap diff to prevent rotational flips
        let diff = targetAngle - lastAngleRef.current;
        diff = Math.atan2(Math.sin(diff), Math.cos(diff));
        
        // Lerp angle for smooth, slow turns
        headingAngle = lastAngleRef.current + diff * 0.08;
      }
      lastAngleRef.current = headingAngle;
      const angleDeg = (headingAngle * 180) / Math.PI;

      // ── SVG positioning and rotation ──
      svg.style.transform = `translate(${renderX - 32}px, ${renderY - 32}px) rotate(${angleDeg}deg)`;

      // ── 3D wing flapping via horizontal scaleX ──
      // Gentle flaps. Scale goes between 0.4 (soft fold) and 1.0 (fully open) to look calm.
      const baseFlapSpeed = 0.04;
      const speedModifier = Math.min(speed * 0.015, 0.08); // flap slightly faster on movement
      wingAngleRef.current += baseFlapSpeed + speedModifier;
      
      const wingScale = 0.4 + Math.abs(Math.sin(wingAngleRef.current)) * 0.6;

      const leftWing = svg.querySelector("[data-wing='left']") as SVGElement | null;
      const rightWing = svg.querySelector("[data-wing='right']") as SVGElement | null;

      if (leftWing) {
        leftWing.style.transform = `scaleX(${wingScale})`;
        leftWing.style.transformOrigin = "32px 32px";
      }
      if (rightWing) {
        rightWing.style.transform = `scaleX(${wingScale})`;
        rightWing.style.transformOrigin = "32px 32px";
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isTouchDevice, isAdminOrProfile]);

  if (isTouchDevice || isAdminOrProfile) return null;

  return (
    <svg
      ref={svgRef}
      className="fixed top-0 left-0 pointer-events-none z-[98]"
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      style={{ willChange: "transform", transform: "translate(-100px, -100px)" }}
      aria-hidden="true"
    >
      {/* Left wing — translucent warm ivory / luxury cream */}
      <g data-wing="left" style={{ transformOrigin: "32px 32px" }}>
        <path
          d="M32 32C28 24 20 16 12 20C4 24 8 36 16 40C24 44 30 36 32 32Z"
          fill="#FAF7F2"
          fillOpacity="0.65"
          stroke="#C6A56B"
          strokeWidth="0.5"
        />
        {/* Inner wing details */}
        <path
          d="M32 32C28 26 22 20 16 24C12 26 14 34 20 36C26 38 30 34 32 32Z"
          fill="#C6A56B"
          fillOpacity="0.18"
        />
      </g>

      {/* Right wing — translucent gold tint */}
      <g data-wing="right" style={{ transformOrigin: "32px 32px" }}>
        <path
          d="M32 32C36 24 44 16 52 20C60 24 56 36 48 40C40 44 34 36 32 32Z"
          fill="#FAF7F2"
          fillOpacity="0.65"
          stroke="#C6A56B"
          strokeWidth="0.5"
        />
        {/* Inner wing details */}
        <path
          d="M32 32C36 26 42 20 48 24C52 26 50 34 44 36C38 38 34 34 32 32Z"
          fill="#C6A56B"
          fillOpacity="0.18"
        />
      </g>

      {/* Center Body */}
      <ellipse cx="32" cy="32" rx="1.5" ry="5.5" fill="#C6A56B" fillOpacity="0.6" />
    </svg>
  );
}
