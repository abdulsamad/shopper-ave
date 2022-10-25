/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: '#388C3C',
      secondary: '#012C01',
      danger: '#F44336',
      info: '#2196F3',
    },
    fontFamily: {
      sans: ['Inter', 'Open Sans', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
    },
  },
};
