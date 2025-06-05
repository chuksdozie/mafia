/** @type {import('tailwindcss').Config} */
import colors from "./constants/colors";

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        left: "-4px 0 6px rgba(0, 0, 0, 0.1)", // shadow to the left
        top: "0 -4px 6px rgba(0, 0, 0, 0.1)", // shadow above
        right: "4px 0 6px rgba(0, 0, 0, 0.1)", // shadow to the right
        bottom: "0 4px 6px rgba(0, 0, 0, 0.1)", // shadow below
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "coming-soon":
          "url('https://images.unsplash.com/photo-1612611741189-a9b9eb01d515?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        blackOverlay: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
        "hero-bg": `url('../assets/images/hero-learn.jpg')`,
      },
      colors: {
        ...colors,
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      mono: ["Chivo Mono", "monospace"],
    },
    screens: {
      // Default Tailwind breakpoints (you can adjust them)
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
