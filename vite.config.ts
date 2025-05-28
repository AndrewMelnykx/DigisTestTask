import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/DigisTestTask/",
  build: { outDir: path.resolve(__dirname, "dist") },
  define: { "process.env": process.env },

  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@store": path.resolve(__dirname, "src/store"),
      "@slices": path.resolve(__dirname, "src/components/redux/slices"),
      "@selectors": path.resolve(__dirname, "src/components/redux/selectors"),
      "@helpers": path.resolve(__dirname, "src/helpers"),
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
});
