import type { ConsentLog } from "@/lib/consent";

export default function ConsentLogCard({ log }: { log: ConsentLog }) {
  return (
    <aside className="glass-panel rounded-xl border border-emerald-300/20 px-4 py-3 text-xs text-zinc-300" aria-live="polite">
      <p className="font-semibold text-emerald-200">Log de consentimiento · demostración visual</p>
      <p className="mt-1">Aceptado: <time dateTime={log.timestamp}>{new Date(log.timestamp).toLocaleString("es-CO")}</time> · IP anonimizada: {log.ip}</p>
      <p className="mt-1 text-zinc-500">No se conserva como registro permanente ni como comprobante legal.</p>
    </aside>
  );
}