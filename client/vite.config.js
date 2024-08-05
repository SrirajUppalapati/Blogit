export default defineConfig({
  plugins: [react(), eslint()],
  build: {
    outDir: "build",
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
