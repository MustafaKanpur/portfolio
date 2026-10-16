import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-start px-4 py-24 sm:px-6 sm:py-32">
      <p className="font-display text-[clamp(7rem,30vw,16rem)] leading-none font-extrabold tracking-tighter text-tomato" aria-hidden="true">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">This page took a wrong turn.</h1>
      <p className="mt-4 text-xl text-muted">It may have moved, or it never existed.</p>
      <Link
        href="/"
        className="mt-10 border-2 border-ink bg-ink px-6 py-3 font-display text-lg font-bold text-paper shadow-block-sm transition-transform hover:-translate-y-0.5"
      >
        Take me home
      </Link>
    </div>
  );
}
