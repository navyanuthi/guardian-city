/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        guardian: {
          bg: '#060a14',
          surface: '#0c1322',
          elevated: '#111b2e',
          border: '#1a2a44',
          blue: '#00b4ff',
          cyan: '#00e5ff',
          accent: '#0ea5e9',
          green: '#10d98a',
          yellow: '#fbbf24',
          red: '#ef4444',
          purple: '#a78bfa',
        },
      },
      backgroundImage: {
        'grid-pattern':
          "linear-gradient(rgba(0,180,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,255,0.04) 1px, transparent 1px)",
        'radar-glow':
          'radial-gradient(circle at 50% 50%, rgba(0,229,255,0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'ticker': 'ticker 30s linear infinite',
        'scan': 'scan 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%,100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scan: {
          '0%,100%': { transform: 'translateY(0)', opacity: '0.3' },
          '50%': { transform: 'translateY(100%)', opacity: '1' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0,229,255,0.15), 0 0 40px rgba(0,180,255,0.08)',
        'neon-strong': '0 0 30px rgba(0,229,255,0.3), 0 0 60px rgba(0,180,255,0.15)',
        'neon-red': '0 0 20px rgba(239,68,68,0.2), 0 0 40px rgba(239,68,68,0.1)',
      },
    },
  },
  plugins: [],
};
