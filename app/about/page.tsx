// =============================================================================
// About Page — Server Component with metadata
// =============================================================================

import type { Metadata } from "next";
import AboutContent from "@/components/pages/AboutContent";

export const metadata: Metadata = {
  title: "About — Eloraa Digitals",
  description:
    "Learn about Eloraa Digitals, a premium digital marketing agency in Nashik, Maharashtra.",
};

export default function AboutPage() {
  return <AboutContent />;
}
