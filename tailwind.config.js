/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4A63C9",
        "blue-dark": "#4055AD",
        "neutral-dark": "#4B4B4B",
        "neutral-gray": "#AFAFAF",
        sky: "#1CB0F6",
        purple: "#CE82FF",
        red: "#FF4B4B",
        orange: "#FF9500",
        yellow: "#FFC800",
        white: "#FFFFFF",
      },
      fontFamily: {
        nunito: ["Nunito", "serif"],
      },
    },
  },
  plugins: [],
};
