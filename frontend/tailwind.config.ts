import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 25s linear infinite',
      },
      colors: {
        // EchoTech Design Tokens
        primary: {
          DEFAULT: '#0F4C35',
          50:  '#E8F5F0',
          100: '#C5E5D9',
          200: '#9FD4C0',
          300: '#78C3A6',
          400: '#52B28D',
          500: '#0F4C35',
          600: '#0D4330',
          700: '#0B3928',
          800: '#082E1F',
          900: '#052215',
        },
        accent: {
          DEFAULT: '#F5A623',
          50:  '#FEF6E7',
          100: '#FDE8BC',
          200: '#FBD990',
          300: '#F9CB65',
          400: '#F7BC39',
          500: '#F5A623',
          600: '#D48E1A',
          700: '#B27612',
          800: '#8F5E0A',
          900: '#6D4605',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F8F9FA',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#4A5568',
          muted: '#718096',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        site: '1280px',
      },
      spacing: {
        section: '5rem',
      },
    },
  },
  plugins: [],
}

export default config
