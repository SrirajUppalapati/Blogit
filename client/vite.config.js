import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    outDir: "public",
  },
  server: {
    proxy: {
      "/api": {
        target: "https://blogit-xzae.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
