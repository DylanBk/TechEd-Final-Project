import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#1A1A1A',
        'charcoal-light': '#2c2c2c',
        'warm-limestone': '#e9e4d9',
        'aged-stone': '#a8a39a',
        sepia: '#4A403A',
        'muted-gold': '#a18f5b',
        terracotta: '#b97a57',
        'desk-wood': '#2d2424',
        'aged-paper': '#f4f1ea',
        'ink-black': '#1a1818',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
