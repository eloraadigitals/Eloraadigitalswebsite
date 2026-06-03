"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Loader2, 
  ArrowLeft, 
  Calendar, 
  Phone, 
  Clock, 
  Check, 
  X, 
  CheckCircle,
  XCircle,
  Clock3,
  Archive,
  RefreshCw 
} from "lucide-react";
import { useAuth } from "@/lib/firebase/auth";
import { getConsultations, updateConsultationStatus, type ConsultationBooking } from "@/lib/firebase/firestore";

export default function AdminConsultationsContent() {
  const { user, loading, isAdmin, isConfigured } = useAuth();
  const router = useRouter();

  const [bookings, setBookings] = useState<(ConsultationBooking & { id: string })[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const mockBookings = [
    {
      id: "mock-c1",
      uid: "user-123",
      name: "Rajesh Patil",
      phone: "9876543210",
      businessName: "Patil Foods",
      service: "Paid Advertisement",
      preferredDate: new Date(),
      preferredTime: "10:30 AM",
      notes: "Looking to setup an audit for Google Ads account.",
      status: "pending" as const,
    },
    {
      id: "mock-c2",
      uid: "user-456",
      name: "Sneha Deshmukh",
      phone: "9865432109",
      businessName: "Bloom Beauty Studio",
      service: "Social Media Marketing",
      preferredDate: new Date(Date.now() + 86400000),
      preferredTime: "03:00 PM",
      notes: "Monthly package discussion.",
      status: "confirmed" as const,
    },
  ];

  useEffect(() => {
    if (!loading && isConfigured && (!user || !isAdmin)) {
      router.push("/profile/login");
      return;
    }

    async function loadBookings() {
      try {
        setLoadingData(true);
        if (isConfigured) {
          const list = await getConsultations(); // fetches all bookings
          setBookings(list);
        } else {
          setBookings(mockBookings);
        }
      } catch (err) {
        console.error("Failed to load consultations:", err);
      } finally {
        setLoadingData(false);
      }
    }

    loadBookings();
  }, [user, loading, isAdmin, isConfigured, router, refreshTrigger]);

  const handleStatusChange = async (docId: string, status: ConsultationBooking["status"]) => {
    try {
      if (isConfigured) {
        await updateConsultationStatus(docId, status);
        setRefreshTrigger(prev => prev + 1);
      } else {
        // Local simulation state toggle
        setBookings(prev => 
          prev.map(b => b.id === docId ? { ...b, status } : b)
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status.");
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
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-border-brand/20">
          <div className="space-y-1">
            <span className="text-[10px] font-body uppercase tracking-wider text-accent-gold flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Operations Control
            </span>
            <h1 className="text-h1 font-display text-text-primary">
              Bookings & Consultations
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
        ) : bookings.length === 0 ? (
          <div className="bg-bg-card border border-border-brand/30 rounded-2xl p-12 text-center text-text-secondary font-body text-sm">
            No bookings scheduled.
          </div>
        ) : (
          <div className="space-y-6">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto bg-bg-card border border-border-brand/40 shadow-luxury rounded-2xl">
              <table className="w-full text-left border-collapse font-body text-xs">
                <thead>
                  <tr className="bg-bg-premium text-text-secondary uppercase tracking-wider text-[10px] border-b border-border-brand/30">
                    <th className="py-4 px-6 font-semibold">Client Name</th>
                    <th className="py-4 px-6 font-semibold">Brand / Phone</th>
                    <th className="py-4 px-6 font-semibold">Service Required</th>
                    <th className="py-4 px-6 font-semibold">Preferred Slot</th>
                    <th className="py-4 px-6 font-semibold">Status</th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-brand/20">
                  {bookings.map((booking) => {
                    let dateStr = "Recent";
                    if (booking.preferredDate) {
                      const dateObj = (booking.preferredDate as any).toDate 
                        ? (booking.preferredDate as any).toDate() 
                        : new Date(booking.preferredDate as any);
                      dateStr = dateObj.toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      });
                    }

                    return (
                      <tr key={booking.id} className="hover:bg-bg-premium/40 transition-colors">
                        <td className="py-4 px-6 font-semibold text-text-primary">
                          {booking.name}
                        </td>
                        <td className="py-4 px-6 text-text-secondary space-y-0.5">
                          <div className="font-semibold">{booking.businessName}</div>
                          <div>{booking.phone}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-[10px] bg-accent-gold/10 text-accent-gold border border-accent-gold/20 rounded-full px-2.5 py-0.5 font-medium">
                            {booking.service}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-text-secondary space-y-0.5">
                          <div className="font-medium text-text-primary">{dateStr}</div>
                          <div className="text-[10px]">{booking.preferredTime}</div>
                        </td>
                        <td className="py-4 px-6">
                          {booking.status === "pending" && (
                            <span className="inline-flex items-center gap-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <Clock3 className="w-3 h-3" /> Pending
                            </span>
                          )}
                          {booking.status === "confirmed" && (
                            <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <CheckCircle className="w-3 h-3" /> Confirmed
                            </span>
                          )}
                          {booking.status === "completed" && (
                            <span className="inline-flex items-center gap-1 bg-gray-500/10 text-gray-400 border border-gray-500/20 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <Archive className="w-3 h-3" /> Completed
                            </span>
                          )}
                          {booking.status === "cancelled" && (
                            <span className="inline-flex items-center gap-1 bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              <XCircle className="w-3 h-3" /> Cancelled
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="inline-flex gap-2">
                            {booking.status === "pending" && (
                              <button
                                onClick={() => handleStatusChange(booking.id, "confirmed")}
                                className="bg-green-500/15 text-green-400 border border-green-500/20 hover:bg-green-500/35 transition-all px-2.5 py-1 rounded text-[10px] font-semibold flex items-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Confirm
                              </button>
                            )}
                            {booking.status === "confirmed" && (
                              <button
                                onClick={() => handleStatusChange(booking.id, "completed")}
                                className="bg-gray-500/15 text-gray-300 border border-gray-500/20 hover:bg-gray-500/35 transition-all px-2.5 py-1 rounded text-[10px] font-semibold flex items-center gap-1"
                              >
                                <CheckCircle className="w-3.5 h-3.5" /> Complete
                              </button>
                            )}
                            {booking.status !== "cancelled" && booking.status !== "completed" && (
                              <button
                                onClick={() => handleStatusChange(booking.id, "cancelled")}
                                className="bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/35 transition-all px-2.5 py-1 rounded text-[10px] font-semibold flex items-center gap-1"
                              >
                                <X className="w-3.5 h-3.5" /> Cancel
                              </button>
                            )}
                            {(booking.status === "cancelled" || booking.status === "completed") && (
                              <button
                                onClick={() => handleStatusChange(booking.id, "pending")}
                                className="bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-500/35 transition-all px-2.5 py-1 rounded text-[10px] font-semibold flex items-center gap-1"
                              >
                                <RefreshCw className="w-3 h-3" /> Re-open
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List */}
            <div className="block md:hidden space-y-4">
              {bookings.map((booking) => {
                let dateStr = "Recent";
                if (booking.preferredDate) {
                  const dateObj = (booking.preferredDate as any).toDate 
                    ? (booking.preferredDate as any).toDate() 
                    : new Date(booking.preferredDate as any);
                  dateStr = dateObj.toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short"
                  });
                }

                return (
                  <div key={booking.id} className="bg-bg-card border border-border-brand/40 rounded-2xl p-5 shadow-luxury space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-semibold text-text-primary text-base">
                          {booking.name}
                        </h4>
                        <span className="text-xs text-text-secondary">{booking.businessName}</span>
                      </div>
                      <div>
                        {booking.status === "pending" && (
                          <span className="bg-yellow-500/15 text-yellow-400 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider border border-yellow-500/25">
                            Pending
                          </span>
                        )}
                        {booking.status === "confirmed" && (
                          <span className="bg-green-500/15 text-green-400 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider border border-green-500/25">
                            Confirmed
                          </span>
                        )}
                        {booking.status === "completed" && (
                          <span className="bg-gray-500/15 text-gray-400 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider border border-gray-500/25">
                            Completed
                          </span>
                        )}
                        {booking.status === "cancelled" && (
                          <span className="bg-red-500/15 text-red-400 text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider border border-red-500/25">
                            Cancelled
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-body text-text-secondary">
                      <div className="space-y-1">
                        <span className="block text-[10px] uppercase">Service Required</span>
                        <span className="font-medium text-text-primary">{booking.service}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="block text-[10px] uppercase">Scheduled Time</span>
                        <span className="font-medium text-text-primary">{dateStr} @ {booking.preferredTime}</span>
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="bg-bg-premium p-3 rounded-xl border border-border-brand/20 font-body text-xs text-text-secondary">
                        <strong>Notes:</strong> {booking.notes}
                      </div>
                    )}

                    {/* Actions row */}
                    <div className="pt-2 border-t border-border-brand/10 flex justify-end gap-2">
                      {booking.status === "pending" && (
                        <button
                          onClick={() => handleStatusChange(booking.id, "confirmed")}
                          className="bg-green-500/15 text-green-400 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        >
                          Confirm Slot
                        </button>
                      )}
                      {booking.status === "confirmed" && (
                        <button
                          onClick={() => handleStatusChange(booking.id, "completed")}
                          className="bg-gray-500/15 text-gray-300 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        >
                          Complete
                        </button>
                      )}
                      {booking.status !== "cancelled" && booking.status !== "completed" && (
                        <button
                          onClick={() => handleStatusChange(booking.id, "cancelled")}
                          className="bg-red-500/15 text-red-400 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        >
                          Cancel Appointment
                        </button>
                      )}
                      {(booking.status === "cancelled" || booking.status === "completed") && (
                        <button
                          onClick={() => handleStatusChange(booking.id, "pending")}
                          className="bg-yellow-500/15 text-yellow-400 px-3 py-1.5 rounded-lg text-xs font-semibold"
                        >
                          Re-open
                        </button>
                      )}
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
