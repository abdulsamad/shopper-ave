/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'src/**/*.{js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    colors: {
      primary: '#388C3C',
      secondary: '#012C01',
      danger: '#F44336',
      info: '#2196F3',
      white: '#fff',
      black: '#000',
      gray: '#9E9E9E',
      amber: '#FFC107',
      indigo: '#3F51B5',
      teal: '#009688',
      cyan: '#00BCD4',
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
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
    },
  },
};
