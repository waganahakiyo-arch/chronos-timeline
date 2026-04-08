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
        ink: {
          950: '#0a0806',
          900: '#0f0e0d',
          800: '#1a1614',
          700: '#2a2420',
          600: '#3a3228',
        },
        paper: {
          50:  '#fdf6e8',
          100: '#f5ebd8',
          200: '#ecd9be',
          300: '#e0c9a4',
        },
        vermilion: {
          DEFAULT: '#8b2020',
          light:   '#b32929',
          dark:    '#6b1818',
        },
        sepia: {
          700: '#3a2d1c',
          600: '#7a6248',
          500: '#9a7e60',
          400: '#b09070',
          300: '#d4b896',
        },
      },
      fontFamily: {
        serif: ['var(--font-noto-serif-jp)', 'Georgia', 'serif'],
      },
      boxShadow: {
        vermilion: '0 0 0 1px #8b2020',
        ink: '0 4px 24px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}

export default config
