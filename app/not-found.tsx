import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-5 py-16 text-zinc-100">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,.2),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,.12),transparent_40%)]" />
      <section className="glass-panel w-full max-w-xl rounded-3xl p-7 text-center sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[.22em] text-indigo-300">Error 404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">No encontramos esa página</h1>
        <p className="mt-4 leading-7 text-zinc-300">El enlace puede haber cambiado o estar escrito de forma incorrecta.</p>
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-200">
          Volver a la suite
        </Link>
      </section>
    </main>
  );
}