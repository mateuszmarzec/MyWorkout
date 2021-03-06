const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

colorWithOpacity = (opacityVariable, opacityValue, color) => {
  if (opacityValue !== undefined) {
    return `rgba(${color}, ${opacityValue})`
  }
  if (opacityVariable !== undefined) {
    return `rgba(${color}, var(${opacityVariable}, 1))`
  }
  return `rgb(${color})`
}

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
      colors: {
        primary: {
          DEFAULT: ({ opacityVariable, opacityValue }) => {
            return colorWithOpacity(opacityVariable, opacityValue, 'var(--primary)')
          },
        },
        secondary: {
          DEFAULT: ({ opacityVariable, opacityValue }) => {
            return colorWithOpacity(opacityVariable, opacityValue, 'var(--secondary)')
          },
        },
        third: {
          DEFAULT: ({ opacityVariable, opacityValue }) => {
            return colorWithOpacity(opacityVariable, opacityValue, 'var(--third)')
          },
        },
        fourth: {
          DEFAULT: ({ opacityVariable, opacityValue }) => {
            return colorWithOpacity(opacityVariable, opacityValue, 'var(--fourth)')
          },
        },
        fifth: {
          DEFAULT: ({ opacityVariable, opacityValue }) => {
            return colorWithOpacity(opacityVariable, opacityValue, 'var(--fifth)')
          },
        }
      },
      maxWidth: {
        'XlMax': '1340px',
      },
      boxShadow: {
        'input': '0 4px 0 rgba(91,105,135,0.2)',
        'navbar': 'rgb(3 27 78 / 10%) 0 2px 4px',
        'table': '0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06)',
        'paper': 'rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px'
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none',
        } 
      })
    })
  ],
}
