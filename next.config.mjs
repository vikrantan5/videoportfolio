/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ptnhekybwhueqdtoputp.supabase.co' },
    ],
  },
  async headers() {
    return [
      {
        source: '/video-portfolio-project.zip',
        headers: [
          { key: 'Content-Type', value: 'application/zip' },
          { key: 'Content-Disposition', value: 'attachment; filename="video-portfolio-project.zip"' },
        ],
      },
    ];
  },
};

export default nextConfig;
