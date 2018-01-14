module.exports = {
  parser: 'babel-eslint',
  extends: ['@strv/javascript', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  plugins: [],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {},
}
