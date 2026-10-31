'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Clapperboard, Mail, Instagram, MessageCircle, Loader2 } from 'lucide-react';
import { inquirySchema, type InquiryInput } from '@/lib/validators';
import { submitInquiry } from '@/app/actions/inquiry';
import type { SiteSettings } from '@/types/database';
import { SectionHeading, Reveal } from '@/components/site/Reveal';
import { Magnetic } from '@/components/site/Magnetic';

const SERVICES = ['Reels / Shorts Editing', 'YouTube Long-Form', 'Ads / Promos', 'Color Grading', 'Motion Graphics', 'Podcast Clips', 'Other'];
const BUDGETS = ['Under ₹10,000', '₹10,000 – ₹25,000', '₹25,000 – ₹50,000', '₹50,000+', 'Not sure yet'];

export function Contact({ settings }: { settings: SiteSettings }) {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput>({ resolver: zodResolver(inquirySchema) });

  const onSubmit = async (values: InquiryInput) => {
    const res = await submitInquiry(values);
    if (res.ok) {
      setSent(true);
      reset();
      toast.success('Cut! Your inquiry is in — I reply within 24 hours.');
    } else {
      toast.error(res.error || 'Something went wrong. Try WhatsApp or email.');
    }
  };

  const waText = encodeURIComponent(`Hi ${settings.editor_name}! I found your portfolio and I'd love to discuss a video project.`);
  const igUrl = settings.instagram?.startsWith('http')
    ? settings.instagram
    : `https://instagram.com/${(settings.instagram || '').replace('@', '')}`;

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative mx-auto w-full max-w-6xl scroll-mt-24 overflow-x-hidden px-4 py-16 sm:px-8 sm:py-24 md:py-32"
    >
      {/* glow – clamp so it never overflows on narrow screens */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[min(90vw,420px)] w-[min(90vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/[0.06] blur-[120px] sm:blur-[150px]" />

      <SectionHeading
        kicker="Final Scene"
        title={
          <>
            Let&rsquo;s make something
            <br className="hidden sm:block" />{' '}
            <span className="text-stroke-lime">unforgettable.</span>
          </>
        }
        className="text-center [&>div>p]:justify-center"
      />

      <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:mt-14 sm:gap-8 lg:grid-cols-[1fr_320px]">
        <Reveal>
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                data-testid="contact-success"
                className="glass flex min-h-[360px] flex-col items-center justify-center gap-5 rounded-3xl p-6 text-center sm:min-h-[420px] sm:p-10"
              >
                <motion.div
                  initial={{ rotate: -12, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                  className="flex h-16 w-16 items-center justify-center rounded-3xl bg-lime shadow-[0_0_60px_rgba(198,255,61,0.4)] sm:h-20 sm:w-20"
                >
                  <Clapperboard className="h-7 w-7 text-ink sm:h-9 sm:w-9" />
                </motion.div>
                <h3 className="font-syne text-xl font-extrabold uppercase sm:text-2xl">That&rsquo;s a wrap!</h3>
                <p className="max-w-sm text-sm text-zinc-400">
                  Your inquiry is in the edit bay. I&rsquo;ll get back to you within 24 hours — check your inbox (and spam, just in case).
                </p>
                <button
                  onClick={() => setSent(false)}
                  data-testid="contact-send-another-btn"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-lime underline-offset-4 hover:underline"
                >
                  Send another brief
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, scale: 0.97 }}
                onSubmit={handleSubmit(onSubmit)}
                data-testid="contact-form"
                className="glass space-y-4 rounded-3xl p-5 sm:space-y-5 sm:p-7 md:p-9"
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="min-w-0">
                    <label htmlFor="cf-name" className="fd-label">Your name</label>
                    <input id="cf-name" data-testid="contact-name-input" className="fd-input w-full" placeholder="Aryan Kapoor" {...register('name')} />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="cf-email" className="fd-label">Email</label>
                    <input id="cf-email" type="email" data-testid="contact-email-input" className="fd-input w-full" placeholder="you@studio.com" {...register('email')} />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  <div className="min-w-0">
                    <label htmlFor="cf-service" className="fd-label">Service</label>
                    <select id="cf-service" data-testid="contact-service-select" className="fd-input w-full" {...register('service')}>
                      <option value="" className="bg-panel">Select a service…</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s} className="bg-panel">{s}</option>
                      ))}
                    </select>
                    {errors.service && <p className="mt-1 text-xs text-red-400">{errors.service.message}</p>}
                  </div>
                  <div className="min-w-0">
                    <label htmlFor="cf-budget" className="fd-label">Budget range</label>
                    <select id="cf-budget" data-testid="contact-budget-select" className="fd-input w-full" {...register('budget')}>
                      <option value="" className="bg-panel">Select a range…</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b} className="bg-panel">{b}</option>
                      ))}
                    </select>
                    {errors.budget && <p className="mt-1 text-xs text-red-400">{errors.budget.message}</p>}
                  </div>
                </div>

                <div className="min-w-0">
                  <label htmlFor="cf-message" className="fd-label">Project details</label>
                  <textarea
                    id="cf-message"
                    rows={5}
                    data-testid="contact-message-input"
                    className="fd-input w-full resize-none"
                    placeholder="Tell me about the video — the story, the platform, the deadline…"
                    {...register('message')}
                  />
                  {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
                </div>

                <div className="min-w-0">
                  <label htmlFor="cf-ref" className="fd-label">Reference link (optional)</label>
                  <input id="cf-ref" data-testid="contact-reference-input" className="fd-input w-full" placeholder="https://youtube.com/watch?v=…" {...register('reference_link')} />
                  {errors.reference_link && <p className="mt-1 text-xs text-red-400">{errors.reference_link.message}</p>}
                </div>

                {/* honeypot */}
                <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register('website')} />

                <Magnetic strength={0.15} className="w-full">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="contact-submit-button"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-lime px-4 py-3.5 font-syne text-xs font-bold uppercase tracking-wider text-ink transition-shadow hover:shadow-[0_0_40px_rgba(198,255,61,0.4)] disabled:opacity-60 sm:py-4 sm:text-sm"
                  >
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Clapperboard className="h-4 w-4" />}
                    {isSubmitting ? 'Rolling…' : 'Send the brief'}
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>

        {/* Contact cards: stacked → 3-col row on mobile, vertical column on lg */}
        <Reveal delay={0.15}>
          <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-1">
            <a
              href={`https://wa.me/${(settings.whatsapp || '').replace(/\D/g, '')}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-whatsapp-btn"
              className="glass group flex min-h-[120px] flex-col justify-between rounded-3xl p-5 transition-colors hover:border-[#25D366]/50 sm:p-6 lg:min-h-0 lg:flex-1"
            >
              <MessageCircle className="h-6 w-6 text-[#25D366] sm:h-7 sm:w-7" />
              <div>
                <p className="mt-4 font-syne text-base font-bold sm:mt-6 sm:text-lg">WhatsApp</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500 sm:text-[10px]">Fastest reply — usually instant</p>
              </div>
            </a>
            <a
              href={`mailto:${settings.email || ''}`}
              data-testid="contact-email-btn"
              className="glass group flex min-h-[120px] flex-col justify-between rounded-3xl p-5 transition-colors hover:border-lime/50 sm:p-6 lg:min-h-0 lg:flex-1"
            >
              <Mail className="h-6 w-6 text-lime sm:h-7 sm:w-7" />
              <div className="min-w-0">
                {/* FIX: title={settings.email || undefined} */}
                <p className="mt-4 truncate font-syne text-base font-bold sm:mt-6 sm:text-lg" title={settings.email || undefined}>
                  {settings.email || 'Email not set'}
                </p>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500 sm:text-[10px]">For detailed briefs &amp; decks</p>
              </div>
            </a>
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="contact-instagram-btn"
              className="glass group flex min-h-[120px] flex-col justify-between rounded-3xl p-5 transition-colors hover:border-violet2/60 sm:p-6 lg:min-h-0 lg:flex-1"
            >
              <Instagram className="h-6 w-6 text-violet2 sm:h-7 sm:w-7" />
              <div>
                <p className="mt-4 font-syne text-base font-bold sm:mt-6 sm:text-lg">Instagram</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500 sm:text-[10px]">Behind the scenes &amp; breakdowns</p>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}