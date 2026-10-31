'use client';

import { Check, Zap } from 'lucide-react';
import { SectionHeading, Reveal } from '@/components/site/Reveal';

const PLANS = [
  {
    name: 'Short-Form Pack',
    price: '₹12,999',
    per: '/ 10 reels',
    tagline: 'For creators going daily',
    features: ['10 reels or shorts', 'Hooks + animated captions', 'Trend-synced audio', '48h turnaround', '1 revision round'],
    popular: false,
  },
  {
    name: 'YouTube Pro',
    price: '₹24,999',
    per: '/ month',
    tagline: 'For serious channels',
    features: ['4 long-form videos', 'Retention-first editing', 'Motion graphics & b-roll', 'Thumbnail variants', '2 revision rounds', 'Priority 72h delivery'],
    popular: true,
  },
  {
    name: 'Premium Commercial',
    price: '₹49,999',
    per: '/ project',
    tagline: 'For brands that convert',
    features: ['Full ad campaign edits', 'A/B creative variants', 'Cinema-grade color', 'Sound design & mix', 'Unlimited revisions (14d)', 'Dedicated Slack channel'],
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" data-testid="pricing-section" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <div className="absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-lime/[0.05] blur-[140px]" />
      <SectionHeading
        kicker="Pricing"
        title={
          <>
            Pick your<br />
            <span className="text-stroke-lime">production tier</span>
          </>
        }
        className="text-center [&>div>p]:justify-center"
      />
      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <Reveal key={plan.name} delay={i * 0.1}>
            <div
              data-testid={`pricing-card-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`relative h-full rounded-3xl p-8 ${
                plan.popular
                  ? 'border border-lime/50 bg-lime/[0.05] shadow-[0_0_60px_rgba(198,255,61,0.1)]'
                  : 'glass'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-lime px-4 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-ink">
                  <Zap className="h-3 w-3" /> Most Popular
                </span>
              )}
              <h3 className="font-syne text-lg font-bold uppercase tracking-wide">{plan.name}</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{plan.tagline}</p>
              <p className="mt-6">
                <span className="font-syne text-4xl font-extrabold text-zinc-100">{plan.price}</span>
                <span className="ml-1.5 font-mono text-xs text-zinc-500">{plan.per}</span>
              </p>
              <ul className="mt-7 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                    <Check className="h-4 w-4 shrink-0 text-lime" /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                data-testid={`pricing-cta-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`mt-8 block rounded-full py-3.5 text-center font-syne text-xs font-bold uppercase tracking-wider transition-all ${
                  plan.popular
                    ? 'bg-lime text-ink hover:shadow-[0_0_35px_rgba(198,255,61,0.4)]'
                    : 'border border-white/15 text-zinc-200 hover:border-lime/60 hover:text-lime'
                }`}
              >
                Start a project
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-600">
        Custom scope? <a href="#contact" className="text-lime underline-offset-4 hover:underline">Let&rsquo;s talk</a> — every story is different.
      </p>
    </section>
  );
}
