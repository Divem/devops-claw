import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts,tsx}'],
  theme: {
    screens: {
      sm: '1024px',
      md: '1280px',
      lg: '1440px',
      xl: '1680px',
      '2xl': '2560px',
    },
    fontSize: {
      sm: '12px',
      base: '14px',
      xl: '16px',
      '2xl': '18px',
      '3xl': '20px',
      '4xl': '40px',
    },
    extend: {
      colors: {
        primary: '#0960bd',
      },
    },
  },
  plugins: [],
} satisfies Config
