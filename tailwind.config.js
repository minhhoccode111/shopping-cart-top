/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto: 'repeat(auto-fit, minmax(300px, 1fr))',
        'auto-sm': 'repeat(auto-fit, minmax(160px, 1fr))',
        'auto-md': 'repeat(auto-fit, minmax(220px, 1fr))',
      },
      colors: {
        'semi-transparent': '#ffffffef',
      },
      aspectRatio: {
        '2/3': '2 / 3',
      },
    },
  },
};
