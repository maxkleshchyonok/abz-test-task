/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F4E041",
        secondary: "#00BDD3",
        hover: "#FFE302",
        disabled: "#B4B4B4",
      },
      animation: {
        rotation: "rotation 1s linear infinite",
      },
    },
    keyframes: {
      rotation: {
        "0%": { transform: "rotate(0deg)", transformOrigin: "center" },
        "100%": { transform: "rotate(360deg)", transformOrigin: "center" },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/line-clamp")],
};
