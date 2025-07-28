/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    'text-white',
    'text-blue-500'
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'zoom-in-out': 'zoomInOut 3s ease-in-out infinite',
      },
      keyframes: {
        zoomInOut: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.6)' },
        }
      }
    }
  },
  plugins: [],
}