import { defineConfig } from "vitest/config";

// No @vitejs/plugin-react here on purpose: Vitest's esbuild already compiles JSX
// using the automatic runtime from tsconfig.json ("jsx": "react-jsx"). The Babel
// flavour of the plugin also conflicts with shadcn's Babel 7 dependency.
export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // The 3D scene needs a real WebGL context, which jsdom does not provide.
    // Scroll/camera maths belongs in plain functions so it stays testable here;
    // the canvas itself is verified in the browser.
    exclude: ["node_modules/**", ".next/**"],
  },
});
