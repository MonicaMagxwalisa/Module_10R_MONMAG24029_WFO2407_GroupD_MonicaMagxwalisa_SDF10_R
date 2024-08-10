/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'rubik': ['Rubik', 'sans-serif'],
      },
      colors: {
        'brown': {
          '900': '#432000',
          '600': '#AC485A',
          '500': '#DCE1EB',
          '100': '#EEF0F4',
        }
      }
    }
  },
  plugins: [],
}
