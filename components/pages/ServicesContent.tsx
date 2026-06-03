"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { SERVICES } from "@/lib/utils/constants";
import { fadeUp, viewportConfig } from "@/lib/utils/animations";

// Detailed custom data for each service's process and outcomes
const SERVICE_DETAILS: Record<number, {
  process: string[];
  outcomes: string[];
}> = {
  1: {
    process: ["Competitor ad auditing", "Creative asset design & scripting", "Conversion API & pixel setup", "Ad launch & dynamic creative testing"],
    outcomes: ["Significant boost in ROAS (Return on Ad Spend)", "Optimized, lowering Customer Acquisition Cost (CAC)", "Predictable pipeline of sales and qualified appointments"],
  },
  2: {
    process: ["Full funnel architecture mapping", "Multi-touch attribution integration", "Landing page conversion audits", "Budget optimization and scaling"],
    outcomes: ["Verified, end-to-end ROI tracking", "Reduction in ad spend waste on low-performing channels", "Scalable customer acquisition system"],
  },
  3: {
    process: ["Brand aesthetic & tone definition", "High-retention reel & video scripting", "Consistent content calendar execution", "Community interaction & follower growth"],
    outcomes: ["Cohesive, premium social media grid aesthetics", "Increased audience engagement and brand recall", "Active brand advocacy and organic leads"],
  },
  4: {
    process: ["Funnel leak and drop-off diagnosis", "Checkout flow friction removal", "Post-purchase upsell and cross-sell triggers", "Customer email/SMS flows configuration"],
    outcomes: ["Increased Average Order Value (AOV)", "Improved customer Lifetime Value (LTV)", "Higher customer retention rate"],
  },
  5: {
    process: ["Bespoke high-converting landing page creation", "Lead scoring quiz & form optimization", "Direct-response ad copy & messaging", "CRM sync and instant lead notifications"],
    outcomes: ["Consistent stream of high-intent, qualified leads", "Decreased Cost Per Lead (CPL)", "Direct pipeline to your sales representatives"],
  },
  6: {
    process: ["Influencer selection & alignment", "Deal negotiation & contract briefing", "Review process and content scheduling", "UTM parameter tracking for ROI mapping"],
    outcomes: ["Authentic alignment with respected personalities", "Sudden surge in brand search traffic & trust", "Highly shareable UGC (User Generated Content) assets"],
  },
  7: {
    process: ["High-intent search query mapping", "Bespoke blog and graphic writing", "On-page SEO optimization", "Distribution across social and email channels"],
    outcomes: ["Organic Google search traffic growth", "Establishment of brand as a Nashik/national authority", "Long-term organic leads without ongoing ad costs"],
  },
  8: {
    process: ["Analytics tracking validation (GTM, GA4)", "Competitor performance benchmarking", "User behavior heatmapping", "Strategic executive recommendation briefing"],
    outcomes: ["Clear insights into what parts of marketing work", "Identified untapped audience segments", "Data-backed blueprint for your next marketing move"],
  },
};

export default function ServicesContent() {
  return (
    <main className="w-full bg-bg-main overflow-hidden pt-24">
      {/* Hero Banner */}
      <section className="bg-bg-premium py-24 md:py-32 relative overflow-hidden">
        {/* Fading Divider */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-brand/35 to-transparent z-10" />
        {/* Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-25 z-0">
          <Image
            src="/services_hero_bg.png"
            alt="Our Services Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto px-6 text-center md:text-left relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeUp}
            className="max-w-4xl"
          >
            <span className="text-caption uppercase tracking-[0.2em] text-accent-gold block mb-4">
              Our Expertise
            </span>
            <h1 className="text-h1 font-display text-text-primary mb-6 leading-tight">
              Strategies Engineered<br />for Measurable Growth.
            </h1>
            <p className="font-body text-lg text-text-secondary max-w-2xl leading-relaxed">
              We build luxury digital solutions designed to drive revenue. 
              Explore our core capabilities and the proven process we apply to every brand.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="w-full">
        {SERVICES.map((service, index) => {
          const details = SERVICE_DETAILS[service.id] || { process: [], outcomes: [] };
          const isOdd = index % 2 === 1;
          const serviceNumber = String(service.id).padStart(2, "0");

          return (
            <section
              key={service.id}
              className={`py-20 md:py-28 relative transition-colors duration-300 ${
                isOdd ? "bg-bg-premium" : "bg-bg-main"
              }`}
            >
              {/* Fading Divider */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-brand/20 to-transparent z-10" />
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  {/* Service Headline */}
                  <div className="lg:col-span-5 flex flex-col justify-between">
                    <motion.div
                      initial="initial"
                      whileInView="animate"
                      viewport={viewportConfig}
                      variants={fadeUp}
                    >
                      <span className="text-h1 font-display text-accent-gold/25 block mb-2">
                        {serviceNumber}
                      </span>
                      <h2 className="text-h2 font-display text-text-primary mb-6">
                        {service.title}
                      </h2>
                      <p className="font-body text-text-secondary text-base leading-relaxed mb-6">
                        {service.description}
                      </p>
                    </motion.div>

                    <motion.div
                      initial="initial"
                      whileInView="animate"
                      viewport={viewportConfig}
                      variants={fadeUp}
                      className="pt-4"
                    >
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="inline-flex items-center gap-2 bg-dark-accent text-bg-premium hover:bg-dark-accent/90 transition-all font-body font-semibold px-6 py-3 rounded-full text-sm group"
                      >
                        Enquire for {service.title}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>

                  {/* Process & Outcomes */}
                  <div className="lg:col-span-7 space-y-10">
                    {/* Process */}
                    <motion.div
                      initial="initial"
                      whileInView="animate"
                      viewport={viewportConfig}
                      variants={fadeUp}
                      className="bg-bg-card rounded-2xl p-8 border border-border-brand/30 shadow-luxury"
                    >
                      <h3 className="font-body font-semibold text-text-primary text-sm uppercase tracking-wider mb-6">
                        Our Execution Process
                      </h3>
                      <div className="space-y-6">
                        {details.process.map((step, idx) => (
                          <div key={idx} className="flex gap-4 items-start">
                            <span className="w-6 h-6 rounded-full bg-accent-gold/10 text-accent-gold text-xs flex items-center justify-center font-display shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <p className="font-body text-sm text-text-secondary leading-relaxed">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Outcomes */}
                    <motion.div
                      initial="initial"
                      whileInView="animate"
                      viewport={viewportConfig}
                      variants={fadeUp}
                      className="px-4"
                    >
                      <h3 className="font-body font-semibold text-text-primary text-sm uppercase tracking-wider mb-4">
                        Target Outcomes
                      </h3>
                      <div className="space-y-3">
                        {details.outcomes.map((outcome, idx) => (
                          <div key={idx} className="flex gap-3 items-center">
                            <CheckCircle2 className="w-4 h-4 text-accent-gold shrink-0" />
                            <p className="font-body text-sm text-text-secondary">
                              {outcome}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </section>
    </main>
  );
}
