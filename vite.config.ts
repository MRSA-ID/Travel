import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	return {
		define: {
			__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		},
		plugins: [react()],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		build: {
			sourcemap: true,
			rollupOptions: {
				output: {
					manualChunks: {
						"react-vendor": ["react", "react-dom"],
						"redux-vendor": ["@reduxjs/toolkit", "react-redux"],
						"chart-vendor": ["chart.js", "react-chartjs-2"],
					},
				},
			},
		},
		server: {
			host: env.APP_HOST || "127.0.0.1",
			port: parseInt(env.APP_PORT || "3000"),
			watch: {
				usePolling: true,
			},
		},
	};
});
