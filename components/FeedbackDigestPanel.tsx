"use client";
import { useEffect, useState, type DragEvent } from "react";
import { useFeedbackDigest } from "@/hooks/useFeedbackDigest";

const SAMPLE = `El panel es muy lento al cargar los reportes, tardo minutos esperando
Me encanta la interfaz, es muy fácil de usar
No encuentro cómo conectar mi cuenta de Slack, falta una integración
El onboarding es confuso, me perdí en el segundo paso
Excelente soporte, me respondieron en diez minutos
La app se cae cuando exporto más de mil filas
Buen producto, cumple lo que promete
Los reportes tardan demasiado y a veces dan error
Faltan integraciones con HubSpot y Notion
No entendí cómo invitar a mi equipo, muy confuso al empezar
Genial la nueva versión, mucho más rápida en búsquedas
El precio me parece caro frente a la competencia
Uso la herramienta a diario para mi trabajo
Sería útil un modo oscuro y atajos de teclado`;

const MAX_BYTES = 2 * 1024 * 1024;

export default function FeedbackDigestPanel() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);
  const [drag, setDrag] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const { data, loading, error, analyze } = useFeedbackDigest();

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
      setFileError("El archivo supera los 2 MB.");
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
        { label: "Positivo", pct: data.porc_positivo, n: data.conteo_positivo, bar: "bg-emerald-400" },
        { label: "Neutro", pct: data.porc_neutro, n: data.conteo_neutro, bar: "bg-zinc-400" },
        { label: "Negativo", pct: data.porc_negativo, n: data.conteo_negativo, bar: "bg-rose-400" },
      ]
    : [];

  return (
    <div className="space-y-4">
      {/* Entrada */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
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
            {fileName || "Arrastra un archivo CSV aquí"}
          </span>
          <span className="mt-1 text-xs text-zinc-400">
            {fileName ? `${count} filas cargadas` : "o haz clic para elegir un .csv o .txt"}
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
          <label htmlFor="fb" className="text-sm font-medium">Comentarios en bruto</label>
          <button
            type="button"
            onClick={() => { setText(SAMPLE); setFileName(""); }}
            className="rounded-lg border border-zinc-800 px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
          >
            Cargar datos de ejemplo
          </button>
        </div>
        <textarea
          id="fb"
          value={text}
          onChange={(e) => { setText(e.target.value); setFileName(""); }}
          placeholder="Un comentario por línea"
          className="min-h-[130px] w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm outline-none focus-visible:border-indigo-400"
        />
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => analyze(text)}
            disabled={loading || text.trim().length < 20}
            className="rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-40"
          >
            {loading ? "Analizando…" : "Analizar Sentimiento e Impacto"}
          </button>
          <span className="text-xs text-zinc-400">{count} líneas</span>
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-rose-400">{error}</p>}
      </div>

      {loading && (
        <div role="status" className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-400">
          Gemini está leyendo y clasificando los comentarios…
        </div>
      )}

      {data && !loading && (
        <div className="space-y-4">
          {/* Sentimiento */}
          <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <div className="flex items-baseline justify-between">
              <h2 className="text-sm font-medium">Sentimiento general</h2>
              <span className="text-xs text-zinc-400">
                {data.total_comentarios} comentarios analizados
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
            <h2 className="mb-4 text-sm font-medium">Principales puntos de dolor</h2>
            <div className="space-y-5">
              {data.puntos_dolor.map((p) => (
                <div key={p.titulo}>
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="font-medium">{p.titulo}</span>
                    <span className="shrink-0 tabular-nums text-zinc-400">
                      {p.porcentaje}% ({p.menciones} menciones)
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
                          (parafraseada, no aparece literal)
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
            <h2 className="text-sm font-medium">Tareas sugeridas para el roadmap</h2>
            <p className="mb-3 mt-1 text-xs text-zinc-400">
              Marca las que ya planificaste.
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
                    t.categoria === "Prioritario"
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