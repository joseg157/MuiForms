import js from '@eslint/js';
import globals from 'globals';

import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier/recommended';
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';
import vitest from 'eslint-plugin-vitest';

import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'dist',
      'node_modules',
      'build',
      'coverage',
      '.vscode',
      '.dist',
      'lib',
      'temp',
    ],
  },
  {
    extends: [
      // js
      js.configs.recommended,
      // ts
      ...tseslint.configs.recommended,
      // react
      react.configs.flat.recommended,
      // import
      importPlugin.flatConfigs.recommended,
      // a11y (accessibility
      jsxA11y.flatConfigs.recommended,
      // prettier
      prettier,
    ],
    // specify the formats on which to apply the rules below
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,

      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' }, // for eslint-plugin-import to use import alias
      'import/resolver': {
        typescript: {
          project: './tsconfig.app.json',
        },
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      'react/jsx-props-no-spreading': 'off',
      'react/require-default-props': 'off',
      'react/prop-types': 'off',
      'no-console': 'warn',
      'no-restricted-exports': 'off',
      'import/prefer-default-export': 'off',
      'import/no-named-default': 'off',
      'import/extensions': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: false,
        },
      ],

      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  },

  {
    files: ['**/*.{spec,test}.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettier,
    ],
    plugins: { jest, 'testing-library': testingLibrary, vitest },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/no-dom-import': 'off',
      ...vitest.configs.recommended.rules,
      'vitest/max-nested-describe': ['error', { max: 3 }],
    },
  },
);
