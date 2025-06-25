// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'slow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // --- ADD THIS NEW KEYFRAME ---
        'fall': {
          '0%': { transform: 'translateY(-100%)', opacity: 1 },
          '100%': { transform: 'translateY(100vh)', opacity: 0.5 },
        }
      },
      animation: {
        'slow-spin': 'slow-spin 20s linear infinite',
        // --- ADD THIS NEW ANIMATION UTILITY ---
        'fall': 'fall linear infinite',
      }
    },
  },
  plugins: [],
}
