"use client";
import { useCallback, useState } from "react";
import type { FeedbackResult } from "@/lib/feedback-schema";
import type { ConsentLog } from "@/lib/consent";

export function useFeedbackDigest() {
  const [data, setData] = useState<FeedbackResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentLog, setConsentLog] = useState<ConsentLog | null>(null);

  const analyze = useCallback(async (feedback: string, consent: { terms: boolean; privacy: boolean }, website = "") => {
    setLoading(true);
    setError(null);
    setConsentLog(null);
    setData(null);
    try {
      const res = await fetch("/api/feedbackdigest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, consent, website }),
      });

      // Leemos como texto primero: si el servidor devuelve HTML, no rompemos
      const raw = await res.text();
      let json: unknown = null;
      try {
        json = JSON.parse(raw);
      } catch {
        throw new Error(
          `The server returned a page instead of JSON (status ${res.status}). ` +
            `Check the Next.js server output and confirm app/api/feedbackdigest/route.ts exists.`
        );
      }

      if (!res.ok) {
        const msg = (json as { error?: string })?.error;
        throw new Error(msg ?? `Server error ${res.status}.`);
      }
      const payload = json as { data: FeedbackResult; consentLog: ConsentLog };
      setData(payload.data);
      setConsentLog(payload.consentLog);
    } catch (e) {
      setError(e instanceof Error ? e.message : "We could not analyze the feedback.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, consentLog, analyze };
}
