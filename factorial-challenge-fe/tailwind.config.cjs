/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'factorial-red': 'rgba(255,53,94,1);',
      },
    },
  },
  plugins: [],
};
