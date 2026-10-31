'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { SectionHeading } from '@/components/site/Reveal';

export function Showreel() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <section id="showreel" data-testid="showreel-section" ref={ref} className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="00:01:24:12 — The Premiere"
        title={
          <>
            One reel.<br />
            <span className="text-stroke-lime">Every skill.</span>
          </>
        }
        className="mb-12 text-center [&>div>p]:justify-center"
      />
      <motion.div style={{ scale, opacity }} className="relative overflow-hidden rounded-[2rem] border border-white/10">
        <div className="relative aspect-video w-full bg-black">
          {playing ? (
            <iframe
              src="https://www.youtube.com/embed/5j72h8HMTGg?autoplay=1&rel=0"
              className="h-full w-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              title="FactDefiner Showreel"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              data-cursor="play"
              data-testid="showreel-play-btn"
              className="group relative block h-full w-full"
              aria-label="Play showreel"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ytimg.com/vi/5j72h8HMTGg/maxresdefault.jpg"
                alt="FactDefiner showreel thumbnail"
                className="h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-lime shadow-[0_0_80px_rgba(198,255,61,0.5)] transition-transform duration-300 group-hover:scale-110 sm:h-28 sm:w-28">
                  <Play className="ml-2 h-10 w-10 fill-ink text-ink" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-zinc-300">Play showreel — 02:47</span>
              </div>
              <div className="film-perfs absolute inset-x-0 top-0 h-4 opacity-70" />
              <div className="film-perfs absolute inset-x-0 bottom-0 h-4 opacity-70" />
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
