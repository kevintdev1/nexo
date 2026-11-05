import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const fromRoot = (path: string) =>
	fileURLToPath(new URL(path, import.meta.url));

const VENDOR_CHUNKS = [
	{ name: "react", test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
	{ name: "router", test: /node_modules[\\/]react-router[\\/]/ },
	{ name: "data", test: /node_modules[\\/](@tanstack|axios)[\\/]/ },
	{
		name: "forms",
		test: /node_modules[\\/](zod|react-hook-form|@hookform)[\\/]/,
	},
	{ name: "vendor", test: /node_modules[\\/]/ },
];

export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		rolldownOptions: {
			output: {
				codeSplitting: { groups: VENDOR_CHUNKS },
			},
		},
	},
	resolve: {
		alias: {
			"@app": fromRoot("./src/app"),
			"@assets": fromRoot("./src/assets"),
			"@features": fromRoot("./src/features"),
			"@lib": fromRoot("./src/lib"),
			"@shared": fromRoot("./src/shared"),
			"@test": fromRoot("./src/test"),
			"@ui": fromRoot("./src/shared/components/ui"),
		},
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		env: {
			VITE_API_URL: "http://localhost:8000/",
		},
	},
});
