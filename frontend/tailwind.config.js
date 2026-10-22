/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: "#0b2b1f",
          850: "#0e3828",
          800: "#134633",
          700: "#1b5e45",
          600: "#247b5b",
          100: "#e6f3ee",
          50: "#f2f9f5",
        },
        gold: {
          700: "#99732b",
          600: "#b88a35",
          500: "#c5a059",
          400: "#d9b672",
          300: "#e8cf9c",
          100: "#f9f4e8",
          50: "#fcfaf4",
        },
        linen: {
          900: "#2a2723",
          800: "#443f38",
          700: "#686156",
          600: "#8e8577",
          300: "#d9d2c5",
          200: "#e8e2d5",
          100: "#f4efe6",
          50: "#faf7f2",
        },
        ruby: {
          700: "#781d2c",
          600: "#8c2d3b",
          50: "#fdf2f4",
        }
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 43, 31, 0.08)',
        'luxury': '0 10px 30px -4px rgba(15, 43, 31, 0.12), 0 4px 10px -2px rgba(197, 160, 89, 0.08)',
        'gold-glow': '0 0 25px -5px rgba(197, 160, 89, 0.35)',
      }
    },
  },
  plugins: [],
};
