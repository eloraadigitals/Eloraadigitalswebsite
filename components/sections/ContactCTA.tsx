"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";
import { CONTACT } from "@/lib/utils/constants";
import { fadeUp, staggerContainer, viewportConfig } from "@/lib/utils/animations";

// =============================================================================
// ContactCTA — Swipe-to-contact CTA with WhatsApp integration
// =============================================================================

/** Track width and handle size constants */
const TRACK_WIDTH = 320;
const HANDLE_SIZE = 48;
const TRACK_PADDING = 8;
const MAX_DRAG = TRACK_WIDTH - HANDLE_SIZE - TRACK_PADDING * 2;
const TRIGGER_THRESHOLD = MAX_DRAG * 0.7;

export default function ContactCTA() {
  const [isComplete, setIsComplete] = useState(false);
  const constraintRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);

  // Fade out "Contact Now" text as handle is dragged
  const textOpacity = useTransform(dragX, [0, MAX_DRAG * 0.5], [0.6, 0]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const dragDistance = info.offset.x;

      if (dragDistance >= TRIGGER_THRESHOLD) {
        // Trigger: animate to end, show checkmark, open WhatsApp
        setIsComplete(true);
        setTimeout(() => {
          window.open(CONTACT.whatsapp.link, "_blank", "noopener,noreferrer");
          // Reset after WhatsApp opens
          setTimeout(() => {
            setIsComplete(false);
            dragX.set(0);
          }, 1000);
        }, 600);
      }
    },
    [dragX]
  );

  return (
    <section className="py-24 md:py-32 bg-bg-card relative overflow-hidden noise-overlay">
      {/* ── Background Image Layer ── */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-25 z-0">
        <Image
          src="/cta_bg.png"
          alt="Contact CTA Background"
          fill
          className="object-cover"
        />
      </div>
      {/* Content sits above the noise overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportConfig}
          className="text-center"
        >
          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="text-h1 font-display text-text-primary mb-4"
          >
            Ready to Scale Your Brand?
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="font-body text-xl text-text-secondary mb-14"
          >
            Let&apos;s build something remarkable together.
          </motion.p>

          {/* Swipe Button */}
          <motion.div variants={fadeUp} className="flex flex-col items-center gap-6">
            <div
              ref={constraintRef}
              className="relative w-[320px] h-[64px] bg-dark-accent rounded-full mx-auto flex items-center"
              style={{ padding: `${TRACK_PADDING}px` }}
            >
              {/* Track Text */}
              <motion.span
                className="absolute inset-0 flex items-center justify-center font-body text-sm text-bg-premium pointer-events-none select-none"
                style={{ opacity: textOpacity }}
              >
                Contact Now
              </motion.span>

              {/* Arrow Indicator */}
              <div className="absolute right-5 top-1/2 -translate-y-1/2 text-bg-premium/40 pointer-events-none">
                <ArrowRight size={20} />
              </div>

              {/* Draggable Handle */}
              {isComplete ? (
                <motion.div
                  className="w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center z-10"
                  initial={{ x: 0 }}
                  animate={{ x: MAX_DRAG }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Check className="text-dark-accent" size={22} strokeWidth={2.5} />
                </motion.div>
              ) : (
                <motion.div
                  className="w-12 h-12 bg-accent-gold rounded-full flex items-center justify-center z-10 cursor-grab active:cursor-grabbing"
                  style={{
                    x: dragX,
                    touchAction: "none",
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: MAX_DRAG }}
                  dragElastic={0.05}
                  dragMomentum={false}
                  onDragEnd={handleDragEnd}
                >
                  <MessageCircle className="text-dark-accent" size={20} />
                </motion.div>
              )}
            </div>

            {/* Fallback Link */}
            <p className="font-body text-sm text-text-secondary">
              Or simply{" "}
              <a
                href={CONTACT.whatsapp.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-gold underline underline-offset-4 hover:text-accent-gold/80 transition-colors duration-200"
              >
                Contact on WhatsApp →
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
