"use client";
import { useCallback, useState } from "react";
import type { ScopeResult } from "@/lib/scopesnap-schema";
import type { ConsentLog } from "@/lib/consent";

export function useScopeSnap() {
  const [data, setData] = useState<ScopeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentLog, setConsentLog] = useState<ConsentLog | null>(null);

  const generate = useCallback(async (brief: string, consent: { terms: boolean; privacy: boolean }, website = "") => {
    setLoading(true);
    setError(null);
    setConsentLog(null);
    setData(null);
    try {
      const res = await fetch("/api/scopesnap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief, consent, website }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong.");
      const payload = json as { data: ScopeResult; consentLog: ConsentLog };
      setData(payload.data);
      setConsentLog(payload.consentLog);
    } catch (e) {
      setError(e instanceof Error ? e.message : "We could not generate the proposal.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, consentLog, generate };
}
