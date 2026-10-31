export type Category = 'reel' | 'youtube' | 'ad' | 'motion' | 'podcast';
export type Orientation = 'horizontal' | 'vertical';

export interface Project {
  id: string;
  title: string;
  slug: string;
  youtube_url: string;
  youtube_id: string;
  category: Category;
  orientation: Orientation;
  client_name: string | null;
  description: string | null;
  role: string | null;
  tools: string[] | null;
  views_label: string | null;
  is_featured: boolean;
  sort_order: number;
  thumbnail_override: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string | null;
  avatar_url: string | null;
  quote: string;
  rating: number;
  is_visible: boolean;
  sort_order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  starting_price: string | null;
  features: string[] | null;
  is_visible: boolean;
  sort_order: number;
}

export interface BeforeAfter {
  id: string;
  title: string;
  before_url: string;
  after_url: string;
  sort_order: number;
}

export interface SiteSettings {
  id: string;
  editor_name: string;
  tagline: string;
  channel_name: string;
  channel_url: string;
  channel_avatar_url: string | null;
  subscriber_count_label: string | null;
  total_views_label: string | null;
  videos_edited_count: string | null;
  clients_count: string | null;
  email: string | null;
  whatsapp: string | null;
  instagram: string | null;
  resume_url: string | null;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string | null;
  budget: string | null;
  message: string;
  reference_link: string | null;
  status: 'new' | 'read' | 'replied';
  created_at: string;
}
