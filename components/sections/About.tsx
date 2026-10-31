'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { SiteSettings } from '@/types/database';
import { SectionHeading, Reveal } from '@/components/site/Reveal';
import { Marquee } from '@/components/site/Marquee';

const TOOLS = ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'CapCut', 'Audition', 'Photoshop', 'Blender', 'Cinema 4D'];
const SKILLS = ['Story Structure', 'Retention Editing', 'Color Science', 'Sound Design', 'Kinetic Typography', 'VFX Compositing', 'Hook Engineering', 'Platform Strategy'];

export function About({ settings }: { settings: SiteSettings }) {
  return (
    <section id="about" data-testid="about-section" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10">
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image
                src="https://images.unsplash.com/photo-1744686909358-915e14866592?crop=entropy&cs=srgb&fm=jpg&q=85&w=1000"
                alt={`${settings.editor_name} at the editing desk`}
                width={1000}
                height={1200}
                className="aspect-[4/5] w-full object-cover"
              />
            </motion.div>
            <div className="film-perfs absolute inset-x-0 top-0 h-4 opacity-60" />
            <div className="film-perfs absolute inset-x-0 bottom-0 h-4 opacity-60" />
          </div>
          <div className="glass absolute -bottom-6 -right-3 rounded-2xl px-6 py-4 sm:-right-6">
            <p className="font-syne text-3xl font-extrabold text-lime">6+</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">years in the edit bay</p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            kicker="The Editor"
            title={
              <>
                Obsessed with the<br />
                <span className="text-stroke-lime">first 3 seconds</span>
              </>
            }
          />
          <Reveal delay={0.15}>
            <p className="mt-8 text-base leading-relaxed text-zinc-300">
              I&rsquo;m <strong className="text-zinc-100">{settings.editor_name}</strong> — the editor behind{' '}
              <a href={settings.channel_url} target="_blank" rel="noopener noreferrer" className="text-lime underline-offset-4 hover:underline">
                {settings.channel_name}
                </a>
              . {settings.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              From mythology documentaries to ASMR shorts, I&rsquo;ve spent years reverse-engineering why people keep watching.
              Every cut, sound and grade I make is built on one metric: retention. Your story deserves an audience that stays.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {SKILLS.map((s) => (
                <span key={s} className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-300">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-20">
        <Marquee items={TOOLS} className="border-y-white/[0.07]" />
      </div>
    </section>
  );
}
