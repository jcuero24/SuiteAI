"use client";
import { useState } from "react";
import ScopeSnapPanel from "@/components/ScopeSnapPanel";
import FeedbackDigestPanel from "@/components/FeedbackDigestPanel";
import { Sparkles, BarChart3 } from "lucide-react";

export default function Home() {
  const [activePanel, setActivePanel] = useState<"scopesnap" | "feedback">("scopesnap");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">
      {/* Barra de Navegación Superior */}
      <nav className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
          <span className="text-sm font-bold uppercase tracking-wider text-zinc-300">Suite IA Comercial</span>
        </div>
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setActivePanel("scopesnap")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activePanel === "scopesnap" ? "bg-indigo-600 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> ScopeSnap
          </button>
          <button
            onClick={() => setActivePanel("feedback")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              activePanel === "feedback" ? "bg-emerald-600 text-white" : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" /> FeedbackDigest
          </button>
        </div>
      </nav>

      {/* Renderizado Dinámico */}
      <main className="p-6">
        {activePanel === "scopesnap" ? <ScopeSnapPanel /> : <FeedbackDigestPanel />}
      </main>
    </div>
  );
}
