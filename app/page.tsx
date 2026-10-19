"use client";

import { useState } from "react";
import ScopeSnapPanel from "@/components/ScopeSnapPanel";
import FeedbackDigestPanel from "@/components/FeedbackDigestPanel";
import { ArrowDown, ArrowUpRight, BarChart3, Check, Sparkles } from "lucide-react";

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Suite AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "AI-assisted project scoping and customer feedback analysis for independent professionals and teams.",
}).replace(/</g, "\\u003c");

export default function Home() {
  const [activePanel, setActivePanel] = useState<"scopesnap" | "feedback">("scopesnap");

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#080b14] text-zinc-100">
      <div aria-hidden="true" className="site-aurora pointer-events-none fixed inset-0 -z-10" />
      <div aria-hidden="true" className="marketing-grid pointer-events-none fixed inset-0 -z-10 opacity-35" />

      <header className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <nav aria-label="Main navigation" className="glass-panel flex min-h-16 items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <a className="flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" href="#home" aria-label="Suite AI home">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-indigo-400 text-slate-950 shadow-lg shadow-cyan-950/30"><Sparkles size={18} aria-hidden="true" /></span>
            <span className="text-sm font-bold tracking-tight text-white sm:text-base">Suite<span className="text-cyan-300">AI</span></span>
          </a>
          <div className="flex items-center gap-4 sm:gap-7">
            <a className="hidden text-sm text-zinc-300 transition hover:text-white sm:inline" href="#workspace">Product</a>
            <a className="hidden text-sm text-zinc-300 transition hover:text-white sm:inline" href="/privacy">Privacy</a>
            <a className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 text-xs font-semibold text-white transition hover:border-cyan-200/50 hover:bg-cyan-200/10 sm:text-sm" href="#workspace">Open the suite <ArrowUpRight size={14} aria-hidden="true" /></a>
          </div>
        </nav>
      </header>

      <main id="home" className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="relative grid items-center gap-12 pb-20 pt-16 sm:pt-24 lg:min-h-[650px] lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pb-24 lg:pt-20">
          <div className="relative z-10 animate-rise-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.08] px-3.5 py-2 text-xs font-medium text-cyan-100 sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,.9)]" />
              Two focused tools. One smarter workflow.
            </div>
            <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.06] tracking-[-.045em] text-white sm:text-5xl lg:text-[4.35rem]">
              Turn client signals into <span className="text-gradient">confident decisions.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
              Scope projects with clarity and find the patterns hiding in customer feedback. Practical AI tools built for independent professionals and ambitious teams.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a href="#workspace" className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 px-6 py-3 text-sm font-bold text-slate-950 shadow-[0_12px_35px_rgba(34,211,238,.16)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(34,211,238,.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:w-auto">
                Explore the tools <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
              </a>
              <span className="text-xs text-zinc-400 sm:text-sm">Clear USD estimates · Human-reviewed AI output</span>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-xs text-zinc-400 sm:text-sm">
              {["Built for independent work", "Privacy-aware by design", "You stay in control"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2"><Check className="text-cyan-300" size={15} aria-hidden="true" />{item}</span>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[560px] animate-float-in lg:justify-self-end">
            <div aria-hidden="true" className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-cyan-400/15 via-indigo-500/15 to-emerald-300/10 blur-3xl" />
            <div className="product-preview relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#101522]/85 p-4 shadow-[0_35px_100px_rgba(0,0,0,.52)] backdrop-blur-2xl sm:p-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="flex gap-1.5" aria-hidden="true"><i className="h-2 w-2 rounded-full bg-rose-300/80" /><i className="h-2 w-2 rounded-full bg-amber-200/80" /><i className="h-2 w-2 rounded-full bg-emerald-300/80" /></span>
                  <span className="ml-2 text-xs font-medium text-zinc-300">Your AI workspace</span>
                </div>
                <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">Ready to work</span>
              </div>
              <div className="grid gap-3 pt-4 sm:grid-cols-2">
                <div className="preview-card rounded-2xl border border-indigo-300/15 bg-gradient-to-br from-indigo-400/[0.14] to-violet-400/[0.03] p-4">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-300/15 text-indigo-200"><Sparkles size={17} aria-hidden="true" /></span>
                  <p className="mt-5 text-xs text-zinc-400">Project clarity</p>
                  <p className="mt-1 text-lg font-semibold text-white">ScopeSnap</p>
                  <div className="mt-4 space-y-2"><div className="h-1.5 w-full rounded-full bg-white/10"><div className="h-full w-[76%] rounded-full bg-gradient-to-r from-indigo-300 to-violet-300" /></div><p className="text-[10px] text-zinc-500">Deliverables · Risks · USD estimate</p></div>
                </div>
                <div className="preview-card rounded-2xl border border-emerald-300/15 bg-gradient-to-br from-emerald-300/[0.13] to-teal-400/[0.03] p-4 sm:translate-y-5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/15 text-emerald-200"><BarChart3 size={17} aria-hidden="true" /></span>
                  <p className="mt-5 text-xs text-zinc-400">Customer insight</p>
                  <p className="mt-1 text-lg font-semibold text-white">FeedbackDigest</p>
                  <div className="mt-4 flex h-8 items-end gap-1.5" aria-hidden="true">{[38, 54, 46, 73, 59, 88, 66, 100, 72].map((height, i) => <span key={i} className="w-full rounded-t-sm bg-gradient-to-t from-emerald-500/70 to-cyan-200/90" style={{ height: `${height}%`, animationDelay: `${i * 70}ms` }} />)}</div>
                </div>
              </div>
              <div className="mt-7 flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] p-3.5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-300/10 text-cyan-200"><Check size={15} aria-hidden="true" /></span>
                <div className="min-w-0 flex-1"><p className="text-xs font-medium text-zinc-200">A clearer next step</p><p className="mt-1 truncate text-[10px] text-zinc-500">Turn raw information into a plan you can review.</p></div>
                <span className="text-[10px] text-zinc-500">01 / 02</span>
              </div>
            </div>
            <div className="preview-float-card absolute -left-5 top-[29%] hidden items-center gap-2.5 rounded-xl border border-white/15 bg-[#151a29]/90 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-cyan-300/15 text-cyan-200"><Sparkles size={14} aria-hidden="true" /></span>
              <span><strong className="block text-[11px] text-white">Less guesswork</strong><small className="text-[9px] text-zinc-400">More useful context</small></span>
            </div>
          </div>
        </section>

        <section id="workspace" className="scroll-mt-8 pb-20 sm:pb-28">
          <div className="mb-7 flex flex-col gap-5 sm:mb-9 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[.18em] text-cyan-200">The workspace</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Choose a tool and make your next move.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">Start with a project brief or a batch of customer comments. Your source content is sent only to process the result you request.</p>
            </div>
            <div className="flex w-full gap-1 rounded-2xl border border-white/10 bg-white/[0.035] p-1 sm:w-auto">
              <button onClick={() => setActivePanel("scopesnap")} aria-pressed={activePanel === "scopesnap"} className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition duration-200 sm:flex-none sm:px-4 sm:text-sm ${activePanel === "scopesnap" ? "bg-indigo-400/20 text-indigo-100 shadow-[inset_0_0_0_1px_rgba(165,180,252,.18)]" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
                <Sparkles className="h-4 w-4" aria-hidden="true" /> ScopeSnap
              </button>
              <button onClick={() => setActivePanel("feedback")} aria-pressed={activePanel === "feedback"} className={`flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition duration-200 sm:flex-none sm:px-4 sm:text-sm ${activePanel === "feedback" ? "bg-emerald-400/20 text-emerald-100 shadow-[inset_0_0_0_1px_rgba(110,231,183,.18)]" : "text-zinc-400 hover:bg-white/5 hover:text-white"}`}>
                <BarChart3 className="h-4 w-4" aria-hidden="true" /> FeedbackDigest
              </button>
            </div>
          </div>
          <div key={activePanel} className="animate-rise-in">
            {activePanel === "scopesnap" ? <ScopeSnapPanel /> : <FeedbackDigestPanel />}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.08] bg-black/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-xs text-zinc-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div><p className="font-semibold text-zinc-300">Suite AI</p><p className="mt-1">© 2026 Suite AI · AI output should be reviewed by a person.</p></div>
          <nav aria-label="Legal information" className="flex flex-wrap gap-x-5 gap-y-3">
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" href="/terms">Terms</a>
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" href="/privacy">Privacy</a>
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" href="/cookies">Cookies</a>
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" href="/refunds">Refunds</a>
            <a className="transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300" href="mailto:juancuero248@gmail.com">Contact</a>
          </nav>
        </div>
      </footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </div>
  );
}
