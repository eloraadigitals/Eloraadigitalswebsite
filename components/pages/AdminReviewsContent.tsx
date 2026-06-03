"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, MessageSquare, Star, Check, X, Eye } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import { getPendingReviews, approveReview, rejectReview, type ReviewSubmission } from "@/lib/firebase/firestore";

export default function AdminReviewsContent() {
  const { user, loading, isAdmin, isConfigured } = useAuth();
  const router = useRouter();

  const [reviews, setReviews] = useState<(ReviewSubmission & { id: string })[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const mockPendingReviews = [
    {
      id: "mock-r1",
      uid: "user-123",
      name: "Rajesh Patil",
      businessName: "Patil Foods",
      rating: 5,
      review: "Very professional performance agency in Nashik. Our leads are up 3x!",
      profileImageUrl: null,
      approved: false,
    },
    {
      id: "mock-r2",
      uid: "user-456",
      name: "Sneha Deshmukh",
      businessName: "Bloom Beauty Studio",
      rating: 4,
      review: "Creative styling on social media is excellent. Friendly operators.",
      profileImageUrl: null,
      approved: false,
    },
  ];

  useEffect(() => {
    if (!loading && isConfigured && (!user || !isAdmin)) {
      router.push("/profile/login");
      return;
    }

    async function loadPendingReviews() {
      try {
        setLoadingData(true);
        if (isConfigured) {
          const list = await getPendingReviews();
          setReviews(list);
        } else {
          setReviews(mockPendingReviews);
        }
      } catch (err) {
        console.error("Failed to load pending reviews:", err);
      } finally {
        setLoadingData(false);
      }
    }

    loadPendingReviews();
  }, [user, loading, isAdmin, isConfigured, router, refreshTrigger]);

  const handleApprove = async (docId: string) => {
    try {
      if (isConfigured) {
        await approveReview(docId);
        setRefreshTrigger(prev => prev + 1);
      } else {
        // Simulated local filter
        setReviews(prev => prev.filter(r => r.id !== docId));
      }
    } catch (err) {
      console.error("Failed to approve review:", err);
      alert("Failed to approve review.");
    }
  };

  const handleReject = async (docId: string) => {
    try {
      if (isConfigured) {
        await rejectReview(docId);
        setRefreshTrigger(prev => prev + 1);
      } else {
        // Simulated local filter
        setReviews(prev => prev.filter(r => r.id !== docId));
      }
    } catch (err) {
      console.error("Failed to reject review:", err);
      alert("Failed to reject review.");
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-bg-main pt-24">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  if (isConfigured && (!user || !isAdmin)) {
    return null;
  }

  return (
    <main className="w-full min-h-screen bg-bg-main pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-b border-border-brand/20">
          <div className="space-y-1">
            <span className="text-[10px] font-body uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4" /> Operations Control
            </span>
            <h1 className="text-h1 font-display text-text-primary">
              Review Moderation ({reviews.length})
            </h1>
          </div>
          
          <button
            onClick={() => router.push("/admin")}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-xs font-body font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Admin Console
          </button>
        </section>

        {/* List */}
        {loadingData ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-accent-gold" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-bg-card border border-border-brand/30 rounded-2xl p-12 text-center text-text-secondary font-body text-sm">
            All reviews have been audited. No pending submissions.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-bg-card border border-border-brand/45 rounded-2xl p-6 shadow-luxury flex flex-col justify-between space-y-4 hover:border-accent-gold/20 transition-all duration-300"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-body font-semibold text-text-primary text-sm">
                        {rev.name}
                      </h4>
                      <span className="text-[10px] text-text-secondary">{rev.businessName}</span>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${s <= rev.rating ? "text-accent-gold fill-accent-gold" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="font-body text-xs text-text-secondary leading-relaxed italic bg-bg-premium p-4 rounded-xl border border-border-brand/20">
                    "{rev.review}"
                  </p>
                </div>

                <div className="flex gap-4 justify-end pt-2">
                  <button
                    onClick={() => handleReject(rev.id)}
                    className="border border-red-500/30 hover:border-red-500/50 hover:bg-red-500/5 text-red-400 font-body font-semibold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button
                    onClick={() => handleApprove(rev.id)}
                    className="bg-green-500/15 text-green-400 border border-green-500/20 hover:bg-green-500/30 font-body font-semibold text-[10px] uppercase tracking-wider px-4 py-2 rounded-full transition-all flex items-center gap-1"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
