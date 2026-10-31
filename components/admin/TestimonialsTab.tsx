'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Loader2, Star } from 'lucide-react';
import { upsertTestimonial, deleteTestimonial } from '@/app/actions/admin';
import type { Testimonial } from '@/types/database';

const EMPTY = { client_name: '', client_role: '', avatar_url: '', quote: '', rating: 5, is_visible: true, sort_order: 0 };

export function TestimonialsTab({ testimonials }: { testimonials: Testimonial[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const res = await upsertTestimonial({
      id: editing.id,
      client_name: editing.client_name || '',
      client_role: editing.client_role || '',
      avatar_url: editing.avatar_url || '',
      quote: editing.quote || '',
      rating: editing.rating ?? 5,
      is_visible: editing.is_visible ?? true,
      sort_order: editing.sort_order ?? 0,
    });
    setSaving(false);
    if (res.ok) {
      toast.success('Testimonial saved');
      setEditing(null);
      router.refresh();
    } else toast.error(res.error || 'Save failed');
  };

  const remove = async (t: Testimonial) => {
    if (!confirm(`Delete testimonial from ${t.client_name}?`)) return;
    const res = await deleteTestimonial(t.id);
    if (res.ok) {
      toast.success('Deleted');
      router.refresh();
    } else toast.error(res.error || 'Delete failed');
  };

  return (
    <div data-testid="admin-testimonials-tab">
      <div className="flex items-center justify-between">
        <h2 className="font-syne text-2xl font-extrabold uppercase">Testimonials</h2>
        <button onClick={() => setEditing({ ...EMPTY, sort_order: testimonials.length + 1 })} data-testid="testimonial-add-btn" className="flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 font-syne text-xs font-bold uppercase tracking-wider text-ink">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>

      {editing && (
        <div className="glass mt-6 space-y-4 rounded-2xl p-6" data-testid="testimonial-form">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="fd-label">Client name *</label>
              <input className="fd-input" data-testid="testimonial-name-input" value={editing.client_name || ''} onChange={(e) => setEditing({ ...editing, client_name: e.target.value })} />
            </div>
            <div>
              <label className="fd-label">Role / channel</label>
              <input className="fd-input" placeholder="Tech YouTuber · 1.2M subs" value={editing.client_role || ''} onChange={(e) => setEditing({ ...editing, client_role: e.target.value })} />
            </div>
            <div>
              <label className="fd-label">Rating</label>
              <select className="fd-input" value={editing.rating ?? 5} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r} className="bg-panel">{r} stars</option>)}
              </select>
            </div>
            <div>
              <label className="fd-label">Sort order</label>
              <input className="fd-input" type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className="fd-label">Quote *</label>
            <textarea className="fd-input resize-none" rows={3} value={editing.quote || ''} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} />
          </div>
          <label className="flex items-center gap-3 text-sm text-zinc-300">
            <input type="checkbox" checked={editing.is_visible ?? true} onChange={(e) => setEditing({ ...editing, is_visible: e.target.checked })} className="h-4 w-4 accent-lime" />
            Visible on site
          </label>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} data-testid="testimonial-save-btn" className="flex items-center gap-2 rounded-full bg-lime px-6 py-3 font-syne text-xs font-bold uppercase tracking-wider text-ink disabled:opacity-60">
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save
            </button>
            <button onClick={() => setEditing(null)} className="rounded-full border border-white/15 px-6 py-3 font-syne text-xs font-bold uppercase tracking-wider text-zinc-300">Cancel</button>
          </div>
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {testimonials.map((t) => (
          <li key={t.id} className="glass flex items-center gap-4 rounded-2xl p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime/15 font-syne text-sm font-bold text-lime">{t.client_name.slice(0, 1)}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{t.client_name} <span className="font-normal text-zinc-500">· {t.client_role}</span></p>
              <p className="truncate text-xs text-zinc-500">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-0.5 flex gap-0.5">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} className="h-3 w-3 fill-lime text-lime" />)}</p>
            </div>
            <button onClick={() => setEditing(t)} aria-label="Edit" className="rounded-full p-2 text-zinc-500 hover:text-lime"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => remove(t)} aria-label="Delete" className="rounded-full p-2 text-zinc-500 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>
          </li>
        ))}
        {testimonials.length === 0 && <p className="py-10 text-center text-sm text-zinc-500">No testimonials yet.</p>}
      </ul>
    </div>
  );
}
