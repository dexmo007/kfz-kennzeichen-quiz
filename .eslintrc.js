module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'plugin:solid/recommended', 'prettier'],
  plugins: ['solid'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/*.spec.js', '*.config.js'] },
    ],
    'no-confusing-arrow': 'off',
    'no-continue': 'off',
  },
};
