/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'src/**/*.{js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        primary: '#388C3C',
        secondary: '#012C01',
        danger: '#F44336',
        info: '#2196F3',
        transparent: 'transparent',
        current: 'currentColor',
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
    },
  },
};
