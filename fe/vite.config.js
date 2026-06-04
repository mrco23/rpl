import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
    plugins: [react(), tailwindcss()],

    resolve: {
        alias: {
            "@app": path.resolve(__dirname, "./src/app"),
            "@shared": path.resolve(__dirname, "./src/shared"),
            "@features": path.resolve(__dirname, "./src/features"),
            "@services": path.resolve(__dirname, "./src/services"),
        },
    },

    server: {
        host: "0.0.0.0",

        allowedHosts: true,

        proxy: {
            "/api": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
});