import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Payment and refund information for Suite AI.",
};

export default function Page() {
  return <LegalDocument title="Refund Policy"><>
    <p><strong>Effective date: October 18, 2026.</strong></p>
    <p>ScopeSnap and FeedbackDigest are currently offered without in-app purchases or paid subscriptions. This preview does not charge fees or request payment card details.</p>
    <h2>Future paid services</h2><p>Before a purchase is enabled, the operator will disclose the total price in US dollars (USD), subscription or service duration, cancellation method, and any applicable withdrawal, return, or refund conditions. Mandatory consumer-protection law prevails over any individual term.</p>
    <h2>Contact</h2><p>Questions may be sent to <a href="mailto:juancuero248@gmail.com">juancuero248@gmail.com</a>. Include your transaction reference if a paid service is introduced in the future.</p>
  </></LegalDocument>;
}
