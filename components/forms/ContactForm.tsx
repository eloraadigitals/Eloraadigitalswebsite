"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, AlertCircle, Loader2 } from "lucide-react";
import { SERVICES } from "@/lib/utils/constants";
import { submitContact } from "@/lib/firebase/firestore";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessName: "",
    service: "General Enquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Pre-select service from URL query params
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryService = params.get("service");
      if (queryService) {
        // Validate if service is one of our services
        const match = SERVICES.find(
          (s) => s.title.toLowerCase() === queryService.toLowerCase()
        );
        if (match) {
          setFormData((prev) => ({ ...prev, service: match.title }));
        }
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    // Form validation
    if (!formData.name.trim()) {
      setErrorMsg("Please enter your full name.");
      setIsSubmitting(false);
      return;
    }
    if (!formData.businessName.trim()) {
      setErrorMsg("Please enter your business or company name.");
      setIsSubmitting(false);
      return;
    }
    
    // Indian phone format check: 10 digits starting with 6-9, optional +91 prefix
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.message.trim()) {
      setErrorMsg("Please add some details about your goals.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (isFirebaseConfigured()) {
        await submitContact(formData);
      } else {
        // Log to console for local testing when Firebase is not setup yet
        console.log("Firebase not configured. Simulated form submission:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }

      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        businessName: "",
        service: "General Enquiry",
        message: "",
      });

      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center p-8 bg-bg-card border border-accent-gold/30 rounded-2xl min-h-[400px] shadow-luxury"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-16 h-16 bg-accent-gold/10 border-2 border-accent-gold rounded-full flex items-center justify-center mb-6 text-accent-gold"
        >
          <Check className="w-8 h-8" />
        </motion.div>
        <h3 className="font-display text-h3 text-text-primary mb-3">
          Message Received
        </h3>
        <p className="font-body text-text-secondary max-w-sm leading-relaxed mb-6">
          Thank you for reaching out. The Eloraa Digitals team will audit your query and contact you within 24 hours.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="font-body font-semibold text-accent-gold hover:underline text-sm"
        >
          Submit another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg-card rounded-2xl p-8 border border-border-brand/40 shadow-luxury space-y-6"
    >
      <div className="space-y-2">
        <h3 className="font-display text-h3 text-text-primary">
          Send Message
        </h3>
        <p className="font-body text-xs text-text-secondary">
          Fill out this form, and we will get back to you with strategic recommendations.
        </p>
      </div>

      {errorMsg && (
        <div className="flex gap-2 items-center bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-body">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Full Name */}
        <div>
          <label htmlFor="name" className="block text-xs font-body uppercase tracking-wider text-text-secondary mb-2">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="E.g. Rajesh Patil"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-4 py-3 font-body text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>

        {/* Business Name */}
        <div>
          <label htmlFor="businessName" className="block text-xs font-body uppercase tracking-wider text-text-secondary mb-2">
            Business / Brand Name *
          </label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            required
            placeholder="E.g. Patil Foods"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-4 py-3 font-body text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-xs font-body uppercase tracking-wider text-text-secondary mb-2">
            Phone Number *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="E.g. 9876543210"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-4 py-3 font-body text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
          />
        </div>

        {/* Service Dropdown */}
        <div>
          <label htmlFor="service" className="block text-xs font-body uppercase tracking-wider text-text-secondary mb-2">
            Service of Interest
          </label>
          <div className="relative">
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-4 py-3 font-body text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors appearance-none cursor-pointer"
            >
              <option value="General Enquiry">General Enquiry</option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-xs font-body uppercase tracking-wider text-text-secondary mb-2">
            How can we help you? *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            placeholder="Tell us about your project goals, marketing budget, and business timeline..."
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-4 py-3 font-body text-sm text-text-primary focus:outline-none focus:border-accent-gold transition-colors resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 bg-dark-accent hover:bg-dark-accent/90 text-bg-premium w-full py-4 rounded-full font-body font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-luxury-md"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting Inquiry...
          </>
        ) : (
          "Get in Touch"
        )}
      </button>
    </form>
  );
}
