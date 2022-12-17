import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
        proxy: {
            // "/api/v1": " http://192.168.1.105:5500",
            "/api/v1": " http://192.168.56.1:5500",
            // "/api/v1": " http://192.168.56.1:5500",
        },
    },
});