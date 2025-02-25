import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    // added for ignoring cors policies
    proxy: {
      "/api": {
        target: "http://217.154.71.28",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  ///
  plugins: [react()],
});
