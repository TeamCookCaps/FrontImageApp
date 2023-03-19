/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        blur: `url('../public/images/blur.jpg')`,
      },
    },
  },
  plugins: [],
};
