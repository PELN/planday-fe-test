/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {
      // animate-blur
      keyframes: {
        blur: {
          '40%': { filter: "blur(0px)" },
          '50%': { filter: "blur(3px)" },
        }
      },
      animation: {
        blur: 'blur 2s linear infinite',
      },
      colors: {
        'brown': '#fe9446',
        'bronze': '#98582a',
        'base': '#fff4f2',
      },
    },
  },
  plugins: [],
}

