"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  Calendar, 
  Star, 
  Plus, 
  X, 
  ShieldAlert,
  Loader2, 
  CheckCircle,
  Clock,
  XCircle,
  HelpCircle
} from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import { getConsultations, getUserReviews, type ConsultationBooking, type ReviewSubmission } from "@/lib/firebase/firestore";
import ConsultationForm from "@/components/forms/ConsultationForm";
import ReviewForm from "@/components/forms/ReviewForm";

export default function ProfileContent() {
  const { user, loading, signOut, isAdmin, isConfigured } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<(ConsultationBooking & { id: string })[]>([]);
  const [reviews, setReviews] = useState<(ReviewSubmission & { id: string })[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // Modal triggers
  const [bookingOpen, setBookingOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);

  // Fetch dashboard lists
  const fetchUserData = useCallback(async () => {
    if (!user) return;
    try {
      setLoadingData(true);
      const [userBookings, userReviews] = await Promise.all([
        getConsultations(user.uid),
        getUserReviews(user.uid),
      ]);
      setBookings(userBookings);
      setReviews(userReviews);
    } catch (err) {
      console.error("Error loading profile metrics:", err);
    } finally {
      setLoadingData(false);
    }
  }, [user]);

  // Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.push("/profile/login");
    } else if (user) {
      fetchUserData();
    }
  }, [user, loading, router, fetchUserData]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const getStatusBadge = (status: ConsultationBooking["status"]) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            <CheckCircle className="w-3 h-3" /> Confirmed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 bg-gray-500/10 text-gray-400 border border-gray-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            <CheckCircle className="w-3 h-3" /> Completed
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-gray-500/10 text-gray-400 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
            <HelpCircle className="w-3 h-3" /> Unknown
          </span>
        );
    }
  };

  if (loading || (!user && !loading)) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-bg-main pt-24">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  const userInitials = user?.displayName
    ? user.displayName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() || "ED";

  return (
    <main className="w-full min-h-screen bg-bg-main pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Profile Card Header */}
        <section className="bg-bg-card border border-border-brand/40 shadow-luxury rounded-2xl p-8 mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex gap-4 items-center">
              {/* Initials Avatar */}
              <div className="w-16 h-16 rounded-full bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center font-display text-xl text-accent-gold font-semibold shadow-inner">
                {userInitials}
              </div>
              <div>
                <h1 className="text-h2 font-display text-text-primary">
                  {user?.displayName || "Eloraa Client"}
                </h1>
                <p className="font-body text-xs text-text-secondary mt-1">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {isAdmin && (
                <button
                  onClick={() => router.push("/admin")}
                  className="bg-accent-gold hover:bg-accent-gold/90 text-bg-premium font-body font-semibold text-xs px-5 py-2.5 rounded-full transition-all flex items-center gap-2 hover:shadow-luxury-md"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Admin Console
                </button>
              )}
              <button
                onClick={handleSignOut}
                className="border border-border-brand/60 hover:border-red-500/40 text-text-secondary hover:text-red-400 font-body font-semibold text-xs px-5 py-2.5 rounded-full transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </section>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Consultations List */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-h3 text-text-primary">
                My Bookings
              </h2>
              <button
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-1 text-accent-gold hover:text-accent-gold/80 font-body text-xs font-semibold"
              >
                <Plus className="w-4 h-4" /> Request Slot
              </button>
            </div>

            {loadingData ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-24 bg-bg-card animate-pulse rounded-2xl border border-border-brand/20" />
                ))}
              </div>
            ) : bookings.length === 0 ? (
              <div className="bg-bg-card border border-dashed border-border-brand/50 rounded-2xl p-12 text-center space-y-4">
                <Calendar className="w-8 h-8 text-accent-gold/40 mx-auto" />
                <p className="font-body text-sm text-text-secondary">
                  You have no scheduled consultation bookings.
                </p>
                <button
                  onClick={() => setBookingOpen(true)}
                  className="bg-dark-accent hover:bg-dark-accent/90 text-bg-premium font-body font-semibold text-xs px-6 py-2.5 rounded-full transition-all inline-block"
                >
                  Schedule Free Consulting
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  let dateStr = "";
                  if (booking.preferredDate) {
                    const dateObj = (booking.preferredDate as any).toDate 
                      ? (booking.preferredDate as any).toDate() 
                      : new Date(booking.preferredDate as any);
                    dateStr = dateObj.toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });
                  }
                  return (
                    <div
                      key={booking.id}
                      className="bg-bg-card border border-border-brand/35 rounded-2xl p-6 shadow-luxury flex justify-between items-start gap-4 hover:border-accent-gold/20 transition-all duration-300"
                    >
                      <div className="space-y-2">
                        <span className="block font-body text-caption uppercase tracking-wider text-accent-gold text-[10px]">
                          {booking.service}
                        </span>
                        <h4 className="font-display font-semibold text-text-primary text-base">
                          {booking.businessName}
                        </h4>
                        <div className="flex gap-4 text-xs font-body text-text-secondary">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-accent-gold/75" />
                            {dateStr}
                          </span>
                          <span>•</span>
                          <span>Slot: {booking.preferredTime}</span>
                        </div>
                      </div>
                      <div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Reviews List */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-display text-h3 text-text-primary">
                My Reviews
              </h2>
              <button
                onClick={() => setReviewOpen(true)}
                className="inline-flex items-center gap-1 text-accent-gold hover:text-accent-gold/80 font-body text-xs font-semibold"
              >
                <Plus className="w-4 h-4" /> Leave Review
              </button>
            </div>

            {loadingData ? (
              <div className="space-y-4">
                <div className="h-28 bg-bg-card animate-pulse rounded-2xl border border-border-brand/20" />
              </div>
            ) : reviews.length === 0 ? (
              <div className="bg-bg-card border border-dashed border-border-brand/50 rounded-2xl p-12 text-center space-y-4">
                <Star className="w-8 h-8 text-accent-gold/40 mx-auto" />
                <p className="font-body text-sm text-text-secondary">
                  You haven't submitted any feedback reviews yet.
                </p>
                <button
                  onClick={() => setReviewOpen(true)}
                  className="border border-accent-gold text-accent-gold hover:bg-accent-gold/5 font-body font-semibold text-xs px-6 py-2.5 rounded-full transition-all inline-block"
                >
                  Write Client Review
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-bg-card border border-border-brand/35 rounded-2xl p-6 shadow-luxury hover:border-accent-gold/20 transition-all duration-300 space-y-3"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-3.5 h-3.5 ${s <= rev.rating ? "text-accent-gold fill-accent-gold" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <span className={`text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full border ${
                        rev.approved 
                          ? "bg-green-500/10 text-green-400 border-green-500/20" 
                          : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                      }`}>
                        {rev.approved ? "Approved" : "Pending Moderation"}
                      </span>
                    </div>
                    <p className="font-body text-xs text-text-secondary italic leading-relaxed">
                      "{rev.review}"
                    </p>
                    <span className="block font-body font-medium text-text-primary text-[10px] uppercase tracking-wider">
                      Business: {rev.businessName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Booking Modal Overlay */}
      <AnimatePresence>
        {bookingOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingOpen(false)}
              className="absolute inset-0 bg-dark-accent/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-bg-card border border-border-brand/40 shadow-luxury rounded-2xl p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setBookingOpen(false)}
                className="absolute right-4 top-4 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mb-6">
                <h3 className="font-display text-h3 text-text-primary">
                  Request Consultation Slot
                </h3>
                <p className="font-body text-[10px] text-text-secondary mt-1">
                  Choose your preferred date, time, and service of interest.
                </p>
              </div>
              <ConsultationForm onSuccessCallback={() => setTimeout(() => {
                setBookingOpen(false);
                fetchUserData();
              }, 2500)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review Modal Overlay */}
      <AnimatePresence>
        {reviewOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setReviewOpen(false)}
              className="absolute inset-0 bg-dark-accent/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-md bg-bg-card border border-border-brand/40 shadow-luxury rounded-2xl p-6 md:p-8 z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setReviewOpen(false)}
                className="absolute right-4 top-4 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mb-6">
                <h3 className="font-display text-h3 text-text-primary">
                  Share Your Experience
                </h3>
                <p className="font-body text-[10px] text-text-secondary mt-1">
                  Submit ratings and comments to assist other local brands.
                </p>
              </div>
              <ReviewForm onSuccessCallback={() => setTimeout(() => {
                setReviewOpen(false);
                fetchUserData();
              }, 2500)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
