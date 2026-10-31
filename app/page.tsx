import { Navbar } from '@/components/site/Navbar';
import { Preloader } from '@/components/site/Preloader';
import { Hero } from '@/components/sections/Hero';
import { ChannelSection } from '@/components/sections/ChannelSection';
import { WorkGrid } from '@/components/sections/WorkGrid';
import { Showreel } from '@/components/sections/Showreel';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { BeforeAfterSection } from '@/components/sections/BeforeAfter';
import { About } from '@/components/sections/About';
import { Testimonials } from '@/components/sections/Testimonials';
import { Pricing } from '@/components/sections/Pricing';
import { Faq } from '@/components/sections/Faq';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { Marquee } from '@/components/site/Marquee';
import { getSettings, getProjects, getServices, getTestimonials, getBeforeAfter } from '@/lib/data';

export const revalidate = 60;

const MARQUEE_WORDS = ['Editing', 'Color Grading', 'Motion', 'Sound Design', 'Storytelling', 'VFX'];

export default async function Home() {
  const [settings, projects, services, testimonials, beforeAfter] = await Promise.all([
    getSettings(),
    getProjects(),
    getServices(),
    getTestimonials(),
    getBeforeAfter(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.editor_name,
    jobTitle: 'Video Editor',
    url: process.env.NEXT_PUBLIC_BASE_URL || undefined,
    sameAs: [settings.channel_url, settings.instagram].filter(Boolean),
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Preloader />
      <Navbar channelUrl={settings.channel_url} channelName={settings.channel_name} />
      <Hero settings={settings} />
      <Marquee items={MARQUEE_WORDS} />
      <ChannelSection settings={settings} />
      <WorkGrid projects={projects} />
      <Showreel />
      <Marquee items={MARQUEE_WORDS} reverse />
      <Services services={services} />
      <Process />
      <BeforeAfterSection items={beforeAfter} />
      <About settings={settings} />
      <Testimonials testimonials={testimonials} />
      <Pricing />
      <Faq />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </main>
  );
}
