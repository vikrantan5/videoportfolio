'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/types/database';
import { SectionHeading } from '@/components/site/Reveal';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || testimonials.length < 2) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [paused, testimonials.length]);

  if (testimonials.length === 0) return null;
  const item = testimonials[index];

  return (
    <section id="testimonials" data-testid="testimonials-section" className="relative mx-auto max-w-4xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute left-1/2 top-0 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-violet2/[0.07] blur-[120px]" />
      <SectionHeading
        kicker="Client Proof"
        title={
          <>
            Words from the<br />
            <span className="text-stroke-lime">other side of the cut</span>
          </>
        }
        className="text-center [&>div>p]:justify-center"
      />

      <div
        className="relative mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        data-testid="testimonials-carousel"
      >
        <AnimatePresence mode="wait">
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.45 }}
            className="glass rounded-[2rem] p-8 text-center sm:p-12"
          >
            <Quote className="mx-auto h-8 w-8 text-lime/60" aria-hidden="true" />
            <blockquote className="mx-auto mt-6 max-w-2xl font-syne text-xl font-bold leading-snug sm:text-2xl">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-6 flex items-center justify-center gap-1" aria-label={`${item.rating} out of 5 stars`}>
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-lime text-lime" />
              ))}
            </div>
            <figcaption className="mt-6 flex items-center justify-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-lime/15 font-syne text-sm font-bold text-lime">
                {item.client_name.slice(0, 1)}
              </span>
              <span className="text-left">
                <span className="block font-syne text-sm font-bold">{item.client_name}</span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">{item.client_role}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
            aria-label="Previous testimonial"
            data-testid="testimonial-prev-btn"
            className="rounded-full border border-white/10 p-3 text-zinc-400 transition-colors hover:border-lime/50 hover:text-lime"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-8 bg-lime' : 'w-1.5 bg-white/20'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
            aria-label="Next testimonial"
            data-testid="testimonial-next-btn"
            className="rounded-full border border-white/10 p-3 text-zinc-400 transition-colors hover:border-lime/50 hover:text-lime"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
