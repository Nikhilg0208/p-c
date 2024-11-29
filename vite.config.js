import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@aws-amplify/auth"], // Include specific Amplify submodule
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser", // Ensure browser-compatible runtime config
    },
  },
});
