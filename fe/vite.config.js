import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@contexts': path.resolve(__dirname, './src/contexts'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@services': path.resolve(__dirname, './src/services'),
            '@data': path.resolve(__dirname, './src/data'),
            '@assets': path.resolve(__dirname, './src/assets')
        }
    }
});
