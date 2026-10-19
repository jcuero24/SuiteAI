"use client";
import { useState } from "react";
import ScopeSnapPanel from "@/components/ScopeSnapPanel";
import FeedbackDigestPanel from "@/components/FeedbackDigestPanel";
import { Sparkles, BarChart3 } from "lucide-react";

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Suite IA Comercial",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Herramientas de IA para estimar proyectos y analizar feedback de clientes.",
}).replace(/</g, "\\u003c");

export default function Home() {
  const [activePanel, setActivePanel] = useState<"scopesnap" | "feedback">("scopesnap");

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,.2),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,.12),transparent_40%)]" />
      {/* Barra de Navegación Superior */}
      <nav aria-label="Herramientas" className="glass-panel mx-auto flex max-w-5xl flex-col gap-4 rounded-b-2xl border-x-0 border-t-0 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-sm font-bold uppercase tracking-wider text-zinc-300">Suite IA Comercial</span>
        </div>
        <div className="flex w-full gap-1 rounded-xl border border-white/10 bg-white/5 p-1 sm:w-auto">
          <button
            onClick={() => setActivePanel("scopesnap")}
            className={`flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:flex-none ${
              activePanel === "scopesnap" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> ScopeSnap
          </button>
          <button
            onClick={() => setActivePanel("feedback")}
            className={`flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:flex-none ${
              activePanel === "feedback" ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> FeedbackDigest
          </button>
        </div>
      </nav>

      {/* Renderizado Dinámico */}
      <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="animate-rise-in">
        {activePanel === "scopesnap" ? <ScopeSnapPanel /> : <FeedbackDigestPanel />}
        </div>
      </main>
      <footer className="mx-auto mt-10 w-full max-w-5xl border-t border-white/10 px-4 py-7 text-sm text-zinc-400 sm:px-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Suite IA Comercial · Las respuestas de IA requieren revisión humana.</p>
          <nav aria-label="Información legal" className="flex flex-wrap gap-x-5 gap-y-3">
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300" href="/terms">Términos</a>
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300" href="/privacy">Privacidad</a>
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300" href="/cookies">Cookies</a>
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300" href="/refunds">Reembolsos</a>
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-300" href="mailto:juancuero248@gmail.com">Contacto</a>
          </nav>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
