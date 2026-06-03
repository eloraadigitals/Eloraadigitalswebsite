"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft, Users, Mail, Phone, Calendar, Briefcase, Search, Trash2 } from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import { getContacts, type ContactSubmission } from "@/lib/firebase/firestore";

export default function AdminLeadsContent() {
  const { user, loading, isAdmin, isConfigured } = useAuth();
  const router = useRouter();

  const [leads, setLeads] = useState<(ContactSubmission & { id: string })[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const mockLeads = [
    {
      id: "mock-1",
      name: "Rajesh Patil",
      phone: "9876543210",
      businessName: "Patil Foods, Nashik",
      service: "Paid Advertisement",
      message: "We need an Instagram ad campaign to launch our new sweets line before Diwali.",
      createdAt: { toDate: () => new Date() } as any,
    },
    {
      id: "mock-2",
      name: "Sneha Deshmukh",
      phone: "9865432109",
      businessName: "Bloom Beauty Studio",
      service: "Social Media Marketing",
      message: "Interested in monthly reels planning and graphic post design.",
      createdAt: { toDate: () => new Date(Date.now() - 86400000) } as any,
    },
  ];

  useEffect(() => {
    if (!loading && isConfigured && (!user || !isAdmin)) {
      router.push("/profile/login");
      return;
    }

    async function loadLeads() {
      try {
        setLoadingData(true);
        if (isConfigured) {
          const list = await getContacts();
          setLeads(list);
        } else {
          setLeads(mockLeads);
        }
      } catch (err) {
        console.error("Failed to load contacts:", err);
      } finally {
        setLoadingData(false);
      }
    }

    loadLeads();
  }, [user, loading, isAdmin, isConfigured, router]);

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

  // Filter leads by search query
  const filteredLeads = leads.filter((lead) => {
    const term = searchQuery.toLowerCase();
    return (
      lead.name.toLowerCase().includes(term) ||
      lead.businessName.toLowerCase().includes(term) ||
      lead.service.toLowerCase().includes(term) ||
      lead.phone.includes(term)
    );
  });

  return (
    <main className="w-full min-h-screen bg-bg-main pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-border-brand/20">
          <div className="space-y-1">
            <span className="text-[10px] font-body uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Operations Control
            </span>
            <h1 className="text-h1 font-display text-text-primary">
              Client Leads ({filteredLeads.length})
            </h1>
          </div>
          
          <button
            onClick={() => router.push("/admin")}
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary text-xs font-body font-semibold"
          >
            <ArrowLeft className="w-4 h-4" /> Admin Console
          </button>
        </section>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <input
            type="text"
            placeholder="Search leads by name, brand, or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-bg-card border border-border-brand/50 rounded-xl pl-10 pr-4 py-3 font-body text-xs text-text-primary focus:outline-none focus:border-accent-gold transition-colors"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-text-secondary/60" />
        </div>

        {/* Table / List */}
        {loadingData ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-accent-gold" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="bg-bg-card border border-border-brand/30 rounded-2xl p-12 text-center text-text-secondary font-body text-sm">
            No query inquiries found.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto bg-bg-card border border-border-brand/40 shadow-luxury rounded-2xl">
              <table className="w-full text-left border-collapse font-body text-xs">
                <thead>
                  <tr className="bg-bg-premium text-text-secondary uppercase tracking-wider text-[10px] border-b border-border-brand/30">
                    <th className="py-4 px-6 font-semibold">Client Name</th>
                    <th className="py-4 px-6 font-semibold">Brand / Business</th>
                    <th className="py-4 px-6 font-semibold">Service</th>
                    <th className="py-4 px-6 font-semibold">Phone</th>
                    <th className="py-4 px-6 font-semibold">Submitted</th>
                    <th className="py-4 px-6 font-semibold max-w-[200px]">Message Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-brand/20">
                  {filteredLeads.map((lead) => {
                    let dateStr = "Recent";
                    if (lead.createdAt) {
                      const dateObj = (lead.createdAt as any).toDate 
                        ? (lead.createdAt as any).toDate() 
                        : new Date(lead.createdAt as any);
                      dateStr = dateObj.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      });
                    }
                    return (
                      <tr key={lead.id} className="hover:bg-bg-premium/40 transition-colors">
                        <td className="py-4 px-6 font-semibold text-text-primary">{lead.name}</td>
                        <td className="py-4 px-6 text-text-secondary font-medium">{lead.businessName}</td>
                        <td className="py-4 px-6">
                          <span className="text-[10px] bg-accent-gold/10 text-accent-gold border border-accent-gold/20 rounded-full px-2.5 py-0.5 font-medium">
                            {lead.service}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-text-secondary">{lead.phone}</td>
                        <td className="py-4 px-6 text-text-secondary/70">{dateStr}</td>
                        <td className="py-4 px-6 text-text-secondary/80 max-w-[250px] truncate hover:text-text-primary cursor-help" title={lead.message}>
                          {lead.message}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="block md:hidden space-y-4">
              {filteredLeads.map((lead) => {
                let dateStr = "Recent";
                if (lead.createdAt) {
                  const dateObj = (lead.createdAt as any).toDate 
                    ? (lead.createdAt as any).toDate() 
                    : new Date(lead.createdAt as any);
                  dateStr = dateObj.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short"
                  });
                }
                return (
                  <div key={lead.id} className="bg-bg-card border border-border-brand/40 rounded-2xl p-5 shadow-luxury space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-semibold text-text-primary text-base">
                          {lead.name}
                        </h4>
                        <span className="text-xs text-text-secondary">{lead.businessName}</span>
                      </div>
                      <span className="text-[9px] bg-accent-gold/10 text-accent-gold border border-accent-gold/25 rounded-full px-2 py-0.5 uppercase tracking-wider font-semibold">
                        {dateStr}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 font-body text-xs">
                      <div className="space-y-1">
                        <span className="block text-[10px] text-text-secondary uppercase">Service</span>
                        <span className="font-medium text-text-primary">{lead.service}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] text-text-secondary uppercase">Phone</span>
                        <a href={`tel:${lead.phone}`} className="font-medium text-accent-gold hover:underline">
                          {lead.phone}
                        </a>
                      </div>
                    </div>

                    <div className="bg-bg-premium p-3 rounded-xl border border-border-brand/20 font-body text-xs text-text-secondary leading-relaxed">
                      <strong>Goal Specs:</strong> {lead.message}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
