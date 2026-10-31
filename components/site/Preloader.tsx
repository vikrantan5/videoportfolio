'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoMark } from '@/components/site/Logo';

const pad = (n: number) => String(Math.min(99, Math.max(0, n))).padStart(2, '0');

export function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('fd-preloader') === '1') {
      setDone(true);
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduced ? 200 : 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem('fd-preloader', '1');
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        sessionStorage.setItem('fd-preloader', '1');
        setSkip(true);
        setTimeout(() => setDone(true), 100);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    if (skip) setDone(true);
  }, [skip]);

  if (done) return null;

  const frames = Math.floor((count / 100) * 24);

  return (
    <AnimatePresence>
      <motion.div
        data-testid="preloader"
        className="fixed inset-0 z-[300] flex cursor-pointer flex-col items-center justify-center bg-ink"
        exit={{ y: '-100%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        onClick={() => {
          sessionStorage.setItem('fd-preloader', '1');
          setSkip(true);
        }}
        role="button"
        aria-label="Skip intro"
      >
        <div className="film-perfs absolute inset-x-0 top-0 h-4 opacity-60" />
        <div className="film-perfs absolute inset-x-0 bottom-0 h-4 opacity-60" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <LogoMark className="h-14 w-14" />
          <div className="font-mono text-5xl font-bold tabular-nums tracking-wider text-zinc-100 sm:text-7xl">
            00:00:{pad(count * 0.6)}:{pad(frames)}
          </div>
          <div className="h-px w-56 overflow-hidden bg-white/10 sm:w-72">
            <motion.div className="h-full bg-lime" style={{ width: `${count}%` }} />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-zinc-600">
            {count < 100 ? `Loading reel — ${count}%` : 'Action!'} · click to skip
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
