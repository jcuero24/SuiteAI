"use client";
import { useState } from "react";
import ConsentLogCard from "@/components/ConsentLogCard";
import { useScopeSnap } from "@/hooks/useScopeSnap";

const TABS = ["Alcance y entregables", "Riesgos y preguntas", "Presupuesto estimado"];
const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

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
        <label htmlFor="brief" className="text-sm font-medium">Brief del cliente</label>
        <textarea
          id="brief"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="Pega aquí el correo, el chat o las notas de la llamada"
          className="mt-2 min-h-[140px] w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm outline-none focus-visible:border-indigo-400"
        />
        <div className="mt-5 space-y-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-zinc-300">
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} className="mt-1 h-4 w-4 accent-indigo-400" />
            <span>Acepto los <a className="text-indigo-300 underline underline-offset-2" href="/terms">Términos y condiciones</a> y la <a className="text-indigo-300 underline underline-offset-2" href="/refunds">Política de reembolsos</a>.</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input type="checkbox" checked={acceptPrivacy} onChange={(e) => setAcceptPrivacy(e.target.checked)} className="mt-1 h-4 w-4 accent-indigo-400" />
            <span>Autorizo el tratamiento de los datos que ingreso y su procesamiento por la API de IA conforme a la <a className="text-indigo-300 underline underline-offset-2" href="/privacy">Política de privacidad</a>.</span>
          </label>
          <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="scope-website">Deja este campo vacío</label>
            <input id="scope-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <div>
            <label htmlFor="rate" className="mb-2 block text-sm font-medium">
              Tarifa por hora (USD)
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
            {loading ? "Generando…" : "Generar con IA"}
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
                        {e.horas} h
                      </span>
                    </li>
                  ))}
                </ul>
                <Block title="Supuestos" items={data.supuestos} />
                <Block title="Fuera del alcance" items={data.exclusiones} />
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
                <Block title="Preguntas para el cliente" items={data.preguntas_cliente} ordered />
              </>
            )}

            {tab === 2 && (
              <div className="grid gap-3 sm:grid-cols-3">
                <Stat label="Horas totales" value={`${data.estimacion.horas_totales} h`}
                      hint={`Incluye ${data.estimacion.margen_pct}% de margen`} />
                <Stat label="Precio estimado"
                      value={usd(data.estimacion.horas_totales * rate)}
                      hint={`Rango ${usd(data.estimacion.horas_totales * rate * 0.9)} a ${usd(data.estimacion.horas_totales * rate * 1.2)}`} />
                <Stat label="Duración" value={`${data.estimacion.semanas} semanas`}
                      hint="1 persona, 30 h por semana" />
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