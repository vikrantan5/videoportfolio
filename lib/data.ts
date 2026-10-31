import { createPublicClient } from "@/lib/supabase/public";
import type {
  BeforeAfter,
  Project,
  Service,
  SiteSettings,
  Testimonial,
} from "@/types/database";

export const FALLBACK_SETTINGS: SiteSettings = {
  id: "fallback",
  editor_name: "FactDefiner",
  tagline: "I turn raw footage into stories people can\u2019t skip.",
  channel_name: "Fact Definer VIKRANT",
  channel_url: "https://www.youtube.com/@Factdefiner",
  channel_avatar_url: null,
  subscriber_count_label: "13K+",
  total_views_label: "50M+",
  videos_edited_count: "500+",
  clients_count: "80+",
  email: "vikrantsinghan5@gmail.com",
  whatsapp: "91+8240723013",
  instagram: "https://instagram.com/factdefiner",
  resume_url: null,
};

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Why Shakuni Got Heaven But Yudhishtir Got Hell?",
    slug: "shakuni-heaven-yudhishtir-hell",
    youtube_url: "https://youtu.be/5j72h8HMTGg",
    youtube_id: "5j72h8HMTGg",
    category: "youtube",
    orientation: "horizontal",
    client_name: "Fact Definer VIKRANT",
    description:
      "Mythology long-form episode — pacing, sound design and cinematic grading for maximum retention.",
    role: "Editor & Colorist",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    views_label: "1.2M+ views",
    is_featured: true,
    sort_order: 1,
    thumbnail_override: null,
    created_at: "",
  },
  {
    id: "p2",
    title: "Who Controls Your Karma — God or You?",
    slug: "who-controls-your-karma",
    youtube_url: "https://youtu.be/8worvy2fhGs",
    youtube_id: "8worvy2fhGs",
    category: "youtube",
    orientation: "horizontal",
    client_name: "Fact Definer VIKRANT",
    description:
      "Philosophical storytelling edit with layered motion graphics and rhythmic cuts.",
    role: "Editor & Motion Designer",
    tools: ["Premiere Pro", "After Effects"],
    views_label: "900K+ views",
    is_featured: true,
    sort_order: 2,
    thumbnail_override: null,
    created_at: "",
  },
  {
    id: "p3",
    title: "Did We Come From Mars? The Cheyava Falls Clue",
    slug: "cheyava-falls-mars",
    youtube_url: "https://youtu.be/2vFp5pcUT7k",
    youtube_id: "2vFp5pcUT7k",
    category: "youtube",
    orientation: "horizontal",
    client_name: "Fact Definer VIKRANT",
    description:
      "Science documentary edit — archival footage, VFX composites and a suspenseful score.",
    role: "Editor & VFX",
    tools: ["Premiere Pro", "After Effects", "Audition"],
    views_label: "2M+ views",
    is_featured: true,
    sort_order: 3,
    thumbnail_override: null,
    created_at: "",
  },
  {
    id: "p4",
    title: "Why Neem Karoli Baba Is Still A Mystery For Science",
    slug: "neem-karoli-baba-mystery",
    youtube_url: "https://youtu.be/qmX9sojezKc",
    youtube_id: "qmX9sojezKc",
    category: "reel",
    orientation: "vertical",
    client_name: "Fact Definer VIKRANT",
    description:
      "Vertical short-form cut engineered for the first 3 seconds — hooks, captions and punch-ins.",
    role: "Short-form Editor",
    tools: ["Premiere Pro", "CapCut"],
    views_label: "3M+ views",
    is_featured: true,
    sort_order: 4,
    thumbnail_override: null,
    created_at: "",
  },
  {
    id: "p5",
    title: "Foreign Monopoly Todkar Natraj Kaise Bana No. 1?",
    slug: "natraj-number-one",
    youtube_url: "https://youtu.be/0vNqdWC93Wk",
    youtube_id: "0vNqdWC93Wk",
    category: "youtube",
    orientation: "horizontal",
    client_name: "Fact Definer VIKRANT",
    description:
      "Brand-story documentary with kinetic typography and infographic animation.",
    role: "Editor & Motion Designer",
    tools: ["Premiere Pro", "After Effects"],
    views_label: "750K+ views",
    is_featured: true,
    sort_order: 5,
    thumbnail_override: null,
    created_at: "",
  },
  {
    id: "p6",
    title: "Varanasi: The City That Defies Death",
    slug: "varanasi-city-defies-death",
    youtube_url: "https://youtu.be/pMc_Mscz-AY",
    youtube_id: "pMc_Mscz-AY",
    category: "youtube",
    orientation: "horizontal",
    client_name: "Fact Definer VIKRANT",
    description:
      "Cinematic travel-documentary grade — drone footage, atmosphere and emotional pacing.",
    role: "Editor & Colorist",
    tools: ["DaVinci Resolve", "Premiere Pro"],
    views_label: "1.5M+ views",
    is_featured: true,
    sort_order: 6,
    thumbnail_override: null,
    created_at: "",
  },
  {
    id: "p7",
    title: "ASMR — How a Poor Boy Created Lamborghini",
    slug: "asmr-poor-boy-lamborghini",
    youtube_url: "https://youtu.be/BCjgcXikXjk",
    youtube_id: "BCjgcXikXjk",
    category: "reel",
    orientation: "vertical",
    client_name: "Fact Definer VIKRANT",
    description:
      "ASMR short — micro-editing, sound layering and hypnotic loop structure.",
    role: "Short-form Editor & Sound",
    tools: ["CapCut", "Audition"],
    views_label: "5M+ views",
    is_featured: true,
    sort_order: 7,
    thumbnail_override: null,
    created_at: "",
  },
];

