import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Suite AI processes submitted information and handles privacy rights.",
};

export default function Page() {
  return <LegalDocument title="Privacy Policy"><>
    <p><strong>Effective date: October 18, 2026.</strong></p>
    <p>This policy explains how information submitted to ScopeSnap and FeedbackDigest is handled. The operator is Juan David Cuero. Contact: <a href="mailto:juancuero248@gmail.com">juancuero248@gmail.com</a>. The operator’s formal notice address and business registration must be completed before commercial launch.</p>
    <h2>Information and purposes</h2><p>We process the project briefs, comments, and files you submit; minimal technical request data; and a visual consent log containing a timestamp and truncated IP address. This information is used to provide the requested analysis, prevent abuse, protect the service, and respond to privacy requests or inquiries.</p>
    <h2>AI processing and service providers</h2><p>Submitted text is sent from the server to Google’s Gemini API to generate a response. Your browser is not given the AI API key, and this application does not maintain a conversation history or database of submitted content. Google may process content and technical data according to the selected billing tier, its current terms, and project settings. Limited records may exist for safety and abuse prevention. Review Google’s <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer">Gemini API terms</a> and <a href="https://ai.google.dev/gemini-api/docs/zdr" target="_blank" rel="noopener noreferrer">retention information</a>.</p>
    <p>Do not submit sensitive data, confidential information, or another person’s personal data unless you have a legal basis and the required authorization. Content may leave Colombia and be processed in countries where providers operate infrastructure.</p>
    <h2>Retention and security</h2><p>The application does not have a database of submitted briefs, feedback, or results. Requests are processed in memory while the request runs; the IP prefix used to limit abuse is also temporary and held in memory. The interface may show a timestamp and anonymized IP as a demonstration log; it is not saved and is not durable proof of authorization. AI and hosting providers may create records under their own policies.</p>
    <p>API communication uses HTTPS and the AI key remains server-side. No system can guarantee absolute security. Do not submit secrets or information that must remain exclusively under your control.</p>
    <h2>Your rights</h2><p>You may request access, correction, deletion, information about use, or revocation of authorization by emailing the contact above. Requests will be handled under Colombia’s Law 1581 of 2012 and its regulations and, where applicable, the GDPR. If a complaint in Colombia is not resolved through the applicable prior process, you may contact the Superintendence of Industry and Commerce.</p>
    <h2>Cookies and analytics</h2><p>The current version does not load analytics by default. If Google Analytics is configured, it loads only after the visitor accepts analytics cookies. The choice can be changed through the site’s cookie settings.</p>
    <h2>Updates</h2><p>Updates will be posted on this page with a revised effective date.</p>
  </></LegalDocument>;
}
