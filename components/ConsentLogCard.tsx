import type { ConsentLog } from "@/lib/consent";

export default function ConsentLogCard({ log }: { log: ConsentLog }) {
  return (
    <aside className="glass-panel rounded-xl border border-emerald-300/20 px-4 py-3 text-xs text-zinc-300" aria-live="polite">
      <p className="font-semibold text-emerald-200">Consent log · visual demonstration</p>
      <p className="mt-1">Accepted: <time dateTime={log.timestamp}>{new Date(log.timestamp).toLocaleString("en-US")}</time> · Anonymized IP: {log.ip}</p>
      <p className="mt-1 text-zinc-500">This is not retained as a permanent record or legal proof of consent.</p>
    </aside>
  );
}
