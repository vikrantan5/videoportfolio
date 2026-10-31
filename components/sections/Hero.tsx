'use client';

import { motion } from 'framer-motion';
import type { SiteSettings } from '@/types/database';
import { Magnetic } from '@/components/site/Magnetic';

const ROTATING = ['Reels', 'YouTube', 'Ads', 'Motion Graphics', 'Podcast Clips'];

function MaskedLine({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="block overflow-hidden pb-1">
      <motion.span
        className="block"
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero({ settings }: { settings: SiteSettings }) {
  const chips = [
    { value: settings.videos_edited_count || '500+', label: 'Videos Edited' },
    { value: settings.total_views_label || '50M+', label: 'Total Views' },
    { value: settings.clients_count || '80+', label: 'Happy Clients' },
  ];

  return (
    <section id="top" data-testid="hero-section" className="relative flex min-h-svh flex-col justify-end overflow-hidden">
      {/* showreel background */}
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-[-12%]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        >
          <iframe
            src="https://www.youtube.com/embed/5j72h8HMTGg?autoplay=1&mute=1&loop=1&playlist=5j72h8HMTGg&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&iv_load_policy=3"
            className="h-full w-full scale-[1.35] object-cover"
            allow="autoplay; encrypted-media"
            tabIndex={-1}
            title="Background showreel"
          />
        </motion.div>
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-lime/10 blur-[140px]" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-violet2/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-36 sm:px-8 sm:pb-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-lime"
          data-testid="hero-kicker"
        >
          {settings.editor_name} — Video Editor &amp; Visual Storyteller
        </motion.p>

        <h1 className="font-syne text-[13vw] font-extrabold uppercase leading-[0.92] tracking-tight sm:text-7xl lg:text-[6.5rem]" data-testid="hero-headline">
          <MaskedLine delay={0.4}>I turn raw</MaskedLine>
          <MaskedLine delay={0.52}>footage into</MaskedLine>
          <MaskedLine delay={0.64}>
            stories<span className="text-lime">.</span>
          </MaskedLine>
          <MaskedLine delay={0.76}>
            <span className="text-stroke">unskippable.</span>
          </MaskedLine>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-400 sm:text-sm">
            {ROTATING.map((r, i) => (
              <span key={r}>
                <span className={i === 0 ? 'text-lime' : ''}>{r}</span>
                {i < ROTATING.length - 1 && <span className="mx-2 text-zinc-700">•</span>}
              </span>
            ))}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.15, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#work"
              data-testid="hero-view-work-btn"
              className="rounded-full bg-lime px-8 py-4 font-syne text-sm font-bold uppercase tracking-wider text-ink transition-shadow hover:shadow-[0_0_40px_rgba(198,255,61,0.45)]"
            >
              View My Work
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              data-testid="hero-lets-talk-btn"
              className="rounded-full border border-white/20 px-8 py-4 font-syne text-sm font-bold uppercase tracking-wider text-zinc-100 backdrop-blur-sm transition-colors hover:border-lime/60 hover:text-lime"
            >
              Let&rsquo;s Talk
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.6 }}
          className="mt-14 flex flex-wrap gap-3"
          data-testid="hero-stats"
        >
          {chips.map((c) => (
            <div key={c.label} className="glass flex items-center gap-3 rounded-2xl px-5 py-3.5">
              <span className="font-syne text-2xl font-extrabold text-lime">{c.value}</span>
              <span className="font-mono text-[10px] uppercase leading-tight tracking-[0.18em] text-zinc-400">
                {c.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* playhead scroll indicator */}
      <motion.a
        href="#channel"
        data-testid="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        aria-label="Scroll down"
      >
        <div className="relative h-px w-40 overflow-visible bg-white/15">
          <span className="animate-playhead absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-lime shadow-[0_0_12px_rgba(198,255,61,0.8)]" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500">scroll</span>
      </motion.a>
    </section>
  );
}
