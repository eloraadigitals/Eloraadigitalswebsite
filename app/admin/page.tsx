// =============================================================================
// Admin Dashboard Page — Server Component with metadata
// =============================================================================

import type { Metadata } from "next";
import AdminContent from "@/components/pages/AdminContent";

export const metadata: Metadata = {
  title: "Admin Console — Eloraa Digitals",
  description: "Performance metrics, lead management, and reviews compliance hub.",
};

export default function AdminPage() {
  return <AdminContent />;
}
