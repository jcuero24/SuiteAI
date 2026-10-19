import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: { default: "Suite IA Comercial | ScopeSnap y FeedbackDigest", template: "%s | Suite IA Comercial" },
  description: "Prepara estimaciones de proyectos y analiza feedback de clientes con herramientas asistidas por IA. Revisa y valida siempre los resultados.",
  applicationName: "Suite IA Comercial",
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "es_CO", siteName: "Suite IA Comercial", title: "Suite IA Comercial", description: "Estimaciones y análisis de feedback con asistencia de IA." },
  twitter: { card: "summary", title: "Suite IA Comercial", description: "Estimaciones y análisis de feedback con asistencia de IA." },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}<CookieConsent /></body>
    </html>
  );
}
