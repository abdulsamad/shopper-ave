/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'src/**/*.{js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3faf3',
          100: '#e3f5e3',
          200: '#c8eac9',
          300: '#9dd89f',
          400: '#6abe6e',
          500: '#46a14a',
          600: '#388c3c',
          700: '#2c692f',
          800: '#27542a',
          900: '#224525',
          dark: '#224525',
          light: '#9dd89f',
          DEFAULT: '#388c3c',
        },
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
      animation: {
        shake: 'shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both',
        'button-loader-middle': 'button-loader 0.3s 0.3s linear infinite alternate',
        'button-loader-side': 'button-loader 0.3s 0.45s linear infinite alternate',
      },
      keyframes: {
        shake: {
          '10%, 90%': {
            transform: 'translate3d(-1px, 0 , 0)',
          },
          '20%, 80%': {
            transform: 'translate3d(2px, 0 , 0)',
          },
          '30%, 50%, 70%': {
            transform: 'translate3d(-3px, 0 , 0)',
          },
          '40%, 60%': {
            transform: 'translate3d(3px, 0, 0)',
          },
        },
        'button-loader': {
          '0%': {
            height: '1.2em',
          },
          '100%': {
            height: '4px',
          },
        },
      },
    },
  },
};
