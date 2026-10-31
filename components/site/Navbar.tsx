'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Youtube } from 'lucide-react';
import { Logo, LogoMark } from '@/components/site/Logo';
import { Magnetic } from '@/components/site/Magnetic';

const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#about', label: 'About' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

export function Navbar({ channelUrl, channelName }: { channelUrl: string; channelName: string }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > lastY && y > 140);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        data-testid="navbar"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -110 : 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[100] px-4 pt-4 sm:px-6"
      >
        <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <Link href="/" aria-label="FactDefiner home" data-testid="nav-logo-link">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  data-testid={`nav-${l.label.toLowerCase()}-link`}
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:text-lime"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${channelName} on YouTube`}
              data-testid="nav-youtube-link"
              className="hidden items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-400 transition-colors hover:border-red-500/50 hover:text-red-400 sm:flex"
            >
              <Youtube className="h-3.5 w-3.5" />
              {channelName}
            </a>
            <Magnetic>
              <a
                href="#contact"
                data-testid="nav-hire-btn"
                className="hidden rounded-full bg-lime px-5 py-2.5 font-syne text-xs font-bold uppercase tracking-wider text-ink transition-shadow hover:shadow-[0_0_30px_rgba(198,255,61,0.4)] sm:block"
              >
                Hire Me
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              data-testid="nav-menu-open-btn"
              className="rounded-full border border-white/10 p-2.5 text-zinc-300 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col bg-ink/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between px-6 pt-7">
              <LogoMark className="h-9 w-9" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                data-testid="nav-menu-close-btn"
                className="rounded-full border border-white/10 p-2.5 text-zinc-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <ul className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-${l.label.toLowerCase()}-link`}
                    className="font-syne text-5xl font-extrabold uppercase text-zinc-200 transition-colors hover:text-lime"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center gap-4 px-8 pb-10">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                data-testid="mobile-nav-hire-btn"
                className="rounded-full bg-lime px-7 py-3.5 font-syne text-sm font-bold uppercase tracking-wider text-ink"
              >
                Hire Me
              </a>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="mobile-nav-youtube-link"
                className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-3.5 font-mono text-xs uppercase tracking-wider text-zinc-300"
              >
                <Youtube className="h-4 w-4 text-red-500" /> Subscribe
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
