'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  className,
}: {
  kicker: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-lime">
          <span className="inline-block h-px w-8 bg-lime/60" />
          {kicker}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-syne text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
