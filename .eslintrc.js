module.exports = {
  root: true,
  extends: [
    "@react-native-community",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  plugins: ["import-helpers", "jsx-a11y", "prettier"],
  rules: {
    "react-hooks/exhaustive-deps": "off",
    "no-sparse-arrays": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: [
          "/^react/",
          "module",
          "/@components/",
          "/@layouts/",
          "/@mocks/",
          "/@models/",
          "/@services/",
          "/@styles/",
          ["parent", "sibling", "index"],
        ],
        alphabetize: { order: "asc", ignoreCase: true },
      },
    ],
  },
};
