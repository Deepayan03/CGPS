/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(240, 5%, 84%)", // For border-border
        ring: "hsl(240, 100%, 50%)", // Add ring color for outline-ring/50
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
