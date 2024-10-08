/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        main:"#F4F6FF",
        primary:"#F3C623",
        secondary:"#EB8317",
      }
    },
  },
  plugins: [],
}

