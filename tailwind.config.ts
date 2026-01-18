import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          700: "#047857"
        },
        emerald: {
          500: "#10b981"
        },
        rose: {
          500: "#f43f5e"
        }
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "Poppins", "ui-sans-serif", "system-ui"],
        body: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: [typography]
};

export default config;
