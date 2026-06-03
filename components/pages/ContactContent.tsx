"use client";

import { Mail, MessageSquare, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { CONTACT } from "@/lib/utils/constants";
import { fadeUp, viewportConfig } from "@/lib/utils/animations";
import ContactForm from "@/components/forms/ContactForm";

const Instagram = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
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


export default function ContactContent() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      label: "Send inquiry",
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Chat",
      value: CONTACT.phone,
      href: CONTACT.whatsapp.link,
      label: "Message on WhatsApp",
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: CONTACT.instagram.handle,
      href: CONTACT.instagram.url,
      label: "Follow us",
    },
    {
      icon: MapPin,
      title: "Our Location",
      value: CONTACT.location,
      href: "https://maps.google.com/?q=Nashik,+Maharashtra,+India",
      label: "Open in Maps",
    },
  ];

  return (
    <main className="w-full bg-bg-main overflow-hidden pt-24">
      {/* Hero section */}
      <section className="bg-bg-premium py-20 relative overflow-hidden">
        {/* Fading Divider */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-brand/35 to-transparent z-10" />
        {/* Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-25 z-0">
          <Image
            src="/contact_hero_bg.png"
            alt="Contact Us Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeUp}
            className="max-w-2xl mx-auto"
          >
            <span className="text-caption uppercase tracking-[0.2em] text-accent-gold block mb-3">
              Let's Connect
            </span>
            <h1 className="text-h1 font-display text-text-primary mb-4 leading-tight">
              Get in Touch
            </h1>
            <p className="font-body text-base text-text-secondary leading-relaxed">
              We're excited to partner with you. Drop us a line below or message us directly via our social links.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={viewportConfig}
              variants={fadeUp}
              className="space-y-4"
            >
              <h2 className="text-h3 font-display text-text-primary">
                Contact Information
              </h2>
              <p className="font-body text-sm text-text-secondary leading-relaxed">
                Whether you want to discuss a potential partnership, audit your current digital ads, or simply say hello, we are here.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {contactInfo.map((info, idx) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={idx}
                    href={info.href}
                    target={info.title !== "Email Us" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    initial="initial"
                    whileInView="animate"
                    viewport={viewportConfig}
                    variants={fadeUp}
                    className="flex gap-5 items-center p-6 bg-bg-card rounded-2xl border border-border-brand/30 shadow-luxury hover:border-accent-gold/40 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold/20 transition-all shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-xs font-body uppercase tracking-wider text-text-secondary mb-1">
                        {info.title}
                      </span>
                      <span className="block font-body font-semibold text-text-primary text-sm truncate">
                        {info.value}
                      </span>
                      <span className="block text-xs font-body text-accent-gold mt-1 group-hover:underline">
                        {info.label} →
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeUp}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
