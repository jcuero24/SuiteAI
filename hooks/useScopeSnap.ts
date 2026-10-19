"use client";
import { useCallback, useState } from "react";
import type { ScopeResult } from "@/lib/scopesnap-schema";

export function useScopeSnap() {
  const [data, setData] = useState<ScopeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = useCallback(async (brief: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/scopesnap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error inesperado.");
      setData(json as ScopeResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo generar la propuesta.");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, generate };
}