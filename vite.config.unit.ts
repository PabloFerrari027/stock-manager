import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["src/**/*.unit.spec.ts"],
    exclude: ["src/**/*.e2e.spec.ts"],
    setupFiles: ["src/shared/infra/tests/setupUnit.ts"],
  },
});
