// =============================================================================
// Contact Page — Server Component with metadata
// =============================================================================

import type { Metadata } from "next";
import ContactContent from "@/components/pages/ContactContent";

export const metadata: Metadata = {
  title: "Contact — Eloraa Digitals",
  description:
    "Get in touch with Eloraa Digitals. Scale your Nashik or Indian business with custom performance marketing.",
};

export default function ContactPage() {
  return <ContactContent />;
}
