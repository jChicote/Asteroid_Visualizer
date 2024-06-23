import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "./", // Serve from the project root
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                about: resolve(__dirname, "pages/about.html"),
                sources: resolve(__dirname, "pages/sources.html"),
                visualizer: resolve(__dirname, "pages/visualizer.html")
            }
        },
        outDir: "dist", // Output directory for the build
        assetsDir: "" // Keep assets flat in the output directory
    }
});