export const FALLBACK_SERVICES: Service[] = [
  {
    id: "s1",
    title: "Reels & Shorts Editing",
    description:
      "Scroll-stopping vertical edits with hooks, captions and punch-ins engineered for the algorithm.",
    icon: "Smartphone",
    starting_price: "₹1,499 / video",
    features: [
      "Hook-first structure",
      "Animated captions",
      "Sound & trend sync",
      "48h turnaround",
    ],
    is_visible: true,
    sort_order: 1,
  },
  {
    id: "s2",
    title: "YouTube Long-Form",
    description:
      "Retention-first documentary and talking-head edits with story arcs, b-roll and motion graphics.",
    icon: "MonitorPlay",
    starting_price: "₹7,999 / video",
    features: [
      "Story arc & pacing",
      "B-roll & SFX design",
      "Motion graphics",
      "Retention editing",
    ],
    is_visible: true,
    sort_order: 2,
  },
  {
    id: "s3",
    title: "Ads & Promos",
    description:
      "High-converting ad creatives and brand promos cut to hold attention and drive clicks.",
    icon: "Megaphone",
    starting_price: "₹4,999 / ad",
    features: [
      "Direct-response cuts",
      "A/B variants",
      "CTA animation",
      "Platform versions",
    ],
    is_visible: true,
    sort_order: 3,
  },
  {
    id: "s4",
    title: "Color Grading",
    description:
      "Cinematic color science — from clean commercial looks to moody film emulation.",
    icon: "Palette",
    starting_price: "₹3,999 / project",
    features: [
      "Shot matching",
      "Custom LUTs",
      "Skin-tone work",
      "HDR delivery",
    ],
    is_visible: true,
    sort_order: 4,
  },
  {
    id: "s5",
    title: "Motion Graphics",
    description:
      "Titles, kinetic type, infographics and logo animation that make information addictive.",
    icon: "Sparkles",
    starting_price: "₹4,999 / package",
    features: [
      "Kinetic typography",
      "Infographic animation",
      "Logo stings",
      "Lower thirds",
    ],
    is_visible: true,
    sort_order: 5,
  },
  {
    id: "s6",
    title: "Podcast Clips",
    description:
      "Full podcast repurposing — clips, audiograms and multi-cam edits that grow channels.",
    icon: "Mic",
    starting_price: "₹999 / clip",
    features: [
      "Multi-cam sync",
      "Clip mining",
      "Branded captions",
      "Weekly batches",
    ],
    is_visible: true,
    sort_order: 6,
  },
];

export const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    client_name: "Rohit Sharma",
    client_role: "Tech YouTuber · 1.2M subs",
    avatar_url: null,
    quote:
      "FactDefiner took my retention from 38% to 61%. The pacing, the sound design — my audience literally comments about the editing now.",
    rating: 5,
    is_visible: true,
    sort_order: 1,
  },
  {
    id: "t2",
    client_name: "Ananya Iyer",
    client_role: "Founder, Skincare Brand",
    avatar_url: null,
    quote:
      "Our ad creatives finally convert. The hooks are ruthless — CTR doubled in two weeks. Worth every rupee.",
    rating: 5,
    is_visible: true,
    sort_order: 2,
  },
  {
    id: "t3",
    client_name: "Kunal Mehta",
    client_role: "Podcast Host",
    avatar_url: null,
    quote:
      "Fifty clips a month, on time, every time. My shorts channel grew 90K subs in a quarter on his edits alone.",
    rating: 5,
    is_visible: true,
    sort_order: 3,
  },
  {
    id: "t4",
    client_name: "Sarah D\u2019Souza",
    client_role: "Travel Creator · 400K subs",
    avatar_url: null,
    quote:
      "The color grading made my Varanasi footage look like a Netflix documentary. My best performing video ever.",
    rating: 5,
    is_visible: true,
    sort_order: 4,
  },
];

export const FALLBACK_BEFORE_AFTER: BeforeAfter[] = [
  {
    id: "ba1",
    title: "Cinematic Grade — Studio Portrait",
    before_url:
      "https://images.unsplash.com/photo-1643327269452-a291a5f3f72a?crop=entropy&cs=srgb&fm=jpg&q=60&w=1200&sat=-100",
    after_url:
      "https://images.unsplash.com/photo-1643327269452-a291a5f3f72a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    sort_order: 1,
  },
  {
    id: "ba2",
    title: "Neon Night — Set Lighting",
    before_url:
      "https://images.unsplash.com/photo-1646206346896-14367dee001b?crop=entropy&cs=srgb&fm=jpg&q=55&w=1200&sat=-100",
    after_url:
      "https://images.unsplash.com/photo-1646206346896-14367dee001b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200",
    sort_order: 2,
  },
];

export async function getSettings(): Promise<SiteSettings> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .maybeSingle();
    if (error || !data) return FALLBACK_SETTINGS;
    return { ...FALLBACK_SETTINGS, ...data };
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_PROJECTS;
    return data;
  } catch {
    return FALLBACK_PROJECTS;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_SERVICES;
    return data;
  } catch {
    return FALLBACK_SERVICES;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_visible", true)
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_TESTIMONIALS;
    return data;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getBeforeAfter(): Promise<BeforeAfter[]> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("before_after")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_BEFORE_AFTER;
    return data;
  } catch {
    return FALLBACK_BEFORE_AFTER;
  }
}
