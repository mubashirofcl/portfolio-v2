import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        foreground: "#ffffff",
        surface: {
          DEFAULT: "#111111",
          secondary: "#141414",
        },
        border: {
          DEFAULT: "#1f1f1f",
        },
        accent: {
          DEFAULT: "#e8e8e8",
          highlight: "#c8f542",
          muted: "rgba(232, 232, 232, 0.1)",
          hover: "#cccccc",
        },
        body: "#888888",
        heading: "#f0f0f0",
      },
      fontFamily: {
        sans: ["var(--font-sora)", "sans-serif"],
        display: ["var(--font-bebas-neue)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

