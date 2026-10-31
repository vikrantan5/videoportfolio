-- ============================================================
-- FactDefiner Video Portfolio — Seed data
-- Run AFTER 001_initial_schema.sql in the Supabase SQL Editor.
-- Safe to re-run: it clears seeded rows first.
-- ============================================================

truncate public.projects, public.testimonials, public.services, public.before_after restart identity cascade;
delete from public.site_settings;

insert into public.site_settings
  (editor_name, tagline, channel_name, channel_url, channel_avatar_url, subscriber_count_label, total_views_label, videos_edited_count, clients_count, email, whatsapp, instagram, resume_url)
values
  ('FactDefiner', 'I turn raw footage into stories people can''t skip.', 'Fact Definer VIKRANT', 'https://www.youtube.com/@Factdefiner', null,
   '150K+', '50M+', '500+', '80+', 'hello@factdefiner.in', '919999999999', 'https://instagram.com/factdefiner', null);

insert into public.projects
  (title, slug, youtube_url, youtube_id, category, orientation, client_name, description, role, tools, views_label, is_featured, sort_order)
values
  ('Why Shakuni Got Heaven But Yudhishtir Got Hell?', 'shakuni-heaven-yudhishtir-hell', 'https://youtu.be/5j72h8HMTGg', '5j72h8HMTGg', 'youtube', 'horizontal', 'Fact Definer VIKRANT', 'Mythology long-form episode — pacing, sound design and cinematic grading for maximum retention.', 'Editor & Colorist', array['Premiere Pro','After Effects','DaVinci Resolve'], '1.2M+ views', true, 1),
  ('Who Controls Your Karma — God or You?', 'who-controls-your-karma', 'https://youtu.be/8worvy2fhGs', '8worvy2fhGs', 'youtube', 'horizontal', 'Fact Definer VIKRANT', 'Philosophical storytelling edit with layered motion graphics and rhythmic cuts.', 'Editor & Motion Designer', array['Premiere Pro','After Effects'], '900K+ views', true, 2),
  ('Did We Come From Mars? The Cheyava Falls Clue', 'cheyava-falls-mars', 'https://youtu.be/2vFp5pcUT7k', '2vFp5pcUT7k', 'youtube', 'horizontal', 'Fact Definer VIKRANT', 'Science documentary edit — archival footage, VFX composites and a suspenseful score.', 'Editor & VFX', array['Premiere Pro','After Effects','Audition'], '2M+ views', true, 3),
  ('Why Neem Karoli Baba Is Still A Mystery For Science', 'neem-karoli-baba-mystery', 'https://youtu.be/qmX9sojezKc', 'qmX9sojezKc', 'reel', 'vertical', 'Fact Definer VIKRANT', 'Vertical short-form cut engineered for the first 3 seconds — hooks, captions and punch-ins.', 'Short-form Editor', array['Premiere Pro','CapCut'], '3M+ views', true, 4),
  ('Foreign Monopoly Todkar Natraj Kaise Bana No. 1?', 'natraj-number-one', 'https://youtu.be/0vNqdWC93Wk', '0vNqdWC93Wk', 'youtube', 'horizontal', 'Fact Definer VIKRANT', 'Brand-story documentary with kinetic typography and infographic animation.', 'Editor & Motion Designer', array['Premiere Pro','After Effects'], '750K+ views', true, 5),
  ('Varanasi: The City That Defies Death', 'varanasi-city-defies-death', 'https://youtu.be/pMc_Mscz-AY', 'pMc_Mscz-AY', 'youtube', 'horizontal', 'Fact Definer VIKRANT', 'Cinematic travel-documentary grade — drone footage, atmosphere and emotional pacing.', 'Editor & Colorist', array['DaVinci Resolve','Premiere Pro'], '1.5M+ views', true, 6),
  ('ASMR — How a Poor Boy Created Lamborghini', 'asmr-poor-boy-lamborghini', 'https://youtu.be/BCjgcXikXjk', 'BCjgcXikXjk', 'reel', 'vertical', 'Fact Definer VIKRANT', 'ASMR short — micro-editing, sound layering and hypnotic loop structure.', 'Short-form Editor & Sound', array['CapCut','Audition'], '5M+ views', true, 7);

insert into public.testimonials (client_name, client_role, avatar_url, quote, rating, is_visible, sort_order) values
  ('Rohit Sharma', 'Tech YouTuber · 1.2M subs', null, 'FactDefiner took my retention from 38% to 61%. The pacing, the sound design — my audience literally comments about the editing now.', 5, true, 1),
  ('Ananya Iyer', 'Founder, Skincare Brand', null, 'Our ad creatives finally convert. The hooks are ruthless — CTR doubled in two weeks. Worth every rupee.', 5, true, 2),
  ('Kunal Mehta', 'Podcast Host', null, 'Fifty clips a month, on time, every time. My shorts channel grew 90K subs in a quarter on his edits alone.', 5, true, 3),
  ('Sarah D''Souza', 'Travel Creator · 400K subs', null, 'The color grading made my Varanasi footage look like a Netflix documentary. My best performing video ever.', 5, true, 4);

insert into public.services (title, description, icon, starting_price, features, is_visible, sort_order) values
  ('Reels & Shorts Editing', 'Scroll-stopping vertical edits with hooks, captions and punch-ins engineered for the algorithm.', 'Smartphone', '₹1,499 / video', array['Hook-first structure','Animated captions','Sound & trend sync','48h turnaround'], true, 1),
  ('YouTube Long-Form', 'Retention-first documentary and talking-head edits with story arcs, b-roll and motion graphics.', 'MonitorPlay', '₹7,999 / video', array['Story arc & pacing','B-roll & SFX design','Motion graphics','Retention editing'], true, 2),
  ('Ads & Promos', 'High-converting ad creatives and brand promos cut to hold attention and drive clicks.', 'Megaphone', '₹4,999 / ad', array['Direct-response cuts','A/B variants','CTA animation','Platform versions'], true, 3),
  ('Color Grading', 'Cinematic color science — from clean commercial looks to moody film emulation.', 'Palette', '₹3,999 / project', array['Shot matching','Custom LUTs','Skin-tone work','HDR delivery'], true, 4),
  ('Motion Graphics', 'Titles, kinetic type, infographics and logo animation that make information addictive.', 'Sparkles', '₹4,999 / package', array['Kinetic typography','Infographic animation','Logo stings','Lower thirds'], true, 5),
  ('Podcast Clips', 'Full podcast repurposing — clips, audiograms and multi-cam edits that grow channels.', 'Mic', '₹999 / clip', array['Multi-cam sync','Clip mining','Branded captions','Weekly batches'], true, 6);

insert into public.before_after (title, before_url, after_url, sort_order) values
  ('Cinematic Grade — Studio Portrait',
   'https://images.unsplash.com/photo-1643327269452-a291a5f3f72a?crop=entropy&cs=srgb&fm=jpg&q=60&w=1200&sat=-100',
   'https://images.unsplash.com/photo-1643327269452-a291a5f3f72a?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', 1),
  ('Neon Night — Set Lighting',
   'https://images.unsplash.com/photo-1646206346896-14367dee001b?crop=entropy&cs=srgb&fm=jpg&q=55&w=1200&sat=-100',
   'https://images.unsplash.com/photo-1646206346896-14367dee001b?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200', 2);
