'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { updateSettings } from '@/app/actions/admin';
import { FALLBACK_SETTINGS } from '@/lib/data';
import type { SiteSettings } from '@/types/database';

export function SettingsTab({ settings }: { settings: SiteSettings | null }) {
  const router = useRouter();
  const [form, setForm] = useState<SiteSettings>(settings || FALLBACK_SETTINGS);
  const [saving, setSaving] = useState(false);

  const set = (key: keyof SiteSettings, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    setSaving(true);
    const res = await updateSettings({
      editor_name: form.editor_name,
      tagline: form.tagline,
      channel_name: form.channel_name,
      channel_url: form.channel_url,
      channel_avatar_url: form.channel_avatar_url || '',
      subscriber_count_label: form.subscriber_count_label || '',
      total_views_label: form.total_views_label || '',
      videos_edited_count: form.videos_edited_count || '',
      clients_count: form.clients_count || '',
      email: form.email || '',
      whatsapp: form.whatsapp || '',
      instagram: form.instagram || '',
      resume_url: form.resume_url || '',
    });
    setSaving(false);
    if (res.ok) {
      toast.success('Settings saved — site updated');
      router.refresh();
    } else toast.error(res.error || 'Save failed');
  };

  const field = (key: keyof SiteSettings, label: string, placeholder = '') => (
    <div key={key}>
      <label className="fd-label">{label}</label>
      <input className="fd-input" placeholder={placeholder} value={(form[key] as string) || ''} onChange={(e) => set(key, e.target.value)} />
    </div>
  );

  return (
    <div data-testid="admin-settings-tab">
      <h2 className="font-syne text-2xl font-extrabold uppercase">Site Settings</h2>
      <p className="mt-1 text-sm text-zinc-500">Name, tagline, channel, stats and contact info — everything the site shows.</p>

      <div className="glass mt-6 space-y-5 rounded-2xl p-6" data-testid="settings-form">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime">Brand</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {field('editor_name', 'Editor name', 'FactDefiner')}
          {field('tagline', 'Tagline', 'I turn raw footage into stories…')}
        </div>

        <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-lime">YouTube channel</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {field('channel_name', 'Channel name', 'Fact Definer VIKRANT')}
          {field('channel_url', 'Channel URL', 'https://www.youtube.com/@Factdefiner')}
          {field('channel_avatar_url', 'Channel avatar URL (optional)')}
          {field('subscriber_count_label', 'Subscriber label', '150K+')}
        </div>

        <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-lime">Hero stats</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {field('videos_edited_count', 'Videos edited', '500+')}
          {field('total_views_label', 'Total views', '50M+')}
          {field('clients_count', 'Happy clients', '80+')}
        </div>

        <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-lime">Contact</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {field('email', 'Email', 'hello@factdefiner.in')}
          {field('whatsapp', 'WhatsApp (country code, digits only)', '919999999999')}
          {field('instagram', 'Instagram URL', 'https://instagram.com/factdefiner')}
          {field('resume_url', 'Resume / rate card URL (optional)')}
        </div>

        <button onClick={save} disabled={saving} data-testid="settings-save-btn" className="flex items-center gap-2 rounded-full bg-lime px-8 py-3.5 font-syne text-xs font-bold uppercase tracking-wider text-ink disabled:opacity-60">
          {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save settings
        </button>
      </div>
    </div>
  );
}
