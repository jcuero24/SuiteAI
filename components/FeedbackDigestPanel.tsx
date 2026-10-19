"use client";
import { useEffect, useState, type DragEvent } from "react";
import { useFeedbackDigest } from "@/hooks/useFeedbackDigest";
import ConsentLogCard from "@/components/ConsentLogCard";

const SAMPLE = `The dashboard is very slow when loading reports; I wait for minutes
I love the interface, it is very easy to use
I cannot connect my Slack account; an integration is missing
The onboarding is confusing; I got lost on the second step
Excellent support, they replied in ten minutes
The app crashes when I export more than one thousand rows
Good product, it delivers what it promises
Reports take too long and sometimes fail
Integrations for HubSpot and Notion are missing
I could not figure out how to invite my team; getting started was confusing
The new version is great and search is much faster
The price feels high compared with competitors
I use the tool every day for work
A dark mode and keyboard shortcuts would be useful`;

const MAX_BYTES = 2 * 1024 * 1024;

export default function FeedbackDigestPanel() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [website, setWebsite] = useState("");
  const { data, loading, error, consentLog, analyze } = useFeedbackDigest();

  const count = text.split("\n").filter((l) => l.trim()).length;

  // Reinicia las barras y las tareas marcadas cada vez que llega un análisis nuevo
  useEffect(() => {
    if (!data) return;
    setAnimate(false);
    setDone({});
    const t = setTimeout(() => setAnimate(true), 60);
    return () => clearTimeout(t);
  }, [data]);

  async function readFile(file?: File) {
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setFileError("The file is larger than 2 MB.");
      return;
    }
    setFileError(null);
    setText(await file.text());
    setFileName(file.name);
  }

  function onDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    setDrag(false);
    readFile(e.dataTransfer.files[0]);
  }

  const sentiment = data
    ? [
        { label: "Positive", pct: data.porc_positivo, n: data.conteo_positivo, bar: "bg-emerald-400" },
        { label: "Neutral", pct: data.porc_neutro, n: data.conteo_neutro, bar: "bg-zinc-400" },
        { label: "Negative", pct: data.porc_negativo, n: data.conteo_negativo, bar: "bg-rose-400" },
      ]
    : [];

  return (
    <div className="space-y-4">
      {/* Entrada */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6">
        <label
          htmlFor="csv"
          onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
            drag ? "border-indigo-400 bg-zinc-900" : "border-zinc-800"
          }`}
        >
          <span className="text-sm font-medium">
            {fileName || "Drag a CSV file here"}
          </span>
          <span className="mt-1 text-xs text-zinc-400">
          {fileName ? `${count} rows loaded` : "or click to choose a .csv or .txt file"}
          </span>
          <input
            id="csv"
            type="file"
            accept=".csv,.txt"
            className="sr-only"
            onChange={(e) => readFile(e.target.files?.[0])}
          />
        </label>
        {fileError && <p role="alert" className="mt-2 text-sm text-rose-400">{fileError}</p>}

        <div className="mb-2 mt-5 flex items-center justify-between">
          <label htmlFor="fb" className="text-sm font-medium">Raw customer comments</label>
          <button
            type="button"
            onClick={() => { setText(SAMPLE); setFileName(""); }}
            className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
          >
            Load sample data
          </button>
        </div>
        <textarea
          id="fb"
          value={text}
          onChange={(e) => { setText(e.target.value); setFileName(""); }}
          placeholder="One comment per line"
          className="min-h-[130px] w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm outline-none focus-visible:border-indigo-400"
        />
        <div className="mt-5 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-1 h-4 w-4 accent-emerald-400" />
            <span>I agree to the <a className="text-emerald-300 underline underline-offset-2" href="/terms">Terms and Conditions</a> and <a className="text-emerald-300 underline underline-offset-2" href="/refunds">Refund Policy</a>.</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={acceptPrivacy} onChange={(e) => setAcceptPrivacy(e.target.checked)} className="mt-1 h-4 w-4 accent-emerald-400" />
            <span>I authorize the processing of the comments I provide by the AI API under the <a className="text-emerald-300 underline underline-offset-2" href="/privacy">Privacy Policy</a>.</span>
          </label>
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="feedback-website">Leave this field empty</label>
            <input id="feedback-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <button
            onClick={() => analyze(text, { terms: acceptTerms, privacy: acceptPrivacy }, website)}
            disabled={loading || text.trim().length < 20 || !acceptTerms || !acceptPrivacy}
            className="min-h-11 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-emerald-950/30 transition hover:-translate-y-0.5 hover:from-emerald-400 hover:to-teal-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Analyzing…" : "Analyze sentiment and impact"}
          </button>
          <span className="text-xs text-zinc-400">{count} lines</span>
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-rose-400">{error}</p>}
      </div>

      {loading && (
        <div role="status" className="glass-panel rounded-2xl p-6 text-sm text-zinc-400">
          Gemini is reading and classifying the comments…
        </div>
      )}

      {data && consentLog && !loading && <ConsentLogCard log={consentLog} />}

      {data && !loading && (
        <div className="space-y-4">
          {/* Sentimiento */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-medium">Overall sentiment</h2>
              <span className="text-xs text-zinc-400">
                {data.total_comentarios} comments analyzed
              </span>
            </div>
            <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-zinc-900">
              {sentiment.map((s) => (
                <div
                  key={s.label}
                  className={`${s.bar} transition-all duration-700`}
                  style={{ width: animate ? `${s.pct}%` : "0%" }}
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {sentiment.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className={`h-2 w-2 rounded-full ${s.bar}`} />
                    {s.label}
                  </div>
                  <div className="mt-1 text-2xl font-semibold tabular-nums">{s.pct}%</div>
                  <div className="text-xs text-zinc-500">{s.n} comentarios</div>
                </div>
              ))}
            </div>
          </section>

          {/* Puntos de dolor */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="mb-4 text-sm font-medium">Top customer pain points</h2>
            <div className="space-y-5">
              {data.puntos_dolor.map((p) => (
                <div key={p.titulo}>
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="font-medium">{p.titulo}</span>
                    <span className="shrink-0 tabular-nums text-zinc-400">
                      {p.porcentaje}% ({p.menciones} mentions)
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-zinc-900">
                    <div
                      className="h-full rounded-full bg-rose-400 transition-all duration-700"
                      style={{ width: animate ? `${Math.min(100, p.porcentaje)}%` : "0%" }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-zinc-400">{p.descripcion}</p>
                  {p.cita && (
                    <blockquote className="mt-2 border-l-2 border-zinc-700 pl-3 text-sm italic text-zinc-300">
                      “{p.cita}”
                      {!p.cita_verificada && (
                        <span className="ml-2 text-xs not-italic text-amber-400">
                          (paraphrased, not a verbatim quote)
                        </span>
                      )}
                    </blockquote>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Roadmap */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <h2 className="text-sm font-medium">Suggested roadmap actions</h2>
            <p className="mb-3 mt-1 text-xs text-zinc-400">
              Mark the actions you have already planned.
            </p>
            {data.tareas_roadmap.map((t, i) => (
              <label
                key={t.titulo}
                className="flex cursor-pointer items-center gap-3 border-b border-zinc-800 py-2.5 last:border-0"
              >
                <input
                  type="checkbox"
                  checked={!!done[i]}
                  onChange={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
                  className="h-4 w-4 accent-indigo-400"
                />
                <span className={`flex-1 text-sm ${done[i] ? "text-zinc-500 line-through" : ""}`}>
                  {t.titulo}
                </span>
                <span
                  className={`rounded-full border px-2 py-0.5 text-xs ${
                    t.categoria === "Priority"
                      ? "border-rose-500/40 text-rose-300"
                      : "border-zinc-700 text-zinc-400"
                  }`}
                >
                  {t.categoria}
                </span>
              </label>
            ))}
          </section>
        </div>
      )}
    </div>
  );
}
