'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Eye } from 'lucide-react';
import type { Project, Category } from '@/types/database';
import { ytThumb, cn } from '@/lib/utils';
import { VideoModal } from '@/components/sections/VideoModal';
import { SectionHeading, Reveal } from '@/components/site/Reveal';

const FILTERS: { key: Category | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'reel', label: 'Reels / Shorts' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'ad', label: 'Ads' },
  { key: 'motion', label: 'Motion Graphics' },
  { key: 'podcast', label: 'Podcast' },
];

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Category | 'all'>('all');
  const [active, setActive] = useState<Project | null>(null);
  const [visible, setVisible] = useState(8);

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
  const shown = filtered.slice(0, visible);

  return (
    <section id="work" data-testid="work-section" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute right-0 top-20 -z-10 h-96 w-96 rounded-full bg-violet2/[0.07] blur-[130px]" />
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          kicker="Selected Work"
          title={
            <>
              Edits that made<br />
              <span className="text-stroke-lime">millions watch</span>
            </>
          }
        />
      </div>

      <Reveal delay={0.15} className="mt-10">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              data-testid={`filter-${f.key}-tab`}
              onClick={() => {
                setFilter(f.key);
                setVisible(8);
              }}
              className={cn(
                'relative rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors',
                filter === f.key ? 'text-ink' : 'text-zinc-400 hover:text-zinc-100'
              )}
            >
              {filter === f.key && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-lime"
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4" data-testid="work-grid">
        <AnimatePresence mode="popLayout">
          {shown.map((p, i) => (
            <motion.button
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              onClick={() => setActive(p)}
              data-cursor="play"
              data-testid={`work-card-${p.slug}`}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-panel text-left focus-visible:border-lime/60',
                p.orientation === 'vertical' ? 'row-span-2 aspect-[9/16]' : 'aspect-video sm:col-span-2'
              )}
            >
              <Image
                src={p.thumbnail_override || ytThumb(p.youtube_id, 'hq')}
                alt={p.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-lime/15 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-lime backdrop-blur-sm">
                    {p.category}
                  </span>
                  {p.views_label && (
                    <span className="flex items-center gap-1 rounded-full bg-ink/60 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-zinc-300 backdrop-blur-sm">
                      <Eye className="h-3 w-3" /> {p.views_label}
                    </span>
                  )}
                </div>
                <h3 className="font-syne text-sm font-bold leading-snug text-zinc-100 sm:text-base">{p.title}</h3>
                {p.client_name && <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">{p.client_name}</p>}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lime/95 shadow-[0_0_50px_rgba(198,255,61,0.5)]">
                  <Play className="ml-1 h-6 w-6 fill-ink text-ink" />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length > visible && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setVisible((v) => v + 8)}
            data-testid="work-load-more-btn"
            className="rounded-full border border-white/15 px-8 py-3.5 font-syne text-xs font-bold uppercase tracking-wider text-zinc-200 transition-colors hover:border-lime/60 hover:text-lime"
          >
            Load more cuts
          </button>
        </div>
      )}

      <VideoModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
