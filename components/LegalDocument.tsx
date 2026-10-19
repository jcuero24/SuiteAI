import type { ReactNode } from "react";

export default function LegalDocument({ title, children }: { title: string; children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-16">
      <article className="glass-panel rounded-3xl p-6 sm:p-10">
        <a href="/" className="text-sm text-cyan-200 underline-offset-4 hover:underline">← Back to Suite AI</a>
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1>
        <div className="legal-copy mt-8 space-y-4 text-sm leading-7 text-zinc-300 sm:text-base">
          {children}
        </div>
      </article>
    </main>
  );
}
