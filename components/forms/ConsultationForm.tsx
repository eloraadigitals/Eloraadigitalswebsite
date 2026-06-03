"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { SERVICES } from "@/lib/utils/constants";
import { bookConsultation } from "@/lib/firebase/firestore";
import { useAuth } from "@/lib/firebase/auth";

interface ConsultationFormProps {
  onSuccessCallback?: () => void;
}

export default function ConsultationForm({ onSuccessCallback }: ConsultationFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    phone: "",
    businessName: "",
    service: SERVICES[0].title,
    preferredDate: "",
    preferredTime: "10:00 AM",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Time slots generated from 10:00 AM to 7:00 PM
  const timeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
    "06:00 PM", "06:30 PM", "07:00 PM"
  ];

  // Get current date string for input 'min' attribute (YYYY-MM-DD)
  const todayStr = new Date().toISOString().split("T")[0];

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

    // Validations
    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      setIsSubmitting(false);
      return;
    }
    if (!formData.businessName.trim()) {
      setErrorMsg("Please enter your business name.");
      setIsSubmitting(false);
      return;
    }
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      setIsSubmitting(false);
      return;
    }
    if (!formData.preferredDate) {
      setErrorMsg("Please choose a preferred date.");
      setIsSubmitting(false);
      return;
    }

    try {
      const submissionData = {
        uid: user?.uid || null,
        name: formData.name,
        phone: formData.phone,
        businessName: formData.businessName,
        service: formData.service,
        preferredDate: new Date(formData.preferredDate),
        preferredTime: formData.preferredTime,
        notes: formData.notes,
      };

      await bookConsultation(submissionData);

      setIsSuccess(true);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to book consultation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-12 h-12 bg-accent-gold/10 border border-accent-gold rounded-full flex items-center justify-center mx-auto text-accent-gold"
        >
          <Check className="w-6 h-6" />
        </motion.div>
        <h3 className="font-display text-lg text-text-primary">
          Consultation Requested
        </h3>
        <p className="font-body text-xs text-text-secondary leading-relaxed max-w-xs mx-auto">
          We have registered your slot request. Our strategist will call you to confirm the appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMsg && (
        <div className="flex gap-2 items-center bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-body">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-1">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-3 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold"
          />
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-1">
            Business Name *
          </label>
          <input
            type="text"
            name="businessName"
            required
            placeholder="E.g. Patil Foods"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-3 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="10-digit number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-3 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold"
          />
        </div>

        {/* Service dropdown */}
        <div>
          <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-1">
            Service Required
          </label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-3 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold cursor-pointer"
          >
            {SERVICES.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Preferred Date */}
        <div>
          <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-1">
            Preferred Date *
          </label>
          <input
            type="date"
            name="preferredDate"
            required
            min={todayStr}
            value={formData.preferredDate}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-3 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold cursor-pointer"
          />
        </div>

        {/* Preferred Time */}
        <div>
          <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-1">
            Preferred Time
          </label>
          <select
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-3 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold cursor-pointer"
          >
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-1">
          Additional Notes
        </label>
        <textarea
          name="notes"
          rows={3}
          placeholder="Let us know any details about your website, traffic, ad accounts..."
          value={formData.notes}
          onChange={handleChange}
          className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-3 py-2 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-dark-accent hover:bg-dark-accent/90 text-bg-premium rounded-full font-body font-semibold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Booking Slot...
          </>
        ) : (
          "Request Booking"
        )}
      </button>
    </form>
  );
}
