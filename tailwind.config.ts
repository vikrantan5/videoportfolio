import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0B',
        panel: '#121215',
        lime: '#C6FF3D',
        violet2: '#8B5CF6',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'marquee-reverse': { from: { transform: 'translateX(-50%)' }, to: { transform: 'translateX(0)' } },
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-4%,3%)' },
          '40%': { transform: 'translate(3%,-4%)' },
          '60%': { transform: 'translate(-3%,-2%)' },
          '80%': { transform: 'translate(4%,2%)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        'playhead': {
          from: { left: '0%' },
          to: { left: '100%' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        'marquee-fast': 'marquee 24s linear infinite',
        'marquee-reverse': 'marquee-reverse 36s linear infinite',
        grain: 'grain 8s steps(10) infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        playhead: 'playhead 2.4s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
