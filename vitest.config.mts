import { defineConfig } from "vitest/config";

// No @vitejs/plugin-react on purpose — see CLAUDE.md
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
