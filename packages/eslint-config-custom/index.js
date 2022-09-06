const config = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['import', '@typescript-eslint'],
  settings: {},
  rules: {
    //
  },
  ignorePatterns: ['**/*.js', '**/*.json', 'node_modules', '.turbo', '.next', 'public'],
};

module.exports = config;
