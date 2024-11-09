import antfu from "@antfu/eslint-config";
import tailwind from "eslint-plugin-tailwindcss";

export default antfu(
  {
    stylistic: {
      jsx: true, // react
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ignores: ["prisma"],
    react: true, // react
    markdown: true,
    rules: {
      "style/quotes": ["error", "double"],
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
  ...tailwind.configs["flat/recommended"],
);
