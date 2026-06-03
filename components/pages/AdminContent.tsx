"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  TrendingUp, 
  ChevronRight, 
  ShieldCheck, 
  Loader2, 
  ArrowLeft 
} from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import { getAdminStats } from "@/lib/firebase/firestore";

export default function AdminContent() {
  const { user, loading, isAdmin, isConfigured } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState({
    totalContacts: 0,
    totalConsultations: 0,
    pendingReviews: 0,
    thisMonthConsultations: 0,
  });
  const [loadingData, setLoadingData] = useState(true);

  // Load Admin Stats
  useEffect(() => {
    // In local development, if Firebase is NOT configured, we bypass redirect
    // so the client can inspect the UI designs.
    if (!loading && isConfigured && (!user || !isAdmin)) {
      router.push("/profile/login");
      return;
    }

    async function loadStats() {
      try {
        setLoadingData(true);
        if (isConfigured) {
          const fetchedStats = await getAdminStats();
          setStats(fetchedStats);
        } else {
          // Simulated statistics for previewing
          setStats({
            totalContacts: 14,
            totalConsultations: 28,
            pendingReviews: 3,
            thisMonthConsultations: 8,
          });
        }
      } catch (err) {
        console.error("Error loading admin stats:", err);
      } finally {
        setLoadingData(false);
      }
    }

    loadStats();
  }, [user, loading, isAdmin, isConfigured, router]);

  if (loading) {
    return (
      <div className="w-full min-h-[70vh] flex items-center justify-center bg-bg-main pt-24">
        <Loader2 className="w-8 h-8 animate-spin text-accent-gold" />
      </div>
    );
  }

  // Double check protection (only if Firebase is active)
  if (isConfigured && (!user || !isAdmin)) {
    return null;
  }

  const navCards = [
    {
      title: "View Leads",
      description: "Manage client website query submissions and contact records",
      icon: Users,
      href: "/admin/leads",
      badge: stats.totalContacts > 0 ? `${stats.totalContacts} Total` : null,
    },
    {
      title: "Manage Consultations",
      description: "Approve, confirm, and update date slots requested by clients",
      icon: Calendar,
      href: "/admin/consultations",
      badge: stats.pendingReviews > 0 ? `${stats.thisMonthConsultations} New` : null,
    },
    {
      title: "Review Moderation",
      description: "Approve and filter user-submitted testimonials before publishing",
      icon: MessageSquare,
      href: "/admin/reviews",
      badge: stats.pendingReviews > 0 ? `${stats.pendingReviews} Pending` : null,
    },
  ];

  return (
    <main className="w-full min-h-screen bg-bg-main pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-border-brand/20">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-accent-gold text-xs font-body font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Admin Console
            </div>
            <h1 className="text-h1 font-display text-text-primary">
              Control Panel
            </h1>
          </div>
          
          <button
            onClick={() => router.push("/profile")}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-xs font-body font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Client Dashboard
          </button>
        </section>

        {/* Firebase Simulation Banner */}
        {!isConfigured && (
          <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-2xl p-4 mb-8 text-center text-xs font-body text-accent-gold">
            ⚠️ Firebase is not configured yet. Displaying simulated analytics dashboard.
          </div>
        )}

        {/* Stats Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Leads", value: stats.totalContacts, icon: Users },
            { label: "Booked Slots", value: stats.totalConsultations, icon: Calendar },
            { label: "Pending Reviews", value: stats.pendingReviews, icon: MessageSquare },
            { label: "This Month", value: stats.thisMonthConsultations, icon: TrendingUp },
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="bg-bg-card border border-border-brand/45 rounded-2xl p-6 shadow-luxury space-y-4 hover:border-accent-gold/20 transition-all duration-300"
              >
                <div className="flex justify-between items-center text-text-secondary">
                  <span className="font-body text-xs uppercase tracking-wider">{card.label}</span>
                  <Icon className="w-4 h-4 text-accent-gold/75" />
                </div>
                {loadingData ? (
                  <div className="h-9 w-16 bg-bg-premium animate-pulse rounded" />
                ) : (
                  <span className="block font-display text-3xl font-semibold text-text-primary">
                    {card.value}
                  </span>
                )}
              </div>
            );
          })}
        </section>

        {/* Operations Hub */}
        <section className="space-y-4">
          <h2 className="font-display text-h3 text-text-primary mb-6">
            Operations Directory
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {navCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  onClick={() => router.push(card.href)}
                  className="bg-bg-card border border-border-brand/40 hover:border-accent-gold/45 shadow-luxury rounded-2xl p-6 flex flex-col justify-between cursor-pointer group transition-all duration-300 min-h-[180px]"
                >
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold">
                      <Icon className="w-5 h-5" />
                    </div>
                    {card.badge && (
                      <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent-gold/15 text-accent-gold border border-accent-gold/25">
                        {card.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-6 space-y-1">
                    <h3 className="font-body font-semibold text-text-primary text-base flex items-center gap-1 group-hover:text-accent-gold transition-colors">
                      {card.title}
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="font-body text-xs text-text-secondary leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

      </div>
    </main>
  );
}
