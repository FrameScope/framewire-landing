import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Custom apex/www domain (www.framewire.io) → site is served from the root.
export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    target: "es2020",
    sourcemap: false,
    cssMinify: true,
  },
});
