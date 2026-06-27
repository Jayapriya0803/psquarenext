/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
  marquee: {
    "0%": { transform: "translateX(0%)" },
    "100%": { transform: "translateX(-20%)" },
  },
},
animation: {
  marquee: "marquee 20s linear infinite",
},
    },
  },
  plugins: [],
};