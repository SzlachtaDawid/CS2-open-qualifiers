import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const gsapMessage = "Import from @/lib/gsap — it is the module that registers the plugins.";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "gsap", message: gsapMessage },
            { name: "gsap/ScrollTrigger", message: gsapMessage },
            { name: "@gsap/react", message: gsapMessage },
          ],
        },
      ],
    },
  },
  {
    files: ["app/lib/gsap.ts"],
    rules: { "no-restricted-imports": "off" },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
