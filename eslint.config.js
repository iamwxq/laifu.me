import antfu from "@antfu/eslint-config";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default antfu(
  {
    stylistic: {
      jsx: true, // react
      indent: 2,
      semi: true,
      quotes: "double",
    },
    react: true, // react
    rules: {
      "style/quotes": ["error", "double"],
    },
    markdown: true,
  },
  // react
  {
    rules: {
      "react/prop-types": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-refresh/only-export-components": "off",
      "style/jsx-one-expression-per-line": "off",
      "style/jsx-sort-props": [
        "error",
        {
          ignoreCase: false,
          callbacksLast: true,
          reservedFirst: true,
          shorthandFirst: true,
          shorthandLast: false,
          noSortAlphabetically: false,
          multiline: "last",
        },
      ],
    },
  },
  ...compat.config({
    // https://github.com/francoismassart/eslint-plugin-tailwindcss
    extends: ["plugin:tailwindcss/recommended"],
    rules: {
      "tailwindcss/no-custom-classname": "off",
    },
  }),
  // ...compat.config({
  //   extends: ["plugin:mdx/recommended"],
  // }),
);
