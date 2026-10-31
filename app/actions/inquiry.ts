'use server';

import { inquirySchema } from '@/lib/validators';
import { createPublicClient } from '@/lib/supabase/public';
import { getResendKey } from '@/lib/env';
import { Resend } from 'resend';

export async function submitInquiry(input: unknown): Promise<{ ok: boolean; error?: string }> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message || 'Invalid form data' };
  }
  const data = parsed.data;

  // Honeypot — silently accept bots so they don't retry
  if (data.website) return { ok: true };

  try {
    const supabase = createPublicClient();
    const { error } = await supabase.from('inquiries').insert({
      name: data.name,
      email: data.email,
      service: data.service,
      budget: data.budget,
      message: data.message,
      reference_link: data.reference_link || null,
      status: 'new',
    });
    if (error) {
      console.error('inquiry insert error:', error.message);
      return { ok: false, error: 'Could not save your inquiry. Please reach out on WhatsApp or email instead.' };
    }
  } catch (e) {
    console.error('inquiry exception:', e);
    return { ok: false, error: 'Could not save your inquiry. Please reach out on WhatsApp or email instead.' };
  }

  const key = getResendKey();
  if (key) {
    try {
      const resend = new Resend(key);
      const to = process.env.NOTIFY_EMAIL || 'hello@factdefiner.in';
      const from = process.env.NOTIFY_FROM || 'Portfolio <onboarding@resend.dev>';
      await resend.emails.send({
        from,
        to,
        subject: `New inquiry — ${data.name} (${data.service})`,
        html: `
          <h2>New project inquiry</h2>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Service:</strong> ${data.service}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
          <p><strong>Reference:</strong> ${data.reference_link || '—'}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message.replace(/\n/g, '<br/>')}</p>
        `,
      });
    } catch (e) {
      console.error('resend error:', e);
    }
  }

  return { ok: true };
}
