'use client';

import { Youtube, Bell, Users, Eye } from 'lucide-react';
import type { SiteSettings } from '@/types/database';
import { Reveal } from '@/components/site/Reveal';
import { Magnetic } from '@/components/site/Magnetic';
import { LogoMark } from '@/components/site/Logo';

export function ChannelSection({ settings }: { settings: SiteSettings }) {
  return (
    <section id="channel" data-testid="channel-section" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.06] blur-[160px]" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[2rem] p-8 sm:p-14">
            <div className="film-perfs absolute inset-x-0 top-0 h-3.5 opacity-50" />
            <div className="film-perfs absolute inset-x-0 bottom-0 h-3.5 opacity-50" />
            <div className="flex flex-col items-center gap-10 lg:flex-row lg:justify-between">
              <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">
                <div className="relative">
                  {settings.channel_avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={settings.channel_avatar_url} alt={settings.channel_name} className="h-24 w-24 rounded-3xl border border-white/10 object-cover sm:h-28 sm:w-28" />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-lime/25 bg-lime/[0.06] sm:h-28 sm:w-28">
                      <LogoMark className="h-14 w-14" />
                    </div>
                  )}
                  <span className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 shadow-lg">
                    <Youtube className="h-4.5 w-4.5 h-5 w-5 fill-white text-white" />
                  </span>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lime">The Channel</p>
                  <h2 className="mt-2 font-syne text-3xl font-extrabold uppercase leading-none sm:text-5xl" data-testid="channel-name">
                    {settings.channel_name}
                  </h2>
                  <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 lg:justify-start">
                    <span className="flex items-center gap-2 text-sm text-zinc-400">
                      <Users className="h-4 w-4 text-lime" />
                      <strong className="font-syne text-zinc-100">{settings.subscriber_count_label || '—'}</strong> subscribers
                    </span>
                    <span className="flex items-center gap-2 text-sm text-zinc-400">
                      <Eye className="h-4 w-4 text-lime" />
                      <strong className="font-syne text-zinc-100">{settings.total_views_label || '—'}</strong> views earned
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 sm:flex-row lg:flex-col">
                <Magnetic>
                  <a
                    href={settings.channel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="channel-subscribe-btn"
                    className="flex items-center gap-2.5 rounded-full bg-red-600 px-8 py-4 font-syne text-sm font-bold uppercase tracking-wider text-white transition-shadow hover:shadow-[0_0_40px_rgba(220,38,38,0.45)]"
                  >
                    <Bell className="h-4 w-4" /> Subscribe
                  </a>
                </Magnetic>
                <a
                  href={settings.channel_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="channel-visit-btn"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500 underline-offset-4 transition-colors hover:text-lime hover:underline"
                >
                  Visit channel →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
