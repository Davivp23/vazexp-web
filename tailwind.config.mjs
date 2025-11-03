/**
 * Tailwind config (ESM)
 * Includes app and components directories so Tailwind scans them for class names.
 */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/components/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
