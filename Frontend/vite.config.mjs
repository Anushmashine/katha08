// vite.config.mjs
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
<<<<<<< HEAD
import tagger from "@dhiwise/component-tagger";
=======
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
<<<<<<< HEAD
=======
  // ✅ FIX FOR PRODUCTION BUILD PATHS (index.html issue):
  // Ensures all asset paths in the final build are relative, preventing issues when deploying
  // to a non-root path or for simple static hosting.
  base: '/', 
  
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
<<<<<<< HEAD
  plugins: [react(), tsconfigPaths(), tagger()],
=======
  // ✅ DHIWISE REMOVAL: Removed the 'tagger()' plugin call
  plugins: [react(), tsconfigPaths()], 
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
  server: {
    port: 5173,
    host: "0.0.0.0",
    strictPort: true,
<<<<<<< HEAD
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new'],
=======
    // Allowed Hosts cleaned up, removing the DhiWise-specific reference
    allowedHosts: ['.amazonaws.com'], 
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
    proxy: {
      "/api": {
        target: "http://localhost:4028",
        changeOrigin: true,
      },
    },
    fs: {
      strict: false,
    },
    hmr: true,
    historyApiFallback: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
