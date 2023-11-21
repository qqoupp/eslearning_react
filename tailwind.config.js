/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        '55': '0.55', // Custom scale of 55%
      },
    },
  },
  plugins: [],
};
