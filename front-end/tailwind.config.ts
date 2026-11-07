import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '381px',
      sm: '601px',
      md: '901px',
      lg: '1101px',
      xl: '1800px',
      '2xl': '2400px',
      short: { raw: '(max-height: 500px) and (orientation: landscape)' },
    },
    extend: {
      colors: {
        blue: '#0F0FFF',
        navy: { DEFAULT: '#17126A', 2: '#221A86', 3: '#2A2290' },
        yellow: '#FFD60A',
        paper: '#FFF6C2',
        lavender: '#C9C8FF',
        soft: '#F5F5FF',
        ink: '#2B2E6B',
        muted: '#5A5D8F',
        status: '#3DBE7B',
      },
      fontFamily: {
        display: ['Archivo', '"Arial Black"', 'Arial', 'sans-serif'],
        sans: ['Inter', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        'card-lg': '28px',
      },
      boxShadow: {
        soft: '0 14px 34px rgba(5, 5, 61, 0.10)',
        lift: '0 10px 24px rgba(0, 0, 0, 0.18)',
        deep: '0 24px 60px rgba(0, 0, 30, 0.35)',
      },
      backgroundImage: {
        'grad-blue': 'linear-gradient(180deg, #0F0FFF 0%, #5B5BFF 100%)',
        'grad-blue-x': 'linear-gradient(90deg, #0F0FFF 0%, #5B5BFF 100%)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        progress: { to: { transform: 'scaleX(1)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        progress: 'progress 3.5s linear forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
