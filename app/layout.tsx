import type { Metadata } from "next";
import { Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/firebase/auth";
import ClientLayoutWrapper from "@/components/layout/ClientLayoutWrapper";
import Script from "next/script";

// ---------------------------------------------------------------------------
// Fonts
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
// Metadata
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Eloraa Digitals — Digital & Performance Marketing Agency in Nashik",
  description:
    "Eloraa Digitals is a premium digital marketing agency in Nashik, Maharashtra.",
  metadataBase: new URL("https://www.eloraadigitals.com"),
};

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

const organizationSchema = { /* your schema */ };
const localBusinessSchema = { /* your schema */ };
const servicesSchema = { /* your schema */ };

// ---------------------------------------------------------------------------
// ROOT LAYOUT
// ---------------------------------------------------------------------------

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${openSans.variable}`}>

      {/* ================= HEAD ================= */}
      <head>

        {/* Existing scripts */}
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
            `,
          }}
        />

        {/* JSON-LD */}
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

        {/* ================= GTM SCRIPT (HEAD PART) ================= */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id=GTM-5T3R4CTS'+dl;
              f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5T3R4CTS');
            `,
          }}
        />

      </head>

      {/* ================= BODY ================= */}
      <body className="font-body antialiased">

        {/* ================= GTM NOSCRIPT (BODY PART) ================= */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5T3R4CTS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <AuthProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </AuthProvider>

      </body>

    </html>
  );
}
