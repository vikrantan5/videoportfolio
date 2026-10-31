import { z } from 'zod';

export const inquirySchema = z.object({
  name: z.string().min(2, 'Please enter your name').max(120),
  email: z.string().email('Please enter a valid email'),
  service: z.string().min(1, 'Pick a service'),
  budget: z.string().min(1, 'Pick a budget range'),
  message: z.string().min(10, 'Tell me a little more about the project').max(4000),
  reference_link: z.string().url('Must be a valid URL').or(z.literal('')).optional(),
  website: z.string().max(0).optional().or(z.literal('')),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const projectSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2).max(200),
  youtube_url: z.string().min(5),
  category: z.enum(['reel', 'youtube', 'ad', 'motion', 'podcast']),
  orientation: z.enum(['horizontal', 'vertical']),
  client_name: z.string().max(120).optional().or(z.literal('')),
  description: z.string().max(4000).optional().or(z.literal('')),
  role: z.string().max(120).optional().or(z.literal('')),
  tools: z.array(z.string()).max(12).default([]),
  views_label: z.string().max(40).optional().or(z.literal('')),
  is_featured: z.boolean().default(true),
  sort_order: z.number().int().default(0),
  thumbnail_override: z.string().optional().or(z.literal('')),
});

export const testimonialSchema = z.object({
  id: z.string().uuid().optional(),
  client_name: z.string().min(2).max(120),
  client_role: z.string().max(120).optional().or(z.literal('')),
  avatar_url: z.string().optional().or(z.literal('')),
  quote: z.string().min(5).max(1000),
  rating: z.number().int().min(1).max(5).default(5),
  is_visible: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export const serviceSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2).max(120),
  description: z.string().max(1000).optional().or(z.literal('')),
  icon: z.string().max(60).optional().or(z.literal('')),
  starting_price: z.string().max(60).optional().or(z.literal('')),
  features: z.array(z.string()).max(12).default([]),
  is_visible: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export const settingsSchema = z.object({
  editor_name: z.string().min(1).max(120),
  tagline: z.string().max(240),
  channel_name: z.string().max(120),
  channel_url: z.string().url().or(z.literal('')),
  channel_avatar_url: z.string().optional().or(z.literal('')),
  subscriber_count_label: z.string().max(40).optional().or(z.literal('')),
  total_views_label: z.string().max(40).optional().or(z.literal('')),
  videos_edited_count: z.string().max(40).optional().or(z.literal('')),
  clients_count: z.string().max(40).optional().or(z.literal('')),
  email: z.string().max(120).optional().or(z.literal('')),
  whatsapp: z.string().max(40).optional().or(z.literal('')),
  instagram: z.string().max(200).optional().or(z.literal('')),
  resume_url: z.string().optional().or(z.literal('')),
});
