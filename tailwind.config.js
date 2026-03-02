/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  // 1. ENABLE CLASS-BASED DARK MODE
  // This allows you to toggle dark mode by adding/removing 'dark' class on <html>
  darkMode: 'class',
  
  theme: {
    extend: {
      // 2. DEFINE BRAND COLORS
      colors: {
        'industrial-red': {
          DEFAULT: '#C45C3E',
          hover: '#A84A30',
          light: '#C45C3E20', // Useful for backgrounds
        },
         'industrial-dark': '#1A1A1A',

        // 2. Semantic Theme Colors (Mapped to CSS Variables)
        // Usage: bg-surface, text-primary, border-line
        surface: 'var(--color-bg-surface)',
        base: 'var(--color-bg-base)',
        muted: 'var(--color-bg-muted)',
        primary: 'var(--color-text-base)',
        secondary: 'var(--color-text-muted)',
        line: 'var(--color-border)',
      },



      // 4. TYPOGRAPHY
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Integral CF', 'system-ui', 'sans-serif'],
      },

      // 5. CUSTOM ANIMATIONS
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}