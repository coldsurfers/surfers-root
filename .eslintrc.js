/** @type {import("eslint").Linter.Config} */

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'prettier', '@tanstack/query'],
  rules: {
    'no-console': 'off',
    'no-continue': 'off',
    'require-await': 'off',
    'class-methods-use-this': 'off',

    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/require-await': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/triple-slash-reference': 'off',

    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react/prop-types': 'off',
    'react/jsx-boolean-value': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/no-array-index-key': 'warn',
    'react/require-default-props': 'off',
    'react/sort-comp': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/display-name': 'off',

    'react-hooks/exhaustive-deps': 'warn',
    'prettier/prettier': 'warn',
    '@typescript-eslint/ban-types': 'warn',

    '@typescript-eslint/no-explicit-any': 'warn',
  },
}
