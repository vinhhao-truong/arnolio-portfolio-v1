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
        "blue-theme": "#0077b6",
        mask: "rgba(0, 0, 0, 0.3)",
        "mask-bold": "rgba(0, 0, 0, 0.7)",
        "top-layer": "rgba(255, 255, 255, 0.05)",
      },
    },
  },
  plugins: [],
};
