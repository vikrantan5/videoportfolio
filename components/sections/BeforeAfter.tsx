'use client';

import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import type { BeforeAfter } from '@/types/database';
import { SectionHeading, Reveal } from '@/components/site/Reveal';

function Slider({ item }: { item: BeforeAfter }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);

  const update = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    update(e.clientX);
    const move = (ev: PointerEvent) => update(ev.clientX);
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <div
      ref={ref}
      data-testid={`before-after-${item.id}`}
      className="relative aspect-video touch-none select-none overflow-hidden rounded-3xl border border-white/10"
      onPointerDown={onPointerDown}
      role="slider"
      aria-label={`${item.title} before after comparison`}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') setPos((p) => Math.max(4, p - 5));
        if (e.key === 'ArrowRight') setPos((p) => Math.min(96, p + 5));
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.after_url} alt={`${item.title} — after grade`} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.before_url}
          alt={`${item.title} — before grade`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: ref.current ? ref.current.getBoundingClientRect().width : '100%' }}
          draggable={false}
        />
      </div>
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-lime shadow-[0_0_16px_rgba(198,255,61,0.7)]" />
        <span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-lime text-ink shadow-[0_0_30px_rgba(198,255,61,0.5)]">
          <MoveHorizontal className="h-5 w-5" />
        </span>
      </div>
      <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300 backdrop-blur-sm">Raw</span>
      <span className="absolute right-4 top-4 rounded-full bg-lime/90 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">Graded</span>
    </div>
  );
}

export function BeforeAfterSection({ items }: { items: BeforeAfter[] }) {
  return (
    <section id="before-after" data-testid="before-after-section" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="Color Suite"
        title={
          <>
            Drag the grade —<br />
            <span className="text-stroke-lime">see the difference</span>
          </>
        }
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.1}>
            <Slider item={item} />
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">{item.title}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
