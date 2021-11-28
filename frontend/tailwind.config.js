const defaultTheme = require('tailwindcss/defaultTheme')

const menuPadding = {
  'menu': '98px',
  'menuXs': '70px',
  'menuSm': '118px',
  'menuLg': '136px',
  'menu3xl': '152px',
}


module.exports = {
  mode: 'jit',
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: ['./public/**/*.html', './src/pages/**/*.{js,jsx,ts,tsx,vue}', './src/components/**/*.{js,jsx,ts,tsx,vue}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['WorkSans', '"Arial"', 'sans-serif']
    },
    screens: {
      'xxs': '276px',
      'xs': '370px',
      ...defaultTheme.screens,
      '3xl': '1920px',
    },
    extend: {
      maxWidth: {
        'XlMax': '1440px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
