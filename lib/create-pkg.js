'use strict'

const path = require('path')
const fs = require('fs-extra')
const merge = require('lodash.merge')
const rookPkg = require('../package.json')

const common = {
  scripts: {
    precommit: 'lint-staged',
  },
  devDependencies: rookPkg.devDependencies, // so it's easily updateable
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

const pkgJson = async ({ projectPath, pkg }) => {
  const pkgPath = path.resolve(projectPath, 'package.json')
  const newPkg = merge(pkg, common)
  return fs.writeJson(pkgPath, newPkg, { spaces: '\t' })
}

module.exports = pkgJson
