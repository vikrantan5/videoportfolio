import { createSupabaseServer } from '@/lib/supabase/server';
import { AdminShell } from '@/components/admin/AdminShell';
import type { Inquiry, Project, Service, SiteSettings, Testimonial, BeforeAfter } from '@/types/database';

export const dynamic = 'force-dynamic';

async function getData() {
  const supabase = createSupabaseServer();
  const [projects, testimonials, services, inquiries, settings, beforeAfter] = await Promise.all([
    supabase.from('projects').select('*').order('sort_order', { ascending: true }),
    supabase.from('testimonials').select('*').order('sort_order', { ascending: true }),
    supabase.from('services').select('*').order('sort_order', { ascending: true }),
    supabase.from('inquiries').select('*').order('created_at', { ascending: false }),
    supabase.from('site_settings').select('*').limit(1).maybeSingle(),
    supabase.from('before_after').select('*').order('sort_order', { ascending: true }),
  ]);
  return {
    projects: (projects.data || []) as Project[],
    testimonials: (testimonials.data || []) as Testimonial[],
    services: (services.data || []) as Service[],
    inquiries: (inquiries.data || []) as Inquiry[],
    settings: (settings.data || null) as SiteSettings | null,
    beforeAfter: (beforeAfter.data || []) as BeforeAfter[],
    dbError: projects.error?.message || inquiries.error?.message || null,
  };
}

export default async function AdminPage() {
  const data = await getData();
  return <AdminShell {...data} />;
}
