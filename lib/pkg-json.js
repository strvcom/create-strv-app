'use strict'

const path = require('path')
const fs = require('fs-extra')
const merge = require('lodash.merge')
const rootPkgJson = require('../package')

const common = {
  scripts: {
    precommit: 'lint-staged',
  },
  devDependencies: rootPkgJson.devDependencies, // so it's easily updateable
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

const pkgJson = async ({ projectPath, projectName }) => {
  const pkgPath = path.resolve(projectPath, 'package.json')
  const pkg = await fs.readJson(pkgPath)
  common.name = projectName
  const newPkg = merge(pkg, common)
  await fs.writeJson(pkgPath, newPkg, { spaces: '\t' })
}

module.exports = pkgJson
