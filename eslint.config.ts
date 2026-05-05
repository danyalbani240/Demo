module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Disable ALL naming rules
    'camelcase': 'off',
    'vue/component-name-in-template-casing': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/component-definition-name-casing': 'off',

    // Optional: allow any props naming style
    'vue/prop-name-casing': 'off',

    // Optional: ignore file naming restrictions
    'unicorn/filename-case': 'off',
  },
};
