/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "red-theme": "#ef233c",
        "white-theme": "#edf2f4",
        "navy-theme": "#2b2d42",
        mask: "rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
