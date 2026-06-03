"use client";

import { motion } from "framer-motion";
import { Target, TrendingUp, Users, Award } from "lucide-react";
import Image from "next/image";
import { fadeUp, viewportConfig, staggerContainer } from "@/lib/utils/animations";

export default function AboutContent() {
  const values = [
    {
      icon: Target,
      title: "Results-Driven",
      description: "We don't focus on vanity metrics like clicks. We focus on leads, sales, and ROI.",
    },
    {
      icon: TrendingUp,
      title: "Scalable Funnels",
      description: "We design marketing systems built to capture, nurture, and scale customer volume.",
    },
    {
      icon: Users,
      title: "Client-Centric",
      description: "We treat your marketing budget like our own, ensuring absolute efficiency and transparency.",
    },
    {
      icon: Award,
      title: "Premium Execution",
      description: "Every visual, copy, and code asset is crafted to represent the premium quality of your brand.",
    },
  ];

  const differentiators = [
    {
      number: "01",
      title: "Data-Driven Decisions",
      description: "Every campaign is optimized using clean attribution models, user journey data, and rigorous A/B testing.",
    },
    {
      number: "02",
      title: "Transparent Reporting",
      description: "No confusing reports. You get clean dashboards tracking actual business goals: leads, customer acquisition cost, and revenue.",
    },
    {
      number: "03",
      title: "India-First Approach",
      description: "We understand Indian consumer psychology, local market dynamics, and regional preferences across tier-1, 2, and 3 cities.",
    },
    {
      number: "04",
      title: "Performance Obsessed",
      description: "Our agency is built on the philosophy of continuous optimization. If a campaign isn't meeting goals, we pivot and refine.",
    },
  ];

  const team = [
    {
      initials: "MA",
      name: "Makarand A.",
      role: "Founder & Lead Strategist",
      bio: "Visionary performance marketer and entrepreneur dedicated to scaling Indian brands through bespoke revenue-driven digital funnels and ROI optimization.",
    },
  ];

  return (
    <main className="w-full bg-bg-main overflow-hidden pt-24">
      {/* Hero Banner */}
      <section className="bg-bg-premium py-24 md:py-32 relative overflow-hidden">
        {/* Fading Divider */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-brand/35 to-transparent z-10" />
        {/* Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-25 z-0">
          <Image
            src="/about_hero_bg.png"
            alt="About Us Background"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeUp}
            className="max-w-4xl"
          >
            <span className="text-caption uppercase tracking-[0.2em] text-accent-gold block mb-4">
              Our Story
            </span>
            <h1 className="text-h1 font-display text-text-primary mb-8 leading-tight">
              We Don't Just Run Ads.<br />We Engineer Growth.
            </h1>
            <p className="font-body text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
              Based in Nashik, Maharashtra, Eloraa Digitals is a bespoke digital marketing and performance agency. 
              We partner with forward-thinking Indian businesses and entrepreneurs to build marketing funnels 
              that turn attention into revenue. No complexity, no generic packages, just relentless optimization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Quote */}
      <section className="py-20 bg-bg-main relative">
        {/* Fading Divider */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-brand/20 to-transparent z-10" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeUp}
          >
            <span className="text-5xl md:text-6xl text-accent-gold/40 font-display block mb-2">“</span>
            <h2 className="text-2xl md:text-3xl font-display italic text-accent-gold/90 leading-relaxed px-4 md:px-12">
              Empowering brands with smart strategies, storytelling, and measurable growth.
            </h2>
            <span className="text-5xl md:text-6xl text-accent-gold/40 font-display block mt-4">”</span>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-bg-card relative">
        {/* Fading Divider */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-brand/35 to-transparent z-10" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-caption uppercase tracking-[0.2em] text-accent-gold block mb-2">
              Our Pillars
            </span>
            <h2 className="text-h2 font-display text-text-primary">
              Core Agency Values
            </h2>
            <div className="w-12 h-[1px] bg-accent-gold mx-auto mt-4" />
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="bg-bg-premium rounded-2xl p-8 text-center border border-border-brand/30 shadow-luxury hover:border-accent-gold/40 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-accent-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-accent-gold/20 transition-all">
                    <Icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <h3 className="font-body font-semibold text-text-primary mb-3 text-lg">
                    {val.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed">
                    {val.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Differentiators / Why Eloraa */}
      <section className="py-24 bg-bg-premium relative">
        {/* Fading Divider */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-brand/35 to-transparent z-10" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-16">
            <div className="lg:col-span-1">
              <span className="text-caption uppercase tracking-[0.2em] text-accent-gold block mb-2">
                Why Us
              </span>
              <h2 className="text-h2 font-display text-text-primary leading-tight">
                The Eloraa Advantage
              </h2>
              <p className="font-body text-text-secondary mt-4 leading-relaxed">
                We design premium frameworks built around your target metrics. Here is how we do things differently.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
              {differentiators.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial="initial"
                  whileInView="animate"
                  viewport={viewportConfig}
                  variants={fadeUp}
                  className="flex gap-4 items-start"
                >
                  <span className="text-h3 font-display text-accent-gold/30 pt-1">
                    {item.number}
                  </span>
                  <div>
                    <h3 className="font-body font-semibold text-text-primary text-base uppercase tracking-wider mb-2">
                      {item.title}
                    </h3>
                    <p className="font-body text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Placeholder */}
      <section className="py-24 bg-bg-main relative">
        {/* Fading Divider */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-brand/35 to-transparent z-10" />
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-caption uppercase tracking-[0.2em] text-accent-gold block mb-2">
              Leadership
            </span>
            <h2 className="text-h2 font-display text-text-primary">
              Meet the Strategists
            </h2>
            <div className="w-12 h-[1px] bg-accent-gold mx-auto mt-4" />
          </div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={staggerContainer}
            className="flex justify-center w-full"
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="bg-bg-card rounded-2xl p-8 border border-border-brand/30 shadow-luxury hover:border-accent-gold/20 transition-all text-center max-w-md w-full"
              >
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-accent-gold/30 to-accent-gold/10 flex items-center justify-center mx-auto mb-6 text-xl font-display text-accent-gold font-semibold shadow-inner">
                  {member.initials}
                </div>
                <h3 className="font-body font-semibold text-lg text-text-primary">
                  {member.name}
                </h3>
                <span className="text-caption uppercase tracking-wider text-accent-gold text-xs block mt-1 mb-4">
                  {member.role}
                </span>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <p className="text-center text-xs text-text-secondary/50 mt-12 italic">
            {/* TODO: Replace with real team photos and bios */}
            Note: Team portraits and custom biographies will be loaded dynamically.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-bg-premium">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-caption uppercase tracking-[0.2em] text-accent-gold block mb-2">
              Visit Us
            </span>
            <h2 className="text-h2 font-display text-text-primary">
              Our Base in Nashik
            </h2>
          </div>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={viewportConfig}
            variants={fadeUp}
            className="rounded-2xl overflow-hidden shadow-luxury border border-border-brand/40"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120536.68974866922!2d73.72853779999999!3d19.9974533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bddeba2a6404597%3A0x52be1b8aba484e13!2sNashik%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
