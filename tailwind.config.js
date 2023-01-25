module.exports = {
 darkMode: "class",
 content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
 theme: {
  extend: {
   fontFamily: {
    poppins: ["Poppins", "sans-serif"],
   },
   colors: {
    "background-primary": "#111927",
    "background-navbar": "#141f2f",
    "background-secondary": "#1c283d",
    "button-primary": "#2869ff",
    "button-primary-hover": "#6390fd",
    "button-action-primary": "#ea4d4d",
    "button-action-hover": "#ff5f5f",
   },
   animation: {
    scale: "betascale 1s linear infinite",
   },
   keyframes: {
    betascale: {
     "0%, 100%": { transform: "scale(1)" },
     "50%": { transform: "scale(1.05)" },
    },
   },
  },
 },
 plugins: [require("@headlessui/tailwindcss"), require("@igorkowalczyk/is-browser")],
};
