import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
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
