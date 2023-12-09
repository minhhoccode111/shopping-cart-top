/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        autoFit100: 'repeat(auto-fit, minmax(100px, 1fr))',
        autoFill100: 'repeat(auto-fill, minmax(100px, 1fr))',
        autoFill200: 'repeat(auto-fill, minmax(200px, 1fr))',
        autoFit200: 'repeat(auto-fit, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [],
};
