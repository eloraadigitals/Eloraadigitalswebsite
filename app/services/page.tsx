// =============================================================================
// Services Page — Server Component with metadata
// =============================================================================

import type { Metadata } from "next";
import ServicesContent from "@/components/pages/ServicesContent";

export const metadata: Metadata = {
  title: "Services — Eloraa Digitals",
  description:
    "Explore our full range of digital marketing and performance optimization services including paid advertising, lead generation, SMM, and revenue strategies.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
