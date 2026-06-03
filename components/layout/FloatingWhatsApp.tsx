"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// =============================================================================
// FloatingWhatsApp — Fixed bottom-right WhatsApp CTA button
// Pulsing ring animation, hover-reveal label on desktop, always visible on mobile
// =============================================================================

const WHATSAPP_URL =
  "https://wa.me/918669183526?text=Hi%20Eloraa%20Digitals%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const isAdminOrProfile = pathname.startsWith("/admin") || pathname.startsWith("/profile");

  if (isAdminOrProfile) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center gap-3 rounded-2xl bg-dark-accent ring-2 ring-accent-gold/50 px-4 py-3 shadow-luxury transition-shadow duration-300 hover:shadow-luxury-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        aria-label="Chat with us on WhatsApp"
      >
        {/* Pulsing ring animation */}
        <span
          className="absolute inset-0 rounded-2xl ring-2 ring-accent-gold/40 animate-whatsapp-pulse pointer-events-none"
          aria-hidden="true"
        />

        {/* WhatsApp SVG icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#25D366"
          className="w-7 h-7 shrink-0"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>

        {/* Text label: hidden by default on desktop, visible on hover; always visible on mobile */}
        <span className="font-body text-sm text-bg-premium whitespace-nowrap max-w-0 md:max-w-0 md:group-hover:max-w-[120px] md:overflow-hidden md:transition-all md:duration-300 md:opacity-0 md:group-hover:opacity-100 block max-md:max-w-none max-md:opacity-100">
          Chat with us
        </span>
      </motion.a>

      {/* Keyframe animation for the pulsing ring */}
      <style jsx>{`
        @keyframes whatsapp-pulse {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.08);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        :global(.animate-whatsapp-pulse) {
          animation: whatsapp-pulse 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
