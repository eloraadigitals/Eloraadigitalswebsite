// =============================================================================
// Profile Login Page — Server Component with metadata
// =============================================================================

import type { Metadata } from "next";
import LoginContent from "@/components/pages/LoginContent";

export const metadata: Metadata = {
  title: "Login — Eloraa Digitals",
  description: "Sign in to your Eloraa Digitals account or register a new one.",
};

export default function LoginPage() {
  return <LoginContent />;
}
