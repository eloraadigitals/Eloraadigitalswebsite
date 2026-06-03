// =============================================================================
// Admin Consultations Page — Server Component with metadata
// =============================================================================

import type { Metadata } from "next";
import AdminConsultationsContent from "@/components/pages/AdminConsultationsContent";

export const metadata: Metadata = {
  title: "Consultations Console — Eloraa Digitals",
  description: "Manage client consultation dates, times, and approval statuses.",
};

export default function AdminConsultationsPage() {
  return <AdminConsultationsContent />;
}
