import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import pluginJest from "eslint-plugin-jest";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"] },
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: { globals: globals.browser },
    plugins: { js, jest: pluginJest },
    rules: {
      "no-unused-vars": "off",
    },
    settings: {
      jest: {
        version: "detect"
      }
    },
    extends: [
      "js/recommended",
      "plugin:jest/recommended"
    ]
  }
]);
