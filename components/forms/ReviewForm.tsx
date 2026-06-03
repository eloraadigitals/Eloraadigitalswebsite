"use client";

import { useState } from "react";
import { Star, Loader2, AlertCircle, Check } from "lucide-react";
import { submitReview } from "@/lib/firebase/firestore";
import { useAuth } from "@/lib/firebase/auth";

interface ReviewFormProps {
  onSuccessCallback?: () => void;
}

export default function ReviewForm({ onSuccessCallback }: ReviewFormProps) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    if (!user) {
      setErrorMsg("You must be logged in to submit a review.");
      setIsSubmitting(false);
      return;
    }

    if (!businessName.trim()) {
      setErrorMsg("Please enter your business or project name.");
      setIsSubmitting(false);
      return;
    }

    if (reviewText.trim().length < 20) {
      setErrorMsg("Your review must be at least 20 characters long.");
      setIsSubmitting(false);
      return;
    }

    try {
      const reviewData = {
        uid: user.uid,
        name: user.displayName || "Anonymous Client",
        businessName: businessName,
        rating,
        review: reviewText,
        profileImageUrl: user.photoURL || null,
      };

      await submitReview(reviewData);

      setIsSuccess(true);
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-12 h-12 bg-accent-gold/10 border border-accent-gold rounded-full flex items-center justify-center mx-auto text-accent-gold">
          <Check className="w-6 h-6" />
        </div>
        <h3 className="font-display text-lg text-text-primary">
          Review Submitted
        </h3>
        <p className="font-body text-xs text-text-secondary leading-relaxed max-w-xs mx-auto">
          Thank you for sharing your experience! Your review will be visible on our website once approved by our moderator.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errorMsg && (
        <div className="flex gap-2 items-center bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs font-body">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Star selector */}
      <div>
        <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-2">
          Your Rating
        </label>
        <div className="flex gap-1.5 items-center">
          {[1, 2, 3, 4, 5].map((starVal) => {
            const activeVal = hoverRating !== null ? hoverRating : rating;
            const isFilled = starVal <= activeVal;
            return (
              <button
                key={starVal}
                type="button"
                onClick={() => setRating(starVal)}
                onMouseEnter={() => setHoverRating(starVal)}
                onMouseLeave={() => setHoverRating(null)}
                className="text-accent-gold transition-transform hover:scale-110 focus:outline-none"
              >
                <Star
                  className="w-7 h-7"
                  fill={isFilled ? "#C6A56B" : "transparent"}
                  strokeWidth={1.5}
                />
              </button>
            );
          })}
          <span className="font-body text-xs text-text-secondary ml-2 font-medium">
            ({rating} out of 5 stars)
          </span>
        </div>
      </div>

      {/* Business Name */}
      <div>
        <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-1">
          Your Business / Project Name *
        </label>
        <input
          type="text"
          required
          placeholder="E.g. Patil Foods, Nashik"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-3 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold"
        />
      </div>

      {/* Review Text */}
      <div>
        <label className="block text-[10px] font-body uppercase tracking-wider text-text-secondary mb-1">
          Review Comments * (Min 20 characters)
        </label>
        <textarea
          required
          rows={4}
          placeholder="Describe how Eloraa Digitals helped your brand scale, your impressions of our performance campaigns, etc..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full bg-bg-premium border border-border-brand/60 rounded-xl px-3 py-2.5 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold resize-none"
        />
      </div>

      <p className="font-body text-[10px] text-text-secondary italic">
        * Reviews go through compliance screening before publication.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-dark-accent hover:bg-dark-accent/90 text-bg-premium rounded-full font-body font-semibold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Submitting Review...
          </>
        ) : (
          "Submit Feedback"
        )}
      </button>
    </form>
  );
}
