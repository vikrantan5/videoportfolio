'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionHeading, Reveal } from '@/components/site/Reveal';

const STEPS = [
  { tc: '00:00:00:00', title: 'Brief & Script', desc: 'We lock the story, references, hooks and deliverables. You send footage — I send questions that matter.' },
  { tc: '00:00:12:08', title: 'Rough Cut', desc: 'First assembly in 48–72 hours. Structure, pacing and story arc come alive for your review.' },
  { tc: '00:01:05:16', title: 'Revisions', desc: 'Two focused revision rounds. Frame-level feedback via timecoded comments — no endless loops.' },
  { tc: '00:02:47:00', title: 'Final Master', desc: 'Grade, mix, captions, thumbnail variants and platform-perfect exports. Delivered, archived, done.' },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" data-testid="process-section" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="The Process"
        title={
          <>
            Scrub through<br />
            <span className="text-stroke-lime">my workflow</span>
          </>
        }
        className="text-center [&>div>p]:justify-center"
      />

      <div ref={ref} className="relative mt-20">
        {/* progress line */}
        <div className="absolute left-[19px] top-0 h-full w-px bg-white/10 sm:left-0 sm:top-[7px] sm:h-px sm:w-full" aria-hidden="true">
          <motion.div className="h-full w-full origin-top bg-lime shadow-[0_0_14px_rgba(198,255,61,0.6)] sm:origin-left" style={{ scaleY: lineWidth, scaleX: lineWidth }} />
        </div>

        <div className="grid gap-14 sm:grid-cols-4 sm:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.tc} delay={i * 0.12} className="relative pl-14 sm:pl-0 sm:pt-12">
              <span className="absolute left-[11px] top-1.5 z-10 h-4 w-4 rounded-full border-2 border-lime bg-ink shadow-[0_0_16px_rgba(198,255,61,0.5)] sm:left-0 sm:-top-[1px]" aria-hidden="true" />
              <p className="font-mono text-[10px] tracking-[0.25em] text-lime">{s.tc}</p>
              <h3 className="mt-2 font-syne text-lg font-bold sm:text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
