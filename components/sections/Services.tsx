'use client';

import { useRef, type MouseEvent } from 'react';
import { Smartphone, MonitorPlay, Megaphone, Palette, Sparkles, Mic, Check, Clapperboard } from 'lucide-react';
import type { Service } from '@/types/database';
import { SectionHeading, Reveal } from '@/components/site/Reveal';

const ICONS: Record<string, typeof Clapperboard> = {
  Smartphone, MonitorPlay, Megaphone, Palette, Sparkles, Mic, Clapperboard,
};

function TiltCard({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const Icon = ICONS[service.icon || 'Clapperboard'] || Clapperboard;

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  };

  return (
    <Reveal delay={index * 0.07}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        data-testid={`service-card-${service.id}`}
        className="group glass relative h-full rounded-3xl p-7 transition-[border-color,box-shadow] duration-300 hover:border-lime/40 hover:shadow-[0_20px_60px_rgba(198,255,61,0.08)]"
        style={{ transition: 'transform 0.25s ease, border-color 0.3s, box-shadow 0.3s' }}
      >
        <div className="mb-6 flex h-13 w-13 h-14 w-14 items-center justify-center rounded-2xl bg-lime/10 text-lime transition-colors group-hover:bg-lime group-hover:text-ink">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="font-syne text-xl font-bold">{service.title}</h3>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-400">{service.description}</p>
        {service.features && service.features.length > 0 && (
          <ul className="mt-5 space-y-2">
            {service.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-xs text-zinc-400">
                <Check className="h-3.5 w-3.5 shrink-0 text-lime" /> {f}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
          {service.starting_price ? (
            <span className="font-syne text-sm font-bold text-lime">{service.starting_price}</span>
          ) : (
            <span />
          )}
          <a
            href="#contact"
            data-testid={`service-enquire-${service.id}`}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-lime"
          >
            Enquire →
          </a>
        </div>
      </div>
    </Reveal>
  );
}

export function Services({ services }: { services: Service[] }) {
  return (
    <section id="services" data-testid="services-section" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute -left-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-lime/[0.05] blur-[140px]" />
      <SectionHeading
        kicker="What I Do"
        title={
          <>
            Services built for<br />
            <span className="text-stroke-lime">watch time</span>
          </>
        }
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <TiltCard key={s.id} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}
