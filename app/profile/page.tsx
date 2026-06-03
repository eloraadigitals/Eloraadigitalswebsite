// =============================================================================
// Profile Dashboard Page — Server Component with metadata
// =============================================================================

import type { Metadata } from "next";
import ProfileContent from "@/components/pages/ProfileContent";

export const metadata: Metadata = {
  title: "Dashboard — Eloraa Digitals",
  description: "View and manage your active consultation bookings and brand reviews.",
};

export default function ProfilePage() {
  return <ProfileContent />;
}
