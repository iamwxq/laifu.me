import type { Config } from "tailwindcss";

export default {
  darkMode: "selector",
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "\"Open Sans\"",
          "\"Noto Sans SC\"",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "\"Apple Color Emoji\"",
          "\"Segoe UI Emoji\"",
          "\"Segoe UI Symbol\"",
          "\"Noto Color Emoji\"",
        ],
        code: [
          "\"Fira Code\"",
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
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        spinning: "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
