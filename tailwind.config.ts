import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./constants/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
         brand: {
           navy: {
             light: "#1E293B",
             DEFAULT: "#0F172A",
             dark: "#020617",
           },
           emerald: {
             light: "#34D399",
             DEFAULT: "#10B981",
             dark: "#059669",
           },
           slate: {
             900: "#0F172A",
             800: "#1E293B",
             700: "#334155",
           }
         },
       },
       backgroundImage: {
         'emerald-gradient': 'linear-gradient(to right, #10B981, #34D399, #059669)',
         'navy-gradient': 'radial-gradient(circle at top, #1E293B 0%, #020617 100%)',
       },
    },
  },
  plugins: [],
};
export default config;
