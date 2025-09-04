import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		// If you prefer dev proxy instead of VITE_API_URL:
		// proxy: { '/api': 'http://localhost:4000' }
	},
});
