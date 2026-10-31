'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';
import { Pencil, Trash2, Plus, Loader2, Eye, EyeOff, Youtube } from 'lucide-react';
import { upsertProject, deleteProject, fetchYouTubeTitle } from '@/app/actions/admin';
import { extractYouTubeId, ytThumb } from '@/lib/utils';
import type { Category, Orientation, Project } from '@/types/database';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'reel', label: 'Reel / Short' },
  { value: 'youtube', label: 'YouTube' },
  { value: 'ad', label: 'Ad' },
  { value: 'motion', label: 'Motion Graphics' },
  { value: 'podcast', label: 'Podcast' },
];

// FIX: Omit 'tools' from Project, then redefine it as a string for the form
type EditingProject = Omit<Partial<Project>, 'tools'> & { tools: string };

const EMPTY: EditingProject = {
  title: '',
  youtube_url: '',
  category: 'youtube' as Category,
  orientation: 'horizontal' as Orientation,
  client_name: '',
  description: '',
  role: '',
  tools: '',
  views_label: '',
  is_featured: true,
  sort_order: 0,
  thumbnail_override: '',
};

export function ProjectsTab({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const [editing, setEditing] = useState<EditingProject | null>(null);
  const [fetching, setFetching] = useState(false);
  const [saving, setSaving] = useState(false);

  const previewId = editing ? extractYouTubeId(editing.youtube_url || '') : null;

  const pasteUrl = async (url: string) => {
    setEditing((e) => (e ? { ...e, youtube_url: url } : e));
    const id = extractYouTubeId(url);
    if (!id) return;
    setFetching(true);
    const res = await fetchYouTubeTitle(url);
    setFetching(false);
    if (res.ok && res.title) {
      setEditing((e) => (e && !e.title ? { ...e, youtube_url: url, title: res.title! } : e));
      toast.success('Video found — title pulled from YouTube');
    }
  };

  const save = async () => {
    if (!editing) return;
    setSaving(true);
    const res = await upsertProject({
      id: editing.id,
      title: editing.title || '',
      youtube_url: editing.youtube_url || '',
      category: editing.category || 'youtube',
      orientation: editing.orientation || 'horizontal',
      client_name: editing.client_name || '',
      description: editing.description || '',
      role: editing.role || '',
      tools: editing.tools.split(',').map((t) => t.trim()).filter(Boolean),
      views_label: editing.views_label || '',
      is_featured: editing.is_featured ?? true,
      sort_order: editing.sort_order ?? 0,
      thumbnail_override: editing.thumbnail_override || '',
    });
    setSaving(false);
    if (res.ok) {
      toast.success(editing.id ? 'Project updated' : 'Project added');
      setEditing(null);
      router.refresh();
    } else {
      toast.error(res.error || 'Save failed');
    }
  };

  const remove = async (p: Project) => {
    if (!confirm(`Delete "${p.title}"?`)) return;
    const res = await deleteProject(p.id);
    if (res.ok) {
      toast.success('Project deleted');
      router.refresh();
    } else toast.error(res.error || 'Delete failed');
  };

  const toggleFeatured = async (p: Project) => {
    const res = await upsertProject({ 
      ...p, 
      tools: p.tools || [], 
      is_featured: !p.is_featured, 
      client_name: p.client_name || '', 
      description: p.description || '', 
      role: p.role || '', 
      views_label: p.views_label || '', 
      thumbnail_override: p.thumbnail_override || '' 
    });
    if (res.ok) {
      toast.success(p.is_featured ? 'Hidden from site' : 'Visible on site');
      router.refresh();
    } else toast.error(res.error || 'Update failed');
  };

  return (
    <div data-testid="admin-projects-tab">
      {/* Header section - stacked on mobile */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-syne text-xl font-extrabold uppercase sm:text-2xl">Projects</h2>
          <p className="mt-1 text-sm text-zinc-500">Paste a YouTube link — ID and title fill themselves in.</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY, sort_order: projects.length + 1 })}
          data-testid="project-add-btn"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-lime px-5 py-2.5 font-syne text-xs font-bold uppercase tracking-wider text-ink sm:w-auto"
        >
          <Plus className="h-4 w-4" /> Add project
        </button>
      </div>

      {/* Edit Form - padded nicely on mobile */}
      {editing && (
        <div className="glass mt-6 space-y-4 rounded-2xl p-5 sm:p-6" data-testid="project-form">
          <div>
            <label className="fd-label">YouTube URL *</label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <input
                className="fd-input w-full"
                data-testid="project-url-input"
                placeholder="https://youtu.be/… or youtube.com/watch?v=… or /shorts/…"
                value={editing.youtube_url || ''}
                onChange={(e) => pasteUrl(e.target.value)}
              />
              {fetching && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-lime" />}
            </div>
          </div>
          
          {previewId && (
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="relative aspect-video w-full max-w-[200px] shrink-0 overflow-hidden rounded-xl border border-white/10 sm:w-48">
                <Image src={ytThumb(previewId)} alt="Video preview" fill className="object-cover" unoptimized />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                ID: <span className="text-lime">{previewId}</span>
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="fd-label">Title *</label>
              <input className="fd-input w-full" data-testid="project-title-input" value={editing.title || ''} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className="fd-label">Client name</label>
              <input className="fd-input w-full" value={editing.client_name || ''} onChange={(e) => setEditing({ ...editing, client_name: e.target.value })} />
            </div>
            <div>
              <label className="fd-label">Category</label>
              <select className="fd-input w-full" data-testid="project-category-select" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value as Category })}>
                {CATEGORIES.map((c) => <option key={c.value} value={c.value} className="bg-panel">{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="fd-label">Orientation</label>
              <select className="fd-input w-full" value={editing.orientation} onChange={(e) => setEditing({ ...editing, orientation: e.target.value as Orientation })}>
                <option value="horizontal" className="bg-panel">Horizontal 16:9</option>
                <option value="vertical" className="bg-panel">Vertical 9:16</option>
              </select>
            </div>
            <div>
              <label className="fd-label">Your role</label>
              <input className="fd-input w-full" placeholder="Editor & Colorist" value={editing.role || ''} onChange={(e) => setEditing({ ...editing, role: e.target.value })} />
            </div>
            <div>
              <label className="fd-label">Views label</label>
              <input className="fd-input w-full" placeholder="1.2M+ views" value={editing.views_label || ''} onChange={(e) => setEditing({ ...editing, views_label: e.target.value })} />
            </div>
            <div>
              <label className="fd-label">Tools (comma separated)</label>
              <input className="fd-input w-full" placeholder="Premiere Pro, DaVinci Resolve" value={editing.tools} onChange={(e) => setEditing({ ...editing, tools: e.target.value })} />
            </div>
            <div>
              <label className="fd-label">Sort order</label>
              <input className="fd-input w-full" type="number" value={editing.sort_order ?? 0} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} />
            </div>
          </div>
          <div>
            <label className="fd-label">Description</label>
            <textarea className="fd-input w-full resize-none" rows={3} value={editing.description || ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
          </div>
          <label className="flex items-center gap-3 text-sm text-zinc-300">
            <input type="checkbox" checked={editing.is_featured ?? true} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} className="h-4 w-4 accent-lime" />
            Featured on the public site
          </label>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button onClick={save} disabled={saving} data-testid="project-save-btn" className="flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-3 font-syne text-xs font-bold uppercase tracking-wider text-ink disabled:opacity-60 sm:w-auto">
              {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />} Save project
            </button>
            <button onClick={() => setEditing(null)} data-testid="project-cancel-btn" className="w-full rounded-full border border-white/15 px-6 py-3 font-syne text-xs font-bold uppercase tracking-wider text-zinc-300 sm:w-auto">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects List - responsive layout */}
      <ul className="mt-6 space-y-3">
        {projects.map((p) => (
          <li key={p.id} data-testid={`project-row-${p.slug}`} className="glass flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg border border-white/10 sm:w-24 md:w-32">
              <Image src={p.thumbnail_override || ytThumb(p.youtube_id)} alt={p.title} fill className="object-cover" unoptimized />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-syne text-sm font-bold">{p.title}</p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500">
                {p.category} · {p.orientation} · {p.views_label || 'no views label'}
              </p>
            </div>
            <div className="flex shrink-0 items-center justify-end gap-1.5 sm:justify-start">
              <a href={p.youtube_url} target="_blank" rel="noopener noreferrer" aria-label="Open on YouTube" className="rounded-full p-2 text-zinc-500 transition-colors hover:text-red-400">
                <Youtube className="h-4 w-4" />
              </a>
              <button onClick={() => toggleFeatured(p)} aria-label="Toggle visibility" data-testid={`project-toggle-${p.slug}`} className="rounded-full p-2 text-zinc-500 transition-colors hover:text-lime">
                {p.is_featured ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
              </button>
              <button
                onClick={() => setEditing({ ...p, tools: (p.tools || []).join(', '), client_name: p.client_name || '', description: p.description || '', role: p.role || '', views_label: p.views_label || '', thumbnail_override: p.thumbnail_override || '' })}
                aria-label="Edit project"
                data-testid={`project-edit-${p.slug}`}
                className="rounded-full p-2 text-zinc-500 transition-colors hover:text-lime"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button onClick={() => remove(p)} aria-label="Delete project" data-testid={`project-delete-${p.slug}`} className="rounded-full p-2 text-zinc-500 transition-colors hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
        {projects.length === 0 && <p className="py-10 text-center text-sm text-zinc-500">No projects yet. Add your first YouTube video above.</p>}
      </ul>
    </div>
  );
}