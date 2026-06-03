// =============================================================================
// Admin Reviews Page — Server Component with metadata
// =============================================================================

import type { Metadata } from "next";
import AdminReviewsContent from "@/components/pages/AdminReviewsContent";

export const metadata: Metadata = {
  title: "Reviews Console — Eloraa Digitals",
  description: "Review, approve, and audit customer testimonials prior to landing page indexing.",
};

export default function AdminReviewsPage() {
  return <AdminReviewsContent />;
}
