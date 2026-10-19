import type { Metadata } from "next";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : undefined,
  title: { default: "Suite AI | Project Scoping & Customer Insights", template: "%s | Suite AI" },
  description: "Scope projects with clarity and uncover customer insights with practical AI tools for independent professionals and teams.",
  applicationName: "Suite AI",
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "en_US", siteName: "Suite AI", title: "Suite AI | Project Scoping & Customer Insights", description: "Practical AI tools for project scoping and customer feedback analysis." },
  twitter: { card: "summary", title: "Suite AI | Project Scoping & Customer Insights", description: "Practical AI tools for project scoping and customer feedback analysis." },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="flex min-h-full flex-col">{children}<CookieConsent /></body>
    </html>
  );
}
