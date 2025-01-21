/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        // 'xxs': '550px',
        'xxs':'330px',
        '550px':'550px',
        '500px':'500px'
      }
    },
  },
  plugins: [],
}
