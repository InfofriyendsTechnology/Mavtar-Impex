import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.png", "favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "Mavtar Impex — Handcrafted Luxury Linen Bags",
        short_name: "Mavtar Impex",
        description: "Premium handcrafted linen tote bags and royal embroidery from Surat, Gujarat.",
        theme_color: "#18181B",
        background_color: "#18181B",
        display: "standalone",
        orientation: "portrait-primary",
        start_url: "/",
        scope: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
      },
    }),
  ],
  css: {
    postcss: false,
  },
  optimizeDeps: {
    include: ["@reduxjs/toolkit", "react-redux", "axios", "lucide-react", "framer-motion"],
  },
  server: {
    port: 1053,
    proxy: {
      "/api": {
        target: "http://localhost:1653",
        changeOrigin: true,
      },
    },
  },
});
