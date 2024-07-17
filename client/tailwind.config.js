const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        light: "#f1f5f9",
        light_text: "#0f172a",
        light_background: "#cbd5e1",
        light_hover: " #475569",
        light_button: "#0f172a",
        light_button_hover: "#1e293b",
        light_button_text: "#f8fafc",

        dark: "#0f172a",
        dark_text: "#f8fafc",
        dark_background: "#334155",
        dark_hover: "#e2e8f0",
        dark_button: "#e2e8f0",
        dark_button_hover: "#f8fafc",
        dark_button_text: "#0f172a",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
