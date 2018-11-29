'use strict'

module.exports = api => {
  api.addDevDependency('eslint')
  api.addDevDependency('babel-eslint')
  api.addDevDependency('@strv/eslint-config-javascript')
  api.addDevDependency('eslint-config-prettier')

  api.updatePackageJson({
    scripts: {
      lint: 'eslint .',
    },
    eslintConfig: {
      extends: [
        '@strv/javascript/environments/react/v16',
        'prettier',
        'prettier/react',
      ],
      root: true,
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
    },
  })
}
