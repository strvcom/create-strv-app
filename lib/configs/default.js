'use strict'

const { join } = require('path')
const fs = require('fs-extra')
const merge = require('lodash.merge')
const updatePkg = require('../utils/update-pkg')
const copyDotfile = require('../utils/copy-dotfile')
// const updateBabelRc = require('../utils/update-babelrc')

const pkg = {
  scripts: {
    precommit: 'lint-staged',
  },
  devDependencies: {
    '@strv/eslint-config-javascript': '^7.10.0',
    eslint: '^4.19.0',
    'eslint-config-prettier': '^2.9.0',
    husky: '^0.14.3',
    'lint-staged': '^7.0.0',
    prettier: '^1.11.0',
  },
  prettier: {
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
  },
  'lint-staged': {
    '*.js': ['eslint --fix', 'prettier --write', 'git add'],
    '*.{json,css,md}': ['prettier --write', 'git add'],
  },
}

module.exports = async (path, type, templatePkg) => {
  await updatePkg(path, merge(pkg, templatePkg))
  // Rename gitignore after the fact to prevent npm from renaming it to .npmignore
  // See: https://github.com/npm/npm/issues/1862
  await copyDotfile(path, 'gitignore')
  await fs.move(join(path, 'gitignore'), join(path, '.gitignore'))
  await copyDotfile(path, '.eslintrc')
}
