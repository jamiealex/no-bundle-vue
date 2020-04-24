module.exports = {
  parser:  '@typescript-eslint/parser',
  extends:  [
    'plugin:@typescript-eslint/recommended',
    "plugin:vue/essential",
    "@vue/standard",
  ],
 parserOptions:  {
    ecmaVersion:  2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/first": "off",
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    indent: ["error", 2]
  },
};
