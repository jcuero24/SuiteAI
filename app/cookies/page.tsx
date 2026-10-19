import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie and optional analytics information for Suite AI.",
};

export default function Page() {
  return <LegalDocument title="Cookie Policy"><>
    <p><strong>Effective date: October 18, 2026.</strong></p>
    <p>The current Suite AI version does not install advertising cookies or load analytics by default.</p>
    <h2>Essential storage</h2><p>The application may use browser local storage to remember your cookie choice when optional analytics is enabled. The API temporarily uses an IP prefix in memory to limit abusive requests; it is not stored in a database.</p>
    <h2>Optional analytics</h2><p>If the operator configures a Google Analytics ID, the analytics tag does not load until you select “Accept analytics.” Declining does not prevent use of ScopeSnap or FeedbackDigest. You can reopen the panel using “Cookie settings.” Google receives browsing data under its own terms and settings.</p>
    <h2>Manage or delete</h2><p>You can change your choice through the site’s cookie control or clear local storage in your browser settings. This does not affect files you have downloaded.</p>
    <p>Contact: <a href="mailto:juancuero248@gmail.com">juancuero248@gmail.com</a>.</p>
  </></LegalDocument>;
}
