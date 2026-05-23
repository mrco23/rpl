import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, './src/app'),
            '@shared': path.resolve(__dirname, './src/shared'),
            '@features': path.resolve(__dirname, './src/features'),
            '@services': path.resolve(__dirname, './src/services')
        }
    },
    server: {
        allowedHosts: [
            'drench-stride-unnoticed.ngrok-free.dev'
        ]
    }
});
