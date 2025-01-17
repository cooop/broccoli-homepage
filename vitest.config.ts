// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts", "**/*.spec.ts"],
    exclude: ["node_modules"],
    setupFiles: [],
    reporters: "default",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
