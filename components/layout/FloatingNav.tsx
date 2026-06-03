"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAVIGATION } from "@/lib/utils/constants";

// =============================================================================
// FloatingNav — Centered pill-shaped floating navigation dock
// Fixed at top, appears after 60px of scroll with slide-down + opacity animation
// =============================================================================

export default function FloatingNav() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Route check for admin/profile exclusion
  const isAdminOrProfile = pathname.startsWith("/admin") || pathname.startsWith("/profile");
  if (isAdminOrProfile) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl"
      >
        <nav
          className="glass-nav rounded-full border border-accent-gold/30 shadow-nav py-3 px-8 flex items-center justify-between gap-6"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* ── Logo area ── */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Eloraa Digitals — Home"
          >
            {/* LOGO_PLACEHOLDER — Replace with <Image> when logo is available */}
            <span className="font-display text-lg text-text-primary tracking-tight">
              Eloraa Digitals
            </span>
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-1">
            {/* Decorative separator between logo and links */}
            <span className="text-accent-gold/40 mr-3 select-none" aria-hidden="true">
              ·
            </span>

            {NAVIGATION.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    font-body text-sm px-3 py-1.5 rounded-full transition-colors duration-300
                    ${
                      isActive
                        ? "text-text-primary border-b-2 border-accent-gold"
                        : "text-text-secondary hover:text-text-primary"
                    }
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop CTA ── */}
          <motion.div className="hidden md:block shrink-0">
            <motion.a
              href="https://wa.me/918669183526?text=Hi%20Eloraa%20Digitals%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-dark-accent text-bg-premium font-body text-sm rounded-full px-6 py-2 transition-shadow duration-300 hover:shadow-luxury"
              whileHover={{ x: 2, y: -1, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Get in Touch
              <span aria-hidden="true">→</span>
            </motion.a>
          </motion.div>

          {/* ── Mobile hamburger ── */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full text-text-primary hover:bg-accent-gold/10 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>


      {/* ── Mobile drawer overlay ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-shadow-tone/30 md:hidden"
              onClick={() => setIsMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel — slides in from the right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm glass-strong border-l border-accent-gold/20 md:hidden"
            >
              <div className="flex flex-col h-full px-8 py-6">
                {/* Drawer header */}
                <div className="flex items-center justify-between mb-12">
                  <span className="font-display text-lg text-text-primary">
                    Menu
                  </span>
                  <button
                    type="button"
                    className="flex items-center justify-center w-10 h-10 rounded-full text-text-primary hover:bg-accent-gold/10 transition-colors"
                    onClick={() => setIsMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={22} />
                  </button>
                </div>

                {/* Drawer nav links */}
                <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
                  {NAVIGATION.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.05,
                          duration: 0.4,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <Link
                          href={item.href}
                          className={`
                            block font-body text-lg py-3 px-4 rounded-xl transition-all duration-300
                            ${
                              isActive
                                ? "text-text-primary bg-accent-gold/10 border-l-2 border-accent-gold"
                                : "text-text-secondary hover:text-text-primary hover:bg-accent-gold/5"
                            }
                          `}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Drawer CTA — pushed to bottom */}
                <div className="mt-auto pt-8">
                  <motion.a
                    href="https://wa.me/918669183526?text=Hi%20Eloraa%20Digitals%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-dark-accent text-bg-premium font-body text-base rounded-full px-6 py-3.5 transition-shadow duration-300 hover:shadow-luxury"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    Get in Touch
                    <span aria-hidden="true">→</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
