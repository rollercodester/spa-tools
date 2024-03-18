import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude || []),
        "**/*.mock.ts",
        "**/index.ts",
        "**/types.ts",
        "**/*-cli.ts",
      ],
    },
    environment: "jsdom",
    globals: true,
  },
});
