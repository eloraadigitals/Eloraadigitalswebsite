"use client";

// =============================================================================
// ClientLayoutWrapper — Client-side wrapper to mount global layout widgets
// This isolates client-only dynamic loading to avoid SSR mismatch in root layout.
// =============================================================================

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("@/components/effects/CustomCursor"), {
  ssr: false,
});
const ButterflyEffect = dynamic(
  () => import("@/components/effects/ButterflyEffect"),
  { ssr: false }
);
const FloatingNav = dynamic(() => import("@/components/layout/FloatingNav"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/layout/Footer"), {
  ssr: false,
});
const FloatingWhatsApp = dynamic(
  () => import("@/components/layout/FloatingWhatsApp"),
  { ssr: false }
);

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

export default function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  return (
    <>
      <CustomCursor />
      <ButterflyEffect />
      <FloatingNav />
      {children}
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
