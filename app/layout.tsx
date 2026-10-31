import type { Metadata, Viewport } from 'next';
import { Syne, Manrope, JetBrains_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import { SiteFx } from '@/components/site/SiteFx';

const syne = Syne({ subsets: ['latin'], variable: '--font-syne', weight: ['500', '700', '800'] });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope', weight: ['300', '400', '500', '600', '700', '800'] });
const jetmono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', weight: ['400', '500', '700'] });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'FactDefiner — Video Editor & Visual Storyteller',
    template: '%s | FactDefiner',
  },
  description:
    'I turn raw footage into stories people can\u2019t skip. Reels, YouTube long-form, ads, color grading and motion graphics by FactDefiner.',
  keywords: ['video editor', 'youtube editor', 'reels editing', 'color grading', 'motion graphics', 'FactDefiner'],
  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: 'FactDefiner',
    title: 'FactDefiner — Video Editor & Visual Storyteller',
    description: 'I turn raw footage into stories people can\u2019t skip.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FactDefiner — Video Editor & Visual Storyteller',
    description: 'I turn raw footage into stories people can\u2019t skip.',
  },
};

export const viewport: Viewport = { themeColor: '#0A0A0B', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${manrope.variable} ${jetmono.variable} bg-ink font-manrope text-zinc-100 antialiased`}>
        <div className="grain-overlay" aria-hidden="true" />
        <SiteFx />
        {children}
        <Toaster theme="dark" richColors position="bottom-right" />
      </body>
    </html>
  );
}
