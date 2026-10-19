import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms governing the use of Suite AI tools.",
};

export default function Page() {
  return <LegalDocument title="Terms and Conditions"><>
    <p><strong>Effective date: October 18, 2026.</strong></p>
    <p>These terms govern access to ScopeSnap and FeedbackDigest, AI-assisted tools that turn project briefs and customer comments into structured outputs.</p>
    <h2>1. Service operator and contact</h2><p>The service is operated by Juan David Cuero. For questions, email <a href="mailto:juancuero248@gmail.com">juancuero248@gmail.com</a>. The operator’s business registration and formal notice address must be completed before the service is offered commercially.</p>
    <h2>2. Acceptable use</h2><p>You may submit text or CSV/TXT files to receive estimates or summaries. You must have the right and authority to share information about other people. Do not submit sensitive personal data, confidential business information, credentials, children’s data, or information you are not authorized to process.</p>
    <h2>3. AI-generated results</h2><p>Results are informational, may be incomplete or inaccurate, and are not professional advice, binding quotations, or substitutes for human review. Validate assumptions, figures, quotes, and recommendations before relying on or sharing them. You remain responsible for decisions made using the output.</p>
    <h2>4. Content and permitted use</h2><p>You retain your rights to the content you submit. You authorize its processing only to provide the requested feature and protect the service. You must not bypass safeguards, submit malicious code, or use the platform for unlawful purposes.</p>
    <h2>5. Availability and changes</h2><p>The tools may be changed or interrupted for maintenance, security, or provider changes. Continuous availability and absolute accuracy are not guaranteed.</p>
    <h2>6. Currency, payments, and refunds</h2><p>Price estimates are displayed in US dollars (USD). This preview version does not charge subscriptions or process payments. Before any paid offer is enabled, its total price, duration, cancellation method, and applicable withdrawal or refund rights will be disclosed. Mandatory consumer-protection rights take precedence.</p>
    <h2>7. Governing law</h2><p>These terms are interpreted under applicable Colombian law and, where applicable, data-protection rules such as the EU GDPR. Nothing in these terms limits non-waivable consumer rights.</p>
    <p>Using a tool requires explicit acceptance of these terms and the applicable refund policy after reviewing the Privacy Policy.</p>
  </></LegalDocument>;
}
