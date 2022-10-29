/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['pages/**/*.{js,ts,jsx,tsx}', 'src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...require('daisyui/src/colors/themes')['[data-theme=light]'],
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
        },
        dark: {
          ...require('daisyui/src/colors/themes')['[data-theme=dark]'],
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
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',
  },
};
