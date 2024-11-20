import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "480px", // Extra small devices
        sm: "600px", // Small devices
        md: "768px", // Medium devices
        lg: "1024px", // Large devices
        "2lg": "1100px",
        xl: "1280px", // Extra large devices
        "2xl": "1536px", // 2X large devices
      },
      colors: {
        primary: "#fca311",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
