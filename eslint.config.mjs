import { defineConfig, globalIgnores } from "eslint/config";

import prettier from "eslint-config-prettier/flat";
import stylistic from "@stylistic/eslint-plugin";
import { importX } from "eslint-plugin-import-x";
import markdown from "@eslint/markdown";
import json from "@eslint/json";

import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import tsParser from "@typescript-eslint/parser";

const eslintConfig = defineConfig([

    /* next js eslint plugin rules */
    ...coreWebVitals,
    ...nextTypeScript,

    /* prettier support - avoids conflicts */
    prettier,

    /* code style rules */
    stylistic.configs.customize({
        indent: 4,
        semi: true,
        quotes: "double",
        arrowParens: true,
        commaDangle: "never",
        quoteProps: "as-needed"
    }),

    /* typescript file linting */
    importX.configs["flat/recommended"],
    importX.configs["flat/typescript"],
    importX.configs["flat/react"],

    {
        files: ["**/*.{js,mjs,cjs,jsx,mjsx,ts,mts,cts,tsx,mtsx}"],

        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module"
        },

        rules: {
            "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-commonjs": "error",
            "import/no-duplicates": "error"
            
        }

    },

    /* json file linting */
    {
        files: ["**/*.json"],

        plugins: {
            json
        },

        language: "json/jsonc",

        languageOptions: {
            allowTrailingCommas: false
        },

        extends: ["json/recommended"]
    },

    /* markdown file linting */
    {
        files: ["**/*.md"],

        plugins: {
            markdown
        },

        language: "markdown/gfm",

        extends: ["markdown/recommended"],

        rules: {
            "markdown/no-html": "error"
        }
    },

    /* set react version manually */
    {
        settings: {
            react: { version: "19" } // avoids auto-detection crash (ESLint 10+)
        }
    },

    /* create a global ignore list which will not be linted */
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "next-env.d.ts",
        "node_modules"
    ])

]);

export default eslintConfig;
