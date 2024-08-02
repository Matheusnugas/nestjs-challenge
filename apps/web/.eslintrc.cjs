module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Integrates Prettier with ESLint
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: [
    'react-refresh',
    'unused-imports', // For removing unused imports
    'simple-import-sort', // For sorting imports
  ],
  rules: {
    // React specific rules
    'react/jsx-no-target-blank': 'off',
    'react/react-in-jsx-scope': 'off', // Not needed with new JSX Transform
    'react/prop-types': 'off', // Disable prop-types
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Import sorting and unused imports rules
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],

    // Prettier integration
    'prettier/prettier': 'error',

    // Other recommended rules
    'no-console': 'warn',
    'no-debugger': 'warn',
  },
};
