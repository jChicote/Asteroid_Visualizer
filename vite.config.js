import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { imagetools } from "vite-imagetools";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        glsl(),
        imagetools()
    ],
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
        assetsDir: "assets" // Keep assets flat in the output directory
    },
    optimizeDeps: {
        exclude: [
            "three-mesh-bvh",
            "three/addons/renderers/webgl/nodes/WebGLNodes.js",
            "three-subdivide",
            "web-ifc-three",
            "web-ifc",
            "three-bvh-csg",
            "three-gpu-pathtracer",
            "flow",
            "three/addons/loaders/IFCLoader.js"
        ]
    },
    publicDir: "./public",
    server: {
        open: true,
        host: true
        // https: true
    }
});
