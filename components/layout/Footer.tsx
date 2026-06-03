"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { CONTACT, NAVIGATION, SITE_CONFIG } from "@/lib/utils/constants";
import { usePathname } from "next/navigation";

// Inline Instagram SVG Icon to avoid missing brands in newer Lucide React versions
const Instagram = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


export default function Footer() {
  const pathname = usePathname();
  const isAdminOrProfile = pathname.startsWith("/admin") || pathname.startsWith("/profile");

  if (isAdminOrProfile) return null;

  return (
    <footer className="bg-dark-accent text-bg-premium" role="contentinfo">
      {/* ── Main footer content ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* ── Column 1: Brand ── */}
          <div className="lg:border-r lg:border-bg-premium/10 lg:pr-8">
            <h3 className="font-display text-xl text-bg-premium mb-3">
              {SITE_CONFIG.name}
            </h3>
            <p className="font-body text-sm text-bg-premium/60 leading-relaxed mb-6">
              {SITE_CONFIG.tagline}
            </p>
            <a
              href={CONTACT.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-bg-premium/70 hover:text-accent-gold transition-colors duration-300 group"
              aria-label={`Follow us on Instagram ${CONTACT.instagram.handle}`}
            >
              <Instagram
                size={18}
                className="group-hover:scale-110 transition-transform duration-300"
              />
              <span>{CONTACT.instagram.handle}</span>
            </a>
          </div>

          {/* ── Column 2: Navigation ── */}
          <div className="lg:border-r lg:border-bg-premium/10 lg:px-8">
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-bg-premium/40 mb-5">
              Navigation
            </h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {NAVIGATION.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-body text-sm text-bg-premium/70 hover:text-accent-gold transition-colors duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Column 3: Contact ── */}
          <div className="lg:border-r lg:border-bg-premium/10 lg:px-8">
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-bg-premium/40 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-3 font-body text-sm text-bg-premium/70 hover:text-accent-gold transition-colors duration-300 group"
                >
                  <Mail
                    size={16}
                    className="mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 font-body text-sm text-bg-premium/70 hover:text-accent-gold transition-colors duration-300 group"
                >
                  <Phone
                    size={16}
                    className="mt-0.5 shrink-0 group-hover:scale-110 transition-transform duration-300"
                  />
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 font-body text-sm text-bg-premium/70">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>{CONTACT.location}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* ── Column 4: Legal ── */}
          <div className="lg:pl-8">
            <h4 className="font-body text-xs uppercase tracking-[0.2em] text-bg-premium/40 mb-5">
              Legal
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="font-body text-sm text-bg-premium/70 hover:text-accent-gold transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="font-body text-sm text-bg-premium/70 hover:text-accent-gold transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-bg-premium/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="font-body text-caption text-bg-premium/40 text-center">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            {" · "}
            {CONTACT.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
