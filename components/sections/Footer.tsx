'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUp, Youtube, Instagram, Mail } from 'lucide-react';
import type { SiteSettings } from '@/types/database';
import { formatTimecode } from '@/lib/utils';

export function Footer({ settings }: { settings: SiteSettings }) {
  const [tc, setTc] = useState('00:00:00:00');

  useEffect(() => {
    const t = setInterval(() => {
      const now = new Date();
      setTc(formatTimecode(now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()));
    }, 1000 / 24);
    return () => clearInterval(t);
  }, []);

  const igUrl = settings.instagram?.startsWith('http')
    ? settings.instagram
    : `https://instagram.com/${(settings.instagram || '').replace('@', '')}`;

  return (
    <footer data-testid="site-footer" className="relative overflow-hidden border-t border-white/[0.06] pt-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 pb-16 md:flex-row md:items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-lime">{tc} — still rendering</p>
            <a href="#contact" data-testid="footer-cta-link" className="mt-3 block font-syne text-3xl font-extrabold uppercase leading-tight sm:text-4xl">
              Ready for the<br />
              <span className="text-stroke-lime">final cut?</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href={settings.channel_url} target="_blank" rel="noopener noreferrer" aria-label="YouTube channel" data-testid="footer-youtube-link" className="rounded-full border border-white/10 p-3.5 text-zinc-400 transition-colors hover:border-red-500/60 hover:text-red-500">
              <Youtube className="h-5 w-5" />
            </a>
            <a href={igUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="footer-instagram-link" className="rounded-full border border-white/10 p-3.5 text-zinc-400 transition-colors hover:border-violet2/60 hover:text-violet2">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={`mailto:${settings.email}`} aria-label="Email" data-testid="footer-email-link" className="rounded-full border border-white/10 p-3.5 text-zinc-400 transition-colors hover:border-lime/60 hover:text-lime">
              <Mail className="h-5 w-5" />
            </a>
            <a href="#top" aria-label="Back to top" data-testid="footer-back-to-top-btn" className="rounded-full bg-lime p-3.5 text-ink transition-shadow hover:shadow-[0_0_30px_rgba(198,255,61,0.45)]">
              <ArrowUp className="h-5 w-5" />
            </a>
          </div>
        </div>

        <h2 className="select-none text-center font-syne text-[16.5vw] font-extrabold uppercase leading-[0.8] tracking-tight text-white/[0.045] lg:text-[11rem]" aria-hidden="true">
          FACTDEFINER
        </h2>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-8 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            © {new Date().getFullYear()} {settings.editor_name} — all rights reserved
          </p>
          <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            <a href={settings.channel_url} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-lime">
              {settings.channel_name}
            </a>
            <Link href="/handover" data-testid="footer-handover-link" className="transition-colors hover:text-lime">
              Project Handover
            </Link>
            <Link href="/admin" data-testid="footer-admin-link" className="transition-colors hover:text-lime">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
