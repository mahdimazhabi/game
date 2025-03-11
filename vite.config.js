import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    // added for ignoring cors policies
    proxy: {
      "/api": {
        target: "https://asp-backend-proxy.chbk.app/api",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  ///
  plugins: [react()],
});
