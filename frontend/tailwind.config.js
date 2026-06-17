/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d1421',
        card: '#162032',
        border: '#233046',
        textMain: '#ffffff',
        textMuted: '#8b96a8',
        accentBlue: '#3861fb',
        trendUp: '#16c784',
        trendDown: '#ea3943',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
