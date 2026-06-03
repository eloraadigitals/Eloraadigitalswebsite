// =============================================================================
// Admin Leads Page — Server Component with metadata
// =============================================================================

import type { Metadata } from "next";
import AdminLeadsContent from "@/components/pages/AdminLeadsContent";

export const metadata: Metadata = {
  title: "Leads Console — Eloraa Digitals",
  description: "View and follow up with clients who submitted queries via web forms.",
};

export default function AdminLeadsPage() {
  return <AdminLeadsContent />;
}
