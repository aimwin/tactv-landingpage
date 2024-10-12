/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind")
const plugin = require("tailwindcss/plugin");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
          // formbg
          "formBgTop" : "url('/src/assets/images/lcoRegister/FormBgTop.svg')",
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
      colors :{
        primaryColor: "#112F4E",
        secondaryColor: "#1D7847",
        visionColor: "#EEF8FD",
        missionColor: " #D6E9F3",
        newsColor: "#0E7CB7"
      },
      animation: {
        slideLeft: 'slideLeft .5s ease-out forwards',
        slideTop: 'slideTop .5s ease-out forwards',
      },
      keyframes: {
        slideLeft: {
          '0%': { opacity: 0, transform: 'translateX(50px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideTop: {
          '0%': { opacity: 0, transform: 'translateY(0)' },
          '100%': { opacity: 1, transform: 'translateY(50px)' },
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
    addUtilities({
      '.hide-scrollbar::-webkit-scrollbar': {
        display: 'none',
      },
      '.hide-scrollbar': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      },
    })

  })],
}

