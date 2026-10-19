"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "suiteai-analytics-consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function loadAnalytics() {
  if (!GA_ID || document.getElementById("suite-google-analytics")) return;
  const w = window as Window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.gtag = (...args: unknown[]) => w.dataLayer?.push(args);
  w.gtag("consent", "default", { analytics_storage: "denied", ad_storage: "denied" });
  w.gtag("js", new Date());
  w.gtag("consent", "update", { analytics_storage: "granted" });
  w.gtag("config", GA_ID, { anonymize_ip: true });
  const script = document.createElement("script");
  script.id = "suite-google-analytics";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(script);
}

function removeAnalytics() {
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", { analytics_storage: "denied", ad_storage: "denied" });
  document.getElementById("suite-google-analytics")?.remove();
  for (const item of document.cookie.split(";")) {
    const name = item.split("=")[0]?.trim();
    if (name === "_ga" || name?.startsWith("_ga_")) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
    }
  }
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!GA_ID) return;
    if (localStorage.getItem(COOKIE_KEY) === "accepted") loadAnalytics();
    else if (!localStorage.getItem(COOKIE_KEY)) setOpen(true);

    const showSettings = () => setOpen(true);
    window.addEventListener("suite-cookie-settings", showSettings);
    return () => window.removeEventListener("suite-cookie-settings", showSettings);
  }, []);

  function choose(accepted: boolean) {
    localStorage.setItem(COOKIE_KEY, accepted ? "accepted" : "rejected");
    setOpen(false);
    if (accepted) loadAnalytics();
    else removeAnalytics();
  }

  return (
    <>
      {GA_ID && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-3 left-3 z-40 rounded-full border border-white/15 bg-zinc-900/90 px-3 py-2 text-xs text-zinc-200 shadow-lg backdrop-blur-xl hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300"
        >
          Configurar cookies
        </button>
      )}
      {open && GA_ID && (
        <section
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          className="glass-panel fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl p-4 shadow-2xl sm:inset-x-auto sm:right-5 sm:p-5"
        >
          <h2 id="cookie-consent-title" className="font-semibold text-white">Tu privacidad importa</h2>
          <p className="mt-1 text-sm leading-6 text-zinc-300">
            La analítica es opcional. Puedes aceptarla o continuar solo con almacenamiento necesario.{" "}
            <a className="text-indigo-300 underline" href="/cookies">Leer política de cookies</a>
          </p>
          <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button onClick={() => choose(false)} className="min-h-11 rounded-lg border border-white/15 px-4 text-sm text-zinc-200 hover:bg-white/5">Solo necesarias</button>
            <button onClick={() => choose(true)} className="min-h-11 rounded-lg bg-indigo-500 px-4 text-sm font-semibold text-white hover:bg-indigo-400">Aceptar analítica</button>
          </div>
        </section>
      )}
    </>
  );
}