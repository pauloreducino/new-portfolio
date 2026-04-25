import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#060914',
        surface: '#0C1221',
        'surface-2': '#111827',
        border: '#1E293B',
        'border-subtle': '#0F1929',
        blue: {
          DEFAULT: '#3B82F6',
          dim: '#1D4ED8',
          glow: 'rgba(59,130,246,0.15)',
        },
        emerald: {
          DEFAULT: '#10B981',
          dim: '#059669',
          glow: 'rgba(16,185,129,0.12)',
        },
        amber: {
          DEFAULT: '#F59E0B',
          dim: '#D97706',
          glow: 'rgba(245,158,11,0.12)',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        bricolage: ['var(--font-bricolage)', 'sans-serif'],
        dm: ['var(--font-dm)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        blink: 'blink 1s step-end infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '0.7' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      typography: () => ({
        invert: {
          css: {
            '--tw-prose-body': '#94A3B8',
            '--tw-prose-headings': '#F8FAFC',
            '--tw-prose-links': '#3B82F6',
            '--tw-prose-bold': '#F1F5F9',
            '--tw-prose-code': '#10B981',
            '--tw-prose-pre-bg': '#0C1221',
            '--tw-prose-quotes': '#64748B',
            '--tw-prose-hr': '#1E293B',
            maxWidth: 'none',
            'h1,h2,h3,h4': { fontFamily: 'var(--font-bricolage)' },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: '#111827',
              color: '#10B981',
              padding: '0.2em 0.5em',
              borderRadius: '0.3rem',
              fontSize: '0.875em',
              fontFamily: 'var(--font-mono)',
            },
            pre: {
              backgroundColor: '#0C1221',
              border: '1px solid #1E293B',
              borderRadius: '0.75rem',
            },
            'pre code': { backgroundColor: 'transparent', color: 'inherit', padding: '0' },
            a: { color: '#3B82F6', textDecoration: 'none', '&:hover': { color: '#10B981' } },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
