'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LayoutDashboard, Clapperboard, MessageSquareQuote, Wrench, Settings2, Inbox, LogOut, AlertTriangle } from 'lucide-react';
import { adminLogout } from '@/app/actions/admin';
import { LogoMark } from '@/components/site/Logo';
import type { BeforeAfter, Inquiry, Project, Service, SiteSettings, Testimonial } from '@/types/database';
import { DashboardTab } from '@/components/admin/DashboardTab';
import { ProjectsTab } from '@/components/admin/ProjectsTab';
import { TestimonialsTab } from '@/components/admin/TestimonialsTab';
import { ServicesTab } from '@/components/admin/ServicesTab';
import { SettingsTab } from '@/components/admin/SettingsTab';
import { InquiriesTab } from '@/components/admin/InquiriesTab';

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'projects', label: 'Projects', icon: Clapperboard },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { key: 'services', label: 'Services', icon: Wrench },
  { key: 'inquiries', label: 'Inquiries', icon: Inbox },
  { key: 'settings', label: 'Settings', icon: Settings2 },
] as const;

type TabKey = (typeof TABS)[number]['key'];

interface Props {
  projects: Project[];
  testimonials: Testimonial[];
  services: Service[];
  inquiries: Inquiry[];
  settings: SiteSettings | null;
  beforeAfter: BeforeAfter[];
  dbError: string | null;
}

export function AdminShell({ projects, testimonials, services, inquiries, settings, beforeAfter, dbError }: Props) {
  const [tab, setTab] = useState<TabKey>('dashboard');
  const router = useRouter();
  const newCount = inquiries.filter((i) => i.status === 'new').length;

  const logout = async () => {
    await adminLogout();
    toast.success('Logged out. Cut!');
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <main className="min-h-svh bg-ink" data-testid="admin-panel">
      <header className="glass sticky top-0 z-40 border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8" />
            <div>
              <p className="font-syne text-sm font-extrabold uppercase leading-none">FactDefiner</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">Edit Bay · Admin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" data-testid="admin-view-site-link" className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 transition-colors hover:text-lime sm:block">
              View site →
            </a>
            <button onClick={logout} data-testid="admin-logout-btn" className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 transition-colors hover:border-red-500/50 hover:text-red-400">
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {dbError && (
        <div className="mx-auto mt-6 flex max-w-6xl items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-sm text-amber-300 mx-5 sm:mx-auto" data-testid="admin-db-error">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Couldn&rsquo;t reach the database ({dbError}). Run <code className="font-mono text-amber-200">supabase/migrations/001_initial_schema.sql</code> and{' '}
            <code className="font-mono text-amber-200">002_seed.sql</code> in your Supabase SQL Editor, then refresh.
          </p>
        </div>
      )}

      <div className="mx-auto flex max-w-6xl gap-8 px-5 py-8">
        <nav className="sticky top-24 hidden h-fit w-48 shrink-0 flex-col gap-1 md:flex" aria-label="Admin sections">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              data-testid={`admin-tab-${t.key}`}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.15em] transition-colors ${
                tab === t.key ? 'bg-lime/10 text-lime' : 'text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-200'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <t.icon className="h-4 w-4" /> {t.label}
              </span>
              {t.key === 'inquiries' && newCount > 0 && (
                <span className="rounded-full bg-lime px-2 py-0.5 text-[9px] font-bold text-ink">{newCount}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 md:hidden" aria-label="Admin sections">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                data-testid={`admin-tab-mobile-${t.key}`}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] ${
                  tab === t.key ? 'bg-lime text-ink' : 'border border-white/10 text-zinc-400'
                }`}
              >
                <t.icon className="h-3.5 w-3.5" /> {t.label}
                {t.key === 'inquiries' && newCount > 0 && <span className="rounded-full bg-ink px-1.5 text-[9px] font-bold text-lime">{newCount}</span>}
              </button>
            ))}
          </div>

          {tab === 'dashboard' && <DashboardTab projects={projects} inquiries={inquiries} settings={settings} setTab={(t) => setTab(t as TabKey)} />}
          {tab === 'projects' && <ProjectsTab projects={projects} />}
          {tab === 'testimonials' && <TestimonialsTab testimonials={testimonials} />}
          {tab === 'services' && <ServicesTab services={services} />}
          {tab === 'inquiries' && <InquiriesTab inquiries={inquiries} />}
          {tab === 'settings' && <SettingsTab settings={settings} />}
        </div>
      </div>
    </main>
  );
}
