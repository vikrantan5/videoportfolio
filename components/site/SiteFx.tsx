'use client';

import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.6 });
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest?.('[data-cursor="play"], a, button, [role="button"]') as HTMLElement | null;
      if (target?.dataset?.cursor === 'play') {
        setLabel('PLAY');
        setHovering(true);
      } else if (target) {
        setLabel(null);
        setHovering(true);
      } else {
        setLabel(null);
        setHovering(false);
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <motion.div
      id="fd-cursor"
      aria-hidden="true"
      style={{ x: sx, y: sy }}
      className="flex items-center justify-center"
    >
      <div
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-all duration-200 ${
          label
            ? 'h-20 w-20 border-lime bg-lime/95 text-ink'
            : hovering
              ? 'h-10 w-10 border-lime/80 bg-lime/10'
              : 'h-4 w-4 border-lime/70 bg-lime/20'
        }`}
      >
        {label && <span className="font-mono text-[10px] font-bold tracking-[0.2em]">{label}</span>}
      </div>
    </motion.div>
  );
}

export function SiteFx() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
    };
  }, []);

  return <CustomCursor />;
}
