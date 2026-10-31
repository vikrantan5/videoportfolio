'use client';

import { Clapperboard, Inbox, Youtube, ArrowRight } from 'lucide-react';
import type { Inquiry, Project, SiteSettings } from '@/types/database';

export function DashboardTab({
  projects,
  inquiries,
  settings,
  setTab,
}: {
  projects: Project[];
  inquiries: Inquiry[];
  settings: SiteSettings | null;
  setTab: (tab: string) => void;
}) {
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  const cards = [
    { label: 'Total projects', value: projects.length, icon: Clapperboard, tab: 'projects', testid: 'dash-projects-card' },
    { label: 'New inquiries', value: newInquiries, icon: Inbox, tab: 'inquiries', testid: 'dash-inquiries-card' },
    { label: 'Channel', value: settings?.channel_name || 'Not set', icon: Youtube, tab: 'settings', testid: 'dash-channel-card' },
  ];

  return (
    <div data-testid="admin-dashboard">
      <h2 className="font-syne text-2xl font-extrabold uppercase">Dashboard</h2>
      <p className="mt-1 text-sm text-zinc-500">The whole studio at a glance.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <button key={c.label} onClick={() => setTab(c.tab)} data-testid={c.testid} className="glass group rounded-2xl p-6 text-left transition-colors hover:border-lime/40">
            <c.icon className="h-6 w-6 text-lime" />
            <p className="mt-4 font-syne text-3xl font-extrabold">{c.value}</p>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-lime">
              {c.label} <ArrowRight className="h-3 w-3" />
            </p>
          </button>
        ))}
      </div>

      <div className="glass mt-6 rounded-2xl p-6">
        <h3 className="font-syne text-sm font-bold uppercase tracking-wide">Latest inquiries</h3>
        {inquiries.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-500">No inquiries yet — share your portfolio link.</p>
        ) : (
          <ul className="mt-4 divide-y divide-white/[0.06]">
            {inquiries.slice(0, 5).map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-200">{i.name} <span className="font-normal text-zinc-500">· {i.service || 'General'}</span></p>
                  <p className="truncate text-xs text-zinc-500">{i.message}</p>
                </div>
                <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] ${i.status === 'new' ? 'bg-lime/15 text-lime' : 'bg-white/[0.06] text-zinc-500'}`}>
                  {i.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
