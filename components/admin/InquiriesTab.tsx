'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { MailCheck, MailOpen, Trash2, Loader2 } from 'lucide-react';
import { setInquiryStatus, deleteInquiry } from '@/app/actions/admin';
import type { Inquiry } from '@/types/database';

export function InquiriesTab({ inquiries }: { inquiries: Inquiry[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const act = async (id: string, fn: () => Promise<{ ok: boolean; error?: string }>, msg: string) => {
    setBusy(id);
    const res = await fn();
    setBusy(null);
    if (res.ok) {
      toast.success(msg);
      router.refresh();
    } else toast.error(res.error || 'Action failed');
  };

  return (
    <div data-testid="admin-inquiries-tab">
      <h2 className="font-syne text-2xl font-extrabold uppercase">Inquiries</h2>
      <p className="mt-1 text-sm text-zinc-500">Client briefs from the contact form.</p>

      <ul className="mt-6 space-y-3">
        {inquiries.map((i) => (
          <li key={i.id} className="glass rounded-2xl p-5" data-testid={`inquiry-${i.id}`}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="font-syne text-sm font-bold">
                  {i.name}
                  <span className="ml-2 font-mono text-[10px] font-normal uppercase tracking-[0.15em] text-zinc-500">{i.email}</span>
                </p>
                <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-lime">
                  {i.service || 'General'} · {i.budget || 'budget n/a'} · {new Date(i.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className={`rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] ${i.status === 'new' ? 'bg-lime/15 text-lime' : i.status === 'replied' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/[0.06] text-zinc-500'}`}>
                  {i.status}
                </span>
                {i.status === 'new' && (
                  <button onClick={() => act(i.id, () => setInquiryStatus(i.id, 'read'), 'Marked as read')} aria-label="Mark read" data-testid={`inquiry-read-${i.id}`} className="rounded-full p-2 text-zinc-500 hover:text-lime">
                    <MailOpen className="h-4 w-4" />
                  </button>
                )}
                {i.status !== 'replied' && (
                  <button onClick={() => act(i.id, () => setInquiryStatus(i.id, 'replied'), 'Marked as replied')} aria-label="Mark replied" data-testid={`inquiry-replied-${i.id}`} className="rounded-full p-2 text-zinc-500 hover:text-emerald-400">
                    <MailCheck className="h-4 w-4" />
                  </button>
                )}
                <button onClick={() => { if (confirm('Delete this inquiry?')) act(i.id, () => deleteInquiry(i.id), 'Deleted'); }} aria-label="Delete inquiry" data-testid={`inquiry-delete-${i.id}`} className="rounded-full p-2 text-zinc-500 hover:text-red-400">
                  {busy === i.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button onClick={() => setExpanded(expanded === i.id ? null : i.id)} data-testid={`inquiry-expand-${i.id}`} className="mt-3 block w-full text-left">
              <p className={`text-sm leading-relaxed text-zinc-400 ${expanded === i.id ? '' : 'line-clamp-2'}`}>{i.message}</p>
              {i.reference_link && expanded === i.id && (
                <a href={i.reference_link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.15em] text-lime underline-offset-4 hover:underline">
                  Reference link →
                </a>
              )}
            </button>
          </li>
        ))}
        {inquiries.length === 0 && <p className="py-10 text-center text-sm text-zinc-500">Inbox zero. Share your portfolio and briefs will land here.</p>}
      </ul>
    </div>
  );
}
