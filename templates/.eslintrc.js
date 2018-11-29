module.exports = {
  extends: [
    '@strv/javascript/environments/react/v16',
    'prettier',
    'prettier/react',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/no-unresolved': 0,
    'react/prop-types': 0,
  },
}
