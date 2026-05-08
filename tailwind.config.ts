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
          black: "#050505",
          dark: "#0A0A0A",
          gold: {
            light: "#F3D4A5",
            DEFAULT: "#D4AF37",
            dark: "#AA8C2C",
          },
          zinc: {
            900: "#111111",
            800: "#1A1A1A",
            700: "#262626",
          }
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #D4AF37, #F3D4A5, #AA8C2C)',
        'dark-gradient': 'radial-gradient(circle at top, #111111 0%, #050505 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
