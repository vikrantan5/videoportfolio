'use server';

import { revalidatePath } from 'next/cache';
import { createSupabaseServer } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { projectSchema, testimonialSchema, serviceSchema, settingsSchema } from '@/lib/validators';
import { extractYouTubeId } from '@/lib/utils';

async function requireAdmin() {
  const supabase = createSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');
  return createAdminClient();
}

function revalidateSite() {
  revalidatePath('/');
  revalidatePath('/admin');
}

// ---------- AUTH ----------

export async function adminLogin(input: { email: string; password: string }) {
  const supabase = createSupabaseServer();
  const { error } = await supabase.auth.signInWithPassword({ email: input.email, password: input.password });
  if (error) return { ok: false, error: 'Invalid email or password' };
  return { ok: true };
}

export async function adminLogout() {
  const supabase = createSupabaseServer();
  await supabase.auth.signOut();
  return { ok: true };
}

// ---------- PROJECTS ----------

export async function upsertProject(input: unknown) {
  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message || 'Invalid data' };
  const d = parsed.data;

  const youtubeId = extractYouTubeId(d.youtube_url);
  if (!youtubeId) return { ok: false, error: 'Could not extract a YouTube video ID from that URL' };

  const slug = d.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);

  const row = {
    title: d.title,
    slug,
    youtube_url: d.youtube_url,
    youtube_id: youtubeId,
    category: d.category,
    orientation: d.orientation,
    client_name: d.client_name || null,
    description: d.description || null,
    role: d.role || null,
    tools: d.tools,
    views_label: d.views_label || null,
    is_featured: d.is_featured,
    sort_order: d.sort_order,
    thumbnail_override: d.thumbnail_override || null,
  };

  const admin = await requireAdmin();
  const query = d.id
    ? admin.from('projects').update(row).eq('id', d.id)
    : admin.from('projects').insert(row);
  const { error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

export async function deleteProject(id: string) {
  const admin = await requireAdmin();
  const { error } = await admin.from('projects').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

export async function fetchYouTubeTitle(url: string) {
  const id = extractYouTubeId(url);
  if (!id) return { ok: false, error: 'Invalid YouTube URL' };
  try {
    const res = await fetch(`https://www.youtube.com/oembed?url=https://youtu.be/${id}&format=json`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return { ok: true, id, title: null };
    const json = await res.json();
    return { ok: true, id, title: json.title as string };
  } catch {
    return { ok: true, id, title: null };
  }
}

// ---------- TESTIMONIALS ----------

export async function upsertTestimonial(input: unknown) {
  const parsed = testimonialSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message || 'Invalid data' };
  const { id, ...row } = parsed.data;
  const admin = await requireAdmin();
  const query = id
    ? admin.from('testimonials').update(row).eq('id', id)
    : admin.from('testimonials').insert(row);
  const { error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

export async function deleteTestimonial(id: string) {
  const admin = await requireAdmin();
  const { error } = await admin.from('testimonials').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

// ---------- SERVICES ----------

export async function upsertService(input: unknown) {
  const parsed = serviceSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message || 'Invalid data' };
  const { id, ...row } = parsed.data;
  const admin = await requireAdmin();
  const query = id
    ? admin.from('services').update(row).eq('id', id)
    : admin.from('services').insert(row);
  const { error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

export async function deleteService(id: string) {
  const admin = await requireAdmin();
  const { error } = await admin.from('services').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

// ---------- SETTINGS ----------

export async function updateSettings(input: unknown) {
  const parsed = settingsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message || 'Invalid data' };
  const admin = await requireAdmin();
  const { data: existing } = await admin.from('site_settings').select('id').limit(1).maybeSingle();
  const query = existing
    ? admin.from('site_settings').update(parsed.data).eq('id', existing.id)
    : admin.from('site_settings').insert(parsed.data);
  const { error } = await query;
  if (error) return { ok: false, error: error.message };
  revalidateSite();
  return { ok: true };
}

// ---------- INQUIRIES ----------

export async function setInquiryStatus(id: string, status: 'new' | 'read' | 'replied') {
  const admin = await requireAdmin();
  const { error } = await admin.from('inquiries').update({ status }).eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin');
  return { ok: true };
}

export async function deleteInquiry(id: string) {
  const admin = await requireAdmin();
  const { error } = await admin.from('inquiries').delete().eq('id', id);
  if (error) return { ok: false, error: error.message };
  revalidatePath('/admin');
  return { ok: true };
}
