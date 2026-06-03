import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/firebase/auth";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";


// ---------------------------------------------------------------------------
// Fonts — loaded via next/font for zero-FOUT performance
// ---------------------------------------------------------------------------

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const openSans = Open_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Eloraa Digitals — Digital & Performance Marketing Agency in Nashik",
  description:
    "Eloraa Digitals is a premium digital marketing agency in Nashik, Maharashtra. We specialize in paid advertising, lead generation, social media marketing, and revenue optimization for Indian businesses.",
  keywords: [
    "digital marketing Nashik",
    "performance marketing agency India",
    "paid ads Nashik",
    "lead generation Maharashtra",
    "social media marketing agency",
    "Eloraa Digitals",
    "digital marketing agency Nashik",
    "performance marketing India",
  ],
  openGraph: {
    title: "Eloraa Digitals",
    description:
      "Turning Clicks into Customers — Performance Marketing Agency, Nashik.",
    url: "https://www.eloraadigitals.com",
    siteName: "Eloraa Digitals",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.eloraadigitals.com"),
};

// ---------------------------------------------------------------------------
// JSON-LD Structured Data
// ---------------------------------------------------------------------------

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Eloraa Digitals",
  url: "https://www.eloraadigitals.com",
  logo: "https://www.eloraadigitals.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-86691-83526",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi", "Marathi"],
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  sameAs: ["https://instagram.com/eloraadigitals"],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Eloraa Digitals",
  description:
    "Premium digital marketing agency specializing in paid advertising, lead generation, and performance marketing.",
  url: "https://www.eloraadigitals.com",
  telephone: "+91-86691-83526",
  email: "eloraadigitals@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nashik",
    addressRegion: "Maharashtra",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "19.9975",
    longitude: "73.7898",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "State", name: "Maharashtra" },
    { "@type": "City", name: "Nashik" },
  ],
  priceRange: "₹₹",
};

const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Digital Marketing Services",
  itemListElement: [
    "Paid Advertisement",
    "Performance Marketing",
    "Social Media Marketing",
    "Revenue Optimization",
    "Lead Generation",
    "Influencer Marketing",
    "Content Marketing",
    "Marketing Analysis",
  ].map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service,
      provider: {
        "@type": "Organization",
        name: "Eloraa Digitals",
      },
    },
  })),
};

// ---------------------------------------------------------------------------
// Root Layout
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${openSans.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var suppressExtensionErrors = function(e) {
                  var isExtension = false;
                  if (e.filename && (e.filename.indexOf('chrome-extension://') !== -1 || e.filename.indexOf('moz-extension://') !== -1)) {
                    isExtension = true;
                  }
                  if (e.error && e.error.stack && (e.error.stack.indexOf('chrome-extension://') !== -1 || e.error.stack.indexOf('moz-extension://') !== -1)) {
                    isExtension = true;
                  }
                  if (isExtension) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                };
                window.addEventListener('error', suppressExtensionErrors, true);
                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason && e.reason.stack && (e.reason.stack.indexOf('chrome-extension://') !== -1 || e.reason.stack.indexOf('moz-extension://') !== -1)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                  }
                }, true);
              })();
            `
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema,
              localBusinessSchema,
              servicesSchema,
            ]),
          }}
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
