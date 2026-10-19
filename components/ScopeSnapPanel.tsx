"use client";
import { useState } from "react";
import ConsentLogCard from "@/components/ConsentLogCard";
import { useScopeSnap } from "@/hooks/useScopeSnap";

const TABS = ["Scope & deliverables", "Risks & questions", "Budget estimate"];
const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export default function ScopeSnapPanel() {
  const [brief, setBrief] = useState("");
  const [rate, setRate] = useState(60);
  const [tab, setTab] = useState(0);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [website, setWebsite] = useState("");
  const { data, loading, error, consentLog, generate } = useScopeSnap();

  const onGenerate = async () => {
    setTab(0);
    await generate(brief, { terms: acceptTerms, privacy: acceptPrivacy }, website);
  };

  return (
    <div className="space-y-4">
      <div className="glass-panel rounded-2xl p-5 sm:p-6">
        <label htmlFor="brief" className="text-sm font-medium">Client project brief</label>
        <textarea
          id="brief"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="Paste the client email, chat, or call notes here"
          className="mt-2 min-h-[140px] w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm outline-none focus-visible:border-indigo-400"
        />
        <div className="mt-5 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-1 h-4 w-4 accent-indigo-400" />
            <span>I agree to the <a className="text-indigo-300 underline underline-offset-2" href="/terms">Terms and Conditions</a> and <a className="text-indigo-300 underline underline-offset-2" href="/refunds">Refund Policy</a>.</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={acceptPrivacy} onChange={(e) => setAcceptPrivacy(e.target.checked)} className="mt-1 h-4 w-4 accent-indigo-400" />
            <span>I authorize the processing of the information I provide by the AI API under the <a className="text-indigo-300 underline underline-offset-2" href="/privacy">Privacy Policy</a>.</span>
          </label>
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="scope-website">Leave this field empty</label>
            <input id="scope-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor="rate" className="mb-2 block text-sm font-medium">
              Hourly rate (USD)
            </label>
            <input
              id="rate"
              type="number"
              min={1}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-36 rounded-lg border border-zinc-800 bg-zinc-900 p-2.5 text-sm"
            />
          </div>
          <button
            onClick={onGenerate}
            disabled={loading || brief.trim().length < 20 || !acceptTerms || !acceptPrivacy}
            className="min-h-11 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition hover:-translate-y-0.5 hover:from-indigo-400 hover:to-violet-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Generating…" : "Generate with AI"}
          </button>
        </div>
        {error && (
          <p role="alert" className="mt-3 text-sm text-rose-400">{error}</p>
        )}
      </div>

      {data && consentLog && <ConsentLogCard log={consentLog} />}

      {data && (
        <div className="glass-panel rounded-2xl">
          <div className="flex overflow-x-auto border-b border-zinc-800 px-2">
            {TABS.map((t, i) => (
              <button
                key={t}
                onClick={() => setTab(i)}
                className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm ${
                  tab === i ? "border-indigo-400 text-white" : "border-transparent text-zinc-400"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="space-y-5 p-5 text-sm">
            {tab === 0 && (
              <>
                <p className="text-zinc-300">{data.alcance}</p>
                <ul className="divide-y divide-zinc-800">
                  {data.entregables.map((e) => (
                    <li key={e.nombre} className="flex justify-between gap-3 py-3">
                      <div>
                <div className="font-medium">{e.nombre}</div>
                        <div className="text-zinc-400">{e.descripcion}</div>
                      </div>
                      <span className="h-fit rounded-full border border-zinc-800 px-2 py-0.5 text-xs">
                        {e.horas} hrs
                      </span>
                    </li>
                  ))}
                </ul>
                <Block title="Assumptions" items={data.supuestos} />
                <Block title="Out of scope" items={data.exclusiones} />
              </>
            )}

            {tab === 1 && (
              <>
                <ul className="space-y-2">
                  {data.riesgos.map((r, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-14 shrink-0 font-medium text-indigo-300">{r.nivel}</span>
                      <span className="text-zinc-400">{r.descripcion}</span>
                    </li>
                  ))}
                </ul>
                <Block title="Questions for the client" items={data.preguntas_cliente} ordered />
              </>
            )}

            {tab === 2 && (
              <div className="grid gap-3 sm:grid-cols-3">
                <Stat label="Total hours" value={`${data.estimacion.horas_totales} hrs`}
                      hint={`Includes ${data.estimacion.margen_pct}% contingency`} />
                <Stat label="Estimated price"
                      value={usd(data.estimacion.horas_totales * rate)}
                      hint={`Range ${usd(data.estimacion.horas_totales * rate * 0.9)}–${usd(data.estimacion.horas_totales * rate * 1.2)}`} />
                <Stat label="Timeline" value={`${data.estimacion.semanas} weeks`}
                      hint="One person, 30 hrs per week" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Block({ title, items, ordered }: { title: string; items: string[]; ordered?: boolean }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <div>
      <div className="mb-2 font-medium">{title}</div>
      <Tag className={`space-y-1.5 pl-5 text-zinc-400 ${ordered ? "list-decimal" : "list-disc"}`}>
        {items.map((x, i) => <li key={i}>{x}</li>)}
      </Tag>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-lg">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
      <div className="mt-1 text-xs text-zinc-500">{hint}</div>
    </div>
  );
}
