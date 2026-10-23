/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Monochromatic Charcoal & Slate Grey Palette (Replaces old Green)
        emerald: {
          950: "#09090B",
          900: "#18181B",
          850: "#202024",
          800: "#27272A",
          700: "#3F3F46",
          600: "#52525B",
          500: "#71717A",
          300: "#D4D4D8",
          200: "#E4E4E7",
          100: "#F4F4F5",
          50: "#FAFAFA",
        },
        // Modern Titanium & Neutral Metallic Accents
        gold: {
          700: "#27272A",
          600: "#3F3F46",
          500: "#52525B",
          400: "#71717A",
          300: "#A1A1AA",
          200: "#E4E4E7",
          100: "#F4F4F5",
          50: "#FFFFFF",
        },
        // Crisp Clean Linen / Canvas Neutrals
        linen: {
          900: "#18181B",
          800: "#27272A",
          700: "#3F3F46",
          600: "#52525B",
          300: "#D4D4D8",
          200: "#E4E4E7",
          100: "#F4F4F5",
          50: "#FAFAFA",
        },
        ruby: {
          700: "#781D2C",
          600: "#8C2D3B",
          50: "#FEF2F2",
        }
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'elevated': '0 10px 30px -4px rgba(0, 0, 0, 0.08)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
