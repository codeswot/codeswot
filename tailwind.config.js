const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
   
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'gray': '#C4C4C4',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'silver': '#E6F1FF',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'primary': '#64FFDA',
      'black': '#000'
    },
  },

  plugins: [],
}
