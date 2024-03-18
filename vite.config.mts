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
      reportOnFailure: true,
      reporter: ["json-summary"],
    },
    environment: "jsdom",
    globals: true,
  },
});
