/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'starry-pattern' : "url('https://i.redd.it/bjrxv3wo2rk51.png')",
      }
    },
  },
  plugins: [],
}

