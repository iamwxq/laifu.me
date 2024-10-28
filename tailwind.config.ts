import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "\"Roboto\"",
          "\"Noto Sans SC\"",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "\"Apple Color Emoji\"",
          "\"Segoe UI Emoji\"",
          "\"Segoe UI Symbol\"",
          "\"Noto Color Emoji\"",
        ],
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [],
} satisfies Config;
