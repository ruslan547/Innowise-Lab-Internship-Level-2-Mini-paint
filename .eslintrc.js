module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'es6',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  plugins: ['react-hooks'],
};
