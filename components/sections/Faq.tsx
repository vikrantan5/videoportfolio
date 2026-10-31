'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SectionHeading, Reveal } from '@/components/site/Reveal';

const FAQS = [
  { q: 'How fast is your turnaround?', a: 'Shorts and reels: 48 hours. Long-form YouTube: 72 hours for the rough cut. Ads and promos: 3–5 days depending on scope. Rush delivery (24h) is available at a 40% premium.' },
  { q: 'How do revisions work?', a: 'Every package includes structured revision rounds with timecoded feedback — you comment on exact frames, I fix them. Most projects close within 1–2 rounds.' },
  { q: 'How do I send you footage?', a: 'Google Drive, Dropbox, WeTransfer or Frame.io — whatever you already use. I can handle anything from phone clips to 8K RAW.' },
  { q: 'What are the payment terms?', a: '50% to book the slot, 50% on final delivery. UPI, bank transfer, Wise or PayPal for international clients. Invoices provided for every project.' },
  { q: 'Do you handle music licensing?', a: 'Yes — all tracks come from licensed libraries (Epidemic Sound / Artlist) or your own licenses, so your videos stay claim-free.' },
  { q: 'Can you match my channel\u2019s existing style?', a: 'That\u2019s the job. I study your top performers, build a style guide, and match (or upgrade) your look so the audience never feels a handover.' },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" data-testid="faq-section" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        kicker="FAQ"
        title={
          <>
            Before you<br />
            <span className="text-stroke-lime">hit record</span>
          </>
        }
        className="text-center [&>div>p]:justify-center"
      />
      <div className="mt-14 space-y-3">
        {FAQS.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <div className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                data-testid={`faq-item-${i}`}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-syne text-sm font-bold sm:text-base">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="shrink-0 text-lime">
                  <Plus className="h-5 w-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="px-6 pb-6 text-sm leading-relaxed text-zinc-400">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
