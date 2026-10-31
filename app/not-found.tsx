import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-ink px-6 text-center">
      <Clapperboard className="h-14 w-14 text-lime" aria-hidden="true" />
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-lime">00:00:00:00 — CUT!</p>
      <h1 className="font-syne text-5xl font-extrabold uppercase leading-none sm:text-7xl">
        Scene <span className="text-stroke-lime">not</span> found
      </h1>
      <p className="max-w-md text-sm text-zinc-400">
        This take never made it out of the edit bay. Let&rsquo;s get you back to the main timeline.
      </p>
      <Link
        href="/"
        data-testid="notfound-home-link"
        className="rounded-full bg-lime px-8 py-3 font-syne text-sm font-bold uppercase tracking-wider text-ink transition-transform hover:scale-105"
      >
        Back to the studio
      </Link>
    </main>
  );
}
