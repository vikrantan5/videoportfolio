'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';
import { upsertService, deleteService } from '@/app/actions/admin';
import type { Service } from '@/types/database';

type EditingService = Omit<Partial<Service>, 'features'> & { features: string };

const EMPTY: EditingService = { 
  title: '', 
  description: '', 
  icon: 'Clapperboard', 
  starting_price: '', 
  features: '', 
  is_visible: true, 
  sort_order: 0 
};

const ICONS = ['Smartphone', 'MonitorPlay', 'Megaphone', 'Palette', 'Sparkles', 'Mic', 'Clapperboard'];

export function ServicesTab({ services }: { services: Service[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<EditingService | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const res = await upsertService({
      id: editing.id,
      title: editing.title || '',
      description: editing.description || '',
      icon: editing.icon || 'Clapperboard',
      starting_price: editing.starting_price || '',
      features: editing.features.split(',').map((f) => f.trim()).filter(Boolean),
      is_visible: editing.is_visible ?? true,
      sort_order: editing.sort_order ?? 0,
    });
    setSaving(false);
    if (res.ok) {
      toast.success('Service saved');
      setEditing(null);
      router.refresh();
    } else toast.error(res.error || 'Save failed');
  };

  const remove = async (s: Service) => {
    if (!confirm(`Delete "${s.title}"?`)) return;
    const res = await deleteService(s.id);
    if (res.ok) {
      toast.success('Deleted');
      router.refresh();
    } else toast.error(res.error || 'Delete failed');
  };

  return (
    <div data-testid="admin-services-tab">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-syne text-xl font-extrabold uppercase sm:text-2xl">Services</h2>
        <button 
          onClick={() => setEditing({ ...EMPTY, sort_order: services.length + 1 })} 
          data-testid="service-add-btn" 
          className="flex w-full items-center justify-center gap-2 rounded-full bg-lime px-5 py-2.5 font-syne text-xs font-bold uppercase tracking-wider text-ink sm:w-auto"
        >
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      {editing && (
        <div className="glass mt-6 space-y-4 rounded-2xl p-5 sm:p-6" data-testid="service-form">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="fd-label">Title *</label>
              <input className="fd-input w-full" data-testid="service-title-input" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className="fd-label">Icon</label>
              {/* FIX: Added `|| 'Clapperboard'` to handle null */}
              <select className="fd-input w-full" value={editing.icon || 'Clapperboard'} onChange={(e) => setEditing({ ...editing, icon: e.target.value })}>
                {ICONS.map((i) => <option key={i} value={i} className="bg-panel">{i}</option>)}
              </select>
            </div>
            <div>
              <label className="fd-label">Starting price</label>
              <input className="fd-input w-full" placeholder="₹1,499 / video" value={editing.starting_price || ''} onChange={(e) => setEditing({ ...editing, starting_price: e.target.value })} />
            </div>
            <div>
              <label className="fd-label">Sort order</label>
              <input className="fd-input w-full" type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className="fd-label">Description</label>
            <textarea className="fd-input w-full resize-none" rows={2} value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <div>
            <label className="fd-label">Features (comma separated)</label>
            <input className="fd-input w-full" placeholder="Hooks, Captions, 48h turnaround" value={editing.features} onChange={(e) => setEditing({ ...editing, features: e.target.value })} />
          </div>
          <label className="flex items-center gap-3 text-sm text-zinc-300">
            <input type="checkbox" checked={editing.is_visible ?? true} onChange={(e) => setEditing({ ...editing, is_visible: e.target.checked })} className="h-4 w-4 accent-lime" />
            Visible on site
          </label>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button onClick={save} disabled={saving} data-testid="service-save-btn" className="flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-syne text-xs font-bold uppercase tracking-wider text-ink disabled:opacity-60 sm:w-auto">
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save Service
            </button>
            <button onClick={() => setEditing(null)} className="w-full rounded-full border border-white/15 px-6 py-3 font-syne text-xs font-bold uppercase tracking-wider text-zinc-300 sm:w-auto">
              Cancel
            </button>
          </div>
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {services.map((s) => (
          <li key={s.id} className="glass flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">
                {s.title} <span className="font-normal text-lime">· {s.starting_price}</span>
              </p>
              <p className="truncate text-xs text-zinc-500">{s.description}</p>
            </div>
            <div className="flex shrink-0 items-center justify-end gap-1.5 sm:justify-start">
              <button 
                onClick={() => setEditing({ 
                  ...s, 
                  features: (s.features || []).join(', '), 
                  description: s.description || '', 
                  starting_price: s.starting_price || '', 
                  icon: s.icon || 'Clapperboard' 
                })} 
                aria-label="Edit" 
                className="rounded-full p-2 text-zinc-500 hover:text-lime"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(s)} aria-label="Delete" className="rounded-full p-2 text-zinc-500 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
        {services.length === 0 && <p className="py-10 text-center text-sm text-zinc-500">No services yet.</p>}
      </ul>
    </div>
  );
}