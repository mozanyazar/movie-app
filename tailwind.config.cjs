/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryFont: "'Solitreo', cursive",
        secondaryFont: "'Poppins', sans-serif",
      },
      fontSize: {
        titleSize: "clamp(20px,3vw, 30px)",
      },
    },
  },
  plugins: [],
};
